import { useLang } from '../i18n/LangContext';

export function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang } = useLang();
  const isDark = tone === 'dark';
  const inactive = isDark ? 'rgba(239,234,227,0.4)' : 'rgba(22,19,15,0.4)';
  const active = isDark ? 'var(--night-text)' : 'var(--ink)';
  return (
    <div className="row center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em' }}>
      <button
        aria-label="English"
        onClick={() => setLang('en')}
        style={{ color: lang === 'en' ? active : inactive, padding: '4px 6px' }}
      >EN</button>
      <span style={{ color: inactive }}>/</span>
      <button
        aria-label="Türkçe"
        onClick={() => setLang('tr')}
        style={{ color: lang === 'tr' ? active : inactive, padding: '4px 6px' }}
      >TR</button>
    </div>
  );
}
