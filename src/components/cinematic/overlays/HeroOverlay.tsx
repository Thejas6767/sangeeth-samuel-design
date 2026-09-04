import { motion, type MotionValue, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  FONT_DISPLAY,
  FONT_MONO,
  SCROLL_TIMELINE,
} from '../../shared/constants';

interface Props {
  scrollYProgress: MotionValue<number>;
}

export function HeroOverlay({ scrollYProgress }: Props) {
  const { start, end } = SCROLL_TIMELINE.HERO;

  // Simple section fade
  const opacity = useTransform(
    scrollYProgress,
    [start, end * 0.72, end],
    [1, 1, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [0, -34],
  );

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 0.985],
  );

  const pointerEvents = useTransform(
    scrollYProgress,
    (p) => (p <= end ? 'auto' : 'none'),
  );

  const display = useTransform(
    scrollYProgress,
    (p) => (p <= end + 0.02 ? 'flex' : 'none'),
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        pointerEvents,
        display,
      }}
      className="
        absolute
        inset-0
        z-30
        mx-auto
        flex
        w-full
        max-w-[1440px]
        flex-col
        justify-between
        px-6
        pb-8
        pt-24
        sm:px-10
        sm:pb-10
        sm:pt-28
        md:px-12
        lg:px-16
      "
    >
      {/* TOP BAR */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          pb-4
          font-mono
          text-[8px]
          tracking-[0.24em]
          text-white/45
          sm:text-[9px]
        "
      >
        
  
      </div>

      {/* MAIN CONTENT */}
      <motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    ease: [0.76, 0, 0.24, 1],
  }}
  className="my-auto max-w-5xl py-12 sm:py-16"
>

      <motion.p
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.7,
    delay: 0.1,
    ease: [0.76, 0, 0.24, 1],
  }}
  style={{ fontFamily: FONT_MONO }}
          className="
            mb-5
            text-[9px]
            uppercase
            tracking-[0.28em]
            text-white/50
            sm:mb-7
            sm:text-[10px]
          "
        >
          THE STANDARD OF EXCELLENCE
        </motion.p>

        <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    delay: 0.2,
    ease: [0.76, 0, 0.24, 1],
  }}
  className="max-w-4xl text-[#F2F1EC]"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 900,
            fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
            lineHeight: 0.91,
            letterSpacing: '-0.045em',
          }}
        >
          SCULPTED
          <br />
          MONUMENTS
          <br />
          OF PERFECT{' '}
          <span className="italic bg-gradient-to-r from-[#F2F1EC] to-[#8C8C87] bg-clip-text text-transparent">
            VICTORY.
          </span>
        </motion.h1>

        {/* MONOGRAM */}
        <motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.75,
    delay: 0.35,
    ease: [0.76, 0, 0.24, 1],
  }}
  className="mt-8 flex items-end gap-4 sm:mt-10"
>
       

          <div className="pb-0.5">
            <div className="font-mono text-[8px] tracking-[0.22em] text-white/35">
              MONOGRAM
            </div>

            <div
              className="
                mt-1
                text-[10px]
                font-medium
                tracking-[0.18em]
                text-white/75
                sm:text-xs
              "
              style={{ fontFamily: FONT_MONO }}
            >
              SANGEETH SAMUEL DESIGN
            </div>
          </div>
        </motion.div>
  
      </motion.div>

      {/* BOTTOM BAR */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <div
          className="
            font-mono
            text-[8px]
            tracking-[0.2em]
            text-white/35
            sm:text-[9px]
          "
        >
          SANGEETH SAMUEL DESIGN ©{new Date().getFullYear()}

                      <motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    duration: 0.7,
    delay: 0.45,
    ease: [0.76, 0, 0.24, 1],
  }}
  className="hidden sm:inline"
>
  BANGALORE · INDIA / GLOBAL
</motion.span>
        </div>

        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            flex
            items-center
            gap-2
            font-mono
            text-[8px]
            tracking-[0.22em]
            text-white/65
            sm:text-[9px]
          "
        >
          <span>SCROLL TO PROGRESS</span>
          <ChevronDown
            size={13}
            strokeWidth={1.25}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}