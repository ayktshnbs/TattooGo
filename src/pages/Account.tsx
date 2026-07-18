import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SectionHeader } from '../components/SectionHeader';
import { useAuth, isArtistRole } from '../auth/AuthContext';
import { useLang } from '../i18n/LangContext';
import { auth } from '../lib/api';

/**
 * Account settings — shared by customers and providers. Holds identity summary,
 * mode links, and a two-step (reveal → acknowledge) account deletion flow.
 * No modal: the confirmation is an inline danger section.
 */
export function Account() {
  const { lang } = useLang();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [armed, setArmed] = useState(false);
  const [ack, setAck] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const isProvider = isArtistRole(user?.role);

  const del = async () => {
    setBusy(true); setError('');
    try {
      await auth.deleteAccount();
      setUser(null);
      navigate('/', { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'failed');
      setBusy(false);
    }
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'clamp(84px, 10vw, 110px)' }}>
        <section style={{ paddingBlock: 'clamp(24px, 4vw, 48px)' }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <SectionHeader num="07" eyebrow={lang === 'tr' ? 'Hesap' : 'Account'} title={lang === 'tr' ? 'Hesap' : 'Account'} italic={lang === 'tr' ? 'ayarları.' : 'settings.'} size="md" />

            <div className="card card-pad col gap-2" style={{ marginTop: 36 }}>
              <span className="mono text-muted" style={{ fontSize: 11 }}>{lang === 'tr' ? 'Giriş yapılan hesap' : 'Signed in as'}</span>
              <strong style={{ fontSize: 18 }}>{user?.name}</strong>
              <span className="text-muted" style={{ fontSize: 14 }}>{user?.email}</span>
            </div>

            <div className="row wrap gap-3" style={{ marginTop: 20 }}>
              <Link to="/dashboard" className="btn btn-sm btn-ghost">{lang === 'tr' ? 'Müşteri paneli' : 'Customer dashboard'}</Link>
              {isProvider && <Link to="/studio" className="btn btn-sm btn-ghost">{lang === 'tr' ? 'Stüdyo paneli' : 'Studio dashboard'}</Link>}
            </div>

            {/* Danger zone — reveal, then require an explicit acknowledgment. */}
            <div className="card card-pad col gap-3" style={{ marginTop: 40, borderColor: 'var(--ink)' }}>
              <strong>{lang === 'tr' ? 'Hesabı sil' : 'Delete account'}</strong>
              {!armed ? (
                <>
                  <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>
                    {lang === 'tr'
                      ? 'Hesabınızı kapatır, profilinizi herkese açık alanlardan kaldırır ve sizi çıkış yaptırır.'
                      : 'Closes your account, removes your profile from all public areas, and signs you out.'}
                  </p>
                  <button className="btn btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setArmed(true)}>
                    {lang === 'tr' ? 'Hesabı sil…' : 'Delete account…'}
                  </button>
                </>
              ) : (
                <>
                  <p style={{ margin: 0, fontSize: 14 }}>
                    {lang === 'tr'
                      ? 'Bu işlem geri alınamaz. Herkese açık profiliniz, portföyünüz ve harita görünürlüğünüz kaldırılır. Tamamlanmış işlemlerin kayıtları anonimleştirilerek saklanır.'
                      : 'This cannot be undone. Your public profile, portfolio and map visibility are removed. Records of completed transactions are kept anonymized.'}
                  </p>
                  <label className="row gap-2 center" style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
                    <span className="mono" style={{ fontSize: 12 }}>{lang === 'tr' ? 'Anladım, kalıcı olarak sil.' : 'I understand — delete permanently.'}</span>
                  </label>
                  {error && <span className="mono" style={{ fontSize: 12 }}>⚠ {error}</span>}
                  <div className="row gap-3">
                    <button className="btn btn-sm btn-accent" disabled={!ack || busy} onClick={del}>
                      {busy ? '…' : (lang === 'tr' ? 'Kalıcı olarak sil' : 'Permanently delete')}
                    </button>
                    <button className="btn btn-sm btn-ghost" disabled={busy} onClick={() => { setArmed(false); setAck(false); }}>
                      {lang === 'tr' ? 'Vazgeç' : 'Cancel'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
