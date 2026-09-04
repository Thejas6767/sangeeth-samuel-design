import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { MotionValue } from 'framer-motion';

import {
  TOTAL_FRAMES,
  SCROLL_TIMELINE,
  CINEMATIC_FRAMES,
} from '../shared/constants';

interface Props {
  scrollYProgress: MotionValue<number>;
  onLoadProgress?: (progress: number) => void;
  onLoaded?: () => void;
}

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const clamp = (
  value: number,
  min = 0,
  max = 1
) =>
  Math.min(
    max,
    Math.max(min, value)
  );

/*
|--------------------------------------------------------------------------
| Progress → Frame
|--------------------------------------------------------------------------
|
| Frame numbers are 1-based.
| Canvas indexes are 0-based.
|--------------------------------------------------------------------------
*/

const frameForProgress = (
  progress: number,
  sectionStart: number,
  sectionEnd: number,
  frameStart: number,
  frameEnd: number
) => {
  const localProgress = clamp(
    (progress - sectionStart) /
      (sectionEnd - sectionStart)
  );

  const startIndex =
    frameStart - 1;

  const endIndex =
    frameEnd - 1;

  return Math.round(
    startIndex +
      localProgress *
        (endIndex - startIndex)
  );
};

/*
|--------------------------------------------------------------------------
| PROJECTS / ARCHIVE FRAME MAPPING
|--------------------------------------------------------------------------
|
| Partners end
|      ↓
| 067 → 069  = transition
|      ↓
| 070 → 090  = projects
|      ↓
| 080 → 090  = replay
|      ↓
| next section
|
| Frames 091 → 100 are intentionally NOT used.
|--------------------------------------------------------------------------
*/

const archiveFrameForProgress = (
  progress: number
) => {
  const archiveStart =
    SCROLL_TIMELINE.ARCHIVE.start;

  const archiveEnd =
    SCROLL_TIMELINE.ARCHIVE.end;

  const archiveProgress = clamp(
    (progress - archiveStart) /
      (archiveEnd - archiveStart)
  );

  /*
  |--------------------------------------------------------------------------
  | First part
  |--------------------------------------------------------------------------
  |
  | 70 → 90
  |
  */

  if (archiveProgress < 2 / 3) {
    const firstProgress =
      archiveProgress /
      (2 / 3);

    return frameForProgress(
      firstProgress,
      0,
      1,
      70,
      90
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Final part
  |--------------------------------------------------------------------------
  |
  | 80 → 90
  |
  */

  const replayProgress =
    (archiveProgress - 2 / 3) /
    (1 / 3);

  return frameForProgress(
    replayProgress,
    0,
    1,
    80,
    90
  );
};

/*
|--------------------------------------------------------------------------
| GET FRAME FOR CURRENT SCROLL POSITION
|--------------------------------------------------------------------------
|
| THIS IS THE ONLY PLACE WHERE THE FRAME SEQUENCE IS DEFINED.
|
| This prevents the preload logic and scroll logic
| from disagreeing with each other.
|--------------------------------------------------------------------------
*/

const getFrameForProgress = (
  progress: number
): number | null => {
  const p = clamp(progress);

  /*
  |--------------------------------------------------------------------------
  | HERO
  |--------------------------------------------------------------------------
  |
  | 001 → 016
  |
  */

  if (
    p >= SCROLL_TIMELINE.HERO.start &&
    p < SCROLL_TIMELINE.HERO.end
  ) {
    return frameForProgress(
      p,
      SCROLL_TIMELINE.HERO.start,
      SCROLL_TIMELINE.HERO.end,
      CINEMATIC_FRAMES.HERO.start,
      CINEMATIC_FRAMES.HERO.end
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MANIFESTO
  |--------------------------------------------------------------------------
  |
  | 021 → 041
  |
  */

  if (
    p >= SCROLL_TIMELINE.MANIFESTO.start &&
    p < SCROLL_TIMELINE.MANIFESTO.end
  ) {
    return frameForProgress(
      p,
      SCROLL_TIMELINE.MANIFESTO.start,
      SCROLL_TIMELINE.MANIFESTO.end,
      CINEMATIC_FRAMES.MANIFESTO.start,
      CINEMATIC_FRAMES.MANIFESTO.end
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PARTNERS
  |--------------------------------------------------------------------------
  |
  | 053 → 066
  |
  */

  if (
    p >= SCROLL_TIMELINE.BRANDS.start &&
    p < SCROLL_TIMELINE.BRANDS.end
  ) {
    return frameForProgress(
      p,
      SCROLL_TIMELINE.BRANDS.start,
      SCROLL_TIMELINE.BRANDS.end,
      CINEMATIC_FRAMES.BRANDS.start,
      CINEMATIC_FRAMES.BRANDS.end
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PARTNERS → PROJECTS TRANSITION
  |--------------------------------------------------------------------------
  |
  | THIS IS THE PART YOU ASKED TO RESTORE.
  |
  | 067 → 069
  |
  | It sits AFTER Partners and BEFORE Projects.
  |--------------------------------------------------------------------------
  */

  if (
    p >= SCROLL_TIMELINE.BRANDS.end &&
    p < SCROLL_TIMELINE.ARCHIVE.start
  ) {
    return frameForProgress(
      p,
      SCROLL_TIMELINE.BRANDS.end,
      SCROLL_TIMELINE.ARCHIVE.start,
      CINEMATIC_FRAMES
        .TRANSITION_TO_ARCHIVE
        .start,
      CINEMATIC_FRAMES
        .TRANSITION_TO_ARCHIVE
        .end
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PROJECTS / ARCHIVE
  |--------------------------------------------------------------------------
  |
  | FIRST:
  | 070 → 090
  |
  | THEN:
  | 080 → 090
  |
  | 091 → 100 are NOT shown.
  |--------------------------------------------------------------------------
  */

  if (
    p >= SCROLL_TIMELINE.ARCHIVE.start &&
    p < SCROLL_TIMELINE.ARCHIVE.end
  ) {
    return archiveFrameForProgress(p);
  }

  /*
  |--------------------------------------------------------------------------
  | ARCHIVE → PROCESS GAP
  |--------------------------------------------------------------------------
  |
  | 0.67 → 0.69
  |
  | BLACK.
  |--------------------------------------------------------------------------
  */

  /*
  |--------------------------------------------------------------------------
  | PROCESS / METHODOLOGY
  |--------------------------------------------------------------------------
  |
  | 103 → 130
  |
  */

  if (
    p >= SCROLL_TIMELINE.PROCESS.start &&
    p < SCROLL_TIMELINE.PROCESS.end
  ) {
    return frameForProgress(
      p,
      SCROLL_TIMELINE.PROCESS.start,
      SCROLL_TIMELINE.PROCESS.end,
      CINEMATIC_FRAMES.PROCESS.start,
      CINEMATIC_FRAMES.PROCESS.end
    );
  }

  /*
  |--------------------------------------------------------------------------
  | FOUNDER / CONTACT
  |--------------------------------------------------------------------------
  |
  | No cinematic frames.
  |
  | 131 → 149 must remain hidden.
  |--------------------------------------------------------------------------
  */

  /*
  |--------------------------------------------------------------------------
  | FINAL
  |--------------------------------------------------------------------------
  |
  | 150 → 167
  |
  */

  if (
    p >= SCROLL_TIMELINE.LOGO_END.start
  ) {
    return frameForProgress(
      p,
      SCROLL_TIMELINE.LOGO_END.start,
      SCROLL_TIMELINE.LOGO_END.end,
      CINEMATIC_FRAMES.FINAL.start,
      CINEMATIC_FRAMES.FINAL.end
    );
  }

  /*
  |--------------------------------------------------------------------------
  | INTENTIONAL BLACK AREAS
  |--------------------------------------------------------------------------
  */

  return null;
};

/*
|--------------------------------------------------------------------------
| FRAME CANVAS
|--------------------------------------------------------------------------
*/

export function FrameCanvas({
  scrollYProgress,
  onLoadProgress,
  onLoaded,
}: Props) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const imagesRef =
    useRef<HTMLImageElement[]>([]);

  const currentFrameRef =
    useRef<number>(-1);

  const rafRef =
    useRef<number | null>(null);

  const [ready, setReady] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Stable callbacks
  |--------------------------------------------------------------------------
  */

  const onLoadProgressRef =
    useRef(onLoadProgress);

  const onLoadedRef =
    useRef(onLoaded);

  useEffect(() => {
    onLoadProgressRef.current =
      onLoadProgress;
  }, [onLoadProgress]);

  useEffect(() => {
    onLoadedRef.current =
      onLoaded;
  }, [onLoaded]);

  /*
  |--------------------------------------------------------------------------
  | DRAW FRAME
  |--------------------------------------------------------------------------
  */

  const drawFrame =
    useCallback(
      (frameIndex: number) => {
        const canvas =
          canvasRef.current;

        if (!canvas) return;

        const ctx =
          canvas.getContext('2d', {
            alpha: false,
          });

        if (!ctx) return;

        const img =
          imagesRef.current[
            frameIndex
          ];

        if (!img) return;

        if (!img.complete) return;

        if (
          img.naturalWidth === 0
        ) {
          return;
        }

        const canvasWidth =
          canvas.width;

        const canvasHeight =
          canvas.height;

        if (
          canvasWidth === 0 ||
          canvasHeight === 0
        ) {
          return;
        }

        const imgWidth =
          img.naturalWidth;

        const imgHeight =
          img.naturalHeight;

        /*
        |--------------------------------------------------------------------------
        | COVER
        |--------------------------------------------------------------------------
        */

        const scale = Math.max(
          canvasWidth / imgWidth,
          canvasHeight / imgHeight
        );

        const renderWidth =
          Math.ceil(
            imgWidth * scale
          );

        const renderHeight =
          Math.ceil(
            imgHeight * scale
          );

        const offsetX =
          Math.floor(
            (canvasWidth -
              renderWidth) /
              2
          );

        const offsetY =
          Math.floor(
            (canvasHeight -
              renderHeight) /
              2
          );

        /*
        |--------------------------------------------------------------------------
        | CLEAR
        |--------------------------------------------------------------------------
        */

        ctx.fillStyle =
          '#0A0A09';

        ctx.fillRect(
          0,
          0,
          canvasWidth,
          canvasHeight
        );

        /*
        |--------------------------------------------------------------------------
        | DRAW
        |--------------------------------------------------------------------------
        */

        ctx.imageSmoothingEnabled =
          true;

        ctx.imageSmoothingQuality =
          'high';

        ctx.drawImage(
          img,
          offsetX,
          offsetY,
          renderWidth,
          renderHeight
        );

        currentFrameRef.current =
          frameIndex;
      },
      []
    );

  /*
  |--------------------------------------------------------------------------
  | CLEAR CANVAS
  |--------------------------------------------------------------------------
  */

  const clearCanvas =
    useCallback(() => {
      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const ctx =
        canvas.getContext('2d');

      if (!ctx) return;

      ctx.fillStyle =
        '#0A0A09';

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      currentFrameRef.current =
        -1;
    }, []);

  /*
  |--------------------------------------------------------------------------
  | PRELOAD ALL FRAMES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const images:
      HTMLImageElement[] =
      new Array(TOTAL_FRAMES);

    let loadedCount = 0;

    const pad = (
      number: number
    ) =>
      String(number).padStart(
        3,
        '0'
      );

    const reportLoaded =
      () => {
        if (!mounted) return;

        loadedCount += 1;

        const progress =
          Math.min(
            100,
            Math.round(
              (loadedCount /
                TOTAL_FRAMES) *
                100
            )
          );

        onLoadProgressRef.current?.(
          progress
        );

        /*
        |--------------------------------------------------------------------------
        | ALL FRAMES LOADED
        |--------------------------------------------------------------------------
        */

        if (
          loadedCount ===
          TOTAL_FRAMES
        ) {
          imagesRef.current =
            images;

          setReady(true);

          requestAnimationFrame(
            () => {
              if (!mounted) return;

              const currentProgress =
                clamp(
                  scrollYProgress.get()
                );

              const frameIndex =
                getFrameForProgress(
                  currentProgress
                );

              if (
                frameIndex === null
              ) {
                clearCanvas();
              } else {
                drawFrame(
                  clamp(
                    frameIndex,
                    0,
                    TOTAL_FRAMES - 1
                  )
                );
              }

              onLoadedRef.current?.();
            }
          );
        }
      };

    /*
    |--------------------------------------------------------------------------
    | LOAD 001 → 167
    |--------------------------------------------------------------------------
    */

    for (
      let i = 1;
      i <= TOTAL_FRAMES;
      i += 1
    ) {
      const img =
        new Image();

      img.decoding =
        'async';

      img.onload = () => {
        if (!mounted) return;

        if (
          'decode' in img
        ) {
          img
            .decode()
            .then(
              reportLoaded
            )
            .catch(
              reportLoaded
            );
        } else {
          reportLoaded();
        }
      };

      img.onerror = () => {
        if (!mounted) return;

        console.warn(
          `Failed to load frame ${i}`
        );

        reportLoaded();
      };

      img.src =
        `/frames/ezgif-frame-${pad(
          i
        )}.jpg`;

      images[i - 1] =
        img;
    }

    return () => {
      mounted = false;
    };
  }, [
    clearCanvas,
    drawFrame,
    scrollYProgress,
  ]);

  /*
  |--------------------------------------------------------------------------
  | CANVAS RESIZE
  |--------------------------------------------------------------------------
  */

  const handleResize =
    useCallback(() => {
      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const rect =
        canvas.getBoundingClientRect();

      const dpr =
        Math.min(
          window.devicePixelRatio ||
            1,
          2
        );

      const width =
        Math.max(
          1,
          Math.floor(
            rect.width * dpr
          )
        );

      const height =
        Math.max(
          1,
          Math.floor(
            rect.height * dpr
          )
        );

      if (
        canvas.width !== width ||
        canvas.height !== height
      ) {
        canvas.width =
          width;

        canvas.height =
          height;
      }

      /*
      |--------------------------------------------------------------------------
      | Redraw current frame
      |--------------------------------------------------------------------------
      */

      if (
        currentFrameRef.current >=
        0
      ) {
        drawFrame(
          currentFrameRef.current
        );
      }
    }, [drawFrame]);

  useEffect(() => {
    handleResize();

    window.addEventListener(
      'resize',
      handleResize,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      );
    };
  }, [handleResize]);

  /*
  |--------------------------------------------------------------------------
  | SCROLL → FRAME
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const unsubscribe =
      scrollYProgress.on(
        'change',
        (progress) => {
          /*
          |--------------------------------------------------------------------------
          | Don't render until every image is ready
          |--------------------------------------------------------------------------
          */

          if (
            imagesRef.current.length !==
            TOTAL_FRAMES
          ) {
            return;
          }

          const targetFrame =
            getFrameForProgress(
              progress
            );

          /*
          |--------------------------------------------------------------------------
          | BLACK / EMPTY SECTION
          |--------------------------------------------------------------------------
          */

          if (
            targetFrame === null
          ) {
            clearCanvas();
            return;
          }

          /*
          |--------------------------------------------------------------------------
          | Safety clamp
          |--------------------------------------------------------------------------
          */

          const safeFrame =
            clamp(
              targetFrame,
              0,
              TOTAL_FRAMES - 1
            );

          /*
          |--------------------------------------------------------------------------
          | Don't redraw same frame
          |--------------------------------------------------------------------------
          */

          if (
            safeFrame ===
            currentFrameRef.current
          ) {
            return;
          }

          /*
          |--------------------------------------------------------------------------
          | Cancel previous RAF
          |--------------------------------------------------------------------------
          */

          if (
            rafRef.current !==
            null
          ) {
            cancelAnimationFrame(
              rafRef.current
            );
          }

          /*
          |--------------------------------------------------------------------------
          | Draw next frame
          |--------------------------------------------------------------------------
          */

          rafRef.current =
            requestAnimationFrame(
              () => {
                drawFrame(
                  safeFrame
                );

                rafRef.current =
                  null;
              }
            );
        }
      );

    return () => {
      unsubscribe();

      if (
        rafRef.current !==
        null
      ) {
        cancelAnimationFrame(
          rafRef.current
        );

        rafRef.current =
          null;
      }
    };
  }, [
    scrollYProgress,
    clearCanvas,
    drawFrame,
  ]);

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="
        absolute
        inset-0
        w-full
        h-full
        overflow-hidden
        bg-[#0A0A09]
        select-none
      "
    >
      <canvas
        ref={canvasRef}
        className="
          block
          w-full
          h-full
          will-change-transform
        "
        style={{
          opacity: ready ? 1 : 0,
          transition:
            'opacity 500ms cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        aria-hidden="true"
      />

      {/* Bottom readability treatment */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-48
          bg-gradient-to-t
          from-[#0A0A09]/90
          via-[#0A0A09]/35
          to-transparent
        "
      />

      {/* Top readability treatment */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-28
          bg-gradient-to-b
          from-[#0A0A09]/75
          to-transparent
        "
      />
    </div>
  );
}