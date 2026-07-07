import { Link } from 'react-router-dom';

/**
 * Professional empty state — shown wherever a brand-new account has no real
 * data yet. Never render placeholder/fake content instead of this.
 */
export function Empty({ title, body, cta, to }: { title: string; body?: string; cta?: string; to?: string }) {
  return (
    <div
      className="col center"
      style={{
        border: '1px dashed var(--hairline-strong)',
        padding: 'clamp(40px, 6vw, 72px) 24px',
        textAlign: 'center',
        gap: 10,
        background: 'var(--paper)',
      }}
    >
      <span className="display" style={{ fontSize: 22 }}>{title}</span>
      {body && <p className="text-muted" style={{ margin: 0, maxWidth: 420, fontSize: 14 }}>{body}</p>}
      {cta && to && <Link to={to} className="btn btn-sm btn-accent" style={{ marginTop: 10 }}>{cta}</Link>}
    </div>
  );
}

export function Loading() {
  return (
    <div className="col center" style={{ padding: '64px 24px' }}>
      <span className="mono text-muted">Loading…</span>
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <div className="card card-pad" style={{ borderColor: 'var(--ink)' }}>
      <span className="mono">⚠ {message}</span>
    </div>
  );
}
