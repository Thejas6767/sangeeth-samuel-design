
import { motion, type Variants } from 'framer-motion';
import { ARCHIVE_PROJECTS, PROCESS_STEPS } from './types';
const ease = [0.76, 0, 0.24, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

export function AnimatedArchiveGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      {ARCHIVE_PROJECTS.map((trophy) => (
        <motion.div
          key={trophy.id}
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3, ease }}
          className="group relative overflow-hidden rounded-2xl border border-white/20 bg-black/85 p-6 shadow-2xl backdrop-blur-md"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold tracking-widest text-amber-400">
                0{trophy.index} // {trophy.year}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] text-white">
                {trophy.category}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-black text-white drop-shadow-md">
              {trophy.title}
            </h3>

            <p className="mt-1 font-mono text-xs text-white/70">
              {trophy.client}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/90">
              {trophy.description}
            </p>

            <div className="mt-6 border-t border-white/10 pt-4">
              <span className="font-mono text-[10px] font-semibold text-white/60">
                MATERIALS: {trophy.materials}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function AnimatedProcessGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      {PROCESS_STEPS.map((step, idx) => (
        <motion.div
          key={step.id}
          variants={cardVariants}
          whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.4)' }}
          transition={{ duration: 0.3, ease }}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-black/85 p-8 shadow-2xl backdrop-blur-md"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold tracking-widest text-white/50">
                PHASE 0{idx + 1}
              </span>

              <div className="flex gap-2">
                {step.labels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="mt-6 text-xl font-black text-white">
              {step.title}
            </h3>

            <p className="mt-1 font-mono text-xs font-semibold text-amber-400">
              {step.subtitle}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {step.body}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}