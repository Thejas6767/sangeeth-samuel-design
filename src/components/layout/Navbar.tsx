import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  type Variants,
} from 'framer-motion';

import {
  FONT_DISPLAY,
  FONT_MONO,
  NAV_LINKS,
} from '../shared/constants';

import logoImg from '../../assets/logo/logo.webp';
import { playSound } from '../../utils/audioEngine';

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ease = [0.76, 0, 0.24, 1] as const;

export function Navbar({
  menuOpen,
  setMenuOpen,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [lightSection, setLightSection] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 24);

      const container =
        document.getElementById('cinematic-container');

      if (!container) {
        setLightSection(false);
        return;
      }

      const distance =
        container.offsetHeight - window.innerHeight;

      if (distance <= 0) {
        setLightSection(false);
        return;
      }

      const progress =
        (scrollY - container.offsetTop) / distance;

      setLightSection(progress >= 0.90);
    };

    onScroll();

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true },
    );

    window.addEventListener(
      'resize',
      onScroll,
    );

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll,
      );

      window.removeEventListener(
        'resize',
        onScroll,
      );
    };
  }, []);

  const scrollToProgress = (progress: number) => {
    const container =
      document.getElementById(
        'cinematic-container',
      );

    if (!container) return;

    const distance =
      container.offsetHeight -
      window.innerHeight;

    const target =
      container.offsetTop +
      progress * distance;

    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            y: number,
            options?: object,
          ) => void;
        };
      }
    ).__lenis;

    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.05,
      });
    } else {
      window.scrollTo({
        top: target,
        behavior: 'smooth',
      });
    }
  };

  const desktopVariants: Variants = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.18,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      y: -10,
      opacity: 0,
    },

    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease,
      },
    },
  };

  const mobileVariants: Variants = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },

    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const mobileItemVariants: Variants = {
    hidden: {
      y: 24,
      opacity: 0,
    },

    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease,
      },
    },

    exit: {
      y: 12,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease,
      },
    },
  };

  /* DESKTOP PILL CONTAINER STYLING */
  const desktopPillStyle = lightSection
    ? 'md:border-black/25 md:bg-[#F2F1EC]/95 md:text-black md:shadow-xl md:backdrop-blur-2xl'
    : 'md:border-white/30 md:bg-[#0A0A09]/95 md:text-white md:shadow-2xl md:backdrop-blur-2xl';

  const navTextClass = lightSection
    ? 'text-black hover:text-black/70'
    : 'text-white hover:text-white/70';

  return (
    <>
      <motion.header
        layout
        initial={{
          y: -40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease,
        }}
        className="
          fixed
          inset-x-0
          top-0
          z-50
          mx-auto
          flex
          w-full
          max-w-full
          justify-center
          overflow-x-hidden
          px-4
          pt-4
          sm:px-6
          md:px-10
        "
      >
        {/* NAVBAR CONTAINER */}
        <motion.div
          animate={{
            scale: scrolled && !menuOpen ? 0.98 : 1,
          }}
          transition={{
            duration: 0.4,
            ease,
          }}
          className={`
            relative
            flex
            w-full
            max-w-4xl
            items-center
            justify-between
            bg-transparent
            px-2
            py-1
            transition-all
            duration-500
            md:rounded-full
            md:border
            md:px-8
            md:py-2.5
            ${desktopPillStyle}
          `}
        >
          {/* LOGO */}
          <button
            type="button"
            onClick={() => {
              playSound('click');

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            className="
              relative
              z-10
              flex
              shrink-0
              items-center
              justify-center
              py-1
              focus-premium
            "
            aria-label="Sangeeth Samuel Design Home"
          >
            <motion.img
              src={logoImg}
              alt="Sangeeth Samuel Design"
              style={{
                filter: lightSection
                  ? 'var(--logo-filter, brightness(200%) contrast(100%))'
                  : 'brightness(200%) contrast(100%)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease,
              }}
              className="
                h-8
                w-auto
                max-w-[140px]
                object-contain
                opacity-100
                [--logo-filter:brightness(200%)_contrast(100%)]
                sm:h-10
                sm:max-w-[160px]
                md:h-12
                md:max-w-[200px]
                md:[--logo-filter:brightness(0)]
              "
            />
          </button>

          {/* DESKTOP NAVIGATION */}
          <motion.nav
            variants={desktopVariants}
            initial="hidden"
            animate="show"
            onMouseLeave={() => setHoveredIndex(null)}
            className="
              relative
              hidden
              items-center
              gap-1
              md:flex
              lg:gap-2
            "
          >
            {NAV_LINKS.map((link, idx) => (
              <motion.button
                key={link.label}
                variants={itemVariants}
                type="button"
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => {
                  playSound('click');
                  scrollToProgress(
                    link.progress,
                  );
                }}
                className={`
                  relative
                  z-10
                  rounded-full
                  px-4
                  py-2
                  font-mono
                  text-[11px]
                  font-semibold
                  tracking-[0.22em]
                  transition-colors
                  duration-300
                  focus-premium
                  ${navTextClass}
                `}
                style={{
                  fontFamily: FONT_MONO,
                }}
              >
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="hoverPill"
                    className={`
                      absolute
                      inset-0
                      z-[-1]
                      rounded-full
                      ${
                        lightSection
                          ? 'bg-black/15'
                          : 'bg-white/20 backdrop-blur-sm'
                      }
                    `}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <span>{link.label}</span>
              </motion.button>
            ))}
          </motion.nav>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease,
            }}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
              text-[#F2F1EC]
              backdrop-blur-md
              md:hidden
              focus-premium
            "
            style={{
              color: lightSection ? 'var(--btn-color, #F2F1EC)' : '#F2F1EC',
            }}
            aria-label={
              menuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            onClick={() => {
              playSound('click');
              setMenuOpen(
                (v) => !v,
              );
            }}
          >
            {menuOpen ? (
              <X
                size={20}
                strokeWidth={2}
              />
            ) : (
              <Menu
                size={20}
                strokeWidth={2}
              />
            )}
          </motion.button>
        </motion.div>
      </motion.header>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              fixed
              inset-0
              z-40
              flex
              w-full
              max-w-full
              flex-col
              justify-center
              overflow-hidden
              bg-[#0A0A09]/98
              px-8
              backdrop-blur-2xl
              sm:px-14
            "
          >
            <motion.nav
              variants={mobileVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="
                mx-auto
                flex
                w-full
                max-w-lg
                flex-col
                gap-4
              "
            >
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.label}
                  variants={mobileItemVariants}
                  type="button"
                  whileHover={{ x: 8 }}
                  onClick={() => {
                    playSound('click');
                    setMenuOpen(false);

                    setTimeout(
                      () =>
                        scrollToProgress(
                          link.progress,
                        ),
                      250,
                    );
                  }}
                  className="
                    border-b
                    border-white/10
                    py-4
                    text-left
                    text-[2.5rem]
                    font-black
                    leading-none
                    tracking-[-0.04em]
                    text-white
                    transition-colors
                    hover:text-white/70
                    focus-premium
                    sm:text-[3.5rem]
                  "
                  style={{
                    fontFamily: FONT_DISPLAY,
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.nav>

            <div
              className="
                absolute
                bottom-8
                left-8
                flex
                gap-6
                font-mono
                text-[9px]
                font-bold
                tracking-[0.18em]
                text-[#8C8C87]
                sm:left-14
              "
              style={{
                fontFamily: FONT_MONO,
              }}
            >
         
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}