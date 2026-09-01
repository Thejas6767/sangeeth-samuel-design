export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,500;0,700;0,900;1,900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

export const C = {
  black: '#0A0A09',
  white: '#F2F1EC',
  grey: '#8C8C87',
  metal: '#C9C7BC',
  line: '#232320',
  lineLight: '#DEDCD3',
  creamBg: '#F2F1EC',
} as const;

export const FONT_DISPLAY = "'Archivo', sans-serif";
export const FONT_BODY = "'Inter', sans-serif";
export const FONT_MONO = "'JetBrains Mono', monospace";

export const TOTAL_FRAMES = 167;

export const NAV_LINKS = [
  { label: 'WORK', href: '#work', progress: 0.49 },
  { label: 'PROCESS', href: '#process', progress: 0.69 },
  { label: 'FOUNDER', href: '#founder', progress: 0.83 },
  { label: 'CONTACT', href: '#contact', progress: 0.93 },
] as const;

export const SCROLL_TIMELINE = {
 HERO: { start: 0.00, mid: 0.04, end: 0.085 },
MANIFESTO: { start: 0.085, mid: 0.16, end: 0.25 },
  BRANDS: { start: 0.27, mid: 0.33, end: 0.39 },
  ARCHIVE: { start: 0.42, mid: 0.50, end: 0.58 },
  PROCESS: { start: 0.61, mid: 0.69, end: 0.76 },
  FOUNDER: { start: 0.79, mid: 0.835, end: 0.875 },
  CONTACT: { start: 0.90, mid: 0.935, end: 0.965 },
  LOGO_END: { start: 0.975, mid: 0.988, end: 1.00 },
} as const;

export const LAYOUT = {
  maxWidth: 'max-w-[1440px]',
  sectionPadding: 'py-24 md:py-40',
  sectionPaddingSm: 'py-20 md:py-28',
  containerPadding: 'px-6 md:px-12 lg:px-16',
  gap: 'gap-12 md:gap-20',
} as const;
