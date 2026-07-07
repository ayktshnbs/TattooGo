import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { Icon, type IconName } from './Icon';

export type DashboardScope = 'customer' | 'studio';

interface NavItem {
  to: string;
  label: string;
  num: string;
}

interface Props {
  scope: DashboardScope;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function DashboardLayout({ scope, title, subtitle, children }: Props) {
  const { lang, t } = useLang();

  const customerNav: NavItem[] = [
    { to: '/dashboard',                 num: '01', label: t('cust.home') },
    { to: '/dashboard/create-request',  num: '02', label: t('cust.createRequest') },
    { to: '/dashboard/requests',        num: '03', label: t('cust.requests') },
    { to: '/dashboard/offers',          num: '04', label: t('cust.offers') },
    { to: '/dashboard/messages',        num: '05', label: t('cust.messages') },
    { to: '/dashboard/notifications',   num: '06', label: t('cust.notifications') },
    { to: '/dashboard/favorites',       num: '07', label: t('cust.favorites') },
    { to: '/dashboard/appointments',    num: '08', label: t('cust.appointments') },
    { to: '/dashboard/tracking',        num: '09', label: t('cust.tracking') },
    { to: '/dashboard/reviews',         num: '10', label: t('cust.reviews') },
    { to: '/dashboard/profile',         num: '11', label: t('cust.profile') },
  ];

  const studioNav: NavItem[] = [
    { to: '/studio',              num: '01', label: t('art.home') },
    { to: '/studio/tattoos',      num: '02', label: t('art.myTattoos') },
    { to: '/studio/add-tattoo',   num: '03', label: t('art.addTattoo') },
    { to: '/studio/give-offer',   num: '04', label: t('art.giveOffer') },
    { to: '/studio/offers',       num: '05', label: t('art.myOffers') },
    { to: '/studio/tracking',     num: '06', label: t('art.tracking') },
    { to: '/studio/calendar',     num: '07', label: t('art.calendar') },
    { to: '/studio/campaigns',    num: '08', label: t('art.campaigns') },
    { to: '/studio/artists',      num: '09', label: t('art.myArtists') },
    { to: '/studio/materials',    num: '10', label: t('art.materials') },
    { to: '/studio/reviews',      num: '11', label: t('art.reviews') },
    { to: '/studio/messages',     num: '12', label: t('art.messages') },
    { to: '/studio/notifications',num: '13', label: t('art.notifications') },
    { to: '/studio/stats',        num: '14', label: t('art.stats') },
    { to: '/studio/profile',      num: '15', label: t('art.profile') },
  ];

  const nav = scope === 'customer' ? customerNav : studioNav;

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <DashTopBar scope={scope} />
      <div className="container dash-grid" style={{ paddingTop: 28, paddingBottom: 120 }}>
        <aside className="dash-aside" style={{ borderTop: '1px solid var(--hairline-strong)', paddingTop: 22, position: 'sticky', top: 90, alignSelf: 'start', maxHeight: 'calc(100vh - 110px)', overflowY: 'auto' }}>
          <span className="mono text-muted">{scope === 'customer' ? (lang === 'tr' ? 'Müşteri menüsü' : 'Customer menu') : (lang === 'tr' ? 'Sanatçı menüsü' : 'Artist menu')}</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {nav.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/dashboard' || item.to === '/studio'}
                  style={({ isActive }) => ({
                    display: 'flex', alignItems: 'baseline', gap: 12,
                    padding: '8px 0',
                    borderBottom: '1px solid var(--hairline-light)',
                    color: 'var(--ink)',
                    opacity: isActive ? 1 : 0.7,
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <span className="mono" style={{ width: 22, color: isActive ? 'var(--accent)' : 'var(--muted)' }}>{item.num}</span>
                      <span style={{ fontSize: 14, fontWeight: isActive ? 500 : 400 }}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        <main>
          <header style={{ borderBottom: '1px solid var(--hairline-strong)', paddingBottom: 22, marginBottom: 32 }}>
            <span className="mono text-muted">{scope === 'customer' ? 'Customer · ' : 'Artist · '}{lang.toUpperCase()}</span>
            <h1 className="display display-md" style={{ margin: '12px 0 8px' }}>{title}</h1>
            {subtitle && <p style={{ color: 'var(--muted)', maxWidth: 640, margin: 0 }}>{subtitle}</p>}
          </header>
          {children}
        </main>
      </div>
      <BottomNav scope={scope} />
    </div>
  );
}

function DashTopBar({ scope }: { scope: DashboardScope }) {
  const { t, lang } = useLang();
  return (
    <div
      style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(239,234,227,0.94)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      <div className="container row center between" style={{ paddingBlock: 14 }}>
        <div className="row center gap-4">
          <Logo />
          <span className="mono text-muted dash-hide-sm" style={{ marginLeft: 8 }}>· {scope === 'customer' ? (lang === 'tr' ? 'Müşteri Paneli' : 'Customer Panel') : (lang === 'tr' ? 'Stüdyo Paneli' : 'Studio Panel')}</span>
        </div>
        <div className="row center gap-4">
          <Link to={scope === 'customer' ? '/dashboard/notifications' : '/studio/notifications'} className="mono row center gap-2" aria-label="Notifications">
            <Icon name="notifications" size={18} /> <span className="dash-hide-sm">Notifications</span>
          </Link>
          <Link to={scope === 'customer' ? '/dashboard/messages' : '/studio/messages'} className="mono row center gap-2" aria-label="Messages">
            <Icon name="messages" size={18} /> <span className="dash-hide-sm">DM</span>
          </Link>
          <Link to="#" className="mono row center gap-2" aria-label="Search">
            <Icon name="search" size={18} />
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

function BottomNav({ scope }: { scope: DashboardScope }) {
  const { t } = useLang();
  const loc = useLocation();
  const items: { to: string; label: string; icon: IconName; primary?: boolean }[] = scope === 'customer'
    ? [
        { to: '/dashboard',                label: t('cust.home'),          icon: 'home' },
        { to: '/dashboard/requests',       label: t('cust.requests'),      icon: 'search' },
        { to: '/dashboard/create-request', label: t('cust.createRequest'), icon: 'add', primary: true },
        { to: '/dashboard/messages',       label: t('cust.messages'),      icon: 'messages' },
        { to: '/dashboard/profile',        label: t('cust.profile'),       icon: 'editProfile' },
      ]
    : [
        { to: '/studio',                label: t('art.home'),       icon: 'home' },
        { to: '/studio/stats',          label: t('art.stats'),      icon: 'data' },
        { to: '/studio/add-tattoo',     label: t('art.addTattoo'),  icon: 'add', primary: true },
        { to: '/studio/give-offer',     label: t('art.giveOffer'),  icon: 'giveOffer' },
        { to: '/studio/profile',        label: t('art.profile'),    icon: 'editProfile' },
      ];

  return (
    <nav
      className="bottom-nav"
      style={{
        position: 'fixed', left: 0, right: 0, bottom: 0,
        background: 'rgba(15,13,11,0.96)', color: 'var(--night-text)',
        backdropFilter: 'blur(20px)', zIndex: 40,
      }}
    >
      <div className="container row between" style={{ paddingBlock: 10 }}>
        {items.map(it => {
          const active = loc.pathname === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="col center"
              style={{ flex: 1, padding: '8px 4px', gap: 4 }}
            >
              <span
                style={{
                  width: it.primary ? 42 : 34,
                  height: it.primary ? 42 : 34,
                  borderRadius: 999,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  // Cut-out areas of the icon must match the surface behind them:
                  // the white pill for the primary CTA, the dark bar otherwise.
                  ['--icon-bg' as any]: it.primary ? 'var(--paper)' : '#0F0D0B',
                  background: it.primary
                    ? 'var(--paper)'
                    : active ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
                  border: it.primary
                    ? '1px solid var(--paper)'
                    : active ? '1px solid rgba(255,255,255,0.75)' : '1px solid rgba(255,255,255,0.3)',
                  color: it.primary ? 'var(--ink)' : 'var(--night-text)',
                }}
              >
                <Icon name={it.icon} size={it.primary ? 18 : 16} />
              </span>
              <span className="mono-sm" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--night-text)', opacity: active ? 1 : 0.75 }}>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
