import type { ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../lib/hooks';
import { pageTransition, reducedFade } from '../lib/motion';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const firstRoute = useRef(location.key);
  const currentRoute = useRef(location.key);
  currentRoute.current = location.key;

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }}
    >
      <motion.div
        key={location.pathname}
        className="page-transition"
        variants={reducedMotion ? reducedFade : pageTransition}
        initial="initial"
        animate="enter"
        exit="exit"
        onAnimationStart={(definition) => {
          if (definition === 'enter' && firstRoute.current !== currentRoute.current) {
            document.getElementById('main-content')?.focus({ preventScroll: true });
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
