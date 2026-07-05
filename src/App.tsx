import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LangProvider } from './i18n/LangContext';

import { Landing } from './pages/Landing';
import { HowItWorks, BrowseArtists, BrowseDesigns, Categories, Login, Register, FAQ, About, Contact, Terms } from './pages/Public';
import { CustomerHome, CreateRequest, MyRequests, OffersReceived, CustomerMessages, CustomerNotifications, CustomerFavorites, CustomerAppointments, CustomerTracking, CustomerReviews, CustomerProfile, ShareInk } from './pages/customer/Customer';
import { StudioHome, MyTattoos, AddTattoo, GiveOffer, MyOffers, StudioTracking, StudioCalendar, StudioCampaigns, StudioArtists, StudioMaterials, StudioReviews, StudioMessages, StudioNotifications, StudioStats, StudioProfile } from './pages/studio/Studio';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/artists" element={<BrowseArtists />} />
          <Route path="/designs" element={<BrowseDesigns />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />

          {/* Customer dashboard */}
          <Route path="/dashboard" element={<CustomerHome />} />
          <Route path="/dashboard/create-request" element={<CreateRequest />} />
          <Route path="/dashboard/requests" element={<MyRequests />} />
          <Route path="/dashboard/offers" element={<OffersReceived />} />
          <Route path="/dashboard/messages" element={<CustomerMessages />} />
          <Route path="/dashboard/notifications" element={<CustomerNotifications />} />
          <Route path="/dashboard/favorites" element={<CustomerFavorites />} />
          <Route path="/dashboard/appointments" element={<CustomerAppointments />} />
          <Route path="/dashboard/tracking" element={<CustomerTracking />} />
          <Route path="/dashboard/reviews" element={<CustomerReviews />} />
          <Route path="/dashboard/profile" element={<CustomerProfile />} />
          <Route path="/dashboard/share-ink" element={<ShareInk />} />

          {/* Studio / artist dashboard */}
          <Route path="/studio" element={<StudioHome />} />
          <Route path="/studio/tattoos" element={<MyTattoos />} />
          <Route path="/studio/add-tattoo" element={<AddTattoo />} />
          <Route path="/studio/give-offer" element={<GiveOffer />} />
          <Route path="/studio/offers" element={<MyOffers />} />
          <Route path="/studio/tracking" element={<StudioTracking />} />
          <Route path="/studio/calendar" element={<StudioCalendar />} />
          <Route path="/studio/campaigns" element={<StudioCampaigns />} />
          <Route path="/studio/artists" element={<StudioArtists />} />
          <Route path="/studio/materials" element={<StudioMaterials />} />
          <Route path="/studio/reviews" element={<StudioReviews />} />
          <Route path="/studio/messages" element={<StudioMessages />} />
          <Route path="/studio/notifications" element={<StudioNotifications />} />
          <Route path="/studio/stats" element={<StudioStats />} />
          <Route path="/studio/profile" element={<StudioProfile />} />

          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
