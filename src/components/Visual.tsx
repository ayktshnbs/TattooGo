// Decorative SVG/CSS-gradient "ink" visuals used in place of real photos.
import { CSSProperties } from 'react';

const SWATCHES: Record<string, CSSProperties> = {
  'sw-1': { background: 'linear-gradient(160deg, #2A2520 0%, #1B1816 60%, #B0382A 130%)' },
  'sw-2': { background: 'linear-gradient(170deg, #DDD4C5 0%, #B5A78A 100%)' },
  'sw-3': { background: 'linear-gradient(150deg, #15120F 0%, #3C2A23 100%)' },
  'sw-4': { background: 'linear-gradient(140deg, #B0382A 0%, #6A1E18 80%)' },
  'sw-5': { background: 'linear-gradient(180deg, #EFEAE3 0%, #A29485 110%)' },
  'sw-6': { background: 'linear-gradient(200deg, #2A2520 0%, #8E8579 100%)' },
};

export function Swatch({ id, ratio = 1, label, dark }: { id: string; ratio?: number; label?: string; dark?: boolean }) {
  const style: CSSProperties = SWATCHES[id] ?? SWATCHES['sw-1'];
  return (
    <div
      className="ph"
      style={{
        ...style,
        aspectRatio: ratio.toString(),
        position: 'relative',
      }}
    >
      <InkPattern dark={dark} />
      {label && (
        <span
          className="mono"
          style={{
            position: 'absolute', left: 12, bottom: 12,
            color: 'var(--paper)', mixBlendMode: 'screen',
            fontSize: 10, letterSpacing: '0.2em',
          }}
        >{label}</span>
      )}
    </div>
  );
}

export function InkPattern({ dark }: { dark?: boolean }) {
  const stroke = dark ? 'rgba(239,234,227,0.18)' : 'rgba(239,234,227,0.35)';
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'screen' }}>
      <defs>
        <pattern id="lines" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={stroke} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#lines)" />
      <path d="M -20 140 Q 60 60 100 100 T 220 80" stroke={stroke} strokeWidth="1.2" fill="none" />
      <path d="M -10 80 Q 40 140 110 120 T 220 160" stroke={stroke} strokeWidth="0.6" fill="none" />
      <circle cx="150" cy="55" r="22" stroke={stroke} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function AvatarBubble({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name.split(/\s+/).slice(0, 2).map(n => n[0]?.toUpperCase()).join('');
  const idx = (name.charCodeAt(0) + name.length) % 6 + 1;
  return (
    <span
      aria-hidden
      style={{
        width: size, height: size, borderRadius: 999, overflow: 'hidden',
        display: 'inline-grid', placeItems: 'center',
        fontFamily: 'var(--font-mono)', fontSize: size * 0.32, letterSpacing: '0.06em',
        color: 'var(--paper)', flexShrink: 0,
        ...SWATCHES[`sw-${idx}`],
      }}
    >{initials}</span>
  );
}

export function HairlineDivider({ label }: { label?: string }) {
  return (
    <div className="row center gap-3" style={{ width: '100%' }}>
      <hr className="hr" style={{ flex: 1 }} />
      {label && <span className="mono text-muted">{label}</span>}
      <hr className="hr" style={{ flex: 1 }} />
    </div>
  );
}
