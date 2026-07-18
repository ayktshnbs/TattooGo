import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ProviderOnboarding } from '../pages/studio/ProviderOnboarding';

/**
 * Route guards — one-account / multi-mode.
 * Customer mode is universal: any signed-in user reaches /dashboard.
 * Provider mode requires the optional provider profile; users without one see
 * the inline create-provider onboarding instead of being bounced away.
 */

function Waiting() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <span className="mono text-muted">…</span>
    </div>
  );
}

/** Any signed-in user — customer mode is available to every account. */
export function RequireCustomer({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Waiting />;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return <>{children}</>;
}

/** Provider area: needs a provider profile; otherwise show onboarding to
 *  create one (intent=artist|studio in the query pre-selects the type). */
export function RequireArtist({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Waiting />;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  if (!user.providerType) return <ProviderOnboarding />;
  return <>{children}</>;
}

/** Any signed-in user (customer or provider). Used by shared pages like /account. */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Waiting />;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return <>{children}</>;
}

/** Admin-only. Anonymous → /login. Signed-in non-admin → landing (server also
 *  refuses every /api/admin call with 403). UI hint only; auth is server-side. */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Waiting />;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}
