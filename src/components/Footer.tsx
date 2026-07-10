import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';

export function Footer() {
  const { lang, t } = useLang();
  const year = new Date().getFullYear();

  const cols = [
    {
      label: lang === 'tr' ? 'Keşfet' : 'Discover',
      items: [
        { to: '/how-it-works', label: t('nav.howItWorks') },
        { to: '/artists', label: t('nav.artists') },
        { to: '/designs', label: t('nav.designs') },
        { to: '/categories', label: t('nav.categories') },
      ],
    },
    {
      label: lang === 'tr' ? 'Hesap' : 'Account',
      items: [
        { to: '/login', label: t('nav.login') },
        { to: '/register', label: t('nav.signup') },
        { to: '/dashboard', label: lang === 'tr' ? 'Müşteri paneli' : 'Customer dashboard' },
        { to: '/studio', label: lang === 'tr' ? 'Sanatçı paneli' : 'Artist dashboard' },
      ],
    },
    {
      label: lang === 'tr' ? 'Destek' : 'Support',
      items: [
        { to: '/faq', label: 'FAQ' },
        { to: '/contact', label: lang === 'tr' ? 'İletişim' : 'Contact' },
        { to: '/about', label: lang === 'tr' ? 'Hakkında' : 'About' },
        { to: '/terms', label: lang === 'tr' ? 'Şartlar' : 'Terms' },
      ],
    },
  ];

  return (
    <footer className="dark" style={{ paddingTop: 100 }}>
      <div className="container">
        <div className="row between" style={{ gap: 48, flexWrap: 'wrap', marginBottom: 80 }}>
          <div className="col gap-6" style={{ flex: '1 1 320px' }}>
            <span className="mono" style={{ color: 'var(--night-muted)' }}>{lang === 'tr' ? 'Sanatçıya yaz' : 'Talk to the studio'}</span>
            <p className="display display-md" style={{ margin: 0, color: 'var(--night-text)', maxWidth: 460 }}>
              {lang === 'tr' ? 'Brief’inizi paylaşın. Hafta içinde gerçek bir teklif gelsin.' : 'Share your brief. Receive a real, considered offer this week.'}
            </p>
            <div className="row gap-3" style={{ marginTop: 6 }}>
              <Link to="/dashboard/create-request" className="btn btn-primary" style={{ background: 'var(--accent)', borderColor: 'var(--accent)' }}>{t('cta.createRequest')}</Link>
              <Link to="/register" className="btn">{t('cta.joinAsArtist')}</Link>
            </div>
          </div>
          <div className="row" style={{ gap: 64, flexWrap: 'wrap' }}>
            {cols.map(c => (
              <div key={c.label} className="col gap-3" style={{ minWidth: 140 }}>
                <span className="mono" style={{ color: 'var(--night-muted)' }}>{c.label}</span>
                {c.items.map(it => (
                  <Link key={it.to} to={it.to} style={{ color: 'var(--night-text)', opacity: 0.85 }}>{it.label}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className="display notranslate"
          translate="no"
          style={{
            // Cinzel is a wide face — sized to fill the container without
            // overflowing it (the word renders at ~5x the font-size, so the
            // vw factor and caps keep it inside the gutters at every width).
            fontSize: 'clamp(48px, 16vw, 250px)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            color: 'var(--night-text)',
            borderTop: '1px solid var(--night-hairline)',
            paddingTop: 36,
            whiteSpace: 'nowrap',
          }}
        >
          Tattoo<span className="italic">Go</span>
        </div>
        <div className="row between center" style={{ paddingBlock: 28, borderTop: '1px solid var(--night-hairline)', flexWrap: 'wrap', gap: 16 }}>
          <span className="mono" style={{ color: 'var(--night-muted)' }}>© {year} · {t('footer.lockup')}</span>
          <span className="mono" style={{ color: 'var(--night-muted)' }}>İstanbul · Ankara · İzmir</span>
        </div>
      </div>
    </footer>
  );
}
