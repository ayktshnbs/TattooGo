import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, isArtistRole } from './AuthContext';

/**
 * Route guards. While the session is loading nothing is decided; afterwards
 * the wrong role is sent to its own home and anonymous visitors to /login.
 */

function Waiting() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <span className="mono text-muted">…</span>
    </div>
  );
}

export function RequireCustomer({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Waiting />;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  if (isArtistRole(user.role)) return <Navigate to="/studio" replace />;
  return <>{children}</>;
}

export function RequireArtist({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Waiting />;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  if (!isArtistRole(user.role)) return <Navigate to="/dashboard" replace />;
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
