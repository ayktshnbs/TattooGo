import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { Empty, Loading, ErrorNote } from '../../components/Empty';
import { useAuth } from '../../auth/AuthContext';
import {
  admin,
  type AdminSummary, type AdminUser, type AdminUserFilter, type AdminPortfolioItem, type AdminReportedPortfolioItem,
  type AdminRequest, type AdminOffer, type AdminReview, type AdminAuditEntry,
} from '../../lib/api';

/**
 * MVP admin panel. Access is enforced SERVER-SIDE by requireAdmin on every
 * /api/admin call; RequireAdmin also hides the pages from non-admins, but the
 * DB is the authority. No password fields, session secrets, tokens, or
 * private message bodies are ever fetched here.
 */

/* ------------------------------- shell ------------------------------- */

function Shell({ title, children }: { title: string; children: ReactNode }) {
  const nav = [
    { to: '/admin',            label: 'Summary' },
    { to: '/admin/users',      label: 'Users' },
    { to: '/admin/portfolio',  label: 'Portfolio' },
    { to: '/admin/requests',   label: 'Requests' },
    { to: '/admin/offers',     label: 'Offers' },
    { to: '/admin/reviews',    label: 'Reviews' },
    { to: '/admin/audit-log',  label: 'Audit log' },
  ];
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(239,234,227,0.94)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--hairline)',
      }}>
        <div className="container row center between" style={{ paddingBlock: 12 }}>
          <div className="row center gap-3">
            <Logo />
            <span className="mono text-muted" style={{ marginLeft: 6 }}>· Admin</span>
          </div>
          <div className="row center gap-3">
            <span className="mono text-muted" style={{ fontSize: 11 }}>{user?.email}</span>
            <LanguageSwitcher />
            <button className="mono" onClick={async () => { await logout(); navigate('/', { replace: true }); }} style={{ fontSize: 11 }}>
              Log out
            </button>
          </div>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="row wrap gap-4" style={{ marginBottom: 24, borderBottom: '1px solid var(--hairline)', paddingBottom: 12 }}>
          {nav.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/admin'}
              className="mono"
              style={({ isActive }) => ({
                fontSize: 11, letterSpacing: '0.18em',
                opacity: isActive ? 1 : 0.55,
                borderBottom: isActive ? '2px solid var(--ink)' : '2px solid transparent',
                paddingBottom: 6,
              })}
            >
              {n.label.toUpperCase()}
            </NavLink>
          ))}
        </div>
        <header style={{ marginBottom: 24 }}>
          <h1 className="display display-md" style={{ margin: 0 }}>{title}</h1>
        </header>
        {children}
      </div>
    </div>
  );
}

function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const load = () => {
    setBusy(true); setError('');
    fn().then(d => { setData(d); }).catch(e => setError(e instanceof Error ? e.message : 'failed')).finally(() => setBusy(false));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(load, deps);
  return { data, error, busy, reload: load };
}

async function confirmAction(label: string) {
  return window.confirm(label);
}

/* ------------------------------ summary ------------------------------ */

export function AdminSummaryPage() {
  const { data, error } = useAsync(() => admin.summary());
  return (
    <Shell title="Summary">
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            ['Total users', data.users_total],
            ['Customers (no provider)', data.customers],
            ['Providers (total)', data.providers_total],
            ['Providers active', data.providers_active],
            ['Providers pending', data.providers_pending],
            ['Providers needs review', data.providers_needs_review],
            ['Providers suspended', data.providers_suspended],
            ['Deactivated users', data.deactivated],
            ['Admins', data.admins],
            ['Requests open', data.requests_open],
            ['Requests booked', data.requests_booked],
            ['Requests completed', data.requests_completed],
            ['Requests cancelled', data.requests_cancelled],
            ['Offers (total)', data.offers_total],
            ['Messages (count only)', data.messages_total],
            ['Portfolio pending', data.portfolio_pending],
            ['Portfolio approved', data.portfolio_approved],
            ['Reviews (total)', data.reviews_total],
            ['Reviews hidden', data.reviews_hidden],
          ].map(([label, n]) => (
            <div key={label as string} className="card card-pad col gap-1" style={{ minHeight: 84 }}>
              <span className="mono text-muted" style={{ fontSize: 11 }}>{label}</span>
              <span className="display" style={{ fontSize: 28, lineHeight: 1 }}>{n as number}</span>
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}

/* -------------------------------- users -------------------------------- */

const FILTERS: AdminUserFilter[] = ['all', 'customers', 'providers', 'active', 'pending_profile', 'needs_review', 'suspended', 'deactivated', 'admins'];

export function AdminUsersPage() {
  const [filter, setFilter] = useState<AdminUserFilter>('all');
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState('');
  useEffect(() => { const t = setTimeout(() => setDebounced(q.trim()), 300); return () => clearTimeout(t); }, [q]);
  const { data, error, reload, busy } = useAsync(() => admin.listUsers(filter, debounced || undefined), [filter, debounced]);
  const { user } = useAuth();

  const changeStatus = async (u: AdminUser, status: 'active' | 'needs_review' | 'suspended') => {
    if (!await confirmAction(`Set provider_status = ${status} for ${u.email}?`)) return;
    try { await admin.setProviderStatus(u.id, status); reload(); }
    catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };
  const deactivate = async (u: AdminUser) => {
    if (!await confirmAction(`Deactivate ${u.email}? They will be logged out and hidden from public surfaces.`)) return;
    try { await admin.deactivateUser(u.id); reload(); }
    catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };
  const reactivate = async (u: AdminUser) => {
    if (!await confirmAction(`Reactivate ${u.email}?`)) return;
    try { await admin.reactivateUser(u.id); reload(); }
    catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };

  return (
    <Shell title="Users">
      <div className="row wrap gap-3" style={{ marginBottom: 20 }}>
        {FILTERS.map(f => (
          <button
            key={f}
            className="mono"
            onClick={() => setFilter(f)}
            style={{
              fontSize: 10, padding: '6px 10px',
              border: '1px solid var(--hairline-strong)', borderRadius: 999,
              background: filter === f ? 'var(--ink)' : 'transparent',
              color: filter === f ? 'var(--paper)' : 'var(--ink)',
            }}
          >{f.replace('_', ' ').toUpperCase()}</button>
        ))}
        <input
          className="input"
          placeholder="Search email or name…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: '6px 10px', fontSize: 12, minWidth: 220 }}
        />
      </div>
      {error && <ErrorNote message={error} />}
      {busy && !data && <Loading />}
      {data && data.length === 0 && <Empty title="No users match this filter." />}
      {data && data.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--hairline-strong)', textAlign: 'left' }}>
                {['Email', 'Name', 'Provider', 'Status', 'Deact', 'Admin', 'Requests', 'Offers', 'Portfolio', 'Reviews', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="mono" style={{ padding: '10px 8px', fontSize: 10, letterSpacing: '0.16em', color: 'var(--muted)' }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--hairline)' }}>
                  <td style={{ padding: '10px 8px' }}>{u.email}</td>
                  <td style={{ padding: '10px 8px' }}>{u.name}</td>
                  <td style={{ padding: '10px 8px' }}>{u.providerType ?? '—'}</td>
                  <td style={{ padding: '10px 8px' }}>{u.providerStatus ?? '—'}</td>
                  <td style={{ padding: '10px 8px' }}>{u.deactivatedAt ? '✓' : ''}</td>
                  <td style={{ padding: '10px 8px' }}>{u.isAdmin ? '✓' : ''}</td>
                  <td style={{ padding: '10px 8px' }}>{u.requestCount}</td>
                  <td style={{ padding: '10px 8px' }}>{u.offerCount}</td>
                  <td style={{ padding: '10px 8px' }}>{u.portfolioCount}</td>
                  <td style={{ padding: '10px 8px' }}>{u.reviewCount}</td>
                  <td style={{ padding: '10px 8px' }} className="mono text-muted">{u.createdAt}</td>
                  <td style={{ padding: '10px 8px' }}>
                    <div className="row wrap gap-2">
                      {u.providerType && (
                        <>
                          <button className="mono" onClick={() => changeStatus(u, 'active')} style={btnMini}>ACTIVE</button>
                          <button className="mono" onClick={() => changeStatus(u, 'needs_review')} style={btnMini}>REVIEW</button>
                          <button className="mono" onClick={() => changeStatus(u, 'suspended')} style={btnMini}>SUSPEND</button>
                        </>
                      )}
                      {u.deactivatedAt
                        ? <button className="mono" onClick={() => reactivate(u)} style={btnMini}>REACTIVATE</button>
                        : u.id !== user?.id && <button className="mono" onClick={() => deactivate(u)} style={btnMini}>DEACTIVATE</button>}
                      {u.providerType && u.providerStatus === 'active' && !u.deactivatedAt && (
                        <Link to={`/artists/${u.id}`} target="_blank" className="mono" style={btnMini}>VIEW PUBLIC</Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}

const btnMini: React.CSSProperties = { fontSize: 9, padding: '4px 8px', border: '1px solid var(--hairline-strong)', letterSpacing: '0.14em' };

/* ------------------------------ portfolio ------------------------------ */
/**
 * Two views:
 *   - REPORTED: items with any reports (reviewed or not), sorted by count desc.
 *     This is where admin actually spends time.
 *   - ALL: everything, for spot-checks.
 * There is no per-item approve step anymore — uploads are public by default
 * while their owner is active. Admin acts only on reported / flagged items.
 */
export function AdminPortfolioPage() {
  const [view, setView] = useState<'reported' | 'all'>('reported');
  const reported = useAsync(() => admin.listReportedPortfolio(), [view]);
  const all = useAsync(() => admin.listPortfolio('all'), [view]);
  const src = view === 'reported' ? reported : all;
  const items = src.data ?? [];

  const hide = async (id: string) => {
    if (!await confirmAction('Hide this item from public? You can unhide later.')) return;
    try { await admin.hidePortfolioItem(id); src.reload(); }
    catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };
  const unhide = async (id: string) => {
    if (!await confirmAction('Make this item visible again?')) return;
    try { await admin.unhidePortfolioItem(id); src.reload(); }
    catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };
  const del = async (id: string) => {
    if (!await confirmAction('Delete permanently? The image is removed from storage. This cannot be undone.')) return;
    try { await admin.deletePortfolioItem(id); src.reload(); }
    catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };
  const markReviewed = async (id: string) => {
    try { await admin.markReportsReviewed(id); src.reload(); }
    catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };
  const setNeedsReview = async (artistId: string) => {
    if (!await confirmAction('Set provider to needs_review? They will disappear from public surfaces.')) return;
    try { await admin.setProviderStatus(artistId, 'needs_review'); src.reload(); }
    catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };
  const suspend = async (artistId: string) => {
    if (!await confirmAction('Suspend this provider? They lose provider access; base account remains.')) return;
    try { await admin.setProviderStatus(artistId, 'suspended'); src.reload(); }
    catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };

  return (
    <Shell title="Portfolio moderation">
      <div className="row gap-3" style={{ marginBottom: 20 }}>
        {(['reported', 'all'] as const).map(s => (
          <button key={s} className="mono" onClick={() => setView(s)} style={{
            fontSize: 10, padding: '6px 10px', border: '1px solid var(--hairline-strong)', borderRadius: 999,
            background: view === s ? 'var(--ink)' : 'transparent',
            color: view === s ? 'var(--paper)' : 'var(--ink)',
          }}>{s === 'reported' ? 'REPORTED' : 'ALL'}</button>
        ))}
      </div>
      {src.error && <ErrorNote message={src.error} />}
      {src.busy && !src.data && <Loading />}
      {src.data && items.length === 0 && <Empty title={view === 'reported' ? 'No reported items.' : 'No portfolio items.'} />}
      {items.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {items.map(item => {
            const reportedItem = view === 'reported' ? (item as AdminReportedPortfolioItem) : null;
            return (
              <article key={item.id} className="card col" style={{ overflow: 'hidden' }}>
                <img src={item.imageUrl} alt={item.title} loading="lazy"
                  style={{ width: '100%', aspectRatio: item.imageRatio || 1, objectFit: 'cover', display: 'block',
                    opacity: reportedItem?.hiddenAt ? 0.5 : 1 }} />
                <div className="card-pad col gap-2">
                  <div className="row between center">
                    <strong style={{ fontSize: 14 }}>{item.title}</strong>
                    {reportedItem?.hiddenAt && <span className="mono" style={{ fontSize: 10 }}>HIDDEN</span>}
                  </div>
                  <span className="mono text-muted" style={{ fontSize: 11 }}>
                    {item.style} · {item.artistName}
                  </span>
                  <span className="mono text-muted" style={{ fontSize: 10 }}>
                    owner: {item.ownerProviderType ?? '—'} / {item.ownerProviderStatus ?? '—'}
                    {item.ownerDeactivated ? ' · DEACTIVATED' : ''}
                  </span>
                  {reportedItem && (
                    <>
                      <span className="mono" style={{ fontSize: 11 }}>
                        {reportedItem.reportCount} report{reportedItem.reportCount === 1 ? '' : 's'}
                        {reportedItem.pendingReports > 0 && ` · ${reportedItem.pendingReports} pending`}
                      </span>
                      {reportedItem.latestReason && (
                        <span className="mono text-muted" style={{ fontSize: 10 }}>
                          latest: {reportedItem.latestReason}
                        </span>
                      )}
                      {reportedItem.latestNote && (
                        <span className="text-muted" style={{ fontSize: 12 }}>“{reportedItem.latestNote}”</span>
                      )}
                    </>
                  )}
                  <div className="row wrap gap-2" style={{ marginTop: 6 }}>
                    {reportedItem?.hiddenAt
                      ? <button className="btn btn-sm btn-ghost" onClick={() => unhide(item.id)}>Unhide</button>
                      : <button className="btn btn-sm btn-ghost" onClick={() => hide(item.id)}>Hide</button>}
                    <button className="btn btn-sm btn-ghost" onClick={() => del(item.id)}>Delete</button>
                    {reportedItem && reportedItem.pendingReports > 0 && (
                      <button className="btn btn-sm btn-ghost" onClick={() => markReviewed(item.id)}>Mark reviewed</button>
                    )}
                    <button className="btn btn-sm btn-ghost" onClick={() => setNeedsReview(item.artistId)}>needs_review</button>
                    <button className="btn btn-sm btn-ghost" onClick={() => suspend(item.artistId)}>Suspend</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Shell>
  );
}

/* -------------------------------- requests -------------------------------- */

export function AdminRequestsPage() {
  const { data, error, busy } = useAsync(() => admin.listRequests());
  return (
    <Shell title="Requests">
      {error && <ErrorNote message={error} />}
      {busy && !data && <Loading />}
      {data && data.length === 0 && <Empty title="No requests yet." />}
      {data && data.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--hairline-strong)', textAlign: 'left' }}>
                {['ID', 'Customer', 'Title', 'Style', 'City', 'Budget', 'Status', 'Offers', 'Created'].map(h => (
                  <th key={h} className="mono" style={{ padding: '10px 8px', fontSize: 10, letterSpacing: '0.16em', color: 'var(--muted)' }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--hairline)' }}>
                  <td className="mono text-muted" style={{ padding: '10px 8px', fontSize: 10 }}>{r.id.slice(-8)}</td>
                  <td style={{ padding: '10px 8px' }}>{r.customerName}</td>
                  <td style={{ padding: '10px 8px' }}>{r.title}</td>
                  <td style={{ padding: '10px 8px' }}>{r.style}</td>
                  <td style={{ padding: '10px 8px' }}>{r.city ?? '—'}{r.district ? ` · ${r.district}` : ''}</td>
                  <td style={{ padding: '10px 8px' }}>
                    {r.budgetMin != null || r.budgetMax != null ? `₺${(r.budgetMin ?? 0).toLocaleString()}–₺${(r.budgetMax ?? 0).toLocaleString()}` : '—'}
                  </td>
                  <td style={{ padding: '10px 8px' }}>{r.status}</td>
                  <td style={{ padding: '10px 8px' }}>{r.offerCount}</td>
                  <td className="mono text-muted" style={{ padding: '10px 8px' }}>{r.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}

/* --------------------------------- offers -------------------------------- */

export function AdminOffersPage() {
  const { data, error, busy } = useAsync(() => admin.listOffers());
  return (
    <Shell title="Offers">
      {error && <ErrorNote message={error} />}
      {busy && !data && <Loading />}
      {data && data.length === 0 && <Empty title="No offers yet." />}
      {data && data.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--hairline-strong)', textAlign: 'left' }}>
                {['ID', 'Provider', 'Customer', 'Amount', 'Status', 'Created'].map(h => (
                  <th key={h} className="mono" style={{ padding: '10px 8px', fontSize: 10, letterSpacing: '0.16em', color: 'var(--muted)' }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--hairline)' }}>
                  <td className="mono text-muted" style={{ padding: '10px 8px', fontSize: 10 }}>{o.id.slice(-8)}</td>
                  <td style={{ padding: '10px 8px' }}>{o.artistName}</td>
                  <td style={{ padding: '10px 8px' }}>{o.customerName}</td>
                  <td style={{ padding: '10px 8px' }}>₺{o.price.toLocaleString()}</td>
                  <td style={{ padding: '10px 8px' }}>{o.status}</td>
                  <td className="mono text-muted" style={{ padding: '10px 8px' }}>{o.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}

/* --------------------------------- reviews -------------------------------- */

export function AdminReviewsPage() {
  const { data, error, reload, busy } = useAsync(() => admin.listReviews());
  const toggle = async (r: AdminReview) => {
    const hide = r.hiddenAt == null;
    if (!await confirmAction(`${hide ? 'Hide' : 'Unhide'} this review?`)) return;
    try {
      if (hide) await admin.hideReview(r.id);
      else await admin.unhideReview(r.id);
      reload();
    } catch (e) { alert(e instanceof Error ? e.message : 'failed'); }
  };
  return (
    <Shell title="Reviews">
      {error && <ErrorNote message={error} />}
      {busy && !data && <Loading />}
      {data && data.length === 0 && <Empty title="No reviews yet." />}
      {data && data.length > 0 && (
        <div className="col gap-3">
          {data.map(r => (
            <article key={r.id} className="card card-pad col gap-2" style={{ borderColor: r.hiddenAt ? 'var(--ink)' : 'var(--hairline)' }}>
              <div className="row between center">
                <strong>{'★'.repeat(r.rating)}<span className="text-muted">{'★'.repeat(5 - r.rating)}</span></strong>
                <span className="mono text-muted" style={{ fontSize: 11 }}>{r.createdAt}</span>
              </div>
              <span className="mono text-muted" style={{ fontSize: 11 }}>{r.customerName} · {r.requestTitle}</span>
              <p style={{ margin: 0, fontSize: 14 }}>{r.text}</p>
              {r.hiddenAt && <span className="mono" style={{ fontSize: 10, color: 'var(--ink)' }}>HIDDEN</span>}
              <button className="btn btn-sm btn-ghost" style={{ alignSelf: 'flex-start' }} onClick={() => toggle(r)}>
                {r.hiddenAt ? 'Unhide' : 'Hide'}
              </button>
            </article>
          ))}
        </div>
      )}
    </Shell>
  );
}

/* ------------------------------- audit log ------------------------------- */

export function AdminAuditLogPage() {
  const { data, error, busy } = useAsync(() => admin.auditLog(200));
  return (
    <Shell title="Audit log">
      {error && <ErrorNote message={error} />}
      {busy && !data && <Loading />}
      {data && data.length === 0 && <Empty title="No admin actions recorded yet." />}
      {data && data.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--hairline-strong)', textAlign: 'left' }}>
                {['When', 'Admin', 'Action', 'Target', 'Previous', 'New'].map(h => (
                  <th key={h} className="mono" style={{ padding: '10px 8px', fontSize: 10, letterSpacing: '0.16em', color: 'var(--muted)' }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--hairline)' }}>
                  <td className="mono text-muted" style={{ padding: '10px 8px', fontSize: 11 }}>{new Date(a.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                  <td className="mono text-muted" style={{ padding: '10px 8px', fontSize: 11 }}>{a.adminUserId.slice(-8)}</td>
                  <td style={{ padding: '10px 8px' }}>{a.action}</td>
                  <td className="mono text-muted" style={{ padding: '10px 8px', fontSize: 11 }}>{a.targetType ?? ''} {a.targetId?.slice(-8) ?? ''}</td>
                  <td className="mono text-muted" style={{ padding: '10px 8px', fontSize: 10, maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.previousValue ?? ''}</td>
                  <td className="mono text-muted" style={{ padding: '10px 8px', fontSize: 10, maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.newValue ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}
