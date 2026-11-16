import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

export function useHeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reducedMotion) {
      element.style.removeProperty('--hero-image-y');
      element.style.removeProperty('--hero-headline-y');
      return;
    }

    let frame: number | null = null;
    const update = () => {
      frame = null;
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      element.style.setProperty('--hero-image-y', `${progress * -40}px`);
      element.style.setProperty('--hero-headline-y', `${progress * 24}px`);
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [reducedMotion]);

  return ref;
}

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    if (typeof window === 'undefined' || !window.matchMedia) return () => undefined;
    const media = window.matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  const getSnapshot = useCallback(
    () => typeof window !== 'undefined' && Boolean(window.matchMedia?.(query).matches),
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function usePointerFine(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0);
    };

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    observer?.observe(document.body);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer?.disconnect();
    };
  }, []);

  return progress;
}

let scrollLocks = 0;
let previousScrollLock: string | null = null;

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    if (scrollLocks === 0) {
      previousScrollLock = document.body.getAttribute('data-scroll-locked');
      document.body.setAttribute('data-scroll-locked', '');
    }
    scrollLocks += 1;

    return () => {
      scrollLocks -= 1;
      if (scrollLocks > 0) return;
      if (previousScrollLock === null) document.body.removeAttribute('data-scroll-locked');
      else document.body.setAttribute('data-scroll-locked', previousScrollLock);
    };
  }, [locked]);
}

type RevealCallback = (entry: IntersectionObserverEntry) => void;
const revealSubscribers = new Map<Element, Set<RevealCallback>>();
let revealObserver: IntersectionObserver | null = null;

function observeReveal(element: Element, callback: RevealCallback): () => void {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        revealSubscribers.get(entry.target)?.forEach((notify) => notify(entry));
      });
    }, { threshold: 0.25, rootMargin: '-10% 0px' });
  }

  const subscribers = revealSubscribers.get(element) ?? new Set<RevealCallback>();
  subscribers.add(callback);
  revealSubscribers.set(element, subscribers);
  revealObserver.observe(element);

  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0) {
      revealObserver?.unobserve(element);
      revealSubscribers.delete(element);
    }
    if (revealSubscribers.size === 0) {
      revealObserver?.disconnect();
      revealObserver = null;
    }
  };
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(once = true) {
  const [element, setElement] = useState<T | null>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();
  const ref = useCallback((node: T | null) => setElement(node), []);

  useEffect(() => {
    if (!element) return;
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    if (once && inView) return;

    return observeReveal(element, (entry) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      setInView((previous) => (once ? previous || visible : visible));
    });
  }, [element, inView, once, reducedMotion]);

  return { ref, inView: reducedMotion || inView };
}
