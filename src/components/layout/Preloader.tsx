import { motion } from 'framer-motion';
import { FONT_DISPLAY, FONT_MONO } from '../shared/constants';

interface Props { progress: number; }

export function Preloader({ progress }: Props) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[200] flex select-none flex-col justify-between bg-[#0A0A09] p-6 text-white sm:p-10 md:p-14"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[8px] tracking-[0.24em] text-white/35" style={{ fontFamily: FONT_MONO }}>
        <span>SANGEETH SAMUEL DESIGN</span>
        <span>6T9TH</span>
      </div>

      <div className="my-auto flex flex-col items-center text-center">
        <div className="mb-6 flex h-10 w-10 items-center justify-center border border-white/20 font-mono text-[9px] tracking-[0.18em] text-white/70" style={{ fontFamily: FONT_MONO }}>SS</div>
        <div className="text-[1.3rem] font-black tracking-[0.04em] sm:text-[1.8rem]" style={{ fontFamily: FONT_DISPLAY }}>SCULPTING VICTORY</div>
        <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.22em] text-white/35" style={{ fontFamily: FONT_MONO }}>LOADING CINEMATIC ATELIER</p>

        <div className="mt-9 w-56 sm:w-72">
          <div className="mb-2 flex items-center justify-between font-mono text-[7px] tracking-[0.18em] text-white/35" style={{ fontFamily: FONT_MONO }}>
            <span>SEQUENCE</span>
            <span>{String(Math.round(progress)).padStart(3, '0')}%</span>
          </div>
          <div className="h-px w-full bg-white/10">
            <motion.div className="h-full bg-white" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.25, ease: 'easeOut' }} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[7px] tracking-[0.2em] text-white/30" style={{ fontFamily: FONT_MONO }}>
        <span>BANGALORE · INDIA</span>
        <span>FRAME {String(Math.max(1, Math.ceil((progress / 100) * 167))).padStart(3, '0')} / 167</span>
      </div>
    </motion.div>
  );
}
