/**
 * Turkey-only location rules — backend validation copy.
 *
 * The platform serves Turkey exclusively: city must be one of the 81 official
 * provinces (canonical Turkish spelling, matching the frontend dropdowns in
 * src/data/cities.ts — keep the two lists in sync), and public map
 * coordinates must fall inside approximate Turkey bounds.
 */

export const TR_CITIES = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara',
  'Antalya', 'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman',
  'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa',
  'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne',
  'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun',
  'Gümüşhane', 'Hakkâri', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul', 'İzmir',
  'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri',
  'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kilis', 'Kocaeli', 'Konya',
  'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş',
  'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun',
  'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat',
  'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak',
] as const;

const TR_CITY_SET = new Set<string>(TR_CITIES);

export function isTurkishCity(city: string): boolean {
  return TR_CITY_SET.has(city);
}

/** Approximate bounding box of Turkey for public map pins. */
export const TR_BOUNDS = { latMin: 35.5, latMax: 42.5, lngMin: 25.5, lngMax: 45.0 };

export function isInTurkeyBounds(lat: number, lng: number): boolean {
  return lat >= TR_BOUNDS.latMin && lat <= TR_BOUNDS.latMax
    && lng >= TR_BOUNDS.lngMin && lng <= TR_BOUNDS.lngMax;
}
