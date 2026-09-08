import {
  motion,
  type MotionValue,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';

import {
  FONT_BODY,
  FONT_DISPLAY,
  FONT_MONO,
  SCROLL_TIMELINE,
} from '../../shared/constants';

import { Eyebrow } from '../../shared/Eyebrow';
import { ChapterMark } from '../../shared/ChapterMark';

interface Props {
  scrollYProgress: MotionValue<number>;
}

const ease = [0.76, 0, 0.24, 1] as const;

export function FounderOverlay({
  scrollYProgress,
}: Props) {
  const {
    start,
    mid,
    end,
  } = SCROLL_TIMELINE.FOUNDER;

  /*
   * Main section transition
   */
  const opacity = useTransform(
    scrollYProgress,
    [
      start,
      start + 0.02,
      mid,
      end - 0.02,
      end,
    ],
    [0, 1, 1, 1, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [
      start,
      start + 0.02,
      mid,
      end - 0.02,
      end,
    ],
    [24, 0, 0, 0, -24],
  );

  const pointerEvents = useTransform(
    scrollYProgress,
    (p) =>
      p >= start && p <= end
        ? 'auto'
        : 'none',
  );

  const display = useTransform(
    scrollYProgress,
    (p) =>
      p >= start - 0.015 &&
      p <= end + 0.015
        ? 'flex'
        : 'none',
  );

  /*
   * Interactive 3D Card Hover Setup
   */
  const x = useMotionValue(0);
  const yRot = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(yRot, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    yRot.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    yRot.set(0);
  };

  return (
    <motion.div
      style={{
        opacity,
        pointerEvents,
        display,
      }}
      className="
        absolute
        inset-0
        z-30
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-[#0A0A09]
        px-6
        py-20
        sm:px-10
        md:px-12
        lg:px-16
      "
    >
      {/* CHAPTER MARK */}
      <ChapterMark
        index={6}
        total={8}
        label="FOUNDER"
        dark
        className="
          right-6
          top-6
          sm:right-10
          sm:top-8
          md:right-12
          lg:right-16
        "
      />

      {/* CONTENT */}
      <motion.div
        style={{ y }}
        className="
          mx-auto
          grid
          w-full
          max-w-[1440px]
          grid-cols-1
          items-center
          gap-10
          lg:grid-cols-[1.1fr_0.9fr]
          lg:gap-20
        "
      >
        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -18,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.65,
            delay: 0.05,
            ease,
          }}
        >
          <Eyebrow dark>
            THE MIND BEHIND THE OBJECT
          </Eyebrow>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.18,
              ease,
            }}
            className="
              mt-4
              text-[2rem]
              font-black
              leading-[0.93]
              tracking-[-0.045em]
              sm:mt-5
              sm:text-[3rem]
              md:text-[4rem]
            "
            style={{
              fontFamily: FONT_DISPLAY,
            }}
          >
            SANGEETH
            <br className="hidden sm:inline" />
            {' '}
            SAMUEL
          </motion.h2>

          <div
            className="
              mt-3
              flex
              items-center
              gap-2.5
              font-mono
              text-[9px]
              tracking-[0.2em]
              text-[#8C8C87]
            "
            style={{
              fontFamily: FONT_MONO,
            }}
          >
            <span className="h-1 w-1 bg-[#F2F1EC]" />
            FOUNDER & PRINCIPAL DESIGNER
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.18,
              ease,
            }}
            className="
              mt-6
              max-w-xl
              space-y-6
              sm:mt-8
            "
          >
            <p
              className="
                text-[13px]
                leading-6
                text-[#B0AFA7]
                sm:text-[14px]
              "
              style={{
                fontFamily: FONT_BODY,
              }}
            >
              Founded in 2020 out of Bangalore,
              Sangeeth Samuel set out to redefine
              the award industry. Frustrated by
              off-the-shelf catalog trophies, he
              envisioned trophies as physical art
              objects—sculptural milestones crafted
              specifically for the champion standing
              on the podium.
            </p>

            <blockquote
              className="
                border-l
                border-white/25
                pl-5
                sm:pl-6
              "
              style={{
                fontFamily: FONT_DISPLAY,
              }}
            >
              <p
                className="
                  text-[1.05rem]
                  font-semibold
                  leading-6
                  tracking-[-0.02em]
                  text-white
                  sm:text-[1.2rem]
                  sm:leading-7
                "
              >
                "A trophy isn't something you set
                on a shelf and forget — it's a piece
                of sculpture worth stopping for."
              </p>
            </blockquote>

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.3,
                ease,
              }}
              className="
                flex
                flex-wrap
                gap-2
                pt-1
              "
            >
              {[
                'EST. 2020',
                'BANGALORE ATELIER',
                'BESPOKE METALLURGY',
              ].map((badge) => (
                <span
                  key={badge}
                  className="
                    border
                    border-white/10
                    px-3
                    py-1.5
                    font-mono
                    text-[8px]
                    tracking-[0.17em]
                    text-[#8C8C87]
                  "
                  style={{
                    fontFamily: FONT_MONO,
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* FOUNDER IMAGE SECTION WITH 3D PARALLAX & SCANNER LIGHT */}
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease,
          }}
          className="
            mx-auto
            w-full
            max-w-[330px]
            lg:ml-auto
            [perspective:1000px]
          "
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="
              relative
              border
              border-white/15
              p-2
              sm:p-3
              group
              cursor-pointer
              transition-shadow
              duration-500
              hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)]
            "
          >
            {/* ANIMATED CORNER MARKS (DRAW EFFECT) */}
            <motion.div 
              initial={{ scaleX: 0, scaleY: 0 }}
              animate={{ scaleX: 1, scaleY: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease }}
              className="absolute -left-px -top-px h-8 w-8 border-l border-t border-white/80 origin-top-left" 
            />
            <motion.div 
              initial={{ scaleX: 0, scaleY: 0 }}
              animate={{ scaleX: 1, scaleY: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease }}
              className="absolute -right-px -top-px h-8 w-8 border-r border-t border-white/80 origin-top-right" 
            />
            <motion.div 
              initial={{ scaleX: 0, scaleY: 0 }}
              animate={{ scaleX: 1, scaleY: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease }}
              className="absolute -bottom-px -left-px h-8 w-8 border-b border-l border-white/80 origin-bottom-left" 
            />
            <motion.div 
              initial={{ scaleX: 0, scaleY: 0 }}
              animate={{ scaleX: 1, scaleY: 1 }}
              transition={{ delay: 0.45, duration: 0.5, ease }}
              className="absolute -bottom-px -right-px h-8 w-8 border-b border-r border-white/80 origin-bottom-right" 
            />

            <div 
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                bg-[#151513]
              "
              style={{ transform: 'translateZ(20px)' }}
            >
              {/* IMAGE UNMASK REVEAL */}
              <motion.img
                src="/owner.png"
                alt="Sangeeth Samuel - Founder & Principal Designer"
                loading="lazy"
                initial={{ scale: 1.25, filter: 'grayscale(100%) contrast(110%) brightness(0.8)' }}
                animate={{ scale: 1, filter: 'grayscale(100%) contrast(105%) brightness(1)' }}
                whileHover={{ scale: 1.08, filter: 'grayscale(20%) contrast(115%) brightness(1.05)' }}
                transition={{ duration: 0.7, ease }}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              {/* AMBIENT LIGHT STREAK / SCANNER ANIMATION */}
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: [0, 0.4, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 4,
                  duration: 1.8,
                  ease: 'easeInOut',
                  delay: 0.8,
                }}
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  w-1/2
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                "
              />

              {/* GRADIENT OVERLAY */}
              <div className="
                absolute
                inset-x-0
                bottom-0
                h-24
                bg-gradient-to-t
                from-[#0A0A09]/90
                to-transparent
                pointer-events-none
              " />

              {/* BADGE TEXT WITH POP-OUT PARALLAX */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease }}
                style={{ transform: 'translateZ(30px)' }}
                className="
                  absolute
                  bottom-3
                  left-3
                  right-3
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/15
                  pt-2
                  font-mono
                  text-[8px]
                  tracking-[0.16em]
                  text-white/80
                  backdrop-blur-[2px]
                "
              >
                <span>
                  SANGEETH SAMUEL
                </span>

                <span className="text-white/40">
                  BANGALORE
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}