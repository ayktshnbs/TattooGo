import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLang } from '../i18n/LangContext';
import { IndexMenu } from './IndexMenu';
import { Icon } from './Icon';

export function Header({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [loc.pathname]);

  const isDark = tone === 'dark';
  const bg = isDark
    ? (scrolled ? 'rgba(15,13,11,0.92)' : 'rgba(15,13,11,0.6)')
    : (scrolled ? 'rgba(239,234,227,0.92)' : 'rgba(239,234,227,0.6)');
  const border = scrolled ? (isDark ? 'var(--night-hairline)' : 'var(--hairline)') : 'transparent';

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: bg, backdropFilter: 'saturate(140%) blur(14px)',
          WebkitBackdropFilter: 'saturate(140%) blur(14px)',
          borderBottom: `1px solid ${border}`,
          transition: 'background .4s var(--ease-out), border-color .4s var(--ease-out)',
        }}
      >
        <div className="container row center between" style={{ paddingBlock: 14 }}>
          <div className="row center gap-6">
            <Logo tone={tone} />
          </div>
          <nav className="row center gap-6" style={{ display: 'none' }} />
          <div className="row center gap-4">
            <NavLink to="/how-it-works">{t('nav.howItWorks')}</NavLink>
            <NavLink to="/artists">{t('nav.artists')}</NavLink>
            <NavLink to="/designs">{t('nav.designs')}</NavLink>
            <NavLink to="/categories">{t('nav.categories')}</NavLink>
            <span style={{ width: 1, height: 18, background: 'var(--hairline-strong)', opacity: isDark ? 0.4 : 1 }} />
            <LanguageSwitcher tone={tone} />
            <Link to="/login" className="mono" style={{ color: isDark ? 'var(--night-text)' : 'var(--ink)' }}>{t('nav.login')}</Link>
            <Link to="/register" className="btn btn-sm">{t('nav.signup')}</Link>
            <button
              className="mono row center gap-2"
              aria-label="Open index"
              onClick={() => setMenuOpen(true)}
              style={{ marginLeft: 6, color: isDark ? 'var(--night-text)' : 'var(--ink)' }}
            >
              <Icon name="add" size={16} />
              {t('nav.index')}
            </button>
          </div>
        </div>
      </header>
      <IndexMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
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
