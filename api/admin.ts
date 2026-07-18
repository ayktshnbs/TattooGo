import type { VercelRequest, VercelResponse } from '@vercel/node';
import { del } from '@vercel/blob';
import { requireAdmin } from './_lib/auth.js';
import { moderatePortfolio } from './_lib/repo.js';
import {
  recordAudit, listAuditLog, adminSummary,
  adminListUsers, adminGetUser, adminSetProviderStatus,
  adminDeactivateUser, adminReactivateUser,
  adminListPortfolio, adminListRequests, adminListOffers,
  adminListReviews, adminHideReview, adminUnhideReview,
  type UserFilter,
} from './_lib/admin.js';

/**
 * MVP admin panel — single action dispatcher.
 *
 *   GET  /api/admin?action=<read-action>   → summary / list-* / user-detail / audit-log
 *   POST /api/admin {action, ...}          → mutating actions (all audit-logged)
 *
 * Every call runs through requireAdmin, which enforces:
 *   - anonymous → 401
 *   - not is_admin → 403
 *   - deactivated admin → treated as logged out (getSessionUser returns null)
 *
 * Nothing here exposes password hashes, salts, session secrets, verification
 * tokens, reset tokens, API keys, or message bodies.
 */

const USER_FILTERS = new Set<UserFilter>(['all', 'customers', 'providers', 'active', 'pending_profile', 'needs_review', 'suspended', 'deactivated', 'admins']);
const PROVIDER_STATUSES = new Set(['active', 'needs_review', 'suspended']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;   // 401/403 already written

    if (req.method === 'GET') {
      const action = String(req.query.action ?? '');

      if (action === 'summary') {
        return res.status(200).json(await adminSummary());
      }
      if (action === 'list-users') {
        const filter = String(req.query.filter ?? 'all');
        if (!USER_FILTERS.has(filter as UserFilter)) return res.status(400).json({ error: 'invalid filter' });
        const q = typeof req.query.q === 'string' && req.query.q.trim() ? req.query.q.trim() : null;
        return res.status(200).json(await adminListUsers(filter as UserFilter, q));
      }
      if (action === 'user-detail') {
        const id = String(req.query.id ?? '');
        if (!id) return res.status(400).json({ error: 'id required' });
        const u = await adminGetUser(id);
        return u ? res.status(200).json(u) : res.status(404).json({ error: 'not found' });
      }
      if (action === 'list-portfolio') {
        const status = String(req.query.status ?? 'pending');
        if (!['pending', 'approved', 'all'].includes(status)) return res.status(400).json({ error: 'invalid status' });
        return res.status(200).json(await adminListPortfolio(status as 'pending' | 'approved' | 'all'));
      }
      if (action === 'list-requests') return res.status(200).json(await adminListRequests());
      if (action === 'list-offers')   return res.status(200).json(await adminListOffers());
      if (action === 'list-reviews')  return res.status(200).json(await adminListReviews());
      if (action === 'audit-log') {
        const limit = Math.min(200, Math.max(1, Number(req.query.limit ?? 100) || 100));
        return res.status(200).json(await listAuditLog(limit));
      }
      return res.status(400).json({ error: 'unknown action' });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).json({ error: 'method not allowed' });
    }

    const { action } = (req.body ?? {}) as { action?: string };

    if (action === 'set-provider-status') {
      const { id, status } = req.body ?? {};
      if (typeof id !== 'string' || !PROVIDER_STATUSES.has(status)) {
        return res.status(400).json({ error: 'id + valid status required' });
      }
      const out = await adminSetProviderStatus(id, status);
      if (!out.ok) return res.status(404).json({ error: 'target has no provider profile or is deactivated' });
      await recordAudit({
        adminUserId: admin.id, action: 'set-provider-status',
        targetType: 'user', targetId: id,
        previousValue: { providerStatus: out.previous },
        newValue: { providerStatus: status },
      });
      return res.status(200).json({ ok: true });
    }

    if (action === 'deactivate-user') {
      const { id } = req.body ?? {};
      if (typeof id !== 'string') return res.status(400).json({ error: 'id required' });
      if (id === admin.id) return res.status(400).json({ error: 'cannot deactivate your own admin account' });
      const out = await adminDeactivateUser(id);
      if (!out.ok) return res.status(409).json({ error: 'user is already deactivated or does not exist' });
      await recordAudit({
        adminUserId: admin.id, action: 'deactivate-user',
        targetType: 'user', targetId: id,
        previousValue: out.previous, newValue: { deactivatedAt: 'now' },
      });
      return res.status(200).json({ ok: true });
    }

    if (action === 'reactivate-user') {
      const { id } = req.body ?? {};
      if (typeof id !== 'string') return res.status(400).json({ error: 'id required' });
      const out = await adminReactivateUser(id);
      if (!out.ok) return res.status(409).json({ error: 'user is not deactivated' });
      await recordAudit({
        adminUserId: admin.id, action: 'reactivate-user',
        targetType: 'user', targetId: id,
      });
      return res.status(200).json({ ok: true });
    }

    if (action === 'approve-portfolio' || action === 'reject-portfolio') {
      const { id } = req.body ?? {};
      if (typeof id !== 'string') return res.status(400).json({ error: 'id required' });
      const kind: 'approve' | 'reject' = action === 'approve-portfolio' ? 'approve' : 'reject';
      const outcome = await moderatePortfolio(id, kind);
      if (!outcome.ok) return res.status(404).json({ error: 'portfolio item not found' });
      if (outcome.imageUrl) {
        try { await del(outcome.imageUrl); } catch { /* orphaned blob is harmless */ }
      }
      await recordAudit({
        adminUserId: admin.id, action,
        targetType: 'portfolio_item', targetId: id,
      });
      return res.status(200).json({ ok: true });
    }

    if (action === 'hide-review') {
      const { id } = req.body ?? {};
      if (typeof id !== 'string') return res.status(400).json({ error: 'id required' });
      const out = await adminHideReview(id, admin.id);
      if (!out.ok) return res.status(409).json({ error: 'review not found or already hidden' });
      await recordAudit({ adminUserId: admin.id, action: 'hide-review', targetType: 'review', targetId: id });
      return res.status(200).json({ ok: true });
    }

    if (action === 'unhide-review') {
      const { id } = req.body ?? {};
      if (typeof id !== 'string') return res.status(400).json({ error: 'id required' });
      const out = await adminUnhideReview(id);
      if (!out.ok) return res.status(409).json({ error: 'review not found or not hidden' });
      await recordAudit({ adminUserId: admin.id, action: 'unhide-review', targetType: 'review', targetId: id });
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'unknown action' });
  } catch (err) {
    console.error('admin api error', err instanceof Error ? err.message : '');
    return res.status(500).json({ error: 'internal error' });
  }
}
