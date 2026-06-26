import { useMemo } from 'react';

// Eager raw imports so we don't network-fetch each icon at runtime.
const rawIcons = import.meta.glob('../assets/icons/icon-*.svg', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const logoRaw = (import.meta.glob('../assets/icons/logo.svg', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>);
const LOGO_KEY = Object.keys(logoRaw)[0] ?? '';
const LOGO_RAW: string = LOGO_KEY ? logoRaw[LOGO_KEY] : '';

export type IconName =
  | 'home'         // 05 ANA SAYFA
  | 'notifications'// 03 BİLDİRİMLER
  | 'messages'     // 04 MESAJ KUTUSU
  | 'cart'         // 06 SEPET
  | 'location'     // 08 KONUM
  | 'search'       // 09 ARAMA
  | 'settings'     // 10 AYARLAR
  | 'editProfile'  // 11 PROFİL DÜZENLE
  | 'addPerson'    // 12 KİŞİ EKLEME
  | 'share'        // 13 PAYLAŞ
  | 'privacy'      // 14 GİZLİLİK
  | 'like'         // 15 BEĞENME
  | 'giveOffer'    // 16 TEKLİF VER
  | 'upload'       // 17 FOTOĞRAF/YÜKLEME
  | 'data'         // 18 VERİ
  | 'wallet'       // 19 KREDİ KARTI VE CÜZDAN
  | 'add'          // 20 EKLEME
  | 'general1'     // 02
  | 'general2'     // 07
  | 'general3'     // 21
  | 'logo';

const ICON_MAP: Record<IconName, number | null> = {
  home: 5,
  notifications: 3,
  messages: 4,
  cart: 6,
  location: 8,
  search: 9,
  settings: 10,
  editProfile: 11,
  addPerson: 12,
  share: 13,
  privacy: 14,
  like: 15,
  giveOffer: 16,
  upload: 17,
  data: 18,
  wallet: 19,
  add: 20,
  general1: 2,
  general2: 7,
  general3: 21,
  logo: null,
};

function sanitize(svg: string): string {
  let out = svg;
  // strip XML / comments
  out = out.replace(/<\?xml[^>]*\?>/g, '');
  out = out.replace(/<!--[\s\S]*?-->/g, '');
  // strip every <text> tag (it carries Turkish labels)
  out = out.replace(/<text[\s\S]*?<\/text>/g, '');
  // strip style block — we'll override inline
  out = out.replace(/<style[\s\S]*?<\/style>/g, '');
  // remove class attributes since style block is gone
  out = out.replace(/\sclass="[^"]*"/g, '');
  // normalise red accents → currentColor
  out = out.replace(/#ED1C3D|#ED1940|#ED1C26/gi, 'currentColor');
  // recolor any explicit blacks → currentColor
  out = out.replace(/#020203|#020202|#030403|#070A07|#0B0E0A|#040504|#080808|#090706|#070605|#0A0807|#0A0505|#070404|#030202|#070505|#040406|#0A0807|#040407/gi, 'currentColor');
  out = out.replace(/#A5A4A4|#777777|#F4F4F5|#F9F9FA/gi, 'currentColor');
  // any remaining stroke="#000000" / fill="#000000"
  out = out.replace(/(stroke|fill)="#000000"/gi, '$1="currentColor"');
  out = out.replace(/(stroke|fill)="#FFFFFF"/gi, '$1="transparent"');
  // narrow the viewBox to crop out the text label area
  out = out.replace(/viewBox="[^"]+"/, 'viewBox="240 100 380 360"');
  // ensure we have width=100% height=100% on root
  out = out.replace(/<svg([^>]*)\swidth="[^"]*"/, '<svg$1');
  out = out.replace(/<svg([^>]*)\sheight="[^"]*"/, '<svg$1');
  // re-apply default stroke/fill rendering and currentColor at root
  out = out.replace(/<svg/, '<svg fill="currentColor" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" preserveAspectRatio="xMidYMid meet"');
  return out;
}

function pickRaw(num: number): string {
  const key = Object.keys(rawIcons).find(k => k.endsWith(`icon-${String(num).padStart(2, '0')}.svg`));
  return key ? rawIcons[key] : '';
}

interface Props {
  name: IconName;
  size?: number | string;
  inheritColor?: boolean;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 22, inheritColor = true, style }: Props) {
  const html = useMemo(() => {
    if (name === 'logo') return sanitizeLogo(LOGO_RAW);
    const num = ICON_MAP[name];
    if (num == null) return '';
    return sanitize(pickRaw(num));
  }, [name]);

  const s = typeof size === 'number' ? `${size}px` : size;
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block', width: s, height: s, lineHeight: 0,
        color: inheritColor ? 'currentColor' : 'var(--ink)',
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function sanitizeLogo(svg: string): string {
  let out = svg;
  out = out.replace(/<\?xml[^>]*\?>/g, '');
  out = out.replace(/<!--[\s\S]*?-->/g, '');
  out = out.replace(/<text[\s\S]*?<\/text>/g, '');
  out = out.replace(/<style[\s\S]*?<\/style>/g, '');
  out = out.replace(/\sclass="[^"]*"/g, '');
  out = out.replace(/#020203|#020202|#040504|#070A07|#0B0E0A|#080808|#090706|#070605|#0A0807|#0A0505|#070404|#030202|#070505/gi, 'currentColor');
  out = out.replace(/(stroke|fill)="#000000"/gi, '$1="currentColor"');
  // crop tight to the mark
  out = out.replace(/viewBox="[^"]+"/, 'viewBox="305 195 215 205"');
  out = out.replace(/<svg([^>]*)\swidth="[^"]*"/, '<svg$1');
  out = out.replace(/<svg([^>]*)\sheight="[^"]*"/, '<svg$1');
  out = out.replace(/<svg/, '<svg fill="currentColor" stroke="currentColor" preserveAspectRatio="xMidYMid meet"');
  return out;
}
