import type {
  ArtistProfile, StudioProfile, TattooDesign, TattooRequest, Offer,
  Appointment, Review, Conversation, Message, Notification, Campaign,
  ArtistMember, MaterialProduct, TattooStyle
} from './types';

export const STYLES: { key: TattooStyle; en: string; tr: string }[] = [
  { key: 'fine-line',   en: 'Fine line',   tr: 'İnce çizgi' },
  { key: 'realism',     en: 'Realism',     tr: 'Realizm' },
  { key: 'minimal',     en: 'Minimal',     tr: 'Minimal' },
  { key: 'traditional', en: 'Traditional', tr: 'Geleneksel' },
  { key: 'blackwork',   en: 'Blackwork',   tr: 'Blackwork' },
  { key: 'geometric',   en: 'Geometric',   tr: 'Geometrik' },
  { key: 'lettering',   en: 'Lettering',   tr: 'Yazı' },
  { key: 'color',       en: 'Color',       tr: 'Renkli' },
];

export const CITIES = ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Eskişehir', 'Berlin', 'Amsterdam', 'Lisbon'];

export const ARTISTS: ArtistProfile[] = [
  { id: 'a1', role: 'artist', name: 'Aslı Vardar',     handle: '@asli.ink',       bio: 'Fine line botanical and quiet figurative.', verified: true,  rating: 4.9, reviewCount: 184, followers: 12400, styles: ['fine-line','minimal'],  minPrice: 1800, city: 'Istanbul', portfolio: ['p1','p2','p3','p4'], yearsActive: 7, email: 'asli@example.com', joined: '2021-04-12' },
  { id: 'a2', role: 'artist', name: 'Kerem Atıl',      handle: '@kerematil',      bio: 'Heavy blackwork and ornamental sleeves.',     verified: true,  rating: 4.8, reviewCount: 96,  followers: 8900,  styles: ['blackwork','geometric'], minPrice: 2400, city: 'Izmir',    portfolio: ['p5','p6','p7','p8'], yearsActive: 9, email: 'kerem@example.com', joined: '2020-02-01' },
  { id: 'a3', role: 'artist', name: 'Maya Hoekstra',   handle: '@maya.h',         bio: 'Single-needle micro realism, faces and hands.', verified: true, rating: 5.0, reviewCount: 212, followers: 21800, styles: ['realism','fine-line'], minPrice: 3200, city: 'Amsterdam', portfolio: ['p9','p10','p11','p12'], yearsActive: 11, email: 'maya@example.com', joined: '2019-08-15' },
  { id: 'a4', role: 'artist', name: 'Defne Selvi',     handle: '@defne.s',        bio: 'Soft minimalism, single sessions.',           verified: false, rating: 4.7, reviewCount: 51,  followers: 2400,  styles: ['minimal','lettering'], minPrice: 1200, city: 'Ankara',   portfolio: ['p13','p14','p15','p16'], yearsActive: 4, email: 'defne@example.com', joined: '2022-11-04' },
  { id: 'a5', role: 'artist', name: 'Joaquim Reis',    handle: '@reis.tattoo',    bio: 'Traditional Americana with painterly color.', verified: true,  rating: 4.8, reviewCount: 138, followers: 14200, styles: ['traditional','color'], minPrice: 2200, city: 'Lisbon',   portfolio: ['p17','p18','p19','p20'], yearsActive: 12, email: 'reis@example.com', joined: '2018-06-30' },
  { id: 'a6', role: 'artist', name: 'Su Karaca',       handle: '@su.karaca',      bio: 'Editorial lettering and quiet brushwork.',     verified: true,  rating: 4.9, reviewCount: 73,  followers: 6700,  styles: ['lettering','minimal'], minPrice: 1500, city: 'Istanbul', portfolio: ['p21','p22','p23','p24'], yearsActive: 5, email: 'su@example.com', joined: '2021-09-22' },
];

export const STUDIOS: StudioProfile[] = [
  { id: 's1', role: 'studio', name: 'Karanfil Atölye', handle: '@karanfil',  bio: 'Multi-artist studio in Karaköy. By appointment only.',
    verified: true, rating: 4.9, reviewCount: 412, city: 'Istanbul', artistIds: ['a1','a6'], cover: 'cover-1', established: 2018,
    email: 'studio@karanfil.example', joined: '2019-01-01' },
  { id: 's2', role: 'studio', name: 'Northbound Ink',  handle: '@northbound', bio: 'Blackwork-forward collective near Vondelpark.',
    verified: true, rating: 4.8, reviewCount: 287, city: 'Amsterdam', artistIds: ['a3'], cover: 'cover-2', established: 2016,
    email: 'studio@northbound.example', joined: '2018-05-20' },
];

const ratios = [1.0, 1.25, 0.85, 1.1, 0.95, 1.3, 0.8, 1.0, 1.2, 0.9, 1.15, 1.05];
export const DESIGNS: TattooDesign[] = Array.from({ length: 18 }).map((_, i) => {
  const artist = ARTISTS[i % ARTISTS.length];
  const style = artist.styles[0];
  const titles = ['Quiet Bloom','Ornament Line','Half Sleeve Study','Folded Hand','Phoenix Note','Pillar of Salt','Iris','Compass Glyph','Single Needle Portrait','Lettering No.4','Wave & Sun','Snake in Garden'];
  return {
    id: `d${i+1}`, title: titles[i % titles.length], artistId: artist.id, artistName: artist.name,
    style, tags: [style, artist.styles[1] ?? 'minimal', 'custom'],
    city: artist.city, price: artist.minPrice ? artist.minPrice + (i*150) : undefined,
    likes: 240 + i * 17, views: 1800 + i * 213,
    imageRatio: ratios[i % ratios.length], swatch: `sw-${(i % 6) + 1}`,
    createdAt: `2026-0${(i % 6) + 1}-1${(i % 9) + 1}`,
  };
});

export const REQUESTS: TattooRequest[] = [
  { id: 'r1', customerId: 'c1', customerName: 'Naz Y.', title: 'Fine line wildflower along forearm', description: 'Looking for a delicate single-needle floral piece, around 12cm on the inner forearm. No color, soft shading.', style: 'fine-line', placement: 'forearm', size: 'md', color: 'black', references: 3, city: 'Istanbul', budgetMin: 2500, budgetMax: 4000, preferredDate: '2026-07-18', status: 'reviewing', offerCount: 4, createdAt: '2026-06-20' },
  { id: 'r2', customerId: 'c1', customerName: 'Naz Y.', title: 'Ornamental blackwork shoulder cap', description: 'Geometric ornament cap on the shoulder, blending into upper arm. Open to artist interpretation.', style: 'blackwork', placement: 'shoulder', size: 'lg', color: 'black', references: 5, city: 'Istanbul', budgetMin: 5000, budgetMax: 8000, preferredDate: '2026-08-02', status: 'open', offerCount: 2, createdAt: '2026-06-22' },
  { id: 'r3', customerId: 'c2', customerName: 'Emir K.', title: 'Single line script — “mevsim”', description: 'Small single-line typography on inner bicep. About 8cm wide.', style: 'lettering', placement: 'arm', size: 'sm', color: 'black', references: 2, city: 'Ankara', budgetMin: 800, budgetMax: 1500, preferredDate: '2026-07-05', status: 'booked', offerCount: 6, createdAt: '2026-06-10' },
  { id: 'r4', customerId: 'c3', customerName: 'Lea S.', title: 'Realism portrait of late grandfather', description: 'Approximately A5 sized realism portrait, sepia tones, inner upper arm. Studio with private room preferred.', style: 'realism', placement: 'arm', size: 'lg', color: 'shaded', references: 6, city: 'Amsterdam', budgetMin: 9000, budgetMax: 14000, preferredDate: '2026-09-10', status: 'reviewing', offerCount: 3, createdAt: '2026-06-15' },
  { id: 'r5', customerId: 'c2', customerName: 'Emir K.', title: 'Minimal geometric ankle band', description: 'Thin geometric line work as an ankle band, ~2cm tall.', style: 'geometric', placement: 'ankle', size: 'sm', color: 'black', references: 2, city: 'Ankara', budgetMin: 600, budgetMax: 1200, status: 'completed', offerCount: 5, createdAt: '2026-05-29' },
];

export const OFFERS: Offer[] = [
  { id: 'o1', requestId: 'r1', artistId: 'a1', artistName: 'Aslı Vardar',   artistCity: 'Istanbul',  price: 3200, estimatedHours: 3, appointmentAt: '2026-07-22 14:00', message: 'Happy to design something quiet — I can prepare two directions ahead of the session.', validUntil: '2026-07-10', status: 'sent',     rating: 4.9, reviewCount: 184, verified: true },
  { id: 'o2', requestId: 'r1', artistId: 'a6', artistName: 'Su Karaca',     artistCity: 'Istanbul',  price: 2800, estimatedHours: 2.5, appointmentAt: '2026-07-19 11:00', message: 'I love the brief. I would lean toward a single-needle approach for delicacy.', validUntil: '2026-07-08', status: 'viewed',   rating: 4.9, reviewCount: 73,  verified: true },
  { id: 'o3', requestId: 'r1', artistId: 'a4', artistName: 'Defne Selvi',   artistCity: 'Ankara',    price: 2400, estimatedHours: 3, appointmentAt: '2026-07-25 16:00', message: 'Could travel to Istanbul for this. Available the last week of July.', validUntil: '2026-07-05', status: 'sent',     rating: 4.7, reviewCount: 51,  verified: false },
  { id: 'o4', requestId: 'r1', artistId: 'a3', artistName: 'Maya Hoekstra', artistCity: 'Amsterdam', price: 4200, estimatedHours: 4, appointmentAt: '2026-08-12 13:00', message: 'I could host you at the studio in Amsterdam — we can co-design the layout in our consult.', validUntil: '2026-07-20', status: 'accepted', rating: 5.0, reviewCount: 212, verified: true },
  { id: 'o5', requestId: 'r2', artistId: 'a2', artistName: 'Kerem Atıl',    artistCity: 'Izmir',     price: 6800, estimatedHours: 6, appointmentAt: '2026-08-15 11:00', message: 'Ornament work is my home. Happy to sketch three options.', validUntil: '2026-07-30', status: 'sent',     rating: 4.8, reviewCount: 96,  verified: true },
];

export const APPOINTMENTS: Appointment[] = [
  { id: 'ap1', customerName: 'Naz Y.',  artistName: 'Maya Hoekstra', date: '2026-08-12', time: '13:00', durationMin: 240, location: 'Northbound Ink, Amsterdam', status: 'upcoming', requestTitle: 'Fine line wildflower along forearm' },
  { id: 'ap2', customerName: 'Emir K.', artistName: 'Su Karaca',     date: '2026-07-05', time: '11:00', durationMin: 90,  location: 'Karanfil Atölye, Istanbul', status: 'upcoming', requestTitle: 'Single line script' },
  { id: 'ap3', customerName: 'Lea S.',  artistName: 'Aslı Vardar',   date: '2026-06-26', time: '15:30', durationMin: 120, location: 'Karanfil Atölye, Istanbul', status: 'today', requestTitle: 'Botanical wrist piece' },
  { id: 'ap4', customerName: 'Yiğit Ö.', artistName: 'Kerem Atıl',   date: '2026-05-12', time: '10:00', durationMin: 360, location: 'Atıl Studio, Izmir',        status: 'completed', requestTitle: 'Ornamental forearm' },
];

export const REVIEWS: Review[] = [
  { id: 'rv1', authorName: 'Naz Y.',  rating: 5, text: 'Maya was incredibly patient with the design rounds. The final piece sits like jewelry.', date: '2026-06-18', artistName: 'Maya Hoekstra', tattooTitle: 'Single needle iris' },
  { id: 'rv2', authorName: 'Emir K.', rating: 5, text: 'Asli took my rough sketch and turned it into something I will live with happily.',           date: '2026-06-04', artistName: 'Aslı Vardar',  tattooTitle: 'Quiet bloom' },
  { id: 'rv3', authorName: 'Lea S.',  rating: 4, text: 'Studio was spotless. Communication was excellent throughout.',                                 date: '2026-05-21', artistName: 'Kerem Atıl',  tattooTitle: 'Ornamental sleeve' },
  { id: 'rv4', authorName: 'Yiğit Ö.', rating: 5, text: 'Long session, never rushed. Will be back for the matching piece.',                            date: '2026-05-12', artistName: 'Kerem Atıl',  tattooTitle: 'Geometric forearm' },
];

export const CONVERSATIONS: Conversation[] = [
  { id: 'cv1', with: 'Maya Hoekstra', role: 'artist',  lastText: 'Sent two sketch directions — let me know which one feels closer.', lastTime: '2h', unread: 2 },
  { id: 'cv2', with: 'Aslı Vardar',   role: 'artist',  lastText: 'Confirming Saturday 14:00. Bring something to eat.', lastTime: '5h', unread: 0 },
  { id: 'cv3', with: 'Karanfil Atölye', role: 'studio', lastText: 'Front desk: parking is around the corner on Necatibey.', lastTime: '1d', unread: 0 },
  { id: 'cv4', with: 'TattooGo Support', role: 'support', lastText: 'Your verification is approved. Welcome.', lastTime: '3d', unread: 0 },
];

export const MESSAGES: Message[] = [
  { id: 'm1', conversationId: 'cv1', fromMe: false, authorName: 'Maya Hoekstra', text: 'Hey Naz — I had two ideas overnight. Sending sketches now.', time: '09:14' },
  { id: 'm2', conversationId: 'cv1', fromMe: true,  authorName: 'You',           text: 'Thank you. Excited to see them.', time: '09:21' },
  { id: 'm3', conversationId: 'cv1', fromMe: false, authorName: 'Maya Hoekstra', text: 'Sent two sketch directions — let me know which one feels closer.', time: '09:34' },
  { id: 'm4', conversationId: 'cv1', fromMe: true,  authorName: 'You',           text: 'Second one. Can we lengthen the stem slightly?', time: '10:02' },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'offer',       title: 'New offer from Maya Hoekstra',      body: '€4200 · Single needle iris',         time: '12m', read: false },
  { id: 'n2', type: 'message',     title: 'Aslı Vardar replied',                body: 'Confirming Saturday at 14:00.',      time: '38m', read: false },
  { id: 'n3', type: 'accepted',    title: 'Your offer was accepted',            body: 'Customer Naz Y. accepted your offer.', time: '2h', read: true },
  { id: 'n4', type: 'appointment', title: 'New appointment booked',             body: 'Aug 12 · 13:00 · Northbound Ink',    time: '4h', read: true },
  { id: 'n5', type: 'review',      title: 'You received a 5★ review',          body: '“Quiet, precise, lovely energy.”',   time: '1d', read: true },
  { id: 'n6', type: 'follower',    title: '124 new followers this week',        body: 'Your studio page is trending.',       time: '2d', read: true },
  { id: 'n7', type: 'campaign',    title: 'Studio campaign goes live',          body: 'Summer flash — 20% off until Aug 31.', time: '3d', read: true },
  { id: 'n8', type: 'system',      title: 'TattooGo updated terms',             body: 'Read the summary in your dashboard.', time: '5d', read: true },
];

export const CAMPAIGNS: Campaign[] = [
  { id: 'cp1', title: 'Summer flash sheet',  description: 'Pre-drawn small pieces, walk-in friendly. While slots last.', discount: 20, startDate: '2026-07-01', endDate: '2026-08-31', active: true,  swatch: 'sw-1' },
  { id: 'cp2', title: 'Returning client',    description: '15% off second piece booked within 90 days of first.',        discount: 15, startDate: '2026-06-01', endDate: '2026-12-31', active: true,  swatch: 'sw-3' },
  { id: 'cp3', title: 'Winter calligraphy week', description: 'A focused week of lettering bookings with Su.',           discount: 10, startDate: '2025-11-10', endDate: '2025-11-17', active: false, swatch: 'sw-4' },
];

export const ARTIST_MEMBERS: ArtistMember[] = [
  { id: 'am1', name: 'Aslı Vardar', role: 'Resident artist', styles: ['fine-line','minimal'], rating: 4.9, joinedAt: '2021-04-12' },
  { id: 'am2', name: 'Su Karaca',   role: 'Lettering specialist', styles: ['lettering','minimal'], rating: 4.9, joinedAt: '2022-01-08' },
  { id: 'am3', name: 'Hakan Yel',   role: 'Apprentice', styles: ['blackwork'], rating: 4.6, joinedAt: '2025-09-01' },
];

export const MATERIALS: MaterialProduct[] = [
  { id: 'mp1', name: 'Solid Ink — Lining Black',  brand: 'Solid Ink',     price: 320, stock: 14, category: 'ink' },
  { id: 'mp2', name: 'Cheyenne Hawk Pen',          brand: 'Cheyenne',      price: 8200, stock: 2,  category: 'machine' },
  { id: 'mp3', name: 'Round Liner 7RL — box of 20',brand: 'Kwadron',       price: 720, stock: 36, category: 'needle' },
  { id: 'mp4', name: 'Aftercare balm — 30ml',      brand: 'Hustle Butter', price: 240, stock: 48, category: 'aftercare' },
  { id: 'mp5', name: 'Barrier film roll',          brand: 'Saniderm',      price: 540, stock: 12, category: 'hygiene' },
];

export const CUSTOMER = {
  id: 'c1', name: 'Naz Y.', city: 'Istanbul',
  avatar: 'av-1',
};

export const SECTION_NUMBERS = {
  about: '01', how: '02', styles: '03', artists: '04', requests: '05', trust: '06', cta: '07',
};
