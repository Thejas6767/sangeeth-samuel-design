import { motion, type MotionValue, useTransform } from 'framer-motion';
import logoImg from '../../../assets/logo/logo.webp';
import { FONT_MONO, SCROLL_TIMELINE } from '../../shared/constants';

interface Props {
  scrollYProgress: MotionValue<number>;
}

export function LogoEndOverlay({ scrollYProgress }: Props) {
  const { start, end } = SCROLL_TIMELINE.LOGO_END;
  const opacity = useTransform(scrollYProgress, [start, start + 0.015, end], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.985, 1]);
  const display = useTransform(scrollYProgress, (p) => (p >= start - 0.015 ? 'flex' : 'none'));

  return (
    <motion.div style={{ opacity, scale, display }} className="absolute inset-0 z-30 flex flex-col items-center justify-between bg-[#0A0A09] px-8 py-10 text-center sm:px-12 sm:py-12">

    </motion.div>
  );
}
