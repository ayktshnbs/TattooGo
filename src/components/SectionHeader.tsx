interface Props {
  num: string;
  eyebrow?: string;
  title: string;
  italic?: string;
  description?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
}

export function SectionHeader({ num, eyebrow, title, italic, description, tone = 'light', align = 'left' }: Props) {
  const muted = tone === 'dark' ? 'var(--night-muted)' : 'var(--muted)';
  const ink = tone === 'dark' ? 'var(--night-text)' : 'var(--ink)';
  return (
    <header className="reveal" style={{ textAlign: align, color: ink }}>
      <div className="row center between" style={{ borderBottom: `1px solid ${tone === 'dark' ? 'var(--night-hairline)' : 'var(--hairline)'}`, paddingBottom: 14, marginBottom: 28 }}>
        <span className="mono" style={{ color: muted }}>{num} · {eyebrow ?? title}</span>
        <span className="mono" style={{ color: muted }}>TattooGo · index</span>
      </div>
      <h2 className="display display-lg" style={{ margin: 0 }}>
        {title}{italic && <> <span className="italic" style={{ color: 'var(--accent)' }}>{italic}</span></>}
      </h2>
      {description && (
        <p style={{ maxWidth: 620, marginTop: 22, color: muted, fontSize: 16, lineHeight: 1.55 }}>
          {description}
        </p>
      )}
    </header>
  );
}
