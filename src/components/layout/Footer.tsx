import { ArrowUp } from 'lucide-react';
import { FONT_DISPLAY, FONT_MONO, NAV_LINKS } from '../shared/constants';
import { playSound } from '../../utils/audioEngine';

export function Footer() {
  const scrollToProgress = (progress: number) => {
    const container = document.getElementById('cinematic-container');
    if (!container) return;
    const distance = container.offsetHeight - window.innerHeight;
    const target = container.offsetTop + progress * distance;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, options?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(target, { duration: 1.05 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-[#232320] bg-[#0A0A09] px-6 py-14 text-white sm:py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_0.7fr] md:gap-8">
          <div>
            <div className="text-[1.65rem] font-black leading-[0.9] tracking-[-0.035em] sm:text-[2rem]" style={{ fontFamily: FONT_DISPLAY }}>
              SANGEETH
              <br />
              SAMUEL
              <br />
              DESIGN
            </div>
            <p className="mt-5 font-mono text-[8px] leading-5 tracking-[0.18em] text-[#8C8C87]" style={{ fontFamily: FONT_MONO }}>
              BESPOKE TROPHY & OBJECT-DESIGN STUDIO
              <br />
              BANGALORE · INDIA / GLOBAL
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            <div className="mb-2 font-mono text-[8px] tracking-[0.2em] text-white/30" style={{ fontFamily: FONT_MONO }}>EXPLORE</div>
            {NAV_LINKS.map((link) => (
              <button key={link.label} type="button" onClick={() => { playSound('click'); scrollToProgress(link.progress); }} className="w-fit font-mono text-[9px] tracking-[0.18em] text-[#8C8C87] transition-colors hover:text-white focus-premium" style={{ fontFamily: FONT_MONO }}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <a href="https://www.instagram.com/the6t9th/" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-[#232320] text-[#8C8C87] transition-colors hover:border-white hover:text-white focus-premium">
              <span className="font-mono text-[9px] tracking-[0.08em]" style={{ fontFamily: FONT_MONO }}>IG</span>
            </a>
            <button type="button" onClick={() => { playSound('click'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-3 border border-[#232320] px-4 py-3 font-mono text-[8px] tracking-[0.18em] text-[#8C8C87] transition-colors hover:border-white hover:text-white focus-premium" style={{ fontFamily: FONT_MONO }}>
              BACK TO TOP
              <ArrowUp size={12} strokeWidth={1.2} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[#232320] pt-5 font-mono text-[7px] tracking-[0.16em] text-[#5c5c58] sm:flex-row sm:items-center sm:justify-between sm:text-[8px]" style={{ fontFamily: FONT_MONO }}>
          <span>© {new Date().getFullYear()} SANGEETH SAMUEL DESIGN (6T9TH). ALL RIGHTS RESERVED.</span>
          <span>WE DESIGN WHAT VICTORY LOOKS LIKE.</span>
        </div>
      </div>
    </footer>
  );
}
