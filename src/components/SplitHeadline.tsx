import { motion } from 'motion/react';
import { useReducedMotion } from '../lib/hooks';
import { maskLineReveal, motionTiming } from '../lib/motion';

interface SplitHeadlineProps {
  lines: readonly string[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  accentLine?: number;
}

export function SplitHeadline({
  lines,
  as: Tag = 'h1',
  className = '',
  accentLine,
}: SplitHeadlineProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Tag className={`split-headline ${className}`} aria-label={lines.join(' ')}>
      <motion.span
        className="split-headline__lines"
        aria-hidden="true"
        initial={reducedMotion ? false : 'hidden'}
        animate="visible"
        transition={{ staggerChildren: reducedMotion ? 0 : motionTiming.headlineStagger }}
      >
        {lines.map((line, index) => (
          <span className="split-headline__mask" key={`${index}-${line}`}>
            <motion.span
              className={`split-headline__line${accentLine === index ? ' split-headline__line--accent' : ''}`}
              variants={reducedMotion ? undefined : maskLineReveal}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
