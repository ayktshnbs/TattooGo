import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { SectionHeader } from '../../components/SectionHeader';
import { useAuth } from '../../auth/AuthContext';
import { useLang } from '../../i18n/LangContext';
import { auth } from '../../lib/api';

/**
 * Provider onboarding — shown inside the provider area to signed-in users who
 * have no provider profile yet. One click creates the profile (artist OR
 * studio — one per account, EVER; backend enforces it), then the studio
 * dashboard renders with the pending_profile completion banner.
 * ?intent=artist|studio pre-highlights the choice. No modal.
 */
export function ProviderOnboarding() {
  const { lang } = useLang();
  const { setUser } = useAuth();
  const location = useLocation();
  const intent = new URLSearchParams(location.search).get('intent');
  const preselect = intent === 'studio' ? 'studio' : intent === 'artist' ? 'artist' : null;
  const [busy, setBusy] = useState<'artist' | 'studio' | null>(null);
  const [error, setError] = useState('');

  const create = async (type: 'artist' | 'studio') => {
    setBusy(type); setError('');
    try {
      const me = await auth.createProvider(type);
      setUser(me);   // guard re-evaluates → studio dashboard renders
    } catch (e) {
      setError(e instanceof Error ? e.message : 'failed');
      setBusy(null);
    }
  };

  const Choice = ({ type, title, body }: { type: 'artist' | 'studio'; title: string; body: string }) => (
    <div
      className="card card-pad col gap-2"
      style={{ flex: '1 1 240px', borderColor: preselect === type ? 'var(--ink)' : undefined }}
    >
      <strong>{title}</strong>
      <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{body}</p>
      <button
        className={`btn btn-sm ${preselect === type ? 'btn-accent' : 'btn-ghost'}`}
        style={{ alignSelf: 'flex-start', marginTop: 8 }}
        disabled={busy !== null}
        onClick={() => create(type)}
      >
        {busy === type ? '…' : (lang === 'tr' ? 'Profili oluştur' : 'Create profile')}
      </button>
    </div>
  );

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'clamp(84px, 10vw, 110px)' }}>
        <section style={{ paddingBlock: 'clamp(24px, 4vw, 48px)' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <SectionHeader
              num="08"
              eyebrow={lang === 'tr' ? 'Sağlayıcı modu' : 'Provider mode'}
              title={lang === 'tr' ? 'Sanatçı ya da stüdyo' : 'Work as an artist'}
              italic={lang === 'tr' ? 'olarak çalış.' : 'or a studio.'}
              size="md"
            />
            <p className="text-muted" style={{ maxWidth: 560, marginTop: 24, fontSize: 15 }}>
              {lang === 'tr'
                ? 'Hesabınıza bir sağlayıcı profili ekleyin: sanatçı veya stüdyo. Hesap başına yalnızca BİR sağlayıcı türü seçilebilir ve sonradan değiştirilemez. Müşteri özellikleriniz her durumda açık kalır.'
                : 'Add one provider profile to your account: artist or studio. Each account can hold only ONE provider type and it cannot be changed later. Your customer features stay available either way.'}
            </p>
            {error && <p className="mono" style={{ marginTop: 16 }}>⚠ {error}</p>}
            <div className="row wrap gap-4" style={{ marginTop: 28 }}>
              <Choice
                type="artist"
                title={lang === 'tr' ? 'Sanatçı profili' : 'Artist profile'}
                body={lang === 'tr'
                  ? 'Bağımsız dövme sanatçısıysanız: portföyünüzü yayınlayın, isteklere teklif verin.'
                  : 'For independent tattoo artists: publish your portfolio and send offers on briefs.'}
              />
              <Choice
                type="studio"
                title={lang === 'tr' ? 'Stüdyo profili' : 'Studio profile'}
                body={lang === 'tr'
                  ? 'Bir stüdyoyu temsil ediyorsanız: stüdyonuzu haritada ve dizinde görünür yapın.'
                  : 'For studios: make your studio visible on the map and in the directory.'}
              />
            </div>
            <p className="mono text-muted" style={{ marginTop: 28, fontSize: 11 }}>
              {lang === 'tr'
                ? 'Yalnızca müşteri olarak devam etmek isterseniz: '
                : 'Just here as a customer? '}
              <Link to="/dashboard" style={{ textDecoration: 'underline' }}>
                {lang === 'tr' ? 'Müşteri paneline dön' : 'Back to customer dashboard'}
              </Link>
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
