import type { Lang } from '../data/types';

type Dict = Record<string, { en: string; tr: string }>;

export const dict: Dict = {
  // Brand & nav
  'brand.tagline':          { en: 'Find the right hand', tr: 'Doğru eli bulun' },
  'brand.tagline.sub':      { en: 'for permanent stories', tr: 'kalıcı hikâyeler için' },
  'brand.intro':            { en: 'A premium tattoo marketplace where customers share ideas and verified artists send custom offers.', tr: 'Müşterilerin fikirlerini paylaştığı, onaylı sanatçıların özel teklif gönderdiği premium dövme pazarı.' },

  'nav.howItWorks':         { en: 'How it works', tr: 'Nasıl çalışır' },
  'nav.artists':            { en: 'Artists', tr: 'Sanatçılar' },
  'nav.designs':            { en: 'Designs', tr: 'Tasarımlar' },
  'nav.categories':         { en: 'Categories', tr: 'Kategoriler' },
  'nav.login':              { en: 'Log in', tr: 'Giriş' },
  'nav.signup':             { en: 'Sign up', tr: 'Kayıt' },
  'nav.index':              { en: 'Index', tr: 'İçindekiler' },
  'nav.dashboard':          { en: 'Dashboard', tr: 'Panel' },

  'cta.createRequest':      { en: 'Create tattoo request', tr: 'Dövme isteği oluştur' },
  'cta.joinAsArtist':       { en: 'Join as artist', tr: 'Sanatçı olarak katıl' },
  'cta.sendOffer':          { en: 'Send offer', tr: 'Teklif gönder' },
  'cta.viewProfile':        { en: 'View profile', tr: 'Profili gör' },
  'cta.openRequest':        { en: 'Open request', tr: 'İsteği aç' },
  'cta.compareOffers':      { en: 'Compare offers', tr: 'Teklifleri karşılaştır' },

  // Hero badges
  'badge.verified':         { en: 'Verified artists', tr: 'Onaylı sanatçılar' },
  'badge.custom':           { en: 'Custom offers', tr: 'Özel teklifler' },
  'badge.booking':          { en: 'Appointment booking', tr: 'Randevu yönetimi' },

  // Sections
  'section.about':          { en: 'A curated tattoo marketplace', tr: 'Seçilmiş bir dövme pazarı' },
  'section.about.body':     { en: 'TattooGo connects considered clients with verified artists and studios. No bidding wars, no sponsored noise — only the offers that match your brief.', tr: 'TattooGo, özenli müşterileri onaylı sanatçı ve stüdyolarla buluşturur. Açık artırmalar ya da sponsorlu gürültü yok — yalnızca brief’inize uyan teklifler.' },
  'section.how':            { en: 'How it works', tr: 'Nasıl çalışır' },
  'how.01.title':           { en: 'Create request', tr: 'İstek oluştur' },
  'how.01.body':            { en: 'Describe the idea, choose style, placement and size, and share your references.', tr: 'Fikrinizi anlatın; stil, yerleşim ve boyut seçin, referanslarınızı paylaşın.' },
  'how.02.title':           { en: 'Receive offers', tr: 'Teklif alın' },
  'how.02.body':            { en: 'Verified artists and studios review your brief and send tailored offers with sketches.', tr: 'Onaylı sanatçı ve stüdyolar brief’inizi inceler ve eskizlerle özel teklif gönderir.' },
  'how.03.title':           { en: 'Compare artists', tr: 'Sanatçıları karşılaştırın' },
  'how.03.body':            { en: 'Read reviews, browse portfolios and message before choosing.', tr: 'Yorumları okuyun, portföyleri inceleyin ve seçmeden önce mesajlaşın.' },
  'how.04.title':           { en: 'Book appointment', tr: 'Randevu alın' },
  'how.04.body':            { en: 'Confirm the offer, agree on the date and walk into the studio prepared.', tr: 'Teklifi onaylayın, tarihte anlaşın ve stüdyoya hazır gidin.' },

  'section.styles':         { en: 'Tattoo styles', tr: 'Dövme stilleri' },
  'section.artists':        { en: 'Selected artists & studios', tr: 'Seçili sanatçılar ve stüdyolar' },
  'section.requests':       { en: 'Recent customer requests', tr: 'Güncel müşteri istekleri' },
  'section.trust':          { en: 'Trust the room you walk into', tr: 'Adım attığınız odaya güvenin' },
  'section.cta':            { en: 'Two ways to start', tr: 'Başlamanın iki yolu' },

  'trust.verified.title':   { en: 'Verified artists', tr: 'Onaylı sanatçılar' },
  'trust.verified.body':    { en: 'Identity and portfolio review before any artist can publish a profile.', tr: 'Profilini yayınlayan her sanatçı için kimlik ve portföy incelemesi.' },
  'trust.reviews.title':    { en: 'Honest reviews', tr: 'Dürüst yorumlar' },
  'trust.reviews.body':     { en: 'Only customers with confirmed appointments can leave a review.', tr: 'Yalnızca randevusu onaylanmış müşteriler yorum bırakabilir.' },
  'trust.booking.title':    { en: 'Tracked bookings', tr: 'Takip edilen randevular' },
  'trust.booking.body':     { en: 'Every offer, sketch and appointment lives in one timeline.', tr: 'Her teklif, eskiz ve randevu tek bir zaman çizelgesinde.' },
  'trust.hygiene.title':    { en: 'Hygiene & licensing', tr: 'Hijyen ve lisans' },
  'trust.hygiene.body':     { en: 'Studios publish their licensing and aftercare protocols.', tr: 'Stüdyolar lisans ve bakım protokollerini yayınlar.' },

  'footer.lockup':          { en: 'TattooGo · Permanent, considered.', tr: 'TattooGo · Kalıcı, özenli.' },

  // Dashboard nav (customer)
  'cust.home':              { en: 'Home', tr: 'Anasayfa' },
  'cust.requests':          { en: 'My requests', tr: 'İsteklerim' },
  'cust.offers':            { en: 'Offers received', tr: 'Alınan teklifler' },
  'cust.messages':          { en: 'Messages', tr: 'Mesajlar' },
  'cust.notifications':     { en: 'Notifications', tr: 'Bildirimler' },
  'cust.favorites':         { en: 'Favorites', tr: 'Favoriler' },
  'cust.appointments':      { en: 'Appointments', tr: 'Randevular' },
  'cust.tracking':          { en: 'Order tracking', tr: 'Sipariş takibi' },
  'cust.reviews':           { en: 'Reviews', tr: 'Yorumlar' },
  'cust.profile':           { en: 'Profile', tr: 'Profil' },
  'cust.createRequest':     { en: 'Create request', tr: 'İstek oluştur' },

  // Artist dashboard
  'art.home':               { en: 'Home', tr: 'Anasayfa' },
  'art.stats':              { en: 'Statistics', tr: 'İstatistik' },
  'art.addTattoo':          { en: 'Add tattoo', tr: 'Dövme ekle' },
  'art.giveOffer':          { en: 'Give offer', tr: 'Teklif ver' },
  'art.profile':            { en: 'Profile', tr: 'Profil' },
  'art.myTattoos':          { en: 'My tattoos', tr: 'Dövmelerim' },
  'art.reviews':            { en: 'Reviews', tr: 'Yorumlar' },
  'art.tracking':           { en: 'Order tracking', tr: 'Sipariş takibi' },
  'art.myOffers':           { en: 'My offers', tr: 'Tekliflerim' },
  'art.materials':          { en: 'Tattoo materials', tr: 'Dövme malzemeleri' },
  'art.myArtists':          { en: 'My artists', tr: 'Sanatçılarım' },
  'art.campaigns':          { en: 'My campaigns', tr: 'Kampanyalarım' },
  'art.calendar':           { en: 'Appointment calendar', tr: 'Randevu takvimi' },
  'art.messages':           { en: 'Messages', tr: 'Mesajlar' },
  'art.notifications':      { en: 'Notifications', tr: 'Bildirimler' },

  // Common
  'common.viewAll':         { en: 'View all', tr: 'Tümünü gör' },
  'common.search':          { en: 'Search', tr: 'Ara' },
  'common.save':            { en: 'Save', tr: 'Kaydet' },
  'common.cancel':          { en: 'Cancel', tr: 'İptal' },
  'common.accept':          { en: 'Accept', tr: 'Kabul et' },
  'common.reject':          { en: 'Reject', tr: 'Reddet' },
  'common.message':         { en: 'Message', tr: 'Mesaj' },
  'common.delete':          { en: 'Delete', tr: 'Sil' },
  'common.edit':            { en: 'Edit', tr: 'Düzenle' },
  'common.add':             { en: 'Add', tr: 'Ekle' },
  'common.from':            { en: 'from', tr: 'başlangıç' },
  'common.status':          { en: 'Status', tr: 'Durum' },
  'common.budget':          { en: 'Budget', tr: 'Bütçe' },
  'common.style':           { en: 'Style', tr: 'Stil' },
  'common.city':            { en: 'City', tr: 'Şehir' },
  'common.placement':       { en: 'Placement', tr: 'Yerleşim' },
  'common.size':            { en: 'Size', tr: 'Boyut' },
  'common.color':           { en: 'Color', tr: 'Renk' },
  'common.date':            { en: 'Date', tr: 'Tarih' },
  'common.price':           { en: 'Price', tr: 'Fiyat' },
  'common.duration':        { en: 'Duration', tr: 'Süre' },
  'common.validUntil':      { en: 'Valid until', tr: 'Geçerli' },
  'common.references':      { en: 'References', tr: 'Referans' },
  'common.upload':          { en: 'Upload', tr: 'Yükle' },
  'common.notes':           { en: 'Notes', tr: 'Notlar' },
  'common.uploadImage':     { en: 'Upload image', tr: 'Görsel yükle' },
  'common.selectImage':     { en: 'Select image', tr: 'Görsel seç' },
  'common.tagsHint':        { en: 'At least 3 tags', tr: 'En az 3 etiket' },
};

export function t(key: string, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}
