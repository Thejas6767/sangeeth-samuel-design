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
  onOpenModal: (
    project: TrophyItem,
  ) => void;
  onNavigateToProgress?: (
    progress: number,
  ) => void;
}

const ease =
  [0.76, 0, 0.24, 1] as const;

export function ArchiveOverlay({
  scrollYProgress,
  onOpenModal,
  onNavigateToProgress,
}: Props) {
  const {
    start,
    end,
  } = SCROLL_TIMELINE.ARCHIVE;

  const [projectIndex, setProjectIndex] =
    useState(0);

  const manualRef =
    useRef(false);

  const timeoutRef =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  /*
  |--------------------------------------------------------------------------
  | DETERMINE PROJECT FROM SCROLL
  |--------------------------------------------------------------------------
  |
  | Archive is divided into four equal project zones.
  |
  */

  useEffect(() => {
    const unsubscribe =
      scrollYProgress.on(
        'change',
        (p) => {
          if (
            manualRef.current ||
            p < start ||
            p >= end
          ) {
            return;
          }

          const local =
            (p - start) /
            (end - start);

          const project =
            Math.min(
              ARCHIVE_PROJECTS.length - 1,
              Math.floor(
                local *
                  ARCHIVE_PROJECTS.length,
              ),
            );

          setProjectIndex(
            Math.max(0, project),
          );
        },
      );

    return unsubscribe;
  }, [
    scrollYProgress,
    start,
    end,
  ]);

  const activeProject =
    ARCHIVE_PROJECTS[
      projectIndex
    ] ||
    ARCHIVE_PROJECTS[0];

  /*
  |--------------------------------------------------------------------------
  | SECTION VISIBILITY
  |--------------------------------------------------------------------------
  */

  const opacity =
    useTransform(
      scrollYProgress,
      [
        start,
        start + 0.015,
        start + 0.035,
        end - 0.035,
        end - 0.015,
        end,
      ],
      [0, 1, 1, 1, 1, 0],
    );

  const pointerEvents =
    useTransform(
      scrollYProgress,
      (p) =>
        p >= start &&
        p < end
          ? 'auto'
          : 'none',
    );

  const display =
    useTransform(
      scrollYProgress,
      (p) =>
        p >= start &&
        p < end
          ? 'flex'
          : 'none',
    );

  /*
  |--------------------------------------------------------------------------
  | MANUAL PROJECT NAVIGATION
  |--------------------------------------------------------------------------
  */

  const paginate = (
    direction: number,
    event?: React.MouseEvent,
  ) => {
    event?.preventDefault();
    event?.stopPropagation();

    playSound('swipe');

    const next =
      (projectIndex +
        direction +
        ARCHIVE_PROJECTS.length) %
      ARCHIVE_PROJECTS.length;

    setProjectIndex(next);

    manualRef.current = true;

    if (timeoutRef.current) {
      clearTimeout(
        timeoutRef.current,
      );
    }

    timeoutRef.current =
      setTimeout(() => {
        manualRef.current = false;
      }, 900);

    if (
      onNavigateToProgress
    ) {
      const projectWidth =
        (end - start) /
        ARCHIVE_PROJECTS.length;

      onNavigateToProgress(
        start +
          (next + 0.5) *
            projectWidth,
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

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
        mx-auto
        flex
        w-full
        max-w-[1440px]
        flex-col
        justify-between
        px-6
        pb-8
        pt-20
        sm:px-10
        sm:pb-10
        sm:pt-24
        md:px-12
        lg:px-16
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* CHAPTER MARK                                                       */}
      {/* ------------------------------------------------------------------ */}

      <ChapterMark
        index={4}
        total={8}
        label="ARCHIVE"
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

      {/* ------------------------------------------------------------------ */}
      {/* RIGHT PROJECT INDEX                                                */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          pointer-events-none
          absolute
          right-6
          top-1/2
          z-10
          hidden
          -translate-y-1/2
          sm:block
          md:right-12
          lg:right-16
        "
      >
        {/* PROJECTS LABEL */}

        <div
          className="
            mb-5
            text-right
            font-mono
            text-[7px]
            tracking-[0.3em]
            text-white/60
          "
          style={{
            fontFamily: FONT_MONO,
          }}
        >
          PROJECTS
        </div>

        {/* PROJECT NUMBERS */}

        <div className="flex flex-col items-end gap-3">
          {ARCHIVE_PROJECTS.map(
            (project, index) => {
              const isActive =
                index === projectIndex;

              return (
                <div
                  key={project.id}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  {/* ACTIVE LINE */}

                  <motion.span
                    animate={{
                      opacity: isActive
                        ? 1
                        : 0.2,
                      width: isActive
                        ? 32
                        : 5,
                    }}
                    transition={{
                      duration: 0.35,
                      ease,
                    }}
                    className="
                      h-px
                      bg-white
                    "
                  />

                  {/* PROJECT NUMBER */}

                  <motion.span
                    animate={{
                      opacity: isActive
                        ? 1
                        : 0.35,
                      scale: isActive
                        ? 1.08
                        : 1,
                    }}
                    transition={{
                      duration: 0.35,
                      ease,
                    }}
                    className="
                      font-mono
                      text-[11px]
                      tracking-[0.18em]
                      text-white
                    "
                    style={{
                      fontFamily: FONT_MONO,
                    }}
                  >
                    {String(
                      index + 1,
                    ).padStart(2, '0')}
                  </motion.span>
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PROJECT TITLE                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-6
          pr-0
          sm:pr-20
          md:pr-24
        "
      >
        <div className="max-w-[520px]">
          <AnimatePresence
            mode="wait"
          >
            <motion.div
              key={activeProject.id}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.65,
                ease,
              }}
            >
              {/* CATEGORY / YEAR */}

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[8px]
                  tracking-[0.2em]
                  text-white/80
                "
                style={{
                  fontFamily: FONT_MONO,
                }}
              >
                <span
                  className="
                    h-1
                    w-1
                    rounded-full
                    bg-white
                  "
                />

                {activeProject.category.toUpperCase()}{' '}
                //{' '}
                {activeProject.year}
              </div>

              {/* TITLE */}

              <h2
                className="
                  text-[1.7rem]
                  font-black
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-white
                  sm:text-[2.25rem]
                  md:text-[2.7rem]
                "
                style={{
                  fontFamily: FONT_DISPLAY,
                }}
              >
                {activeProject.title}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* LARGE PROJECT COUNTER                                              */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          pointer-events-none
          flex
          items-end
          justify-between
          px-1
        "
      >
        <div
          className="
            flex
            items-end
            gap-3
          "
        >
          {/* PROJECT LABEL */}

          <span
            className="
              font-mono
              text-[9px]
              tracking-[0.22em]
              text-white/65
            "
            style={{
              fontFamily: FONT_MONO,
            }}
          >
            PROJECT
          </span>

          {/* ACTIVE NUMBER */}

          <AnimatePresence
            mode="wait"
          >
            <motion.span
              key={projectIndex}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.45,
                ease,
              }}
              className="
                font-mono
                text-[48px]
                font-medium
                leading-none
                tracking-[-0.06em]
                text-white
                sm:text-[58px]
              "
              style={{
                fontFamily: FONT_MONO,
              }}
            >
              {String(
                activeProject.index,
              ).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>

          {/* TOTAL */}

          <span
            className="
              mb-1
              font-mono
              text-[9px]
              tracking-[0.22em]
              text-white/65
            "
            style={{
              fontFamily: FONT_MONO,
            }}
          >
            /{' '}
            {String(
              ARCHIVE_PROJECTS.length,
            ).padStart(2, '0')}
          </span>
        </div>

        {/* SCROLL LABEL */}

        <span
          className="
            hidden
            font-mono
            text-[8px]
            tracking-[0.22em]
            text-white/65
            sm:block
          "
          style={{
            fontFamily: FONT_MONO,
          }}
        >
          SCROLL TO EXPLORE
        </span>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* DESCRIPTION + SPECIFICATION + ARROWS                               */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex
          items-end
          justify-between
          gap-8
          pt-5
          pr-0
          sm:pr-20
          md:pr-24
        "
      >
        {/* DESCRIPTION */}

        <div
          className="
            max-w-[440px]
            border-l
            border-white/40
            pl-4
          "
        >
          <AnimatePresence
            mode="wait"
          >
            <motion.p
              key={activeProject.id}
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: 10,
              }}
              transition={{
                duration: 0.65,
                ease,
              }}
              className="
                text-[20px]
                font-medium
                leading-8
                text-white
                sm:text-[24px]
              "
              style={{
                fontFamily: FONT_BODY,
              }}
            >
              {
                activeProject.description
              }
            </motion.p>
          </AnimatePresence>
        </div>

        {/* RIGHT CONTROLS */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          {/* -------------------------------------------------------------- */}
          {/* SPECIFICATION BUTTON                                           */}
          {/* -------------------------------------------------------------- */}

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              playSound('click');

              onOpenModal(
                activeProject,
              );
            }}
            className="
              group
              flex
              h-11
              items-center
              gap-3
              border
              border-white/40
              bg-black/40
              px-4
              font-mono
              text-[8px]
              tracking-[0.18em]
              text-white
              backdrop-blur-md
              transition-all
              duration-500
              hover:border-white
              hover:bg-white
              hover:text-[#0A0A09]
              focus-premium
              sm:px-5
            "
            style={{
              fontFamily: FONT_MONO,
            }}
          >
            <span>
              SPECIFICATION
            </span>

            <span className="text-white/45 group-hover:text-[#0A0A09]/45">
              //
            </span>

            <AnimatePresence
              mode="wait"
            >
              <motion.span
                key={projectIndex}
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                }}
                transition={{
                  duration: 0.3,
                  ease,
                }}
              >
                {String(
                  activeProject.index,
                ).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>

            <ArrowUpRight
              size={13}
              strokeWidth={1.3}
              className="
                transition-transform
                duration-500
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </button>

          {/* -------------------------------------------------------------- */}
          {/* PREVIOUS                                                       */}
          {/* -------------------------------------------------------------- */}

          <button
            type="button"
            onClick={(event) =>
              paginate(
                -1,
                event,
              )
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              border-white/35
              bg-black/40
              text-white
              backdrop-blur-md
              transition-all
              duration-500
              hover:border-white
              hover:bg-white
              hover:text-[#0A0A09]
              focus-premium
            "
            aria-label="Previous trophy project"
          >
            <ChevronLeft
              size={18}
              strokeWidth={1.2}
            />
          </button>

          {/* -------------------------------------------------------------- */}
          {/* NEXT                                                           */}
          {/* -------------------------------------------------------------- */}

          <button
            type="button"
            onClick={(event) =>
              paginate(
                1,
                event,
              )
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              border-white/35
              bg-black/40
              text-white
              backdrop-blur-md
              transition-all
              duration-500
              hover:border-white
              hover:bg-white
              hover:text-[#0A0A09]
              focus-premium
            "
            aria-label="Next trophy project"
          >
            <ChevronRight
              size={18}
              strokeWidth={1.2}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}