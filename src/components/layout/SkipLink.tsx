import { FONT_MONO } from '../shared/constants';

export function SkipLink() {
  const handleSkip = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] px-5 py-3 bg-white text-black font-mono text-xs tracking-wider rounded border border-black shadow-2xl focus:outline-none"
      style={{ fontFamily: FONT_MONO }}
    >
      Skip cinematic scroll to footer & contact
    </button>
  );
}
