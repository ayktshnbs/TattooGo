export function Marquee({ items, tone = 'light' }: { items: string[]; tone?: 'light' | 'dark' }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div
      className="marquee"
      style={{
        background: tone === 'dark' ? 'var(--night)' : 'var(--paper)',
        color: tone === 'dark' ? 'var(--night-text)' : 'var(--ink)',
        borderColor: tone === 'dark' ? 'var(--night-hairline)' : 'var(--hairline)',
      }}
    >
      <div className="marquee-track">
        {doubled.map((it, i) => <span key={i}>{it}</span>)}
      </div>
    </div>
  );
}
