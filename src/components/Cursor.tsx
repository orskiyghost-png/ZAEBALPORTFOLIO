import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useSpring } from 'motion/react';
import { usePointerFine, useReducedMotion } from '../lib/hooks';
import { springSnap, springSoft } from '../lib/motion';

export function Cursor() {
  const finePointer = usePointerFine();
  const reducedMotion = useReducedMotion();

  if (!finePointer || reducedMotion) return null;
  return <CursorDot />;
}

function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const x = useSpring(-100, springSoft);
  const y = useSpring(-100, springSoft);
  const scale = useSpring(1, springSnap);

  useMotionValueEvent(x, 'change', (value) => ref.current?.style.setProperty('--cursor-x', `${value}px`));
  useMotionValueEvent(y, 'change', (value) => ref.current?.style.setProperty('--cursor-y', `${value}px`));
  useMotionValueEvent(scale, 'change', (value) => ref.current?.style.setProperty('--cursor-scale', `${value}`));

  useEffect(() => {
    let positioned = false;
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        setVisible(false);
        return;
      }
      if (!positioned) {
        x.jump(event.clientX);
        y.jump(event.clientY);
        positioned = true;
      } else {
        x.set(event.clientX);
        y.set(event.clientY);
      }
      setVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      scale.set(target?.closest('a, button, [role="button"]') ? 2.5 : 1);
    };
    const hide = () => setVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);

    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, [scale, x, y]);

  return <div ref={ref} className="cursor" data-visible={visible} aria-hidden="true" />;
}
