import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLang } from '../i18n/LangContext';
import { useAuth, isArtistRole } from '../auth/AuthContext';
import { IndexMenu } from './IndexMenu';
import { Icon } from './Icon';

const DESKTOP_BP = 940; // breakpoint above which the full nav is shown

export function Header({ tone = 'light', overHero = false }: { tone?: 'light' | 'dark'; overHero?: boolean }) {
  const { t, lang } = useLang();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardPath = isArtistRole(user?.role) ? '/studio' : '/dashboard';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window === 'undefined' ? true : window.innerWidth >= DESKTOP_BP);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BP}px)`);
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [loc.pathname]);

  // Over a dark hero (landing) the bar is transparent with light content while
  // at the top, then switches to the normal solid bar once scrolled past it.
  const heroLight = overHero && !scrolled;
  const isDark = tone === 'dark' || heroLight;
  const bg = heroLight
    ? 'transparent'
    : tone === 'dark'
      ? (scrolled ? 'rgba(15,13,11,0.92)' : 'rgba(15,13,11,0.6)')
      : (scrolled ? 'rgba(239,234,227,0.92)' : 'rgba(239,234,227,0.6)');
  const border = scrolled ? (tone === 'dark' ? 'var(--night-hairline)' : 'var(--hairline)') : 'transparent';
  const ink = isDark ? 'var(--night-text)' : 'var(--ink)';

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: bg,
          backdropFilter: heroLight ? 'none' : 'saturate(140%) blur(14px)',
          WebkitBackdropFilter: heroLight ? 'none' : 'saturate(140%) blur(14px)',
          borderBottom: `1px solid ${border}`,
          transition: 'background .4s var(--ease-out), border-color .4s var(--ease-out)',
        }}
      >
        <div className="container row center between" style={{ paddingBlock: 14, color: ink }}>
          <Logo tone={isDark ? 'dark' : 'light'} />

          {isDesktop ? (
            <div className="row center gap-4">
              <NavLink to="/how-it-works">{t('nav.howItWorks')}</NavLink>
              <NavLink to="/artists">{t('nav.artists')}</NavLink>
              <NavLink to="/designs">{t('nav.designs')}</NavLink>
              <NavLink to="/categories">{t('nav.categories')}</NavLink>
              <span style={{ width: 1, height: 18, background: isDark ? 'var(--night-hairline)' : 'var(--hairline-strong)' }} />
              <LanguageSwitcher tone={isDark ? 'dark' : 'light'} />
              {user ? (
                <>
                  <Link to={dashboardPath} className={`btn btn-sm ${isDark ? 'btn-glass' : ''}`}>{lang === 'tr' ? 'Panelim' : 'Dashboard'}</Link>
                  <button className="mono" style={{ color: ink }} onClick={async () => { await logout(); navigate('/'); }}>
                    {lang === 'tr' ? 'Çıkış' : 'Log out'}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mono" style={{ color: ink }}>{t('nav.login')}</Link>
                  <Link to="/register" className={`btn btn-sm ${isDark ? 'btn-glass' : ''}`}>{t('nav.signup')}</Link>
                </>
              )}
              <button
                className="mono row center gap-2"
                aria-label="Open index"
                onClick={() => setMenuOpen(true)}
                style={{ marginLeft: 6, color: ink }}
              >
                <Icon name="add" size={16} />
                {t('nav.index')}
              </button>
            </div>
          ) : (
            <div className="row center gap-3">
              <LanguageSwitcher tone={isDark ? 'dark' : 'light'} />
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                style={{
                  width: 40, height: 40,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${isDark ? 'var(--night-hairline)' : 'var(--hairline-strong)'}`,
                  borderRadius: 999,
                  color: ink, background: 'transparent',
                }}
              >
                <Hamburger color={ink} open={menuOpen} />
              </button>
            </div>
          )}
        </div>
      </header>
      <IndexMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function Hamburger({ color, open }: { color: string; open: boolean }) {
  // Three bars; top + bottom rotate to an X when open. Kept inline so the
  // animation doesn't require a stylesheet.
  return (
    <span style={{ display: 'inline-block', width: 18, height: 14, position: 'relative' }}>
      {[0, 1, 2].map((i) => {
        const top = i === 0 ? 0 : i === 1 ? 6 : 12;
        let transform = 'translateY(0) rotate(0deg)';
        let opacity = 1;
        if (open) {
          if (i === 0) transform = 'translateY(6px) rotate(45deg)';
          if (i === 1) opacity = 0;
          if (i === 2) transform = 'translateY(-6px) rotate(-45deg)';
        }
        return (
          <span
            key={i}
            style={{
              position: 'absolute', left: 0, right: 0, top,
              height: 2, background: color, borderRadius: 2,
              transform, opacity,
              transition: 'transform .35s var(--ease-out), opacity .25s var(--ease-out)',
            }}
          />
        );
      })}
    </span>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link
      to={to}
      className="mono"
      style={{
        position: 'relative',
        padding: '6px 2px',
        opacity: active ? 1 : 0.78,
      }}
    >
      {children}
      <span
        style={{
          position: 'absolute', left: 0, right: 0, bottom: -2, height: 1,
          background: 'currentColor', transform: `scaleX(${active ? 1 : 0})`,
          transformOrigin: 'left', transition: 'transform .35s var(--ease-out)',
        }}
      />
    </Link>
  );
}
