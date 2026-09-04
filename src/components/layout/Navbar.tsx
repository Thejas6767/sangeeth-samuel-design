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

  const navbarClass = lightSection
    ? `
      border
      border-black/10
      bg-[#F2F1EC]/55
      py-2.5
      backdrop-blur-xl
      rounded-2xl
    `
    : `
      border
      border-white/15
      bg-white/[0.035]
      py-2.5
      backdrop-blur-xl
      rounded-2xl
    `;

  const navTextClass = lightSection
    ? `
      text-black/60
      hover:text-black
    `
    : `
      text-white/65
      hover:text-white
    `;

  return (
    <>
      <motion.header
        initial={{
          y: -60,
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
          left-0
          right-0
          top-0
          z-50
          px-4
          py-3
          sm:px-6
          md:px-10
          lg:px-12
        "
      >
        <motion.div
          animate={{
            backgroundColor: lightSection
              ? 'rgba(242, 241, 236, 0.55)'
              : 'rgba(255, 255, 255, 0.035)',

            borderColor: lightSection
              ? 'rgba(0, 0, 0, 0.10)'
              : 'rgba(255, 255, 255, 0.15)',
          }}
          transition={{
            duration: 0.6,
            ease,
          }}
          className={`
            mx-auto
            flex
            max-w-[1440px]
            items-center
            justify-between
            px-3
            transition-all
            duration-700
            sm:px-4

            ${
              scrolled && !menuOpen
                ? navbarClass
                : 'py-2'
            }
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
              group
              flex
              items-center
              focus-premium
            "
            aria-label="Sangeeth Samuel Design Home"
          >
            <motion.img
              src={logoImg}
              alt="Sangeeth Samuel Design"
              animate={{
                filter: lightSection
                  ? 'brightness(0) saturate(100%)'
                  : 'brightness(1) saturate(100%)',
              }}
              transition={{
                duration: 0.5,
                ease,
              }}
              className="
                h-12
                w-auto
                scale-[1.35]
                origin-left
                object-contain
                opacity-95
                transition-opacity
                duration-500
                group-hover:opacity-100
                sm:h-14
                sm:scale-[1.35]
                md:h-16
                md:scale-[1.35]
              "
            />
          </button>

          {/* DESKTOP NAVIGATION */}
          <motion.nav
            variants={desktopVariants}
            initial="hidden"
            animate="show"
            className="
              hidden
              items-center
              gap-8
              md:flex
              lg:gap-10
            "
          >
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.label}
                variants={itemVariants}
                type="button"
                onClick={() => {
                  playSound('click');
                  scrollToProgress(
                    link.progress,
                  );
                }}
                className={`
                  group
                  relative
                  py-2
                  font-mono
                  text-[9px]
                  tracking-[0.2em]
                  transition-colors
                  duration-500
                  focus-premium
                  ${navTextClass}
                `}
                style={{
                  fontFamily: FONT_MONO,
                }}
              >
                {link.label}

                <motion.span
                  className={`
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-0
                    transition-all
                    duration-500
                    group-hover:w-full

                    ${
                      lightSection
                        ? 'bg-black'
                        : 'bg-white'
                    }
                  `}
                />
              </motion.button>
            ))}
          </motion.nav>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            type="button"
            animate={{
              color: lightSection
                ? '#0A0A09'
                : '#F2F1EC',

              borderColor: lightSection
                ? 'rgba(0, 0, 0, 0.12)'
                : 'rgba(255, 255, 255, 0.10)',
            }}
            transition={{
              duration: 0.5,
              ease,
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              md:hidden
              focus-premium
            "
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
                size={19}
                strokeWidth={1.2}
              />
            ) : (
              <Menu
                size={19}
                strokeWidth={1.2}
              />
            )}
          </motion.button>
        </motion.div>
      </motion.header>

      {/* MOBILE FULLSCREEN MENU */}
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
              flex-col
              justify-center
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
                text-[8px]
                tracking-[0.18em]
                text-[#8C8C87]
                sm:left-14
              "
              style={{
                fontFamily: FONT_MONO,
              }}
            >
              <a
                href="https://www.instagram.com/the6t9th/"
                target="_blank"
                rel="noreferrer"
                className="
                  transition-colors
                  hover:text-white
                "
              >
                INSTAGRAM
              </a>

              <a
                href="https://www.facebook.com/pages/category/Product-Service/6T9th-102211121649149/"
                target="_blank"
                rel="noreferrer"
                className="
                  transition-colors
                  hover:text-white
                "
              >
                FACEBOOK
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}