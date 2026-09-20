import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LangContext';
import { styleLabel } from '../../data/mock';
import type { ApiPortfolioItem } from '../../lib/api';

/**
 * Customer discovery feed — presentational pieces of the customer home.
 *
 * Kept in their own module (no DashboardLayout/Icon imports, which need
 * Vite's import.meta.glob) so the exact GET /api/uploads row shape can be
 * rendered in a plain Node test. Rows are `ApiPortfolioItem`: there is NO
 * likes / price / isSaved / city on them — the previous
 * `design.likes.toLocaleString()` crashed the whole dashboard (audit H2).
 */

export type FeedItem = ApiPortfolioItem;

export function designImage(design: FeedItem) {
  return design.imageUrl ?? '';
}

export function DesignCard({ design, compact }: { design: FeedItem; compact?: boolean }) {
  const { lang } = useLang();
  const src = designImage(design);
  // `tags` is always an array from the API; guard anyway for stale cache rows.
  const tagLine = (Array.isArray(design.tags) ? design.tags : []).slice(0, 2).join(' · ');
  return (
    <article className="card card-lift col" style={{ overflow: 'hidden', breakInside: 'avoid', marginBottom: compact ? 18 : 24 }}>
      {src ? (
        <img
          src={src}
          alt={design.title}
          loading="lazy"
          style={{ width: '100%', aspectRatio: String(design.imageRatio || 0.78), objectFit: 'cover', display: 'block', background: 'var(--paper-warm)' }}
        />
      ) : (
        <div className="ph" style={{ aspectRatio: String(design.imageRatio || 0.78) }} />
      )}
      <div className="card-pad col gap-2" style={{ padding: compact ? 16 : 20 }}>
        <span className="mono text-muted" style={{ fontSize: 10 }}>{styleLabel(design.style, lang as 'en' | 'tr')}</span>
        <h3 className="display" style={{ fontSize: compact ? 18 : 22, margin: 0 }}>{design.title}</h3>
        <span className="mono text-muted" style={{ fontSize: 10 }}>{design.artistName}</span>
        <div className="row between center gap-3" style={{ marginTop: 8 }}>
          <span className="mono text-muted" style={{ fontSize: 10 }}>
            {tagLine || design.createdAt}
          </span>
          <Link to="/designs" className="btn btn-sm btn-ghost">{lang === 'tr' ? 'Detaylar' : 'View details'}</Link>
        </div>
      </div>
    </article>
  );
}

export function DiscoverySection({ num, title, action, children }: { num: string; title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 44 }}>
      <div className="row between center" style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: 12, marginBottom: 20, gap: 16 }}>
        <span className="mono text-muted">{num} · {title}</span>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PopularStyleGrid({ designs }: { designs: FeedItem[] }) {
  const { lang } = useLang();
  const counts = Object.values(designs.reduce<Record<string, { style: string; count: number }>>((acc, d) => {
    const key = String(d.style);
    acc[key] = acc[key] ?? { style: key, count: 0 };
    acc[key].count += 1;
    return acc;
  }, {})).sort((a, b) => b.count - a.count).slice(0, 6);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, border: '1px solid var(--hairline)' }}>
      {counts.map((item, i) => (
        <Link key={item.style} to="/designs" className="col gap-2" style={{ padding: 18, minHeight: 128, background: i % 2 ? 'var(--paper)' : 'var(--paper-warm)', justifyContent: 'space-between' }}>
          <span className="mono text-muted">{String(i + 1).padStart(2, '0')}</span>
          <span className="display" style={{ fontSize: 22 }}>{styleLabel(item.style, lang as 'en' | 'tr')}</span>
          <span className="mono text-muted" style={{ fontSize: 10 }}>{item.count} {lang === 'tr' ? 'tasarım' : 'designs'}</span>
        </Link>
      ))}
    </div>
  );
}

export function RecommendedArtists({ designs }: { designs: FeedItem[] }) {
  const { lang } = useLang();
  const artists = Object.values(designs.reduce<Record<string, { id: string; name: string; styles: Set<string>; count: number; latest?: string }>>((acc, d) => {
    const id = d.artistId || d.artistName;
    acc[id] = acc[id] ?? { id, name: d.artistName, styles: new Set(), count: 0 };
    acc[id].count += 1;
    acc[id].styles.add(String(d.style));
    acc[id].latest = acc[id].latest ?? designImage(d);
    return acc;
  }, {})).sort((a, b) => b.count - a.count).slice(0, 4);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
      {artists.map(a => (
        <Link key={a.id} to={`/artists/${a.id}`} className="card card-pad card-lift row gap-3 center">
          {a.latest ? (
            <img src={a.latest} alt="" loading="lazy" style={{ width: 62, height: 62, objectFit: 'cover', flexShrink: 0 }} />
          ) : (
            <span style={{ width: 62, height: 62, background: 'var(--paper-warm)', border: '1px solid var(--hairline)', flexShrink: 0 }} />
          )}
          <span className="col gap-1" style={{ minWidth: 0 }}>
            <strong style={{ fontSize: 15 }}>{a.name}</strong>
            <span className="mono text-muted" style={{ fontSize: 10 }}>{lang === 'tr' ? 'Sanatçı' : 'Artist'}</span>
            <span className="mono text-muted" style={{ fontSize: 10 }}>{Array.from(a.styles).slice(0, 2).map(s => styleLabel(s, lang as 'en' | 'tr')).join(' · ')} · {a.count}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
