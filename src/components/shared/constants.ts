export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,500;0,700;0,900;1,900&family=Inter:wght@400;0,500;0,600;1,600&family=JetBrains+Mono:wght@400;0,500;0,600;1,500&display=swap');`;

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

/*
|--------------------------------------------------------------------------
| NAVIGATION
|--------------------------------------------------------------------------
*/

export const NAV_LINKS = [
  {
    label: 'WORK',
    href: '#work',
    progress: 0.55,
  },
  {
    label: 'PROCESS',
    href: '#process',
    progress: 0.735,
  },
  {
    label: 'FOUNDER',
    href: '#founder',
    progress: 0.845,
  },
  {
    label: 'CONTACT',
    href: '#contact',
    progress: 0.935,
  },
] as const;

/*
|--------------------------------------------------------------------------
| MASTER SCROLL TIMELINE
|--------------------------------------------------------------------------
|
| IMPORTANT:
|
| These are the ONLY section boundaries.
|
| 001–016  HERO
| 021–041  MANIFESTO
| 053–066  PARTNERS
| 067–069  TRANSITION TO ARCHIVE
| 070–100  ARCHIVE
| 103–130  METHODOLOGY
|
| 131–149  NEVER DISPLAYED
|
| 150–167  FINAL
|--------------------------------------------------------------------------
*/

export const SCROLL_TIMELINE = {
  HERO: {
    start: 0.00,
    mid: 0.05,
    end: 0.10,
  },

  MANIFESTO: {
    start: 0.12,
    mid: 0.185,
    end: 0.25,
  },

  BRANDS: {
    start: 0.27,
    mid: 0.335,
    end: 0.40,
  },

  /*
  |--------------------------------------------------------------------------
  | Long Archive
  |--------------------------------------------------------------------------
  |
  | Four projects share this entire range.
  | Each project therefore gets 6% of the
  | complete page scroll.
  |
  */

  ARCHIVE: {
    start: 0.43,
    mid: 0.55,
    end: 0.67,
  },

  /*
  |--------------------------------------------------------------------------
  | KEEP METHODOLOGY ON ITS WORKING RANGE.
  |--------------------------------------------------------------------------
  */

  PROCESS: {
    start: 0.69,
    mid: 0.735,
    end: 0.78,
  },

  /*
  |--------------------------------------------------------------------------
  | KEEP EVERYTHING AFTER THIS UNTOUCHED.
  |--------------------------------------------------------------------------
  */

  FOUNDER: {
    start: 0.80,
    mid: 0.845,
    end: 0.89,
  },

  CONTACT: {
    start: 0.90,
    mid: 0.935,
    end: 0.965,
  },

  LOGO_END: {
    start: 0.975,
    mid: 0.988,
    end: 1.00,
  },
} as const;

/*
|--------------------------------------------------------------------------
| FRAME RANGES
|--------------------------------------------------------------------------
|
| These are HUMAN frame numbers.
|
| FrameCanvas converts them to zero-based indexes.
|--------------------------------------------------------------------------
*/

export const CINEMATIC_FRAMES = {
  HERO: {
    start: 1,
    end: 16,
  },

  MANIFESTO: {
    start: 21,
    end: 41,
  },

  BRANDS: {
    start: 53,
    end: 66,
  },

  /*
  |--------------------------------------------------------------------------
  | TRANSITION TO ARCHIVE
  |--------------------------------------------------------------------------
  |
  | These frames previously created a black gap
  | between Partners and Archive.
  |
  | They now fill:
  |
  | 67 → 68 → 69
  |
  | Archive itself still starts at 70.
  |
  */

  TRANSITION_TO_ARCHIVE: {
    start: 67,
    end: 69,
  },

  ARCHIVE: {
    start: 70,
    end: 100,
  },

  PROCESS: {
    start: 103,
    end: 130,
  },

  /*
  |--------------------------------------------------------------------------
  | FINAL SEQUENCE
  |--------------------------------------------------------------------------
  |
  | Frames 131–149 are intentionally skipped.
  |
  */

  FINAL: {
    start: 150,
    end: 167,
  },
} as const;

export const LAYOUT = {
  maxWidth: 'max-w-[1440px]',
  sectionPadding: 'py-24 md:py-40',
  sectionPaddingSm: 'py-20 md:py-28',
  containerPadding: 'px-6 md:px-12 lg:px-16',
  gap: 'gap-12 md:gap-20',
} as const;