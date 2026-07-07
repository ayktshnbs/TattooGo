export type Lang = 'en' | 'tr';

export type TattooStyle =
  | 'fine-line'
  | 'realism'
  | 'minimal'
  | 'traditional'
  | 'blackwork'
  | 'geometric'
  | 'lettering'
  | 'color';

export type BodyPlacement =
  | 'arm' | 'forearm' | 'shoulder' | 'chest' | 'back' | 'leg' | 'thigh' | 'ankle' | 'hand' | 'neck' | 'ribs';

export type TattooSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ColorPreference = 'black' | 'shaded' | 'color';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'artist' | 'studio' | 'admin';
  avatar?: string;
  city?: string;
  joined: string;
}

export interface CustomerProfile extends User {
  role: 'customer';
  favoriteArtists: string[];
  favoriteDesigns: string[];
}

export interface ArtistProfile extends User {
  role: 'artist' | 'studio';
  handle: string;
  bio: string;
  verified: boolean;
  studioId?: string;
  rating: number;
  reviewCount: number;
  followers: number;
  styles: TattooStyle[];
  minPrice?: number;
  city: string;
  portfolio: string[];
  yearsActive: number;
}

export interface StudioProfile extends User {
  role: 'studio';
  handle: string;
  bio: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  city: string;
  artistIds: string[];
  cover: string;
  established: number;
}

export interface TattooDesign {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  style: TattooStyle;
  tags: string[];
  city?: string;
  price?: number;
  likes: number;
  views: number;
  imageRatio: number; // 0.6 .. 1.4
  swatch: string; // gradient swatch token
  imageUrl?: string; // real uploaded image (data URL in the prototype, CDN URL later)
  source?: 'artist' | 'customer'; // who submitted it — undefined for seeded mock data
  status?: 'pending' | 'approved'; // community uploads await moderation before going public
  createdAt: string;
}

export interface TattooRequest {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  style: TattooStyle;
  placement: BodyPlacement;
  size: TattooSize;
  color: ColorPreference;
  references: number; // mock count
  city: string;
  budgetMin: number;
  budgetMax: number;
  preferredDate?: string;
  status: 'open' | 'reviewing' | 'booked' | 'completed' | 'cancelled';
  offerCount: number;
  createdAt: string;
}

export interface Offer {
  id: string;
  requestId: string;
  artistId: string;
  artistName: string;
  artistCity: string;
  price: number;
  estimatedHours: number;
  appointmentAt: string;
  message: string;
  validUntil: string;
  designPreview?: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  rating: number;
  reviewCount: number;
  verified: boolean;
}

export interface Appointment {
  id: string;
  customerName: string;
  artistName: string;
  date: string;
  time: string;
  durationMin: number;
  location: string;
  status: 'upcoming' | 'today' | 'completed' | 'cancelled';
  requestTitle: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  date: string;
  artistName: string;
  tattooTitle: string;
}

export interface Message {
  id: string;
  conversationId: string;
  fromMe: boolean;
  authorName: string;
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  with: string;
  role: 'customer' | 'artist' | 'studio' | 'support';
  lastText: string;
  lastTime: string;
  unread: number;
}

export interface Notification {
  id: string;
  type: 'offer' | 'accepted' | 'rejected' | 'message' | 'appointment' | 'reminder' | 'review' | 'like' | 'follower' | 'campaign' | 'system';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  active: boolean;
  swatch: string;
}

export interface ArtistMember {
  id: string;
  name: string;
  role: string;
  styles: TattooStyle[];
  rating: number;
  joinedAt: string;
}

export interface MaterialProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: 'ink' | 'needle' | 'machine' | 'aftercare' | 'hygiene';
}
