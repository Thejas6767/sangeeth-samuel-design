import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/* =========================================================
   DATA & CONFIG
========================================================= */

const TOTAL_FRAMES = 25;

const craftsmanship = [
  { number: '01', title: 'CONCEPT', text: 'Every commission begins with an idea shaped around the achievement, the sport, and the people behind the moment.' },
  { number: '02', title: 'SCULPTURE', text: 'Form is developed as an object of significance — balancing proportion, movement, identity, and presence.' },
  { number: '03', title: 'METALLURGY', text: 'Materials, finishes, textures, and detailing are considered together to create an object that feels substantial in the hand.' },
  { number: '04', title: 'FINISH', text: 'The final surface is refined until the object carries the precision expected from a championship moment.' },
];

const selectedWork = [
  { number: '01', category: 'MOTORSPORT', title: 'CHAMPIONSHIP', subtitle: 'BESPOKE TROPHY SYSTEM' },
  { number: '02', category: 'RALLY', title: 'RALLY SERIES', subtitle: 'SCULPTURAL AWARDS' },
  { number: '03', category: 'EVENT', title: 'MOMENTOUS', subtitle: 'BESPOKE RECOGNITION' },
];

const testimonials = [
  { quote: 'The award should feel as important as the achievement itself.', role: 'CHAMPIONSHIP PRINCIPLE' },
  { quote: 'A great trophy does not simply represent a victory. It preserves the memory of it.', role: 'ATELIER PHILOSOPHY' },
  { quote: 'Every detail has a reason. Nothing is there simply to fill space.', role: 'DESIGN APPROACH' },
];

/* =========================================================
   FRAME CANVAS COMPONENT
========================================================= */

function ScrollFrameCanvas({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Map progress (0 to 1) across the scroll container directly to frame index (0 to 24)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload all frame images into memory
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: Array<HTMLImageElement | null> = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/atelier-frames/frame-${frameNum}.png`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // Draw current frame to canvas
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const image = imagesRef.current[Math.round(index)];

    if (!ctx || !image || !image.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth * dpr;
    const height = canvas.clientHeight * dpr;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    // Canvas object-fit: cover implementation
    const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
    const x = (canvas.width - image.width * scale) / 2;
    const y = (canvas.height - image.height * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
  }, []);

  // Sync canvas draw with motion sequence on scroll change
  useMotionValueEvent(frameIndex, 'change', (latestFrame) => {
    requestAnimationFrame(() => renderFrame(latestFrame));
  });

  // Handle window resize events cleanly
  useEffect(() => {
    const handleResize = () => renderFrame(frameIndex.get());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frameIndex, renderFrame]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A09]">
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover transition-opacity duration-500"
        style={{
          opacity: imagesLoaded ? 1 : 0,
          filter: 'grayscale(1) contrast(1.08)',
        }}
      />
      {/* Visual Overlay Gradients */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#0A0A09] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#0A0A09] to-transparent pointer-events-none" />
    </div>
  );
}

/* =========================================================
   MAIN EXPORT
========================================================= */

export function AtelierSections() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[300vh] bg-[#0A0A09] text-[#F2F1EC]"
    >
      {/* Fixed Sticky Background Frame Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <ScrollFrameCanvas wrapperRef={containerRef} />
      </div>

      {/* Foreground Content Sections */}
      <div className="relative z-10 space-y-32 py-20">
        {/* CRAFT SECTION */}
        <section id="craft" className="px-6 md:px-16 min-h-screen flex flex-col justify-center">
          <div className="max-w-[1440px] mx-auto w-full">
            <motion.span 
              initial={{ opacity: 0, x: -10 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              className="font-mono text-[10px] tracking-widest text-white/50 block mb-4"
            >
              01 / CRAFT
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-12"
            >
              Crafted to Outlive<br />The Moment.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {craftsmanship.map((item) => (
                <div key={item.number} className="border border-white/10 p-6 bg-[#0A0A09]/60 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-mono text-xs text-white/40">{item.number}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK SECTION */}
        <section id="selected-work" className="px-6 md:px-16 min-h-screen flex flex-col justify-center">
          <div className="max-w-[1440px] mx-auto w-full">
            <span className="font-mono text-[10px] tracking-widest text-white/50 block mb-4">02 / WORK</span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-12">Objects With Presence.</h2>
            
            <div className="divide-y divide-white/10 border-y border-white/10">
              {selectedWork.map((work) => (
                <div key={work.number} className="py-8 flex justify-between items-center bg-[#0A0A09]/40 px-4 backdrop-blur-sm">
                  <div>
                    <span className="font-mono text-[9px] text-white/40 block mb-1">{work.category}</span>
                    <h3 className="text-2xl md:text-4xl font-bold">{work.title}</h3>
                    <span className="text-xs text-white/50">{work.subtitle}</span>
                  </div>
                  <span className="font-mono text-xs text-white/30">{work.number}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section id="words" className="px-6 md:px-16 min-h-screen flex flex-col justify-center">
          <div className="max-w-[1440px] mx-auto w-full">
            <span className="font-mono text-[10px] tracking-widest text-white/50 block mb-4">03 / WORDS</span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-12">The Object Should Matter.</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((item, idx) => (
                <div key={idx} className="border border-white/10 p-8 bg-[#0A0A09]/60 backdrop-blur-sm flex flex-col justify-between h-64">
                  <p className="text-lg font-medium text-white/80">“{item.quote}”</p>
                  <span className="font-mono text-[9px] tracking-widest text-white/40">{item.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AtelierSections;