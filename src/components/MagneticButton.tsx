import type { CSSProperties, MouseEventHandler, PointerEvent, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { animate, useMotionValue, useMotionValueEvent } from 'motion/react';
import { Link } from 'react-router-dom';
import { usePointerFine, useReducedMotion } from '../lib/hooks';
import { springSnap } from '../lib/motion';

interface MagneticButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const positionRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerFine = usePointerFine();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useMotionValueEvent(x, 'change', (value) => positionRef.current?.style.setProperty('--magnet-x', `${value}px`));
  useMotionValueEvent(y, 'change', (value) => positionRef.current?.style.setProperty('--magnet-y', `${value}px`));

  useEffect(() => {
    if (reducedMotion || !pointerFine) {
      x.jump(0);
      y.jump(0);
    }
  }, [pointerFine, reducedMotion, x, y]);

  const updatePosition = (event: PointerEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (reducedMotion || !pointerFine || event.pointerType === 'touch') return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    const distance = Math.hypot(offsetX, offsetY);
    const pull = distance === 0 ? 0 : Math.min(8, distance * 0.15) / distance;
    animate(x, offsetX * pull, springSnap);
    animate(y, offsetY * pull, springSnap);
  };

  const reset = () => {
    if (reducedMotion || !pointerFine) return;
    animate(x, 0, springSnap);
    animate(y, 0, springSnap);
  };

  const onEnter = (event: PointerEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (reducedMotion || !pointerFine || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const left = event.clientX - bounds.left;
    const top = event.clientY - bounds.top;
    const edges = [left, bounds.width - left, top, bounds.height - top];
    const edge = ['left', 'right', 'top', 'bottom'][edges.indexOf(Math.min(...edges))];
    event.currentTarget.dataset.entry = edge;
  };

  const common = {
    className: `magnetic-button ${className}`,
    'aria-label': ariaLabel,
    onPointerEnter: onEnter,
    onPointerMove: updatePosition,
    onPointerLeave: reset,
    onBlur: reset,
  };

  const label = (
    <>
      <span className="magnetic-button__fill" aria-hidden="true" />
      <span className="magnetic-button__label">{children}</span>
      <span className="magnetic-button__arrow" aria-hidden="true">↗</span>
    </>
  );

  return (
    <span className="magnetic-button-wrap" ref={ref}>
      <span
        ref={positionRef}
        className="magnetic-button-position"
        style={{ '--magnet-x': '0px', '--magnet-y': '0px' } as CSSProperties}
      >
        {to ? (
          <Link {...common} to={to}>{label}</Link>
        ) : href ? (
          <a {...common} href={href}>{label}</a>
        ) : (
          <button {...common} type={type} onClick={onClick}>{label}</button>
        )}
      </span>
    </span>
  );
}
