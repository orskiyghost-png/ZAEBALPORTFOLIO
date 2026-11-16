import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion, useReveal } from '../lib/hooks';
import { fadeUp } from '../lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  const { ref, inView } = useReveal();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      data-reveal=""
      variants={reducedMotion ? undefined : fadeUp}
      initial={reducedMotion ? false : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}
