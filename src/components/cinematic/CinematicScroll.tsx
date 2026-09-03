import { useCallback, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

import { FrameCanvas } from './FrameCanvas';
import { HeroOverlay } from './overlays/HeroOverlay';
import { ManifestoOverlay } from './overlays/ManifestoOverlay';
import { BrandsOverlay } from './overlays/BrandsOverlay';
import { ArchiveOverlay } from './overlays/ArchiveOverlay';
import { ProcessOverlay } from './overlays/ProcessOverlay';
import { FounderOverlay } from './overlays/FounderOverlay';
import { ContactOverlay } from './overlays/ContactOverlay';

import { ArchiveModal } from '../sections/ArchiveModal';
import type { TrophyItem } from '../shared/types';

import { FONT_MONO, SCROLL_TIMELINE } from '../shared/constants';
import { playSound } from '../../utils/audioEngine';

interface Props {
  onLoadProgress?: (pct: number) => void;
  onLoaded?: () => void;
}

export function CinematicScroll({
  onLoadProgress,
  onLoaded,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalProject, setModalProject] =
    useState<TrophyItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const navigateToProgress = useCallback(
    (targetRatio: number) => {
      if (!containerRef.current) return;

      const containerTop =
        containerRef.current.offsetTop;

      const scrollableDistance =
        containerRef.current.offsetHeight -
        window.innerHeight;

      const targetScrollY =
        containerTop +
        targetRatio * scrollableDistance;

      const lenis = (
        window as unknown as {
          __lenis?: {
            scrollTo: (
              y: number,
              options?: object
            ) => void;
          };
        }
      ).__lenis;

      if (lenis) {
        lenis.scrollTo(targetScrollY, {
          duration: 1.1,
        });
      } else {
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });
      }
    },
    []
  );

  const milestones = [
    {
      label: 'HERO',
      progress: SCROLL_TIMELINE.HERO.start,
    },
    {
      label: 'MANIFESTO',
      progress: SCROLL_TIMELINE.MANIFESTO.start,
    },
    {
      label: 'PARTNERS',
      progress: SCROLL_TIMELINE.BRANDS.start,
    },
    {
      label: 'ARCHIVE',
      progress: SCROLL_TIMELINE.ARCHIVE.start,
    },
    {
      label: 'PROCESS',
      progress: SCROLL_TIMELINE.PROCESS.start,
    },
    {
      label: 'FOUNDER',
      progress: SCROLL_TIMELINE.FOUNDER.start,
    },
    {
      label: 'CONTACT',
      progress: SCROLL_TIMELINE.CONTACT.start,
    },
  ];

  return (
    <div
      id="cinematic-container"
      ref={containerRef}
      className="
        relative
        w-full
        h-[600vh]
        sm:h-[720vh]
        lg:h-[820vh]
        bg-[#0A0A09]
      "
    >
      {/* Navigation anchors */}

      <div
        id="home"
        className="absolute top-0"
      />

      <div
        id="manifesto"
        className="absolute top-[14%]"
      />

      <div
        id="brands"
        className="absolute top-[31%]"
      />

      <div
        id="work"
        className="absolute top-[48%]"
      />

      <div
        id="process"
        className="absolute top-[68%]"
      />

      <div
        id="founder"
        className="absolute top-[84%]"
      />

      <div
        id="contact"
        className="absolute top-[93%]"
      />

      {/* Sticky cinematic viewport */}

      <div
        className="
          sticky
          top-0
          h-[100dvh]
          w-full
          overflow-hidden
          select-none
          bg-[#0A0A09]
        "
      >
        <FrameCanvas
          scrollYProgress={scrollYProgress}
          onLoadProgress={onLoadProgress}
          onLoaded={onLoaded}
        />

        {/* Cinematic frame */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            border
            border-white/[0.035]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-20
            h-px
            bg-white/[0.12]
          "
        />

        {/* Section overlays */}

        <HeroOverlay
          scrollYProgress={scrollYProgress}
        />

        <ManifestoOverlay
          scrollYProgress={scrollYProgress}
        />

        <BrandsOverlay
          scrollYProgress={scrollYProgress}
        />

        <ArchiveOverlay
          scrollYProgress={scrollYProgress}
          onOpenModal={setModalProject}
          onNavigateToProgress={navigateToProgress}
        />

        <ProcessOverlay
          scrollYProgress={scrollYProgress}
        />

        <FounderOverlay
          scrollYProgress={scrollYProgress}
        />

        <ContactOverlay
          scrollYProgress={scrollYProgress}
        />

        {/* LogoEndOverlay intentionally disabled */}

        {/* Desktop scroll index */}

        <div
          className="
            hidden
            lg:flex
            absolute
            right-7
            top-1/2
            z-40
            -translate-y-1/2
            flex-col
            items-end
            gap-4
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                font-mono
                text-[8px]
                tracking-[0.22em]
                text-white/35
                [writing-mode:vertical-rl]
              "
              style={{
                fontFamily: FONT_MONO,
              }}
            >
              SCROLL INDEX
            </span>

            <div
              className="
                relative
                h-44
                w-px
                overflow-hidden
                bg-white/10
              "
            >
              <motion.div
                style={{
                  scaleY: scrollYProgress,
                  transformOrigin: 'top center',
                }}
                className="
                  h-full
                  w-full
                  bg-white/70
                "
              />
            </div>
          </div>

          <div
            className="
              flex
              flex-col
              items-end
              gap-1.5
            "
          >
            {milestones.map((milestone, i) => (
              <button
                key={milestone.label}
                type="button"
                onClick={() => {
                  playSound('notch');
                  navigateToProgress(
                    milestone.progress
                  );
                }}
                className="
                  group
                  relative
                  flex
                  min-h-6
                  items-center
                  gap-2
                  px-1
                  focus-premium
                "
                aria-label={`Jump to ${milestone.label}`}
              >
                <span
                  className="
                    font-mono
                    text-[7px]
                    tracking-[0.18em]
                    text-white/0
                    transition-colors
                    duration-300
                    group-hover:text-white/60
                  "
                  style={{
                    fontFamily: FONT_MONO,
                  }}
                >
                  0{i + 1}
                </span>

                <span
                  className="
                    h-1
                    w-1
                    rounded-full
                    bg-white/25
                    transition-all
                    duration-300
                    group-hover:h-1.5
                    group-hover:w-1.5
                    group-hover:bg-white
                  "
                />

                <span
                  className="
                    absolute
                    right-5
                    translate-x-2
                    whitespace-nowrap
                    border
                    border-white/10
                    bg-[#0A0A09]/85
                    px-2
                    py-1
                    font-mono
                    text-[7px]
                    tracking-[0.18em]
                    text-white/0
                    opacity-0
                    backdrop-blur-md
                    transition-all
                    duration-300
                    group-hover:translate-x-0
                    group-hover:text-white/75
                    group-hover:opacity-100
                  "
                  style={{
                    fontFamily: FONT_MONO,
                  }}
                >
                  {milestone.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Archive modal */}

      <ArchiveModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
}