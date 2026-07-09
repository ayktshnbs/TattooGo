import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LangProvider } from './i18n/LangContext';
import { AuthProvider } from './auth/AuthContext';
import { RequireCustomer, RequireArtist } from './auth/Guard';

import { Landing } from './pages/Landing';
import { Moderation } from './pages/Moderation';
import { HowItWorks, BrowseArtists, ArtistPublicProfile, BrowseDesigns, Categories, Login, Register, ForgotPassword, ResetPassword, VerifyEmail, FAQ, About, Contact, Terms } from './pages/Public';
import { CustomerHome, CreateRequest, MyRequests, OffersReceived, CustomerMessages, CustomerNotifications, CustomerFavorites, CustomerAppointments, CustomerTracking, CustomerReviews, CustomerProfile } from './pages/customer/Customer';
import { StudioHome, MyTattoos, AddTattoo, GiveOffer, MyOffers, StudioTracking, StudioCalendar, StudioCampaigns, StudioArtists, StudioMaterials, StudioReviews, StudioMessages, StudioNotifications, StudioStats, StudioProfile } from './pages/studio/Studio';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

const C = (el: React.ReactNode) => <RequireCustomer>{el}</RequireCustomer>;
const A = (el: React.ReactNode) => <RequireArtist>{el}</RequireArtist>;

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/moderation" element={<Moderation />} />

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
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  );
}
