import { motion } from 'motion/react';
import { useReducedMotion, useReveal } from '../lib/hooks';
import { easeOut, motionTiming } from '../lib/motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  eager?: boolean;
  className?: string;
}

export function ImageReveal({ src, alt, width, height, caption, eager = false, className = '' }: ImageRevealProps) {
  const { ref, inView } = useReveal<HTMLElement>();
  const reducedMotion = useReducedMotion();

  return (
    <figure ref={ref} className={`image-reveal ${className}`}>
      <div className="image-reveal__mask">
        <motion.img
          src={`${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          initial={reducedMotion ? false : { scale: 1.06 }}
          animate={{ scale: inView || reducedMotion ? 1 : 1.06 }}
          transition={{ duration: motionTiming.page, ease: easeOut }}
        />
        {!reducedMotion && (
          <motion.span
            className="image-reveal__shutter"
            aria-hidden="true"
            initial={{ y: '0%' }}
            animate={{ y: inView ? '-101%' : '0%' }}
            transition={{ duration: motionTiming.page, ease: easeOut }}
          />
        )}
      </div>
      {caption && <figcaption className="image-reveal__caption mono">{caption}</figcaption>}
    </figure>
  );
}
