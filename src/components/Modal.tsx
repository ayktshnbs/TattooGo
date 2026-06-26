import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, size = 'md' }: Props) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;
  const maxW = size === 'sm' ? 420 : size === 'lg' ? 960 : 640;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 80,
        background: 'rgba(15,13,11,0.55)',
        display: 'grid', placeItems: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--paper)', maxWidth: maxW, width: '100%',
          border: '1px solid var(--hairline-strong)',
          padding: 28,
          position: 'relative',
        }}
      >
        <div className="row between center" style={{ marginBottom: 18 }}>
          <span className="mono text-muted">{title ?? 'Modal'}</span>
          <button className="mono" onClick={onClose}>× Close</button>
        </div>
        <hr className="hr" />
        <div style={{ paddingTop: 18 }}>{children}</div>
      </div>
    </div>
  );
}
