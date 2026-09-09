import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
  type MotionValue,
  useTransform,
} from 'framer-motion';

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';

import {
  FONT_BODY,
  FONT_DISPLAY,
  FONT_MONO,
  SCROLL_TIMELINE,
} from '../../shared/constants';

import {
  ARCHIVE_PROJECTS,
  type TrophyItem,
} from '../../shared/types';

import { ChapterMark } from '../../shared/ChapterMark';
import { playSound } from '../../../utils/audioEngine';

interface Props {
  scrollYProgress: MotionValue<number>;
  onOpenModal?: (project: TrophyItem) => void;
  onNavigateToProgress?: (progress: number) => void;
}

const ease = [0.76, 0, 0.24, 1] as const;

export function ArchiveOverlay({
  scrollYProgress,
  onNavigateToProgress,
}: Props) {
  const { start, end } = SCROLL_TIMELINE.ARCHIVE;

  const [projectIndex, setProjectIndex] = useState(0);
  const [showInPageSpecs, setShowInPageSpecs] = useState(false);

  const manualRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (p) => {
      if (manualRef.current || p < start || p >= end) return;

      const local = (p - start) / (end - start);
      const project = Math.min(
        ARCHIVE_PROJECTS.length - 1,
        Math.floor(local * ARCHIVE_PROJECTS.length)
      );

      setProjectIndex(Math.max(0, project));
    });

    return unsubscribe;
  }, [scrollYProgress, start, end]);

  const activeProject = ARCHIVE_PROJECTS[projectIndex] || ARCHIVE_PROJECTS[0];

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.015, start + 0.035, end - 0.035, end - 0.015, end],
    [0, 1, 1, 1, 1, 0]
  );

  const pointerEvents = useTransform(scrollYProgress, (p) =>
    p >= start && p < end ? 'auto' : 'none'
  );

  const display = useTransform(scrollYProgress, (p) =>
    p >= start && p < end ? 'flex' : 'none'
  );

  const paginate = (direction: number, event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();

    playSound('swipe');

    const next =
      (projectIndex + direction + ARCHIVE_PROJECTS.length) %
      ARCHIVE_PROJECTS.length;

    setProjectIndex(next);
    manualRef.current = true;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      manualRef.current = false;
    }, 900);

    if (onNavigateToProgress) {
      const projectWidth = (end - start) / ARCHIVE_PROJECTS.length;
      onNavigateToProgress(start + (next + 0.5) * projectWidth);
    }
  };

  return (
    <motion.div
      layout
      style={{
        opacity,
        pointerEvents,
        display,
      }}
      className="absolute inset-0 left-0 right-0 z-30 mx-auto flex w-full max-w-full flex-col justify-between overflow-x-hidden px-4 pb-6 pt-20 sm:px-10 sm:pb-10 sm:pt-24 md:px-12 lg:px-16"
    >
      {/* CHAPTER MARK */}
      <ChapterMark
        index={4}
        total={8}
        label="ARCHIVE"
        dark={false}
        className="right-4 top-5 sm:right-10 sm:top-8 md:right-12 lg:right-16"
      />

      {/* RIGHT SIDE INDICATOR */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 sm:block md:right-12 lg:right-16">
        <div
          className="mb-5 text-right font-mono text-[7px] tracking-[0.3em] text-white/60"
          style={{ fontFamily: FONT_MONO }}
        >
          PROJECTS
        </div>

        <div className="flex flex-col items-end gap-3">
          {ARCHIVE_PROJECTS.map((project, index) => {
            const isActive = index === projectIndex;
            return (
              <div key={project.id} className="flex items-center gap-3">
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0.2,
                    width: isActive ? 32 : 5,
                    backgroundColor: isActive ? '#F59E0B' : '#FFFFFF',
                  }}
                  transition={{ duration: 0.35, ease }}
                  className="h-px"
                />
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.35, ease }}
                  className="font-mono text-[11px] tracking-[0.18em] text-white"
                  style={{ fontFamily: FONT_MONO }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOP HEADER SECTION */}
      <div className="w-full max-w-full flex items-start justify-between gap-4 pr-0 sm:pr-20 md:pr-24">
        <div className="w-full max-w-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease }}
            >
              <div
                className="mb-2 flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] text-amber-400 sm:mb-3"
                style={{ fontFamily: FONT_MONO }}
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                />
                <span className="truncate">{activeProject.category.toUpperCase()} // {activeProject.year}</span>
              </div>

              <h2
                className="text-[1.5rem] font-black leading-[0.95] tracking-[-0.04em] text-white drop-shadow-xl sm:text-[2.25rem] md:text-[2.7rem]"
                style={{ fontFamily: FONT_DISPLAY }}
              >
                {activeProject.title}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CARD SPECIFICATION PANEL */}
      <div className="relative my-auto w-full py-2">
        <div className="block w-full sm:hidden">
          {/* MOBILE DIRECT CARD DISPLAY */}
          <motion.div
            key={`mobile-card-${activeProject.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="relative w-full max-w-full overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/20 via-white/10 to-white/5 p-4 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div className="flex items-center justify-between border-b border-white/20 pb-2.5">
              <div className="flex items-center gap-2 text-amber-300 drop-shadow-sm">
                <Sparkles size={13} />
                <span className="font-mono text-[9px] tracking-[0.18em]" style={{ fontFamily: FONT_MONO }}>
                  TROPHY SPECIFICATIONS
                </span>
              </div>
              <span className="font-mono text-[9px] text-white/70" style={{ fontFamily: FONT_MONO }}>
                {String(activeProject.index).padStart(2, '0')} / {String(ARCHIVE_PROJECTS.length).padStart(2, '0')}
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-3">
              <div className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-white/30 bg-white/15 p-2 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                <motion.div 
                  animate={{
                    scale: [0.85, 1.15, 0.85],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-amber-300/30 blur-2xl pointer-events-none"
                />

                {(activeProject as any).image || (activeProject as any).imageUrl || (activeProject as any).src ? (
                  <motion.img
                    key={activeProject.id}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease }}
                    src={(activeProject as any).image || (activeProject as any).imageUrl || (activeProject as any).src}
                    alt={activeProject.title}
                    className="relative z-10 max-h-[120px] w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
                  />
                ) : (
                  <div className="flex h-[100px] w-full flex-col items-center justify-center text-amber-200 font-mono text-[10px]">
                    <Layers size={20} className="mb-1.5 animate-bounce" />
                    <span>3D CANVAS PREVIEW</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between gap-2.5">
                {/* FIXED GRID WITH STRICT OVERFLOW TRUNCATION */}
                <div className="grid grid-cols-2 gap-2 min-w-0">
                  <div className="border-l border-white/30 pl-2 min-w-0 overflow-hidden">
                    <span className="block font-mono text-[7.5px] tracking-[0.12em] text-white/70 truncate" style={{ fontFamily: FONT_MONO }}>
                      CLIENT / BRAND
                    </span>
                    <span className="mt-0.5 block text-[11px] font-semibold text-white truncate">
                      {activeProject.client || 'Exclusive Release'}
                    </span>
                  </div>

                  <div className="border-l border-white/30 pl-2 min-w-0 overflow-hidden">
                    <span className="block font-mono text-[7.5px] tracking-[0.12em] text-white/70 truncate" style={{ fontFamily: FONT_MONO }}>
                      MATERIALS
                    </span>
                    <span className="mt-0.5 block text-[11px] font-semibold text-amber-300 truncate">
                      {activeProject.materials || 'Bespoke Alloy'}
                    </span>
                  </div>
                </div>

                <p className="text-[10.5px] leading-relaxed text-white/95 line-clamp-3" style={{ fontFamily: FONT_BODY }}>
                  {activeProject.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden sm:block">
          <AnimatePresence mode="wait">
            {showInPageSpecs ? (
              <motion.div
                key="spec-panel"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
                className="relative max-w-[720px] overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/20 via-white/10 to-white/5 p-6 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div className="flex items-center gap-2 text-amber-300 drop-shadow-sm">
                    <Sparkles size={14} />
                    <span className="font-mono text-[10px] tracking-[0.2em]" style={{ fontFamily: FONT_MONO }}>
                      TROPHY SPECIFICATIONS
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowInPageSpecs(false)}
                    className="rounded-full border border-white/30 bg-white/15 p-1 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-12">
                  <div className="group relative md:col-span-4 flex items-center justify-center overflow-hidden rounded-xl border border-white/30 bg-white/15 p-3 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                    <motion.div 
                      animate={{
                        scale: [0.85, 1.15, 0.85],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 bg-amber-300/30 blur-2xl pointer-events-none"
                    />

                    {(activeProject as any).image || (activeProject as any).imageUrl || (activeProject as any).src ? (
                      <motion.img
                        key={activeProject.id}
                        initial={{ scale: 0.85, opacity: 0, y: 10 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1, 
                          y: [0, -4, 0] 
                        }}
                        whileHover={{ scale: 1.08, rotate: 1.5 }}
                        transition={{
                          scale: { duration: 0.4, ease },
                          opacity: { duration: 0.3 },
                          y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                          rotate: { duration: 0.25 }
                        }}
                        src={(activeProject as any).image || (activeProject as any).imageUrl || (activeProject as any).src}
                        alt={activeProject.title}
                        className="relative z-10 max-h-[160px] w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] cursor-pointer"
                      />
                    ) : (
                      <div className="flex h-[140px] w-full flex-col items-center justify-center text-amber-200 font-mono text-[10px]">
                        <Layers size={24} className="mb-2 animate-bounce" />
                        <span>3D CANVAS PREVIEW</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-8 flex flex-col justify-between">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="border-l border-white/30 pl-3">
                        <span className="block font-mono text-[8px] tracking-[0.15em] text-white/70" style={{ fontFamily: FONT_MONO }}>
                          CLIENT / BRAND
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-white drop-shadow-md truncate">
                          {activeProject.client || 'Exclusive Release'}
                        </span>
                      </div>

                      <div className="border-l border-white/30 pl-3">
                        <span className="block font-mono text-[8px] tracking-[0.15em] text-white/70" style={{ fontFamily: FONT_MONO }}>
                          MATERIALS & BUILD
                        </span>
                        <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-amber-300 drop-shadow-md truncate">
                          <Layers size={12} />
                          {activeProject.materials || 'Bespoke Alloy / Glass'}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-white/95 drop-shadow-md" style={{ fontFamily: FONT_BODY }}>
                      {activeProject.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="counter-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none flex items-end justify-between px-1"
              >
                <div className="flex items-end gap-3">
                  <span className="font-mono text-[9px] tracking-[0.22em] text-white/65" style={{ fontFamily: FONT_MONO }}>
                    PROJECT
                  </span>

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={projectIndex}
                      initial={{ opacity: 0, y: 18, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -18, scale: 0.9 }}
                      transition={{ duration: 0.4, ease }}
                      className="font-mono text-[48px] font-medium leading-none tracking-[-0.06em] text-white drop-shadow-md sm:text-[58px]"
                      style={{ fontFamily: FONT_MONO }}
                    >
                      {String(activeProject.index).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>

                  <span className="mb-1 font-mono text-[9px] tracking-[0.22em] text-white/65" style={{ fontFamily: FONT_MONO }}>
                    / {String(ARCHIVE_PROJECTS.length).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM CONTROLS & DESCRIPTION */}
      <div className="w-full max-w-full flex items-end justify-between gap-4 pt-2 pr-0 sm:pr-20 md:pr-24">
        {!showInPageSpecs && (
          <div className="hidden max-w-[440px] border-l-2 border-amber-400/80 pl-4 sm:block">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeProject.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.5, ease }}
                className="text-[18px] font-medium leading-7 text-white drop-shadow sm:text-[22px]"
                style={{ fontFamily: FONT_BODY }}
              >
                {activeProject.description}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        {/* RIGHT CONTROLS */}
        <div className="flex shrink-0 items-center justify-between w-full sm:w-auto sm:justify-end gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              playSound('click');
              setShowInPageSpecs((prev) => !prev);
            }}
            className="hidden sm:flex group h-11 items-center gap-3 border border-white/30 bg-white/10 px-4 font-mono text-[8px] tracking-[0.18em] text-amber-300 backdrop-blur-2xl transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-black focus-premium sm:px-5"
            style={{ fontFamily: FONT_MONO }}
          >
            <span>{showInPageSpecs ? 'HIDE SPECIFICATION' : 'SPECIFICATION'}</span>
            <span className="text-amber-400/45 group-hover:text-black/45">//</span>
            <span>{String(activeProject.index).padStart(2, '0')}</span>
            <ArrowUpRight
              size={13}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.button>

          {/* PREVIOUS & NEXT CONTROL GROUP */}
          <div className="flex items-center gap-2 ml-auto sm:ml-0">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={(e) => paginate(-1, e)}
              className="flex h-10 w-10 items-center justify-center border border-white/30 bg-white/10 text-white backdrop-blur-2xl transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#0A0A09] focus-premium sm:h-11 sm:w-11"
              aria-label="Previous trophy project"
            >
              <ChevronLeft size={18} strokeWidth={1.2} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={(e) => paginate(1, e)}
              className="flex h-10 w-10 items-center justify-center border border-white/30 bg-white/10 text-white backdrop-blur-2xl transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#0A0A09] focus-premium sm:h-11 sm:w-11"
              aria-label="Next trophy project"
            >
              <ChevronRight size={18} strokeWidth={1.2} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}