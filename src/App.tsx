import { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { CinematicScroll } from './components/cinematic/CinematicScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Preloader } from './components/layout/Preloader';
import { SkipLink } from './components/layout/SkipLink';
import { C, FONT_IMPORT } from './components/shared/constants';

export function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep these callbacks stable.
  // This prevents FrameCanvas from restarting its 167-image preload
  // every time loading progress changes.
  const handleLoadProgress = useCallback((pct: number) => {
    setLoadProgress(pct);
  }, []);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    (window as any).__lenis = lenis;

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <div
      style={{ background: C.black }}
      className="relative min-h-screen text-[#F2F1EC] selection:bg-[#F2F1EC] selection:text-[#0A0A09]"
    >
      <style>{`
        ${FONT_IMPORT}

        html {
          scroll-behavior: smooth;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #0A0A09;
        }

        a:focus-visible,
        button:focus-visible {
          outline: 1.5px solid #F2F1EC;
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      <SkipLink />

      <AnimatePresence>
        {!isLoaded && <Preloader progress={loadProgress} />}
      </AnimatePresence>

      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main id="main-content">
        <CinematicScroll
          onLoadProgress={handleLoadProgress}
          onLoaded={handleLoaded}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;