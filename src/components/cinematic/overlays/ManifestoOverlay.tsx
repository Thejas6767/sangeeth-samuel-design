import {
  motion,
  type MotionValue,
  useTransform,
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

export function ManifestoOverlay({
  scrollYProgress,
}: Props) {
  const { start, end } = SCROLL_TIMELINE.MANIFESTO;

  // Simple fade + vertical movement for the entire section
  const opacity = useTransform(
    scrollYProgress,
    [
      start,
      start + 0.02,
      start + 0.04,
      end - 0.04,
      end - 0.02,
      end,
    ],
    [0, 1, 1, 1, 1, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [
      start,
      start + 0.02,
      start + 0.04,
      end - 0.04,
      end - 0.02,
      end,
    ],
    [24, 0, 0, 0, 0, -24],
  );

  const pointerEvents = useTransform(
    scrollYProgress,
    (p) =>
      p >= start && p < end
        ? 'auto'
        : 'none',
  );

  const display = useTransform(
    scrollYProgress,
    (p) =>
      p >= start && p < end
        ? 'flex'
        : 'none',
  );

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
        bg-transparent
        px-6
        py-20
        text-[#F2F1EC]
        sm:px-10
        md:px-12
        lg:px-16
      "
    >
      {/* CHAPTER */}
      <ChapterMark
        index={2}
        total={8}
        label="MANIFESTO"
        dark={false}
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
          gap-10
          lg:grid-cols-12
          lg:gap-16
        "
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="lg:col-span-3"
        >
          <Eyebrow dark={false}>
            MANIFESTO
          </Eyebrow>

          <div
            className="
              mt-4
              font-mono
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-[#8C8C87]
            "
            style={{
              fontFamily: FONT_MONO,
            }}
          >
            ATELIER PHILOSOPHY
          </div>
        </motion.div>

        {/* RIGHT */}
        <div className="lg:col-span-9">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 900,
              letterSpacing: '-0.045em',
              lineHeight: 0.94,
              fontSize: 'clamp(2.2rem, 5.4vw, 4.7rem)',
            }}
          >
            A TROPHY IS NOT AN
            <br />
            OBJECT.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="
              mt-8
              max-w-3xl
            "
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(15px, 1.65vw, 19px)',
              lineHeight: 1.7,
              color: 'rgba(242, 241, 236, 0.78)',
              fontWeight: 500,
            }}
          >
            We thought we should create
            trophies as precious as your
            memory — to help you cherish
            that priceless moment for a
            lifetime, and that which can
            last for eternity. We at 6t9th
            create 100% creative artwork
            that will not only be unique,
            but will also last you a
            lifetime.
          </motion.p>

          {/* BOTTOM INFORMATION */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="
              mt-12
              grid
              gap-10
              border-t
              border-white/20
              pt-8
              md:grid-cols-2
              lg:mt-16
              lg:gap-16
            "
          >
            {/* WHY US */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{
                duration: 0.35,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-3
                "
              >
                <motion.span
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.25 }}
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#F2F1EC]
                  "
                />

                <h3
                  className="
                    text-[11px]
                    font-extrabold
                    tracking-[0.18em]
                  "
                  style={{
                    fontFamily: FONT_DISPLAY,
                  }}
                >
                  WHY US
                </h3>
              </div>

              <p
                className="
                  text-sm
                  leading-7
                  text-white/70
                "
                style={{
                  fontFamily: FONT_BODY,
                }}
              >
                A trophy is a memorabilia,
                something you will cherish
                for a lifetime and maybe
                tell your future generation
                about the great moment and
                relive that time. But, with
                the market being so crowded
                with same looking trophies,
                the precious memory becomes
                a shared story from many
                cupboards.
              </p>
            </motion.div>

            {/* OUR MISSION */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{
                duration: 0.35,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-3
                "
              >
                <motion.span
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.25 }}
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#F2F1EC]
                  "
                />

                <h3
                  className="
                    text-[11px]
                    font-extrabold
                    tracking-[0.18em]
                  "
                  style={{
                    fontFamily: FONT_DISPLAY,
                  }}
                >
                  OUR MISSION
                </h3>
              </div>

              <p
                className="
                  text-sm
                  leading-7
                  text-white/70
                "
                style={{
                  fontFamily: FONT_BODY,
                }}
              >
                We are on a mission to
                make a difference the way
                people see momentous.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}