import { useState } from 'react';
import { AnimatePresence, motion, type MotionValue, useTransform } from 'framer-motion';
import { C, FONT_BODY, FONT_DISPLAY, FONT_MONO, SCROLL_TIMELINE } from '../../shared/constants';
import { PROCESS_STEPS } from '../../shared/types';
import { Eyebrow } from '../../shared/Eyebrow';
import { ChapterMark } from '../../shared/ChapterMark';
import { playSound } from '../../../utils/audioEngine';

interface Props {
  scrollYProgress: MotionValue<number>;
}

const ease = [0.76, 0, 0.24, 1] as const;

export function ProcessOverlay({ scrollYProgress }: Props) {
  const { start, mid, end } = SCROLL_TIMELINE.PROCESS;
  const [activeStep, setActiveStep] = useState(0);
  const opacity = useTransform(scrollYProgress, [start, start + 0.02, mid, end - 0.02, end], [0, 1, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, mid, end], [24, 0, -24]);
  const pointerEvents = useTransform(scrollYProgress, (p) => (p >= start && p <= end ? 'auto' : 'none'));
  const display = useTransform(scrollYProgress, (p) => (p >= start - 0.015 && p <= end + 0.015 ? 'flex' : 'none'));

  return (
<motion.div style={{ opacity, pointerEvents, display }} className="absolute inset-0 z-30 flex items-center justify-center overflow-y-auto bg-transparent px-6 py-20 text-[#F2F1EC] sm:px-10 md:px-12 lg:px-16">      <ChapterMark index={5} total={8} label="METHODOLOGY" dark={false} className="right-6 top-6 sm:right-10 sm:top-8 md:right-12 lg:right-16" />

      <motion.div style={{ y }} className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5 lg:pr-8">
          <Eyebrow dark={false}>OUR METHODOLOGY</Eyebrow>
          <motion.h2
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    delay: 0.15,
    ease,
  }}
  className="mt-5 text-[1.9rem] font-black leading-[0.97] tracking-[-0.04em] sm:text-[2.6rem] md:text-[3rem]"
  style={{ fontFamily: FONT_DISPLAY }}
>
            Grounded in respect.
            <br />
            Driven by service.
            <br />
            <span className="text-[#8C8C87]">Defined by courage.</span>
          </motion.h2>
<motion.p
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: 0.35,
    ease,
  }}
  className="mt-6 max-w-md text-[13.5px] leading-6 text-white/70 sm:text-[14px]"
  style={{ fontFamily: FONT_BODY }}
>            We take a disciplined, research-driven approach to every bespoke commission, ensuring
            that each silhouette embodies the spirit of the event and the weight of victory.
          </motion.p>
        </div>

        <div className="lg:col-span-7">
         <div className="border-t border-white/20">
            {PROCESS_STEPS.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => { if (!isActive) playSound('click'); setActiveStep(i); }}
                  className="block w-full cursor-pointer border-b border-white/20 py-5 text-left transition-colors duration-500 hover:bg-black/[0.025] focus-premium sm:py-6"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="pt-1 font-mono text-[9px] tracking-[0.18em] text-[#8C8C87]" style={{ fontFamily: FONT_MONO }}>
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-[1.05rem] font-extrabold tracking-[-0.025em] sm:text-[1.25rem]" style={{ fontFamily: FONT_DISPLAY, color: isActive ? C.white : 'rgba(242, 241, 236, 0.5)' }}>
                          {step.title}
                        </h3>
                        <span className="hidden shrink-0 border border-white/20 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.16em] text-[#8C8C87] sm:block" style={{ fontFamily: FONT_MONO }}>
                          {step.labels.join(' · ')}
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.42, ease }} className="overflow-hidden">
                            <p className="mt-3 text-[12px] font-medium leading-5 text-white/80 sm:text-[13px]" style={{ fontFamily: FONT_BODY }}>
                              {step.subtitle}
                            </p>
                            <p className="mt-2 max-w-2xl text-[12px] leading-6 text-white/70 sm:text-[13px]" style={{ fontFamily: FONT_BODY }}>
                              {step.body}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
