import { motion, type MotionValue, useTransform } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO, SCROLL_TIMELINE } from '../../shared/constants';
import { ChapterMark } from '../../shared/ChapterMark';
import { MagneticButton } from '../../shared/MagneticButton';

interface Props {
  scrollYProgress: MotionValue<number>;
}

const CONTACT_ITEMS = [
  { icon: Mail, label: 'EMAIL', value: 'info@6t9th.com', href: 'mailto:info@6t9th.com' },
  { icon: Phone, label: 'PHONE', value: '+91 88849 06969 / +91 77955 26969', href: 'tel:+918884906969' },
  { icon: MapPin, label: 'STUDIO WORKSHOP', value: 'No 3/1, Krishnareddy Industrial Area,\nDooravani Nagar, Vijinapura, Bangalore, India', href: null },
];

export function ContactOverlay({ scrollYProgress }: Props) {
  const { start, mid, end } = SCROLL_TIMELINE.CONTACT;
  const opacity = useTransform(scrollYProgress, [start, start + 0.015, mid, end - 0.015, end], [0, 1, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, mid, end], [24, 0, -24]);
  const pointerEvents = useTransform(scrollYProgress, (p) => (p >= start && p <= end ? 'auto' : 'none'));
  const display = useTransform(scrollYProgress, (p) => (p >= start - 0.015 && p <= end + 0.015 ? 'flex' : 'none'));

  return (
    <motion.div style={{ opacity, pointerEvents, display }} className="absolute inset-0 z-30 flex items-center justify-center overflow-y-auto bg-[#F2F1EC] px-6 py-20 text-[#0A0A09] sm:px-10 md:px-12 lg:px-16">
      <ChapterMark index={7} total={8} label="CONTACT" dark={false} className="right-6 top-6 sm:right-10 sm:top-8 md:right-12 lg:right-16" />

      <motion.div style={{ y }} className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#8C8C87]" style={{ fontFamily: FONT_MONO }}>
            START A COMMISSION
          </div>
          <h2 className="mt-4 max-w-3xl text-[2rem] font-black leading-[0.95] tracking-[-0.045em] sm:text-[3rem] md:text-[4.2rem]" style={{ fontFamily: FONT_DISPLAY }}>
            LET'S CREATE SOMETHING WORTH REMEMBERING.
          </h2>
          <p className="mt-6 max-w-md text-[13px] leading-6 text-[#57564f] sm:text-[14px]" style={{ fontFamily: FONT_BODY }}>
            Whether you are organizing a national motorsport championship or commissioning a bespoke
            monument for exceptional leadership, our atelier is ready.
          </p>
          <div className="mt-8 sm:mt-10">
            <MagneticButton dark={false} onClick={() => { window.location.href = 'mailto:info@6t9th.com'; }}>
              START A PROJECT
            </MagneticButton>
          </div>
        </div>

        <div className="border-l border-[#DEDCD3] pl-6 sm:pl-8">
          {CONTACT_ITEMS.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="group flex items-start gap-4 py-4 sm:py-5">
                <Icon size={17} strokeWidth={1.25} className="mt-0.5 shrink-0 text-[#8C8C87]" />
                <div className="min-w-0">
                  <div className="font-mono text-[8px] tracking-[0.2em] text-[#8C8C87]" style={{ fontFamily: FONT_MONO }}>{item.label}</div>
                  <div className="mt-1 whitespace-pre-line text-[13px] font-medium leading-6 text-[#0A0A09] sm:text-[14px]" style={{ fontFamily: FONT_BODY }}>{item.value}</div>
                </div>
                {item.href && <ArrowUpRight size={14} strokeWidth={1.2} className="ml-auto shrink-0 text-[#8C8C87] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              </div>
            );
            return item.href ? <a key={item.label} href={item.href} className="block border-b border-[#DEDCD3] transition-opacity hover:opacity-65 focus-premium">{content}</a> : <div key={item.label} className="border-b border-[#DEDCD3]">{content}</div>;
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
