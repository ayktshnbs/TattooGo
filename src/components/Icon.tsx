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
  out = out.replace(/<\?xml[^>]*\?>/g, '');
  out = out.replace(/<!--[\s\S]*?-->/g, '');
  out = out.replace(/<text[\s\S]*?<\/text>/g, '');

  // Extract and inline the Illustrator CSS classes to preserve intended stroke-widths and overlapping fills
  const styleMatch = out.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (styleMatch) {
    const cssText = styleMatch[1];
    const rules: Record<string, string> = {};
    const regex = /\.([a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g;
    let match;
    while ((match = regex.exec(cssText)) !== null) {
      rules[match[1]] = match[2];
    }
    
    out = out.replace(/\sclass="([^"]+)"/g, (fullMatch, className) => {
      const classNames = className.split(' ');
      let inlineStyle = '';
      for (const cn of classNames) {
        if (rules[cn]) inlineStyle += rules[cn] + ';';
      }
      return inlineStyle ? ` style="${inlineStyle}"` : '';
    });
  }

  // Remove the style block now that it's inlined
  out = out.replace(/<style[\s\S]*?<\/style>/ig, '');

  // Map dark colors & accents to currentColor
  out = out.replace(/#020203|#020202|#030403|#070A07|#0B0E0A|#040504|#080808|#090706|#070605|#0A0807|#0A0505|#070404|#030202|#070505|#040406|#0A0807|#040407|#000000|#ED1C3D|#ED1940|#ED1C26|#A5A4A4|#777777/gi, 'currentColor');
  
  // Map light colors (used as masks/cutouts) to the background color variable
  out = out.replace(/#FFFFFF|#F9F9FA|#F4F4F5/gi, 'var(--icon-bg)');

  out = out.replace(/viewBox="[^"]+"/, 'viewBox="240 100 380 360"');
  out = out.replace(/<svg([^>]*)\swidth="[^"]*"/, '<svg$1');
  out = out.replace(/<svg([^>]*)\sheight="[^"]*"/, '<svg$1');
  out = out.replace(/<svg/, '<svg preserveAspectRatio="xMidYMid meet"');
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
  
  // FIX: The new logo exports as a white circle layered on top of a black circle.
  // When classes are stripped, both become currentColor (black), turning the logo into a solid blob.
  // We replace the two circles with a single compound donut path so the center is genuinely transparent.
  out = out.replace(/<circle[^>]+r="100\.3"\/>\s*<circle[^>]+r="77\.87"\/>/g, 
    '<path d="M 410.72 197.34 A 100.3 100.3 0 1 0 410.72 397.94 A 100.3 100.3 0 1 0 410.72 197.34 Z M 410.72 219.77 A 77.87 77.87 0 1 1 410.72 375.51 A 77.87 77.87 0 1 1 410.72 219.77 Z" />'
  );

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
