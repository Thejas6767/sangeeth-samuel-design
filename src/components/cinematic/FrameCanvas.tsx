import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { MotionValue } from 'framer-motion';
import { TOTAL_FRAMES } from '../shared/constants';

interface Props {
  scrollYProgress: MotionValue<number>;
  onLoadProgress?: (progress: number) => void;
  onLoaded?: () => void;
}

export function FrameCanvas({
  scrollYProgress,
  onLoadProgress,
  onLoaded,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);

  const [ready, setReady] = useState(false);
const [showFrames, setShowFrames] = useState(true);
  /*
   * Keep callbacks in refs so changes to the parent component
   * never restart the 167-frame preload.
   */
  const onLoadProgressRef = useRef(onLoadProgress);
  const onLoadedRef = useRef(onLoaded);

  useEffect(() => {
    onLoadProgressRef.current = onLoadProgress;
  }, [onLoadProgress]);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  /*
   * Draw one frame onto the canvas.
   */
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
    });

    if (!ctx) return;

    const images = imagesRef.current;
    const img = images[frameIndex];

    if (!img) return;
    if (!img.complete) return;
    if (img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    /*
     * Cover behaviour:
     * the frame completely fills the viewport while
     * maintaining its original aspect ratio.
     */
    const scale = Math.max(
      canvasWidth / imgWidth,
      canvasHeight / imgHeight
    );

    const renderWidth = Math.ceil(imgWidth * scale);
    const renderHeight = Math.ceil(imgHeight * scale);

    const offsetX = Math.floor(
      (canvasWidth - renderWidth) / 2
    );

    const offsetY = Math.floor(
      (canvasHeight - renderHeight) / 2
    );

    /*
     * Clear first so no previous frame remains visible.
     */
    ctx.fillStyle = '#0A0A09';
    ctx.fillRect(
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    ctx.drawImage(
      img,
      offsetX,
      offsetY,
      renderWidth,
      renderHeight
    );

    currentFrameRef.current = frameIndex;
  }, []);

  /*
   * Load all cinematic frames once.
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

      const progress = Math.min(
        100,
        Math.round(
          (loadedCount / TOTAL_FRAMES) * 100
        )
      );

      onLoadProgressRef.current?.(progress);

      if (loadedCount === TOTAL_FRAMES) {
        imagesRef.current = images;

        /*
         * Mark the canvas ready.
         */
        setReady(true);

        /*
         * Draw the first frame before removing
         * the preloader.
         */
        requestAnimationFrame(() => {
          if (!mounted) return;

          drawFrame(0);
          onLoadedRef.current?.();
        });
      }
    };

    for (
      let i = 1;
      i <= TOTAL_FRAMES;
      i += 1
    ) {
      const img = new Image();

      img.decoding = 'async';

      img.onload = () => {
        if (!mounted) return;

        /*
         * Decode the image before considering it ready.
         */
        if ('decode' in img) {
          img
            .decode()
            .then(reportLoaded)
            .catch(reportLoaded);
        } else {
          reportLoaded();
        }
      };

      /*
       * Count failed frames so one bad image
       * doesn't freeze the entire experience.
       */
      img.onerror = () => {
        if (!mounted) return;

        console.warn(
          `Failed to load frame ${i}`
        );

        reportLoaded();
      };

      /*
       * IMPORTANT:
       * The actual repository stores frames in
       * public/frames/.
       */
      img.src =
        `/frames/ezgif-frame-${pad(i)}.jpg`;

      images[i - 1] = img;
    }

    return () => {
      mounted = false;
    };
  }, [drawFrame]);

  /*
   * Canvas sizing.
   */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect =
      canvas.getBoundingClientRect();

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const width = Math.max(
      1,
      Math.floor(rect.width * dpr)
    );

    const height = Math.max(
      1,
      Math.floor(rect.height * dpr)
    );

    if (
      canvas.width !== width ||
      canvas.height !== height
    ) {
      canvas.width = width;
      canvas.height = height;
    }

    /*
     * Always redraw the currently visible frame
     * after resizing.
     */
    if (currentFrameRef.current >= 0) {
      drawFrame(currentFrameRef.current);
    } else if (imagesRef.current[0]) {
      drawFrame(0);
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
   * Scroll → frame synchronization.
   */
 useEffect(() => {
  const unsubscribe = scrollYProgress.on(
    'change',
    (progress) => {
      if (
        imagesRef.current.length !==
        TOTAL_FRAMES
      ) {
        return;
      }

      const clamped = Math.max(
        0,
        Math.min(1, progress)
      );

      let targetFrame: number;

      /*
       * 0.00 → 0.76
       *
       * Main cinematic sequence.
       * Only frames 1 → 130.
       */
     if (clamped <= 0.76) {
  const mainProgress =
    clamped / 0.76;

  targetFrame = Math.round(
    mainProgress * 129
  );
}

      /*
       * 0.76 → 0.97
       *
       * Founder + Contact.
       *
       * No cinematic frame is displayed.
       */
      else if (clamped < 0.97) {
        targetFrame = 129;
      }

      /*
       * 0.97 → 1.00
       *
       * Final cinematic sequence.
       *
       * Frame 150 → Frame 167.
       */
      else {
        const endingProgress =
          (clamped - 0.97) / 0.03;

        targetFrame =
          149 +
          Math.round(
            endingProgress * 17
          );
      }

      targetFrame = Math.max(
        0,
        Math.min(
          TOTAL_FRAMES - 1,
          targetFrame
        )
      );

      /*
       * Show cinematic only during:
       *
       * 0.00 → 0.76
       * 0.97 → 1.00
       */
      if (
        clamped <= 0.76 ||
        clamped >= 0.97
      ) {
        setShowFrames(true);
      } else {
        setShowFrames(false);
      }

      if (
        targetFrame ===
        currentFrameRef.current
      ) {
        return;
      }

      if (rafRef.current !== null) {
        cancelAnimationFrame(
          rafRef.current
        );
      }

      rafRef.current =
        requestAnimationFrame(() => {
          drawFrame(targetFrame);
          rafRef.current = null;
        });
    }
  );

  return () => {
    unsubscribe();

    if (rafRef.current !== null) {
      cancelAnimationFrame(
        rafRef.current
      );

      rafRef.current = null;
    }
  };
}, [scrollYProgress, drawFrame]);

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
  opacity: ready && showFrames ? 1 : 0,
  transition:
    'opacity 500ms cubic-bezier(0.76, 0, 0.24, 1)',
}}
        aria-hidden="true"
      />

      {/* Cinematic readability treatment */}
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