import type { Variants } from 'motion/react';

export const springSoft = { type: 'spring', stiffness: 170, damping: 22, mass: 0.9 } as const;
export const springSnap = { type: 'spring', stiffness: 420, damping: 30, mass: 0.6 } as const;
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const motionTiming = {
  feedback: 0.14,
  shift: 0.26,
  reveal: 0.52,
  page: 0.9,
  pageExit: 0.18,
  reduced: 0.15,
  headlineStagger: 0.07,
  menuStagger: 0.05,
  backdrop: 0.2,
} as const;

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 18, scale: 1 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: motionTiming.reveal, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: { duration: motionTiming.pageExit, ease: easeInOut },
  },
};

export const maskLineReveal: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: motionTiming.reveal, ease: easeOut },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTiming.reveal, ease: easeOut },
  },
};

export const reducedFade: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: motionTiming.reduced } },
  exit: { opacity: 0, transition: { duration: motionTiming.reduced } },
};
