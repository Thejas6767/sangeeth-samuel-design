import React from 'react';
import { motion } from 'framer-motion';
import { C, FONT_BODY, FONT_DISPLAY } from './constants';
import { Eyebrow } from './Eyebrow';

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}

const ease = [0.76, 0, 0.24, 1] as const;

export function SectionHeader({
  eyebrow,
  title,
  description,
  dark = true,
  align = 'left',
  className = '',
}: Props) {
  const isCenter = align === 'center';

  return (
    <div
      className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="mt-5"
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          letterSpacing: '-0.025em',
          lineHeight: 1.02,
          fontSize: 'clamp(1.8rem, 4.2vw, 3.4rem)',
          color: dark ? C.white : C.black,
        }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mt-6 max-w-2xl"
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(14px, 1.6vw, 16px)',
            lineHeight: 1.7,
            color: dark ? C.grey : '#57564f',
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
