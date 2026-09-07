import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
          THE MAKING
      ========================================================= */}

      <section
        id="craft"
        className="
          relative
          overflow-hidden
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

        {/* Background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <motion.img
            src="/atelier/philosophy.jpg"
            alt=""
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 2.5,
              ease: 'easeOut',
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              opacity-[0.18]
              grayscale
            "
          />

          <div className="absolute inset-0 bg-[#0A0A09]/55" />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-[#0A0A09]/75
              via-transparent
              to-[#0A0A09]
            "
          />

        </div>

        <div className="relative z-10 mx-auto max-w-[1440px]">

          {/* Heading */}

          <div className="flex items-end justify-between gap-8">

            <div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: -25,
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
                  duration: 0.7,
                  ease: 'easeOut',
                }}
                className="mb-5 flex items-center gap-3"
              >

                <motion.span
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: 32,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: 'easeOut',
                  }}
                  className="h-px bg-white/40"
                />

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

              </motion.div>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 55,
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
                  duration: 0.9,
                  ease: 'easeOut',
                }}
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
              </motion.h2>

            </div>

            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
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
            </motion.div>

          </div>

          {/* Intro */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: 'easeOut',
            }}
            className="
              mt-16
              grid
              gap-10
              border-t
              border-white/[0.08]
              pt-8
              md:mt-24
              md:grid-cols-[0.8fr_1.2fr]
            "
          >

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

          </motion.div>

          {/* Craftsmanship Cards */}

          <div
            className="
              mt-16
              grid
              border-l
              border-white/[0.08]
              md:grid-cols-4
            "
          >

            {craftsmanship.map((item, index) => (

              <motion.div
                key={item.number}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: 'easeOut',
                }}
                whileHover={{
                  y: -6,
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

                  <motion.span
                    initial={{
                      opacity: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.12 + 0.15,
                    }}
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.2em]
                      text-white/30
                    "
                  >
                    {item.number}
                  </motion.span>

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

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: 28,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.12 + 0.25,
                    }}
                    className="mt-3 h-px bg-white/30"
                  />

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
          overflow-hidden
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

        {/* Background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <motion.img
            src="/atelier/selected-work.jpg"
            alt=""
            initial={{
              scale: 1.08,
            }}
            whileInView={{
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 2.5,
              ease: 'easeOut',
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              opacity-[0.18]
              grayscale
            "
          />

          <div className="absolute inset-0 bg-[#0A0A09]/55" />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-[#0A0A09]/75
              via-transparent
              to-[#0A0A09]
            "
          />

        </div>

        <div className="relative z-10 mx-auto max-w-[1440px]">

          {/* Heading */}

          <div className="flex items-end justify-between">

            <div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: -25,
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
                  duration: 0.7,
                  ease: 'easeOut',
                }}
                className="mb-5 flex items-center gap-3"
              >

                <motion.span
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: 32,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                  className="h-px bg-white/40"
                />

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

              </motion.div>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 55,
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
                  duration: 0.9,
                  ease: 'easeOut',
                }}
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
              </motion.h2>

            </div>

            <motion.span
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
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
            </motion.span>

          </div>

          {/* Work List
              IMPORTANT:
              These three titles are intentionally STATIC.
          */}

          <div className="mt-20 border-t border-white/[0.08]">

            {selectedWork.map((work) => (

              <div
                key={work.number}
                className="
                  relative
                  flex
                  min-h-[150px]
                  items-center
                  justify-between
                  gap-8
                  border-b
                  border-white/[0.08]
                  py-8
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

                    {/* NO MOTION HERE */}

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

              </div>

            ))}

          </div>

          {/* Bottom Statement */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            className="
              mt-12
              flex
              flex-col
              justify-between
              gap-5
              md:flex-row
              md:items-center
            "
          >

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

          </motion.div>

        </div>

      </section>


      {/* =========================================================
          PHILOSOPHY
      ========================================================= */}

      <section
        id="words"
        className="
          relative
          overflow-hidden
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

        {/* Background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <motion.img
            src="/atelier/craftsmanship.jpg"
            alt=""
            initial={{
              scale: 1.08,
            }}
            whileInView={{
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 2.5,
              ease: 'easeOut',
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              opacity-[0.18]
              grayscale
            "
          />

          <div className="absolute inset-0 bg-[#0A0A09]/55" />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-[#0A0A09]/75
              via-transparent
              to-[#0A0A09]
            "
          />

        </div>

        <div className="relative z-10 mx-auto max-w-[1440px]">

          {/* Heading */}

          <div className="flex items-end justify-between">

            <div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: -25,
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
                  duration: 0.7,
                  ease: 'easeOut',
                }}
                className="mb-5 flex items-center gap-3"
              >

                <motion.span
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: 32,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                  className="h-px bg-white/40"
                />

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

              </motion.div>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 55,
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
                  duration: 0.9,
                  ease: 'easeOut',
                }}
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
              </motion.h2>

            </div>

            <motion.span
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
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
            </motion.span>

          </div>

          {/* Philosophy Cards */}

          <div
            className="
              mt-20
              grid
              border-t
              border-white/[0.08]
              md:grid-cols-3
            "
          >

            {testimonials.map((item, index) => (

              <motion.div
                key={item.role}
                initial={{
                  opacity: 0,
                  y: 55,
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
                  duration: 0.8,
                  delay: index * 0.14,
                  ease: 'easeOut',
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  border-b
                  border-r
                  border-white/[0.08]
                  bg-black/[0.08]
                  p-8
                  transition-colors
                  duration-500
                  hover:bg-white/[0.025]
                  md:min-h-[360px]
                  md:p-10
                "
              >

                <div className="flex items-center justify-between">

                  <motion.span
                    initial={{
                      opacity: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.14 + 0.2,
                    }}
                    className="
                      font-mono
                      text-[8px]
                      tracking-[0.2em]
                      text-white/25
                    "
                  >
                    0{index + 1}
                  </motion.span>

                  <motion.span
                    initial={{
                      width: 24,
                    }}
                    whileHover={{
                      width: 48,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: 'easeOut',
                    }}
                    className="h-px bg-white/20"
                  />

                </div>

                <motion.blockquote
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.14 + 0.25,
                  }}
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
                </motion.blockquote>

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

          {/* Closing Statement */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            className="
              mt-20
              border-t
              border-white/[0.08]
              pt-8
            "
          >

            <div
              className="
                flex
                flex-col
                justify-between
                gap-8
                md:flex-row
                md:items-end
              "
            >

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

            </div>

          </motion.div>

        </div>

      </section>

    </div>
  );
}

export default AtelierSections;