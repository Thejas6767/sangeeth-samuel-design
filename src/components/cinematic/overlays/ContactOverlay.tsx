import { useState } from 'react';
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

import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Copy,
  Check,
  Clock,
} from 'lucide-react';

import { ChapterMark } from '../../shared/ChapterMark';
import { MagneticButton } from '../../shared/MagneticButton';
import { playSound } from '../../../utils/audioEngine';

interface Props {
  scrollYProgress: MotionValue<number>;
}

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'info@6t9th.com',
    href: 'mailto:info@6t9th.com',
    copyable: 'info@6t9th.com',
  },
  {
    icon: Phone,
    label: 'PHONE',
    value: '+91 88849 06969 / +91 77955 26969',
    href: 'tel:+918884906969',
    copyable: '+918884906969',
  },
  {
    icon: MapPin,
    label: 'STUDIO WORKSHOP',
    value:
      'No 3/1, Krishnareddy Industrial Area,\nDooravani Nagar, Vijinapura, Bangalore, India',
    href: 'https://maps.google.com/?q=Vijinapura,Bangalore',
    copyable: 'No 3/1, Krishnareddy Industrial Area, Dooravani Nagar, Vijinapura, Bangalore, India',
  },
];

const ease = [0.76, 0, 0.24, 1] as const;

export function ContactOverlay({
  scrollYProgress,
}: Props) {
  const { start, mid, end } = SCROLL_TIMELINE.CONTACT;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.015, mid, end - 0.015, end],
    [0, 1, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, start + 0.02, mid, end - 0.02, end],
    [16, 0, 0, 0, -16]
  );

  const pointerEvents = useTransform(
    scrollYProgress,
    (p) => (p >= start && p <= end ? 'auto' : 'none')
  );

  const display = useTransform(
    scrollYProgress,
    (p) => (p >= start - 0.015 && p <= end + 0.015 ? 'flex' : 'none')
  );

  const handleCopy = (e: React.MouseEvent, text: string, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text);
    playSound('click');
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      style={{
        opacity,
        pointerEvents,
        display,
      }}
      className="
        fixed
        inset-0
        z-30
        flex
        h-screen
        w-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#0A0A09]
        px-6
        pt-28
        pb-12
        text-[#F2F1EC]
        sm:px-10
        md:px-12
        lg:px-16
      "
    >
      {/* ATMOSPHERIC BACKGROUND EFFECTS (MONOCHROME) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Animated Pure White Glow Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-white blur-[140px]"
        />

        {/* Animated Cool Slate Glow Orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.12, 0.05],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-[#8C8C87] blur-[160px]"
        />

        {/* Subtle Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <ChapterMark
        index={7}
        total={8}
        label="CONTACT"
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
          z-10
          mx-auto
          grid
          w-full
          max-w-[1440px]
          grid-cols-1
          items-center
          gap-10
          lg:grid-cols-[1.1fr_0.9fr]
          lg:gap-16
        "
      >
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="flex flex-col justify-center"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-[#8C8C87]
              "
              style={{ fontFamily: FONT_MONO }}
            >
              START A COMMISSION
            </span>
            <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[8px] tracking-[0.1em] text-white/90">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white"></span>
              </span>
              STUDIO OPEN FOR COMMISSIONS
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease }}
            className="
              mt-4
              max-w-3xl
              text-[2rem]
              font-black
              leading-[0.95]
              tracking-[-0.045em]
              text-white
              sm:text-[2.8rem]
              md:text-[3.8rem]
            "
            style={{ fontFamily: FONT_DISPLAY }}
          >
            LET'S CREATE SOMETHING{' '}
            <span className="text-white/40">
              WORTH REMEMBERING.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease }}
            className="
              mt-5
              max-w-md
              text-[13px]
              leading-6
              text-white/60
              sm:text-[14px]
            "
            style={{ fontFamily: FONT_BODY }}
          >
            Whether you are organizing a national motorsport championship or commissioning a bespoke monument for exceptional leadership, our atelier is ready.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease }}
            className="mt-6 flex flex-wrap items-center gap-6 sm:mt-8"
          >
            <MagneticButton
              dark={true}
              onClick={() => {
                window.location.href = 'mailto:info@6t9th.com';
              }}
            >
              START A PROJECT
            </MagneticButton>

            <div className="flex items-center gap-2 text-[#8C8C87]">
              <Clock size={13} />
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ fontFamily: FONT_MONO }}>
                AVG RESPONSE &lt; 24 HRS
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="space-y-3.5"
        >
          {CONTACT_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isCopied = copiedIndex === index;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 + index * 0.08, ease }}
                whileHover={{ y: -2, x: 2 }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-4
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-white/30
                  hover:bg-white/[0.07]
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                  sm:p-5
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    <div className="min-w-0">
                      <div
                        className="
                          font-mono
                          text-[8px]
                          tracking-[0.2em]
                          text-[#8C8C87]
                        "
                        style={{ fontFamily: FONT_MONO }}
                      >
                        {item.label}
                      </div>

                      <div
                        className="
                          mt-0.5
                          whitespace-pre-line
                          text-[13px]
                          font-semibold
                          leading-5
                          text-[#F2F1EC]
                          sm:text-[14px]
                        "
                        style={{ fontFamily: FONT_BODY }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleCopy(e, item.copyable, index)}
                      title="Copy to clipboard"
                      className="
                        rounded-lg
                        border
                        border-white/10
                        bg-white/5
                        p-2
                        text-[#8C8C87]
                        opacity-0
                        transition-all
                        duration-300
                        hover:border-white/30
                        hover:text-white
                        group-hover:opacity-100
                      "
                    >
                      {isCopied ? (
                        <Check size={13} className="text-white" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>

                    {item.href && (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="
                          rounded-lg
                          border
                          border-white/10
                          bg-white/5
                          p-2
                          text-[#8C8C87]
                          transition-all
                          duration-300
                          hover:border-white/30
                          hover:text-white
                        "
                      >
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}