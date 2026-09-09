import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  type MotionValue,
  useTransform,
} from 'framer-motion';
import {
  C,
  FONT_BODY,
  FONT_DISPLAY,
  FONT_MONO,
  SCROLL_TIMELINE,
} from '../../shared/constants';
import { PROCESS_STEPS } from '../../shared/types';
import { Eyebrow } from '../../shared/Eyebrow';
import { ChapterMark } from '../../shared/ChapterMark';
import { playSound } from '../../../utils/audioEngine';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  scrollYProgress: MotionValue<number>;
}

const ease = [0.76, 0, 0.24, 1] as const;

export function ProcessOverlay({
  scrollYProgress,
}: Props) {
  const { start, mid, end } = SCROLL_TIMELINE.PROCESS;
  const [activeStep, setActiveStep] = useState(0);

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.02, mid, end - 0.02, end],
    [0, 1, 1, 1, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [24, 0, -24],
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
      p >= start - 0.015 && p <= end + 0.015
        ? 'flex'
        : 'none',
  );

  const progressPercent = ((activeStep + 1) / PROCESS_STEPS.length) * 100;

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
      <ChapterMark
        index={5}
        total={8}
        label="METHODOLOGY"
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

      <motion.div
        style={{ y }}
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-[1440px]
          grid-cols-1
          gap-10
          lg:grid-cols-12
          lg:gap-14
        "
      >
        {/* LEFT COLUMN: HERO HEADLINE & PROGRESS TRACKER */}
        <div className="flex flex-col justify-between lg:col-span-5 lg:pr-8">
          <div>
            <Eyebrow dark={false}>
              OUR METHODOLOGY
            </Eyebrow>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease,
              }}
              className="
                mt-5
                text-[1.9rem]
                font-black
                leading-[0.97]
                tracking-[-0.04em]
                sm:text-[2.6rem]
                md:text-[3rem]
              "
              style={{
                fontFamily: FONT_DISPLAY,
              }}
            >
              Grounded in respect.
              <br />
              Driven by service.
              <br />
              <span className="text-white">
                Defined by courage.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease,
              }}
              className="
                mt-6
                max-w-md
                text-[13.5px]
                leading-6
                text-white/60
                sm:text-[14px]
              "
              style={{
                fontFamily: FONT_BODY,
              }}
            >
              We take a disciplined, research-driven approach
              to every bespoke commission, ensuring that each
              silhouette embodies the spirit of the event and
              the weight of victory.
            </motion.p>
          </div>

          {/* DYNAMIC METHODOLOGY PROGRESS BAR (MONOCHROME) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-xl sm:mt-12"
          >
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-white/80" style={{ fontFamily: FONT_MONO }}>
              <span className="flex items-center gap-2">
                <Sparkles size={12} className="animate-pulse text-white" />
                PHASE METRICS
              </span>
              <span>0{activeStep + 1} / 0{PROCESS_STEPS.length}</span>
            </div>

            {/* PROGRESS BAR TRACK */}
            <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease }}
              />
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: ACCORDION LIST */}
        <div className="lg:col-span-7">
          <div className="relative border-t border-white/20">
            {PROCESS_STEPS.map((step, i) => {
              const isActive = i === activeStep;

              return (
                <motion.button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (!isActive) {
                      playSound('click');
                    }
                    setActiveStep(i);
                  }}
                  whileHover={{
                    x: 6,
                  }}
                  whileTap={{
                    scale: 0.995,
                  }}
                  transition={{
                    duration: 0.3,
                    ease,
                  }}
                  className={`
                    relative
                    block
                    w-full
                    cursor-pointer
                    border-b
                    border-white/20
                    px-5
                    py-5
                    text-left
                    transition-all
                    duration-500
                    focus-premium
                    sm:py-6
                    ${
                      isActive
                        ? 'my-2 rounded-2xl border-white/40 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                        : 'hover:bg-white/[0.03]'
                    }
                  `}
                >
                  {/* ACTIVE SIDE GLOW BAR (WHITE) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProcessGlowBar"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                      transition={{ duration: 0.35, ease }}
                    />
                  )}

                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* STEP NUMBER */}
                    <motion.span
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        color: isActive ? '#FFFFFF' : '#8C8C87',
                      }}
                      transition={{
                        duration: 0.35,
                        ease,
                      }}
                      className="
                        pt-1
                        font-mono
                        text-[10px]
                        font-bold
                        tracking-[0.18em]
                      "
                      style={{
                        fontFamily: FONT_MONO,
                      }}
                    >
                      0{i + 1}
                    </motion.span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <motion.h3
                          animate={{
                            color: isActive
                              ? C.white
                              : 'rgba(242, 241, 236, 0.5)',
                            x: isActive ? 4 : 0,
                          }}
                          transition={{
                            duration: 0.35,
                            ease,
                          }}
                          className="
                            flex
                            items-center
                            gap-3
                            text-[1.05rem]
                            font-extrabold
                            tracking-[-0.025em]
                            sm:text-[1.25rem]
                          "
                          style={{
                            fontFamily: FONT_DISPLAY,
                          }}
                        >
                          {step.title}
                          {isActive && (
                            <motion.span 
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-white"
                            >
                              <ArrowRight size={16} />
                            </motion.span>
                          )}
                        </motion.h3>

                        {/* BADGES */}
                        <motion.span
                          animate={{
                            borderColor: isActive
                              ? 'rgba(255, 255, 255, 0.6)'
                              : 'rgba(255, 255, 255, 0.2)',
                            color: isActive ? '#FFFFFF' : '#8C8C87',
                            backgroundColor: isActive
                              ? 'rgba(255, 255, 255, 0.12)'
                              : 'transparent',
                          }}
                          transition={{
                            duration: 0.35,
                            ease,
                          }}
                          className="
                            hidden
                            shrink-0
                            rounded-md
                            border
                            px-3
                            py-1
                            font-mono
                            text-[7px]
                            uppercase
                            tracking-[0.18em]
                            backdrop-blur-md
                            sm:block
                          "
                          style={{
                            fontFamily: FONT_MONO,
                          }}
                        >
                          {step.labels.join(' · ')}
                        </motion.span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: 'auto',
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.42,
                              ease,
                            }}
                            className="overflow-hidden"
                          >
                            <motion.p
                              initial={{
                                opacity: 0,
                                y: 10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                duration: 0.35,
                                delay: 0.08,
                                ease,
                              }}
                              className="
                                mt-3
                                text-[12px]
                                font-semibold
                                leading-5
                                text-white/90
                                sm:text-[13px]
                              "
                              style={{
                                fontFamily: FONT_BODY,
                              }}
                            >
                              {step.subtitle}
                            </motion.p>

                            <motion.p
                              initial={{
                                opacity: 0,
                                y: 10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                duration: 0.35,
                                delay: 0.14,
                                ease,
                              }}
                              className="
                                mt-2
                                max-w-2xl
                                text-[12px]
                                leading-6
                                text-white/70
                                sm:text-[13px]
                              "
                              style={{
                                fontFamily: FONT_BODY,
                              }}
                            >
                              {step.body}
                            </motion.p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}