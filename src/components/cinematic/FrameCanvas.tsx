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
| Helpers
|--------------------------------------------------------------------------
*/

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

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

  /*
   * Frame numbers are 1-based.
   * Canvas image indexes are 0-based.
   */
  const startIndex = frameStart - 1;
  const endIndex = frameEnd - 1;

  return Math.round(
    startIndex +
      localProgress *
        (endIndex - startIndex)
  );
};

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
  | Keep callbacks stable
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
  | Draw frame
  |--------------------------------------------------------------------------
  */

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const ctx = canvas.getContext('2d', {
        alpha: false,
      });

      if (!ctx) return;

      const images =
        imagesRef.current;

      const img =
        images[frameIndex];

      if (!img) return;

      if (!img.complete) return;

      if (img.naturalWidth === 0) return;

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
      | Cover image
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
      | Clear canvas
      |--------------------------------------------------------------------------
      */

      ctx.fillStyle = '#0A0A09';

      ctx.fillRect(
        0,
        0,
        canvasWidth,
        canvasHeight
      );

      /*
      |--------------------------------------------------------------------------
      | Draw frame
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
  | Preload all 167 frames
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const images: HTMLImageElement[] =
      new Array(TOTAL_FRAMES);

    let loadedCount = 0;

    const pad = (number: number) =>
      String(number).padStart(3, '0');

    const reportLoaded = () => {
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
       * All frames are ready.
       */
      if (
        loadedCount ===
        TOTAL_FRAMES
      ) {
        imagesRef.current =
          images;

        setReady(true);

        /*
         * Draw the correct frame
         * for the user's CURRENT
         * scroll position.
         */
        requestAnimationFrame(() => {
          if (!mounted) return;

          const currentProgress =
            clamp(
              scrollYProgress.get()
            );

          let frameIndex = 0;

          /*
           * HERO
           * 0.00 → 0.10
           */
          if (
            currentProgress >=
              SCROLL_TIMELINE.HERO.start &&
            currentProgress <
              SCROLL_TIMELINE.HERO.end
          ) {
            frameIndex =
              frameForProgress(
                currentProgress,
                SCROLL_TIMELINE.HERO.start,
                SCROLL_TIMELINE.HERO.end,
                CINEMATIC_FRAMES.HERO.start,
                CINEMATIC_FRAMES.HERO.end
              );
          }

          /*
           * MANIFESTO
           * 0.12 → 0.25
           */
          else if (
            currentProgress >=
              SCROLL_TIMELINE.MANIFESTO.start &&
            currentProgress <
              SCROLL_TIMELINE.MANIFESTO.end
          ) {
            frameIndex =
              frameForProgress(
                currentProgress,
                SCROLL_TIMELINE.MANIFESTO.start,
                SCROLL_TIMELINE.MANIFESTO.end,
                CINEMATIC_FRAMES.MANIFESTO.start,
                CINEMATIC_FRAMES.MANIFESTO.end
              );
          }

          /*
           * PARTNERS
           * 0.27 → 0.40
           */
          else if (
            currentProgress >=
              SCROLL_TIMELINE.BRANDS.start &&
            currentProgress <
              SCROLL_TIMELINE.BRANDS.end
          ) {
            frameIndex =
              frameForProgress(
                currentProgress,
                SCROLL_TIMELINE.BRANDS.start,
                SCROLL_TIMELINE.BRANDS.end,
                CINEMATIC_FRAMES.BRANDS.start,
                CINEMATIC_FRAMES.BRANDS.end
              );
          }

          /*
           * TRANSITION
           * 0.40 → 0.43
           *
           * Frames 67 → 69
           */
          else if (
            currentProgress >=
              SCROLL_TIMELINE.BRANDS.end &&
            currentProgress <
              SCROLL_TIMELINE.ARCHIVE.start
          ) {
            frameIndex =
              frameForProgress(
                currentProgress,
                SCROLL_TIMELINE.BRANDS.end,
                SCROLL_TIMELINE.ARCHIVE.start,
                CINEMATIC_FRAMES.TRANSITION_TO_ARCHIVE.start,
                CINEMATIC_FRAMES.TRANSITION_TO_ARCHIVE.end
              );
          }

          /*
           * ARCHIVE
           * 0.43 → 0.67
           *
           * Frames 70 → 100
           */
          else if (
            currentProgress >=
              SCROLL_TIMELINE.ARCHIVE.start &&
            currentProgress <
              SCROLL_TIMELINE.ARCHIVE.end
          ) {
            frameIndex =
              frameForProgress(
                currentProgress,
                SCROLL_TIMELINE.ARCHIVE.start,
                SCROLL_TIMELINE.ARCHIVE.end,
                CINEMATIC_FRAMES.ARCHIVE.start,
                CINEMATIC_FRAMES.ARCHIVE.end
              );
          }

          /*
           * PROCESS
           * 0.69 → 0.78
           *
           * Frames 103 → 130
           */
          else if (
            currentProgress >=
              SCROLL_TIMELINE.PROCESS.start &&
            currentProgress <
              SCROLL_TIMELINE.PROCESS.end
          ) {
            frameIndex =
              frameForProgress(
                currentProgress,
                SCROLL_TIMELINE.PROCESS.start,
                SCROLL_TIMELINE.PROCESS.end,
                CINEMATIC_FRAMES.PROCESS.start,
                CINEMATIC_FRAMES.PROCESS.end
              );
          }

          /*
           * FINAL
           * 0.975 → 1.00
           *
           * Frames 150 → 167
           */
          else if (
            currentProgress >=
              SCROLL_TIMELINE.LOGO_END.start
          ) {
            frameIndex =
              frameForProgress(
                currentProgress,
                SCROLL_TIMELINE.LOGO_END.start,
                SCROLL_TIMELINE.LOGO_END.end,
                CINEMATIC_FRAMES.FINAL.start,
                CINEMATIC_FRAMES.FINAL.end
              );
          }

          /*
           * Any gap intentionally remains
           * black.
           */
          else {
            const canvas =
              canvasRef.current;

            if (canvas) {
              const ctx =
                canvas.getContext(
                  '2d'
                );

              if (ctx) {
                ctx.fillStyle =
                  '#0A0A09';

                ctx.fillRect(
                  0,
                  0,
                  canvas.width,
                  canvas.height
                );
              }
            }

            onLoadedRef.current?.();

            return;
          }

          drawFrame(
            clamp(
              frameIndex,
              0,
              TOTAL_FRAMES - 1
            )
          );

          onLoadedRef.current?.();
        });
      }
    };

    /*
    |--------------------------------------------------------------------------
    | Load every frame
    |--------------------------------------------------------------------------
    */

    for (
      let i = 1;
      i <= TOTAL_FRAMES;
      i += 1
    ) {
      const img =
        new Image();

      img.decoding = 'async';

      img.onload = () => {
        if (!mounted) return;

        if (
          'decode' in img
        ) {
          img
            .decode()
            .then(reportLoaded)
            .catch(reportLoaded);
        } else {
          reportLoaded();
        }
      };

      img.onerror = () => {
        if (!mounted) return;

        console.warn(
          `Failed to load frame ${i}`
        );

        /*
         * Don't allow one bad frame
         * to stop the entire experience.
         */
        reportLoaded();
      };

      /*
       * IMPORTANT:
       * public/frames/
       */
      img.src =
        `/frames/ezgif-frame-${pad(i)}.jpg`;

      images[i - 1] = img;
    }

    return () => {
      mounted = false;
    };
  }, [
    drawFrame,
    scrollYProgress,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Canvas resize
  |--------------------------------------------------------------------------
  */

  const handleResize =
    useCallback(() => {
      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const rect =
        canvas.getBoundingClientRect();

      const dpr = Math.min(
        window.devicePixelRatio || 1,
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
        canvas.width = width;
        canvas.height = height;
      }

      if (
        currentFrameRef.current >= 0
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
      { passive: true }
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
          if (
            imagesRef.current.length !==
            TOTAL_FRAMES
          ) {
            return;
          }

          const p =
            clamp(progress);

          let targetFrame: number | null =
            null;

          /*
          |--------------------------------------------------------------------------
          | HERO
          |--------------------------------------------------------------------------
          */

          if (
            p >=
              SCROLL_TIMELINE.HERO.start &&
            p <
              SCROLL_TIMELINE.HERO.end
          ) {
            targetFrame =
              frameForProgress(
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
          */

          else if (
            p >=
              SCROLL_TIMELINE.MANIFESTO.start &&
            p <
              SCROLL_TIMELINE.MANIFESTO.end
          ) {
            targetFrame =
              frameForProgress(
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
          */

          else if (
            p >=
              SCROLL_TIMELINE.BRANDS.start &&
            p <
              SCROLL_TIMELINE.BRANDS.end
          ) {
            targetFrame =
              frameForProgress(
                p,
                SCROLL_TIMELINE.BRANDS.start,
                SCROLL_TIMELINE.BRANDS.end,
                CINEMATIC_FRAMES.BRANDS.start,
                CINEMATIC_FRAMES.BRANDS.end
              );
          }

          /*
          |--------------------------------------------------------------------------
          | TRANSITION TO ARCHIVE
          |--------------------------------------------------------------------------
          |
          | Frames 67 → 69
          |
          */

          else if (
            p >=
              SCROLL_TIMELINE.BRANDS.end &&
            p <
              SCROLL_TIMELINE.ARCHIVE.start
          ) {
            targetFrame =
              frameForProgress(
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
          | ARCHIVE
          |--------------------------------------------------------------------------
          |
          | Frames 70 → 100
          |
          */

          else if (
            p >=
              SCROLL_TIMELINE.ARCHIVE.start &&
            p <
              SCROLL_TIMELINE.ARCHIVE.end
          ) {
            targetFrame =
              frameForProgress(
                p,
                SCROLL_TIMELINE.ARCHIVE.start,
                SCROLL_TIMELINE.ARCHIVE.end,
                CINEMATIC_FRAMES.ARCHIVE.start,
                CINEMATIC_FRAMES.ARCHIVE.end
              );
          }

          /*
          |--------------------------------------------------------------------------
          | PROCESS / METHODOLOGY
          |--------------------------------------------------------------------------
          |
          | Frames 103 → 130
          |
          */

          else if (
            p >=
              SCROLL_TIMELINE.PROCESS.start &&
            p <
              SCROLL_TIMELINE.PROCESS.end
          ) {
            targetFrame =
              frameForProgress(
                p,
                SCROLL_TIMELINE.PROCESS.start,
                SCROLL_TIMELINE.PROCESS.end,
                CINEMATIC_FRAMES.PROCESS.start,
                CINEMATIC_FRAMES.PROCESS.end
              );
          }

          /*
          |--------------------------------------------------------------------------
          | FINAL
          |--------------------------------------------------------------------------
          |
          | Frames 150 → 167
          |
          */

          else if (
            p >=
            SCROLL_TIMELINE.LOGO_END.start
          ) {
            targetFrame =
              frameForProgress(
                p,
                SCROLL_TIMELINE.LOGO_END.start,
                SCROLL_TIMELINE.LOGO_END.end,
                CINEMATIC_FRAMES.FINAL.start,
                CINEMATIC_FRAMES.FINAL.end
              );
          }

          /*
          |--------------------------------------------------------------------------
          | Intentional blank ranges
          |--------------------------------------------------------------------------
          |
          | .10 → .12
          | .25 → .27
          | .67 → .69
          | .78 → .80
          | .89 → .90
          | .965 → .975
          |
          */

          else {
            targetFrame = null;
          }

          /*
          |--------------------------------------------------------------------------
          | Blank transition
          |--------------------------------------------------------------------------
          */

          if (targetFrame === null) {
            const canvas =
              canvasRef.current;

            if (canvas) {
              const ctx =
                canvas.getContext(
                  '2d'
                );

              if (ctx) {
                ctx.fillStyle =
                  '#0A0A09';

                ctx.fillRect(
                  0,
                  0,
                  canvas.width,
                  canvas.height
                );
              }
            }

            currentFrameRef.current =
              -1;

            return;
          }

          targetFrame = clamp(
            targetFrame,
            0,
            TOTAL_FRAMES - 1
          );

          if (
            targetFrame ===
            currentFrameRef.current
          ) {
            return;
          }

          if (
            rafRef.current !== null
          ) {
            cancelAnimationFrame(
              rafRef.current
            );
          }

          rafRef.current =
            requestAnimationFrame(
              () => {
                drawFrame(
                  targetFrame as number
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
        rafRef.current !== null
      ) {
        cancelAnimationFrame(
          rafRef.current
        );

        rafRef.current = null;
      }
    };
  }, [
    scrollYProgress,
    drawFrame,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="
        absolute inset-0
        w-full h-full
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