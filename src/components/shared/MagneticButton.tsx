import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { C, FONT_MONO } from './constants';
import { playSound } from '../../utils/audioEngine';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  dark?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
}

export function MagneticButton({ children, onClick, dark = true, className = '', type = 'button', size = 'md' }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useSpring(0, { stiffness: 180, damping: 22 });
  const y = useSpring(0, { stiffness: 180, damping: 22 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.14);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.14);
  };

  const padding = size === 'sm' ? 'px-4 py-3' : size === 'lg' ? 'px-8 py-4' : 'px-6 py-3.5';
  const fontSize = size === 'sm' ? 'text-[8px]' : 'text-[9px]';

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{
        x,
        y,
        fontFamily: FONT_MONO,
        backgroundColor: hovered ? (dark ? C.white : C.black) : 'transparent',
        borderColor: hovered ? (dark ? C.white : C.black) : dark ? 'rgba(242,241,236,0.25)' : 'rgba(10,10,9,0.25)',
        color: hovered ? (dark ? C.black : C.white) : dark ? C.white : C.black,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setHovered(true); playSound('hover'); }}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0); }}
      onClick={() => { playSound('click'); onClick?.(); }}
      className={`inline-flex min-h-11 items-center justify-center border font-mono font-semibold uppercase tracking-[0.2em] transition-all duration-500 focus-premium ${padding} ${fontSize} ${className}`}
    >
      {children}
    </motion.button>
  );
}
