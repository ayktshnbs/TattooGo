import { Link } from 'react-router-dom';
import { Icon } from './Icon';

export function Logo({ tone = 'light', size = 30 }: { tone?: 'light' | 'dark'; size?: number }) {
  const color = tone === 'dark' ? 'var(--night-text)' : 'var(--ink)';
  return (
    <Link to="/" aria-label="TattooGo home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color }}>
      <span style={{ width: size, height: size, color, display: 'inline-flex' }}>
        <Icon name="logo" size={size} />
      </span>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 22,
          letterSpacing: '-0.02em',
        }}
      >
        Tattoo<span style={{ fontStyle: 'italic' }}>Go</span>
      </span>
    </Link>
  );
}
