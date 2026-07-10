import type { TattooStyle } from '../data/types';

/**
 * Typed client for the marketplace API. All requests are same-origin and
 * carry the httpOnly session cookie automatically. Every helper throws
 * ApiError with the server's message on non-2xx, so pages can show it.
 */

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });
  // A dev server without the API answers /api/* with the SPA's HTML page and
  // status 200 — treating that as success once crashed the dashboards blank.
  // Only a JSON response counts; anything else is a hard error.
  const isJson = (res.headers.get('content-type') ?? '').includes('application/json');
  if (!isJson) throw new ApiError(res.status, 'API unavailable — run the deployed site or the dev proxy');
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, (data as { error?: string }).error ?? `HTTP ${res.status}`);
  return data as T;
}

/* ---------- auth ---------- */

export interface Me {
  id: string;
  name: string;
  email?: string;
  role: 'customer' | 'artist' | 'studio';
  city?: string;
  bio?: string;
  styles?: string[];
  emailVerified?: boolean;
  district?: string;
  publicAddressLabel?: string;
  latitude?: number;
  longitude?: number;
  isPublicLocation?: boolean;
  hasPublicLocation?: boolean;
  providerStatus?: 'active' | 'pending_profile' | 'needs_review' | 'suspended';
  createdAt: string;
}

export interface ProfileUpdate {
  name?: string;
  bio?: string;
  city?: string;
  styles?: string[];
  district?: string;
  publicAddressLabel?: string;
  latitude?: number;
  longitude?: number;
  isPublicLocation?: boolean;
}

export const auth = {
  me: () => call<Me>('/api/auth'),
  register: (input: { email: string; password: string; name: string; role: Me['role']; city?: string; bio?: string; styles?: string[] }) =>
    call<Me>('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'register', ...input }) }),
  login: (email: string, password: string) =>
    call<Me>('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'login', email, password }) }),
  logout: () => call<{ ok: true }>('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'logout' }) }),
  verifyEmail: (token: string) =>
    call<{ ok: true }>('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'verify-email', token }) }),
  resendVerification: () =>
    call<{ ok: true }>('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'resend-verification' }) }),
  requestReset: (email: string) =>
    call<{ ok: true }>('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'request-reset', email }) }),
  resetPassword: (token: string, password: string) =>
    call<{ ok: true }>('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'reset-password', token, password }) }),
  updateProfile: (input: ProfileUpdate) =>
    call<Me>('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'update-profile', ...input }) }),
};

/* ---------- notifications ---------- */

export interface ApiNotification {
  id: string;
  kind: string;
  title: string;
  body: string;
  read: boolean;
  ts: number;
}

export const notifications = {
  list: () => call<ApiNotification[]>('/api/notifications'),
};

/* ---------- requests ---------- */

export interface ApiRequest {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  style: TattooStyle | string;
  placement: string;
  size: string;
  color: string;
  city?: string;
  budgetMin?: number;
  budgetMax?: number;
  referenceUrl?: string;
  status: 'open' | 'booked' | 'completed' | 'cancelled';
  offerCount: number;
  createdAt: string;
  ts: number;
}

export const requests = {
  list: () => call<ApiRequest[]>('/api/requests'),
  get: (id: string) => call<ApiRequest>(`/api/requests?id=${encodeURIComponent(id)}`),
  create: (input: {
    title: string; description: string; style: string; placement: string; size: string; color: string;
    city?: string; budgetMin?: number; budgetMax?: number; imageData?: string;
  }) => call<ApiRequest>('/api/requests', { method: 'POST', body: JSON.stringify(input) }),
  cancel: (id: string) => call<{ ok: true }>('/api/requests', { method: 'PATCH', body: JSON.stringify({ id, action: 'cancel' }) }),
};

/* ---------- offers ---------- */

export interface ApiOffer {
  id: string;
  requestId: string;
  requestTitle: string;
  artistId: string;
  artistName: string;
  customerId: string;
  customerName: string;
  price: number;
  message: string;
  appointmentAt?: string;
  status: 'sent' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  ts: number;
}

export const offers = {
  list: () => call<ApiOffer[]>('/api/offers'),
  create: (input: { requestId: string; price: number; message: string; appointmentAt?: string }) =>
    call<ApiOffer>('/api/offers', { method: 'POST', body: JSON.stringify(input) }),
  act: (id: string, action: 'accept' | 'reject' | 'complete') =>
    call<ApiOffer>('/api/offers', { method: 'PATCH', body: JSON.stringify({ id, action }) }),
};

/* ---------- messages ---------- */

export interface ApiThread {
  peerId: string;
  peerName: string;
  peerRole: string;
  lastText: string;
  lastTs: number;
}

export interface ApiMessage {
  id: string;
  threadId: string;
  fromId: string;
  fromName: string;
  toId: string;
  text: string;
  ts: number;
}

export const messages = {
  threads: () => call<ApiThread[]>('/api/messages'),
  thread: (withId: string) => call<ApiMessage[]>(`/api/messages?with=${encodeURIComponent(withId)}`),
  send: (toUserId: string, text: string) =>
    call<ApiMessage>('/api/messages', { method: 'POST', body: JSON.stringify({ toUserId, text }) }),
};

/* ---------- reviews ---------- */

export interface ApiReview {
  id: string;
  offerId: string;
  requestTitle: string;
  artistId: string;
  customerId: string;
  customerName: string;
  rating: number;
  text: string;
  createdAt: string;
  ts: number;
}

export const reviews = {
  mine: () => call<ApiReview[]>('/api/reviews'),
  byArtist: (artistId: string) => call<ApiReview[]>(`/api/reviews?artistId=${encodeURIComponent(artistId)}`),
  create: (input: { offerId: string; rating: number; text: string }) =>
    call<ApiReview>('/api/reviews', { method: 'POST', body: JSON.stringify(input) }),
};

/* ---------- artists directory ---------- */

export interface ApiArtist {
  id: string;
  name: string;
  role: 'artist' | 'studio';
  city?: string;
  district?: string;
  styles?: string[];
  bio?: string;
  createdAt: string;
  rating: number | null;
  reviewCount: number;
  hasPublicLocation: boolean;
  latitude?: number;
  longitude?: number;
  publicAddressLabel?: string;
  previewImages: string[];
  portfolioCount: number;
}

export interface ArtistFilters {
  city?: string;
  district?: string;
  q?: string;
}

export interface ApiArtistProfile {
  profile: ApiArtist & { completedJobs: number };
  portfolio: ApiPortfolioItem[];
  reviews: { id: string; rating: number; text: string; customerName: string; requestTitle: string; createdAt: string }[];
}

export const artists = {
  list: (f: ArtistFilters = {}) => {
    const p = new URLSearchParams();
    if (f.city) p.set('city', f.city);
    if (f.district) p.set('district', f.district);
    if (f.q) p.set('q', f.q);
    const qs = p.toString();
    return call<ApiArtist[]>(`/api/artists${qs ? `?${qs}` : ''}`);
  },
  get: (id: string) => call<ApiArtistProfile>(`/api/artists?id=${encodeURIComponent(id)}`),
};

/* ---------- dashboard aggregates ---------- */

export interface CustomerDashboard {
  role: 'customer';
  stats: { activeRequests: number; openOffers: number; upcoming: number; completed: number };
  recentRequests: ApiRequest[];
  recentOffers: ApiOffer[];
  threadCount: number;
}

export interface ArtistDashboard {
  role: 'artist';
  stats: {
    openRequests: number; offersSent: number; offersPending: number;
    jobsBooked: number; jobsCompleted: number; earnings: number;
    avgRating: number | null; reviewCount: number;
    portfolioApproved: number; portfolioPending: number;
  };
  recentRequests: ApiRequest[];
  recentOffers: ApiOffer[];
}

export const dashboard = {
  get: () => call<CustomerDashboard | ArtistDashboard>('/api/dashboard'),
};

/* ---------- portfolio (uploads) ---------- */

export interface ApiPortfolioItem {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  style: string;
  tags: string[];
  imageRatio: number;
  imageUrl: string;
  status?: 'pending' | 'approved';
  createdAt: string;
}

export const portfolio = {
  mine: () => call<ApiPortfolioItem[]>('/api/uploads?mine=1'),
  publish: (input: { title: string; style: string; tags: string[]; imageData: string; imageRatio: number }) =>
    call<ApiPortfolioItem>('/api/uploads', { method: 'POST', body: JSON.stringify(input) }),
};
