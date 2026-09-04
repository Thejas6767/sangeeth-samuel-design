import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';

const craftsmanship = [
  {
    number: '01',
    title: 'CONCEPT',
    text: 'Every commission begins with an idea shaped around the achievement, the sport, and the people behind the moment.',
  },
  {
    number: '02',
    title: 'SCULPTURE',
    text: 'Form is developed as an object of significance — balancing proportion, movement, identity, and presence.',
  },
  {
    number: '03',
    title: 'METALLURGY',
    text: 'Materials, finishes, textures, and detailing are considered together to create an object that feels substantial in the hand.',
  },
  {
    number: '04',
    title: 'FINISH',
    text: 'The final surface is refined until the object carries the precision expected from a championship moment.',
  },
];

const selectedWork = [
  {
    number: '01',
    category: 'MOTORSPORT',
    title: 'CHAMPIONSHIP',
    subtitle: 'BESPOKE TROPHY SYSTEM',
  },
  {
    number: '02',
    category: 'RALLY',
    title: 'RALLY SERIES',
    subtitle: 'SCULPTURAL AWARDS',
  },
  {
    number: '03',
    category: 'EVENT',
    title: 'MOMENTOUS',
    subtitle: 'BESPOKE RECOGNITION',
  },
];

const testimonials = [
  {
    quote:
      'The award should feel as important as the achievement itself.',
    role: 'CHAMPIONSHIP PRINCIPLE',
  },
  {
    quote:
      'A great trophy does not simply represent a victory. It preserves the memory of it.',
    role: 'ATELIER PHILOSOPHY',
  },
  {
    quote:
      'Every detail has a reason. Nothing is there simply to fill space.',
    role: 'DESIGN APPROACH',
  },
];

export function AtelierSections() {
  return (
    <div className="relative bg-[#0A0A09] text-[#F2F1EC]">

      {/* =========================================================
          CRAFTSMANSHIP
      ========================================================= */}

      <section
        id="craft"
        className="
          relative
          border-t
          border-white/[0.08]
          px-6
          py-28
          sm:px-10
          md:px-12
          md:py-40
          lg:px-16
        "
      >
        <div className="mx-auto max-w-[1440px]">

          {/* Header */}

          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-white/40" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    tracking-[0.28em]
                    text-white/40
                  "
                >
                  THE MAKING
                </span>
              </div>

              <h2
  className="
    max-w-5xl
    text-[2.8rem]
    font-black
    leading-[0.88]
    tracking-[0.02em]
    sm:text-[4rem]
    md:text-[5.5rem]
  "
                style={{
                  fontFamily: "'Archivo', sans-serif",
                }}
              >
                CRAFTED
                <br />
                TO OUTLIVE
                <br />
                THE MOMENT.
              </h2>
            </div>

            <div
              className="
                hidden
                pb-2
                font-mono
                text-[8px]
                tracking-[0.2em]
                text-white/30
                md:block
              "
            >
              01 / CRAFT
            </div>
          </div>

          {/* Intro */}

          <div className="mt-16 grid gap-10 border-t border-white/[0.08] pt-8 md:grid-cols-[0.8fr_1.2fr] md:mt-24">
            <div>
              <span
                className="
                  font-mono
                  text-[8px]
                  tracking-[0.22em]
                  text-white/35
                "
              >
                ATELIER STANDARD
              </span>
            </div>

            <p
              className="
                max-w-3xl
                text-[15px]
                leading-7
                text-white/55
                md:text-[17px]
                md:leading-8
              "
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              We approach a trophy as a piece of sculpture rather than
              a catalogue product. Every proportion, material and surface
              is considered around the significance of the achievement.
            </p>
          </div>

          {/* Craft cards */}

          <div className="mt-16 grid border-l border-white/[0.08] md:grid-cols-4">
            {craftsmanship.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="
                  group
                  min-h-[270px]
                  border-b
                  border-r
                  border-t
                  border-white/[0.08]
                  p-7
                  transition-colors
                  duration-500
                  hover:bg-white/[0.025]
                  md:min-h-[330px]
                "
              >
                <div className="flex items-center justify-between">
                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.2em]
                      text-white/30
                    "
                  >
                    {item.number}
                  </span>

                  <ArrowUpRight
                    size={15}
                    strokeWidth={1}
                    className="
                      text-white/20
                      transition-all
                      duration-500
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-white/70
                    "
                  />
                </div>

                <div className="mt-24 md:mt-32">
                  <h3
                    className="
                      text-[1.15rem]
                      font-bold
                      tracking-[-0.02em]
                    "
                    style={{
                      fontFamily:
                        "'Archivo', sans-serif",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-xs
                      text-[12px]
                      leading-5
                      text-white/40
                    "
                    style={{
                      fontFamily:
                        "'Inter', sans-serif",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          SELECTED WORK
      ========================================================= */}

      <section
        id="selected-work"
        className="
          relative
          border-t
          border-white/[0.08]
          px-6
          py-28
          sm:px-10
          md:px-12
          md:py-40
          lg:px-16
        "
      >
        <div className="mx-auto max-w-[1440px]">

          <div className="flex items-end justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-white/40" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    tracking-[0.28em]
                    text-white/40
                  "
                >
                  SELECTED WORK
                </span>
              </div>

              <h2
                className="
                  text-[2.8rem]
                  font-black
                  leading-[0.88]
                  tracking-[-0.05em]
                  sm:text-[4rem]
                  md:text-[5.5rem]
                "
                style={{
                  fontFamily:
                    "'Archivo', sans-serif",
                }}
              >
                OBJECTS
                <br />
                WITH
                <br />
                PRESENCE.
              </h2>
            </div>

            <span
              className="
                hidden
                pb-2
                font-mono
                text-[8px]
                tracking-[0.2em]
                text-white/30
                md:block
              "
            >
              02 / WORK
            </span>
          </div>

          {/* Work list */}

          <div className="mt-20 border-t border-white/[0.08]">

            {selectedWork.map((work, index) => (
              <motion.div
                key={work.number}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                }}
                className="
                  group
                  relative
                  flex
                  min-h-[150px]
                  items-center
                  justify-between
                  gap-8
                  border-b
                  border-white/[0.08]
                  py-8
                  transition-all
                  duration-500
                  hover:px-4
                  md:min-h-[190px]
                "
              >
                <div className="flex items-center gap-7 md:gap-12">

                  <span
                    className="
                      font-mono
                      text-[8px]
                      tracking-[0.2em]
                      text-white/25
                    "
                  >
                    {work.number}
                  </span>

                  <div>
                    <div
                      className="
                        mb-2
                        font-mono
                        text-[7px]
                        tracking-[0.24em]
                        text-white/30
                      "
                    >
                      {work.category}
                    </div>

                    <h3
                      className="
                        text-[2rem]
                        font-black
                        leading-none
                        tracking-[-0.04em]
                        sm:text-[3rem]
                        md:text-[4.5rem]
                      "
                      style={{
                        fontFamily:
                          "'Archivo', sans-serif",
                      }}
                    >
                      {work.title}
                    </h3>

                    <div
                      className="
                        mt-3
                        font-mono
                        text-[7px]
                        tracking-[0.2em]
                        text-white/25
                      "
                    >
                      {work.subtitle}
                    </div>
                  </div>

                </div>

                <div
                  className="
                    hidden
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    transition-all
                    duration-500
                    group-hover:border-white/50
                    md:flex
                  "
                >
                  <ArrowRight
                    size={16}
                    strokeWidth={1}
                    className="
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                    "
                  />
                </div>
              </motion.div>
            ))}

          </div>

          {/* Bottom statement */}

          <div className="mt-12 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <span
              className="
                font-mono
                text-[8px]
                tracking-[0.22em]
                text-white/30
              "
            >
              BESPOKE / NO MASS PRODUCTION
            </span>

            <span
              className="
                max-w-md
                text-[12px]
                leading-5
                text-white/35
                md:text-right
              "
            >
              Every commission is developed around its own story,
              identity and significance.
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================
          CLIENT WORDS
      ========================================================= */}

      <section
        id="words"
        className="
          relative
          border-t
          border-white/[0.08]
          px-6
          py-28
          sm:px-10
          md:px-12
          md:py-40
          lg:px-16
        "
      >
        <div className="mx-auto max-w-[1440px]">

          <div className="flex items-end justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-white/40" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    tracking-[0.28em]
                    text-white/40
                  "
                >
                  THE PHILOSOPHY
                </span>
              </div>

              <h2
                className="
                  max-w-4xl
                  text-[2.8rem]
                  font-black
                  leading-[0.88]
                  tracking-[-0.05em]
                  sm:text-[4rem]
                  md:text-[5.5rem]
                "
                style={{
                  fontFamily:
                    "'Archivo', sans-serif",
                }}
              >
                THE OBJECT
                <br />
                SHOULD
                <br />
                <span className="text-white/30">
                  MATTER.
                </span>
              </h2>
            </div>

            <span
              className="
                hidden
                pb-2
                font-mono
                text-[8px]
                tracking-[0.2em]
                text-white/30
                md:block
              "
            >
              03 / WORDS
            </span>
          </div>

          {/* Quotes */}

          <div className="mt-20 grid border-t border-white/[0.08] md:grid-cols-3">

            {testimonials.map((item, index) => (
              <motion.div
                key={item.role}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                className="
                  border-b
                  border-r
                  border-white/[0.08]
                  p-8
                  md:min-h-[360px]
                  md:p-10
                "
              >
                <span
                  className="
                    font-mono
                    text-[8px]
                    tracking-[0.2em]
                    text-white/25
                  "
                >
                  0{index + 1}
                </span>

                <blockquote
                  className="
                    mt-24
                    text-[1.35rem]
                    font-semibold
                    leading-[1.15]
                    tracking-[-0.025em]
                    text-white/85
                    md:text-[1.65rem]
                  "
                  style={{
                    fontFamily:
                      "'Archivo', sans-serif",
                  }}
                >
                  “{item.quote}”
                </blockquote>

                <div
                  className="
                    mt-8
                    font-mono
                    text-[7px]
                    tracking-[0.22em]
                    text-white/25
                  "
                >
                  {item.role}
                </div>
              </motion.div>
            ))}

          </div>

          {/* Closing line */}

          <div className="mt-20 border-t border-white/[0.08] pt-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <p
                className="
                  max-w-3xl
                  text-[1.4rem]
                  font-medium
                  leading-6
                  tracking-[-0.02em]
                  text-white/70
                  md:text-[2rem]
                  md:leading-8
                "
                style={{
                  fontFamily:
                    "'Archivo', sans-serif",
                }}
              >
                We don't make awards for shelves.
                We make objects worthy of the moment
                they represent.
              </p>

              <a
                href="#contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-4
                  self-start
                  border
                  border-white/15
                  px-5
                  py-4
                  font-mono
                  text-[8px]
                  tracking-[0.2em]
                  text-white/65
                  transition-all
                  duration-500
                  hover:border-white/50
                  hover:text-white
                  md:self-auto
                "
              >
                START A COMMISSION

                <ArrowUpRight
                  size={14}
                  strokeWidth={1}
                  className="
                    transition-transform
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </a>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default AtelierSections;