import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { C, FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../shared/constants';
import { MagneticButton } from '../shared/MagneticButton';
import type { TrophyItem } from '../shared/types';
import { playSound } from '../../utils/audioEngine';

interface Props {
  project: TrophyItem | null;
  onClose: () => void;
}

export function ArchiveModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
  className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(10,10,9,0.92)', backdropFilter: 'blur(18px)' }}
      onClick={() => {
        playSound('click');
        onClose();
      }}
    >
<motion.div
  initial={{ opacity: 0, y: 24, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
  className="relative max-w-4xl w-full bg-[#111110] border border-[#2d2d29] p-6 sm:p-10 overflow-y-auto max-h-[90vh] shadow-2xl rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-6 right-6 p-2 text-[#8C8C87] hover:text-white transition-colors cursor-pointer"
          aria-label="Close specification modal"
        >
          <X size={22} />
        </button>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-[#090908] p-6 flex items-center justify-center border border-[#232320] aspect-square">
            <img
              src={project.image}
              alt={project.title}
              className="max-h-[380px] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: C.grey,
              }}
            >
              {project.category.toUpperCase()} — {project.year}
            </div>

            <h3
              className="mt-3"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 900,
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                color: C.white,
                lineHeight: 1.05,
              }}
            >
              {project.title}
            </h3>

            <div
              className="mt-2 text-xs sm:text-sm tracking-wide"
              style={{ fontFamily: FONT_MONO, color: C.metal }}
            >
              COMMISSIONED BY: {project.client}
            </div>

            <p
              className="mt-6 text-sm"
              style={{ fontFamily: FONT_BODY, color: '#A09F98', lineHeight: 1.7 }}
            >
              {project.description}
            </p>

            <div className="mt-6 pt-6 border-t border-[#232320]">
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  color: C.grey,
                }}
              >
                MATERIALS & FINISH
              </div>
              <div className="mt-2 text-sm text-[#F2F1EC]" style={{ fontFamily: FONT_BODY }}>
                {project.materials}
              </div>
            </div>

            <div className="mt-8">
              <MagneticButton
                size="sm"
                onClick={() => {
                  playSound('click');
                  onClose();
                }}
              >
                CLOSE SPECIFICATION
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
