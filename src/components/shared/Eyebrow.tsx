import React from 'react';
import { C, FONT_MONO } from './constants';

interface Props { children: React.ReactNode; dark?: boolean; }

export function Eyebrow({ children, dark = true }: Props) {
  return (
    <div className="inline-flex items-center gap-3 uppercase" style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.2em', color: dark ? C.grey : '#6B6B67' }}>
      <span className="h-px w-6 bg-current opacity-45" />
      {children}
    </div>
  );
}
