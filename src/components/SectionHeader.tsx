interface Props {
  num: string;
  eyebrow?: string;
  title: string;
  italic?: string;
  description?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  /** 'lg' for landing/editorial sections, 'md' for utility pages (forms, lists). */
  size?: 'lg' | 'md';
}

export function SectionHeader({ num, eyebrow, title, italic, description, tone = 'light', align = 'left', size = 'lg' }: Props) {
  const muted = tone === 'dark' ? 'var(--night-muted)' : 'var(--muted)';
  const ink = tone === 'dark' ? 'var(--night-text)' : 'var(--ink)';
  return (
    <header className="reveal" style={{ textAlign: align, color: ink }}>
      <div className="row center between" style={{ borderBottom: `1px solid ${tone === 'dark' ? 'var(--night-hairline)' : 'var(--hairline)'}`, paddingBottom: 12, marginBottom: 24 }}>
        <span className="mono" style={{ color: muted }}>{num} · {eyebrow ?? title}</span>
        <span className="mono notranslate" translate="no" style={{ color: muted }}>TattooGo · index</span>
      </div>
      <h2 className={`display ${size === 'md' ? 'display-md' : 'display-lg'}`} style={{ margin: 0 }}>
        {title}{italic && <> <span className="italic" style={{ color: 'var(--accent)' }}>{italic}</span></>}
      </h2>
      {description && (
        <p style={{ maxWidth: 620, marginTop: 18, color: muted, fontSize: 15, lineHeight: 1.6 }}>
          {description}
        </p>
      )}
    </header>
  );
}
