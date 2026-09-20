import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect, type ComponentType } from 'react';
import { LangProvider } from './i18n/LangContext';
import { AuthProvider } from './auth/AuthContext';
import { RequireCustomer, RequireArtist, RequireAuth, RequireAdmin } from './auth/Guard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loading } from './components/Empty';

// Landing is the first paint — it stays in the entry chunk. Everything else
// is split per surface (public / customer / studio / admin / account) so a
// visitor never downloads the dashboards, and Leaflet only ships with the
// pages that draw a map. Each group is ONE dynamic import, so its pages share
// a chunk; `page()` adapts a named export to React.lazy's default-export shape.
type Pages<T> = () => Promise<T>;
function page<T extends Record<string, unknown>, K extends keyof T>(load: Pages<T>, name: K) {
  return lazy(() => load().then(m => ({ default: m[name] as ComponentType })));
}
const pub      = () => import('./pages/Public');
const customer = () => import('./pages/customer/Customer');
const studio   = () => import('./pages/studio/Studio');
const admin    = () => import('./pages/admin/Admin');
const account  = () => import('./pages/Account');

import { Landing } from './pages/Landing';
const Account = page(account, 'Account');
const AdminSummaryPage = page(admin, 'AdminSummaryPage');
const AdminUsersPage = page(admin, 'AdminUsersPage');
const AdminPortfolioPage = page(admin, 'AdminPortfolioPage');
const AdminRequestsPage = page(admin, 'AdminRequestsPage');
const AdminOffersPage = page(admin, 'AdminOffersPage');
const AdminReviewsPage = page(admin, 'AdminReviewsPage');
const AdminAuditLogPage = page(admin, 'AdminAuditLogPage');
const HowItWorks = page(pub, 'HowItWorks');
const BrowseArtists = page(pub, 'BrowseArtists');
const ArtistPublicProfile = page(pub, 'ArtistPublicProfile');
const BrowseDesigns = page(pub, 'BrowseDesigns');
const Categories = page(pub, 'Categories');
const Login = page(pub, 'Login');
const Register = page(pub, 'Register');
const ForgotPassword = page(pub, 'ForgotPassword');
const ResetPassword = page(pub, 'ResetPassword');
const VerifyEmail = page(pub, 'VerifyEmail');
const FAQ = page(pub, 'FAQ');
const About = page(pub, 'About');
const Contact = page(pub, 'Contact');
const Terms = page(pub, 'Terms');
const CustomerHome = page(customer, 'CustomerHome');
const CreateRequest = page(customer, 'CreateRequest');
const MyRequests = page(customer, 'MyRequests');
const OffersReceived = page(customer, 'OffersReceived');
const CustomerMessages = page(customer, 'CustomerMessages');
const CustomerNotifications = page(customer, 'CustomerNotifications');
const CustomerFavorites = page(customer, 'CustomerFavorites');
const CustomerAppointments = page(customer, 'CustomerAppointments');
const CustomerTracking = page(customer, 'CustomerTracking');
const CustomerReviews = page(customer, 'CustomerReviews');
const CustomerProfile = page(customer, 'CustomerProfile');
const StudioHome = page(studio, 'StudioHome');
const MyTattoos = page(studio, 'MyTattoos');
const AddTattoo = page(studio, 'AddTattoo');
const GiveOffer = page(studio, 'GiveOffer');
const MyOffers = page(studio, 'MyOffers');
const StudioTracking = page(studio, 'StudioTracking');
const StudioCalendar = page(studio, 'StudioCalendar');
const StudioCampaigns = page(studio, 'StudioCampaigns');
const StudioArtists = page(studio, 'StudioArtists');
const StudioMaterials = page(studio, 'StudioMaterials');
const StudioReviews = page(studio, 'StudioReviews');
const StudioMessages = page(studio, 'StudioMessages');
const StudioNotifications = page(studio, 'StudioNotifications');
const StudioStats = page(studio, 'StudioStats');
const StudioProfile = page(studio, 'StudioProfile');

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

const C = (el: React.ReactNode) => <RequireCustomer>{el}</RequireCustomer>;
const A = (el: React.ReactNode) => <RequireArtist>{el}</RequireArtist>;
const U = (el: React.ReactNode) => <RequireAuth>{el}</RequireAuth>;
const AD = (el: React.ReactNode) => <RequireAdmin>{el}</RequireAdmin>;

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ErrorBoundary>
          <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/artists" element={<BrowseArtists />} />
            <Route path="/artists/:artistId" element={<ArtistPublicProfile />} />
            <Route path="/designs" element={<BrowseDesigns />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />

            {/* Account settings — any signed-in user */}
            <Route path="/account" element={U(<Account />)} />

            {/* Admin panel — server-side is_admin gate on every /api/admin call */}
            <Route path="/admin"            element={AD(<AdminSummaryPage />)} />
            <Route path="/admin/users"      element={AD(<AdminUsersPage />)} />
            <Route path="/admin/portfolio"  element={AD(<AdminPortfolioPage />)} />
            <Route path="/admin/requests"   element={AD(<AdminRequestsPage />)} />
            <Route path="/admin/offers"     element={AD(<AdminOffersPage />)} />
            <Route path="/admin/reviews"    element={AD(<AdminReviewsPage />)} />
            <Route path="/admin/audit-log"  element={AD(<AdminAuditLogPage />)} />

            {/* Customer dashboard — customer role only */}
            <Route path="/dashboard" element={C(<CustomerHome />)} />
            <Route path="/dashboard/create-request" element={C(<CreateRequest />)} />
            <Route path="/dashboard/requests" element={C(<MyRequests />)} />
            <Route path="/dashboard/offers" element={C(<OffersReceived />)} />
            <Route path="/dashboard/messages" element={C(<CustomerMessages />)} />
            <Route path="/dashboard/notifications" element={C(<CustomerNotifications />)} />
            <Route path="/dashboard/favorites" element={C(<CustomerFavorites />)} />
            <Route path="/dashboard/appointments" element={C(<CustomerAppointments />)} />
            <Route path="/dashboard/tracking" element={C(<CustomerTracking />)} />
            <Route path="/dashboard/reviews" element={C(<CustomerReviews />)} />
            <Route path="/dashboard/profile" element={C(<CustomerProfile />)} />

            {/* Studio / artist dashboard — artist role only */}
            <Route path="/studio" element={A(<StudioHome />)} />
            <Route path="/studio/tattoos" element={A(<MyTattoos />)} />
            <Route path="/studio/add-tattoo" element={A(<AddTattoo />)} />
            <Route path="/studio/give-offer" element={A(<GiveOffer />)} />
            <Route path="/studio/offers" element={A(<MyOffers />)} />
            <Route path="/studio/tracking" element={A(<StudioTracking />)} />
            <Route path="/studio/calendar" element={A(<StudioCalendar />)} />
            <Route path="/studio/campaigns" element={A(<StudioCampaigns />)} />
            <Route path="/studio/artists" element={A(<StudioArtists />)} />
            <Route path="/studio/materials" element={A(<StudioMaterials />)} />
            <Route path="/studio/reviews" element={A(<StudioReviews />)} />
            <Route path="/studio/messages" element={A(<StudioMessages />)} />
            <Route path="/studio/notifications" element={A(<StudioNotifications />)} />
            <Route path="/studio/stats" element={A(<StudioStats />)} />
            <Route path="/studio/profile" element={A(<StudioProfile />)} />

            <Route path="*" element={<Landing />} />
          </Routes>
          </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  );
}
