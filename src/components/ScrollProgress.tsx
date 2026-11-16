import type { CSSProperties } from 'react';
import { useScrollProgress } from '../lib/hooks';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      style={{ '--scroll-progress': progress } as CSSProperties}
      aria-hidden="true"
    />
  );
}
