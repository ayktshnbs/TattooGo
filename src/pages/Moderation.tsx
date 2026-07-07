import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import type { TattooDesign } from '../data/types';

/**
 * Hidden moderation console (/moderation — linked nowhere). Community
 * uploads land as "pending" and only appear in the landing feed after
 * approval here. Every request is authorised server-side with the admin
 * token, so knowing the URL alone grants nothing.
 */
export function Moderation() {
  const [token, setToken] = useState(() => sessionStorage.getItem('tg.admin') ?? '');
  const [queue, setQueue] = useState<TattooDesign[] | null>(null);
  const [status, setStatus] = useState('');
  const [busyId, setBusyId] = useState('');

  async function loadQueue() {
    setStatus('Loading…');
    try {
      const res = await fetch('/api/uploads?status=pending', { headers: { 'X-Admin-Token': token } });
      if (res.status === 401) { setStatus('Wrong token.'); setQueue(null); return; }
      if (!res.ok) throw new Error(String(res.status));
      sessionStorage.setItem('tg.admin', token);
      setQueue(await res.json());
      setStatus('');
    } catch {
      setStatus('Could not reach the API (it only runs on the deployed site).');
      setQueue(null);
    }
  }

  async function decide(id: string, action: 'approve' | 'reject') {
    setBusyId(id);
    try {
      const res = await fetch('/api/uploads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setQueue(q => (q ?? []).filter(e => e.id !== id));
    } catch {
      setStatus(`Failed to ${action} ${id} — try again.`);
    } finally {
      setBusyId('');
    }
  }

  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 140, paddingBottom: 120, minHeight: '80vh' }}>
        <span className="mono text-muted">TattooGo · moderation</span>
        <h1 className="display display-md" style={{ margin: '12px 0 28px' }}>Review queue</h1>

        <div className="row gap-3 wrap" style={{ marginBottom: 36, maxWidth: 560 }}>
          <input
            className="input"
            type="password"
            placeholder="Admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ flex: 1, minWidth: 220, border: '1px solid var(--hairline-strong)', padding: '10px 14px', background: 'var(--paper)' }}
          />
          <button className="btn btn-accent" onClick={loadQueue} disabled={!token.trim()}>Load queue</button>
        </div>

        {status && <p className="mono text-muted" style={{ marginBottom: 24 }}>{status}</p>}
        {queue !== null && queue.length === 0 && !status && (
          <p className="mono text-muted">Queue is empty — nothing awaiting review.</p>
        )}

        {queue !== null && queue.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {queue.map(e => (
              <article key={e.id} className="card col">
                <img src={e.imageUrl} alt={e.title} style={{ width: '100%', aspectRatio: e.imageRatio || 1, objectFit: 'cover', display: 'block' }} />
                <div className="card-pad col gap-2">
                  <strong>{e.title}</strong>
                  <span className="mono text-muted" style={{ fontSize: 11 }}>
                    {e.artistName} · {e.style} · {e.source} · {e.createdAt}
                  </span>
                  <div className="row gap-2" style={{ marginTop: 10 }}>
                    <button className="btn btn-sm btn-accent" disabled={busyId === e.id} onClick={() => decide(e.id, 'approve')}>Approve</button>
                    <button className="btn btn-sm" disabled={busyId === e.id} onClick={() => decide(e.id, 'reject')}>Reject</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
