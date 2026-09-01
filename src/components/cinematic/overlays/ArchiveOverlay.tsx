import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type MotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO, SCROLL_TIMELINE } from '../../shared/constants';
import { ARCHIVE_PROJECTS, type TrophyItem } from '../../shared/types';
import { ChapterMark } from '../../shared/ChapterMark';
import { playSound } from '../../../utils/audioEngine';

interface Props {
  scrollYProgress: MotionValue<number>;
  onOpenModal: (project: TrophyItem) => void;
  onNavigateToProgress?: (progress: number) => void;
}

const ease = [0.76, 0, 0.24, 1] as const;

export function ArchiveOverlay({ scrollYProgress, onOpenModal, onNavigateToProgress }: Props) {
  const { start, mid, end } = SCROLL_TIMELINE.ARCHIVE;
  const [projectIndex, setProjectIndex] = useState(0);
  const manualRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (p) => {
      if (manualRef.current || p < start || p > end) return;
      const localRatio = (p - start) / (end - start);
      const idx = Math.min(ARCHIVE_PROJECTS.length - 1, Math.floor(localRatio * ARCHIVE_PROJECTS.length));
      setProjectIndex(Math.max(0, idx));
    });
    return unsubscribe;
  }, [scrollYProgress, start, end]);

  const activeProject = ARCHIVE_PROJECTS[projectIndex] || ARCHIVE_PROJECTS[0];
  const opacity = useTransform(scrollYProgress, [start, start + 0.02, mid, end - 0.02, end], [0, 1, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, mid, end], [24, 0, -24]);
  const pointerEvents = useTransform(scrollYProgress, (p) => (p >= start && p <= end ? 'auto' : 'none'));
  const display = useTransform(scrollYProgress, (p) => (p >= start - 0.015 && p <= end + 0.015 ? 'flex' : 'none'));

  const paginate = (direction: number, event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    playSound('swipe');

    const next = (projectIndex + direction + ARCHIVE_PROJECTS.length) % ARCHIVE_PROJECTS.length;
    setProjectIndex(next);
    manualRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => { manualRef.current = false; }, 1100);

    if (onNavigateToProgress) {
      const step = (end - start) / ARCHIVE_PROJECTS.length;
      onNavigateToProgress(start + (next + 0.5) * step);
    }
  };

  return (
    <motion.div
      style={{ opacity, pointerEvents, display }}
      className="absolute inset-0 z-30 mx-auto flex w-full max-w-[1440px] flex-col justify-between px-6 pb-8 pt-20 sm:px-10 sm:pb-10 sm:pt-24 md:px-12 lg:px-16"
    >
      <ChapterMark index={4} total={8} label="ARCHIVE" dark className="right-6 top-6 sm:right-10 sm:top-8 md:right-12 lg:right-16" />

      <motion.div style={{ y }} className="flex items-start justify-between gap-6">
        <div className="max-w-[420px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeProject.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
              <div className="mb-3 flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] text-[#8C8C87]" style={{ fontFamily: FONT_MONO }}>
                <span className="h-1 w-1 rounded-full bg-[#8C8C87]" />
                {activeProject.category.toUpperCase()} // {activeProject.year}
              </div>
              <h2 className="text-[1.55rem] font-black leading-[0.98] tracking-[-0.035em] sm:text-[2rem] md:text-[2.35rem]" style={{ fontFamily: FONT_DISPLAY }}>
                {activeProject.title}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); playSound('click'); onOpenModal(activeProject); }}
          className="group flex min-h-11 shrink-0 items-center gap-3 border border-white/20 bg-[#0A0A09]/60 px-4 py-3 font-mono text-[8px] tracking-[0.18em] text-white backdrop-blur-md transition-all duration-500 hover:border-white/55 hover:bg-white hover:text-[#0A0A09] focus-premium sm:px-5"
          style={{ fontFamily: FONT_MONO }}
        >
          SPECIFICATION
          <ArrowUpRight size={13} strokeWidth={1.3} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </motion.div>

      <div className="pointer-events-none flex items-center justify-between px-1 text-[8px] tracking-[0.22em] text-white/35" style={{ fontFamily: FONT_MONO }}>
        <span>PROJECT {String(activeProject.index).padStart(2, '0')} / {String(ARCHIVE_PROJECTS.length).padStart(2, '0')}</span>
        <span className="hidden sm:block">SCROLL SCRUBS 3D ATELIER</span>
      </div>

      <motion.div style={{ y }} className="flex items-end justify-between gap-8 pt-5">
        <div className="max-w-[440px] border-l border-white/20 pl-4">
          <AnimatePresence mode="wait">
            <motion.p key={activeProject.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.35, ease }} className="text-[12px] leading-6 text-[#8C8C87] sm:text-[13px]" style={{ fontFamily: FONT_BODY }}>
              {activeProject.description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={(e) => paginate(-1, e)} className="flex h-11 w-11 items-center justify-center border border-white/20 bg-[#0A0A09]/65 text-white backdrop-blur-md transition-all duration-500 hover:border-white hover:bg-white hover:text-[#0A0A09] focus-premium" aria-label="Previous trophy project">
            <ChevronLeft size={18} strokeWidth={1.2} />
          </button>
          <button type="button" onClick={(e) => paginate(1, e)} className="flex h-11 w-11 items-center justify-center border border-white/20 bg-[#0A0A09]/65 text-white backdrop-blur-md transition-all duration-500 hover:border-white hover:bg-white hover:text-[#0A0A09] focus-premium" aria-label="Next trophy project">
            <ChevronRight size={18} strokeWidth={1.2} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
