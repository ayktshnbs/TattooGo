import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

const COLUMNS: { label: string; items: { to: string; label: { en: string; tr: string } }[] }[] = [
  {
    label: 'Discover',
    items: [
      { to: '/',                label: { en: 'Landing',           tr: 'Anasayfa' } },
      { to: '/how-it-works',    label: { en: 'How it works',      tr: 'Nasıl çalışır' } },
      { to: '/artists',         label: { en: 'Browse artists',    tr: 'Sanatçıları gör' } },
      { to: '/designs',         label: { en: 'Browse designs',    tr: 'Tasarımları gör' } },
      { to: '/categories',      label: { en: 'Categories',        tr: 'Kategoriler' } },
    ],
  },
  {
    label: 'Customer',
    items: [
      { to: '/dashboard',                  label: { en: 'Dashboard',           tr: 'Panel' } },
      { to: '/dashboard/create-request',   label: { en: 'Create request',      tr: 'İstek oluştur' } },
      { to: '/dashboard/requests',         label: { en: 'My requests',         tr: 'İsteklerim' } },
      { to: '/dashboard/offers',           label: { en: 'Offers received',     tr: 'Alınan teklifler' } },
      { to: '/dashboard/messages',         label: { en: 'Messages',            tr: 'Mesajlar' } },
      { to: '/dashboard/favorites',        label: { en: 'Favorites',           tr: 'Favoriler' } },
      { to: '/dashboard/appointments',     label: { en: 'Appointments',        tr: 'Randevular' } },
    ],
  },
  {
    label: 'Artist & studio',
    items: [
      { to: '/studio',                 label: { en: 'Studio home',        tr: 'Stüdyo anasayfa' } },
      { to: '/studio/tattoos',         label: { en: 'My tattoos',         tr: 'Dövmelerim' } },
      { to: '/studio/add-tattoo',      label: { en: 'Add tattoo',         tr: 'Dövme ekle' } },
      { to: '/studio/give-offer',      label: { en: 'Give offer',         tr: 'Teklif ver' } },
      { to: '/studio/offers',          label: { en: 'My offers',          tr: 'Tekliflerim' } },
      { to: '/studio/tracking',        label: { en: 'Order tracking',     tr: 'Sipariş takibi' } },
      { to: '/studio/calendar',        label: { en: 'Calendar',           tr: 'Takvim' } },
      { to: '/studio/campaigns',       label: { en: 'Campaigns',          tr: 'Kampanyalar' } },
      { to: '/studio/artists',         label: { en: 'My artists',         tr: 'Sanatçılarım' } },
      { to: '/studio/materials',       label: { en: 'Materials',          tr: 'Malzemeler' } },
      { to: '/studio/stats',           label: { en: 'Statistics',         tr: 'İstatistik' } },
      { to: '/studio/profile',         label: { en: 'Profile',            tr: 'Profil' } },
    ],
  },
  {
    label: 'Support',
    items: [
      { to: '/faq',           label: { en: 'FAQ',          tr: 'SSS' } },
      { to: '/contact',       label: { en: 'Contact',      tr: 'İletişim' } },
      { to: '/about',         label: { en: 'About',        tr: 'Hakkında' } },
      { to: '/terms',         label: { en: 'Terms',        tr: 'Şartlar' } },
    ],
  },
];

export function IndexMenu({ open, onClose }: Props) {
  const { lang } = useLang();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        background: 'var(--paper)',
        borderBottom: '1px solid var(--hairline)',
        zIndex: 60,
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform .7s var(--ease-out)',
        boxShadow: open ? '0 30px 60px rgba(22,19,15,0.10)' : 'none',
      }}
    >
      <div className="container" style={{ paddingBlock: 80 }}>
        <div className="row between center" style={{ marginBottom: 40 }}>
          <span className="mono">Index · {lang === 'tr' ? 'TattooGo içeriği' : 'TattooGo navigation'}</span>
          <button className="mono" onClick={onClose} aria-label="Close index">
            × {lang === 'tr' ? 'Kapat' : 'Close'}
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48 }}>
          {COLUMNS.map(col => (
            <div key={col.label} className="col" style={{ gap: 14 }}>
              <span className="mono text-muted">{col.label}</span>
              <hr className="hr" />
              {col.items.map(it => (
                <Link
                  key={it.to}
                  to={it.to}
                  className="display"
                  style={{ fontSize: 22, lineHeight: 1.1, padding: '4px 0' }}
                >
                  {it.label[lang]}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
