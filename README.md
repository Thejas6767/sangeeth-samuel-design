# Sangeeth Samuel Design (6t9th) — Cinematic Scroll

A monochrome, museum-grade portfolio for **Sangeeth Samuel Design**, built around a single scroll-controlled cinematic image sequence. The frame sequence is the visual spine; editorial sections appear as timed overlays while the user scrubs forward and backward through the sequence.

## Premium direction

The current pass focuses on restrained luxury rather than adding visual noise:

- strict monochrome palette from `src/components/shared/constants.ts`
- Archivo / Inter / JetBrains Mono typography hierarchy
- smaller editorial type with generous negative space
- thin rules, square technical controls, quiet glass surfaces
- subtle motion using Framer Motion's scroll-linked transforms
- refined Lenis easing and reduced scroll length on smaller screens
- no gold, neon, particles, fake metrics, or decorative widgets
- founder portrait remains grayscale and uses the supplied project asset
- final logo hold uses the supplied Sangeeth Samuel Design logo

## Core architecture

```
CinematicScroll
├── FrameCanvas                  # 167-frame canvas scrubber
├── HeroOverlay
├── ManifestoOverlay
├── BrandsOverlay
├── ArchiveOverlay
├── ProcessOverlay
├── FounderOverlay
├── ContactOverlay
└── LogoEndOverlay

Footer                          # normal document flow after the cinematic stage
```

The repository currently contains **167 JPEG frames rather than an MP4**. `FrameCanvas` therefore provides the same scroll-driven behavior by drawing the correct frame onto a high-DPI canvas. If an MP4/WebM is supplied later, the stage can be migrated to a video element without changing the overlay timeline.

## Scroll timeline

| Section | Scroll range | Frame approximation |
| --- | --- | --- |
| HERO | `0.00 → 0.09` | `001 → 015` |
| MANIFESTO | `0.12 → 0.24` | `020 → 040` |
| BRANDS | `0.27 → 0.39` | `046 → 065` |
| ARCHIVE | `0.42 → 0.58` | `071 → 097` |
| PROCESS | `0.61 → 0.76` | `103 → 127` |
| FOUNDER | `0.79 → 0.875` | `133 → 146` |
| CONTACT | `0.90 → 0.965` | `151 → 161` |
| LOGO END | `0.975 → 1.00` | `163 → 167` |

Change the ranges in `src/components/shared/constants.ts`. Navigation jump targets live in `NAV_LINKS` in the same file.

## Assets

- **Cinematic sequence:** `public/frames/ezgif-frame-001.jpg` → `ezgif-frame-167.jpg`
- **Founder portrait:** `public/owner.png`
- **Archive visuals:** `public/trophy1.png` → `public/trophy4.png`
- **Logo:** `src/assets/logo/logo.webp`
- **Other existing assets:** `src/assets/hero`, `src/assets/about`, `src/assets/process`

## Where to edit

- visual tokens / fonts / timeline: `src/components/shared/constants.ts`
- archive, partner and process data: `src/components/shared/types.ts`
- cinematic stage: `src/components/cinematic/CinematicScroll.tsx`
- frame renderer: `src/components/cinematic/FrameCanvas.tsx`
- overlay styling: `src/components/cinematic/overlays/*`
- navigation: `src/components/layout/Navbar.tsx`
- footer: `src/components/layout/Footer.tsx`
- global styling: `src/index.css`

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

The project is Vercel-ready as a standard Vite application.
