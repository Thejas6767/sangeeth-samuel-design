import { motion, type MotionValue, useTransform } from 'framer-motion';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO, SCROLL_TIMELINE } from '../../shared/constants';
import { BRAND_PARTNERS } from '../../shared/types';
import { Eyebrow } from '../../shared/Eyebrow';
import { ChapterMark } from '../../shared/ChapterMark';

interface Props {
  scrollYProgress: MotionValue<number>;
}

function MarqueeRow({
  items,
  direction = 'left',
  duration = 44,
}: {
  items: typeof BRAND_PARTNERS;
  direction?: 'left' | 'right';
  duration?: number;
}) {
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-4 sm:py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0A0A09] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0A0A09] to-transparent sm:w-28" />

      <motion.div
        className="flex w-max shrink-0 items-center"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ x: { duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' } }}
      >
        {loop.map((brand, i) => (
          <div key={`${brand.name}-${i}`} className="flex items-center">
            <div className="group px-7 sm:px-12 md:px-16">
              <div
className="whitespace-nowrap text-[15px] font-black tracking-[0.04em] text-[#F2F1EC] transition-colors duration-500 group-hover:text-white sm:text-[18px] md:text-[21px]"                style={{ fontFamily: FONT_DISPLAY }}
              >
                {brand.name}
              </div>
              <div
className="mt-1 whitespace-nowrap text-[8px] uppercase tracking-[0.2em] text-[#8C8C87] transition-colors duration-500 group-hover:text-[#F2F1EC]"                style={{ fontFamily: FONT_MONO }}
              >
                {brand.label}
              </div>
            </div>
            <span className="h-px w-7 bg-[#8C8C87]/30 sm:w-12" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function BrandsOverlay({ scrollYProgress }: Props) {
  const { start, mid, end } = SCROLL_TIMELINE.BRANDS;
  const opacity = useTransform(scrollYProgress, [start, start + 0.02, mid, end - 0.02, end], [0, 1, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, mid, end], [24, 0, -24]);
  const pointerEvents = useTransform(scrollYProgress, (p) => (p >= start && p <= end ? 'auto' : 'none'));
  const display = useTransform(scrollYProgress, (p) => (p >= start - 0.015 && p <= end + 0.015 ? 'flex' : 'none'));

  return (
    <motion.div
      style={{ opacity, pointerEvents, display }}
className="absolute inset-0 z-30 flex items-center justify-center bg-transparent px-6 py-20 sm:px-10 md:px-12 lg:px-16"    >
      <ChapterMark index={3} total={8} label="PARTNERS" dark className="right-6 top-6 sm:right-10 sm:top-8 md:right-12 lg:right-16" />

      <motion.div style={{ y }} className="mx-auto flex w-full max-w-[1440px] flex-col justify-center">
        <div className="mb-9 max-w-2xl sm:mb-12">
          <Eyebrow dark>COMMISSIONED BY CHAMPIONSHIPS</Eyebrow>
          <h2
            className="mt-4 max-w-3xl text-[1.65rem] font-black leading-[1.03] tracking-[-0.035em] sm:mt-6 sm:text-[2.3rem] md:text-[2.7rem]"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            Built for national rallies and motorsport championships.
          </h2>
          <p className="mt-4 max-w-lg text-[13px] leading-6 text-[#8C8C87] sm:text-[14px]" style={{ fontFamily: FONT_BODY }}>
            From the Indian National Rally Championship to premier clubs under FMSCI, 6t9th
            crafts one-of-a-kind trophies for moments that become legacy.
          </p>
        </div>

        <div className="border-y border-[#8C8C87]/30 bg-transparent">
          <MarqueeRow items={BRAND_PARTNERS} direction="left" duration={42} />
          <div className="h-px w-full bg-white/[0.06]" />
          <MarqueeRow items={[...BRAND_PARTNERS].reverse()} direction="right" duration={48} />
        </div>

        <div className="mt-8 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.22em] text-[#8C8C87] sm:text-[9px]" style={{ fontFamily: FONT_MONO }}>
          <span>100% BESPOKE ARTWORK</span>
          <span className="hidden sm:inline">NO MASS PRODUCTION</span>
          <span>EST. 2020</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
