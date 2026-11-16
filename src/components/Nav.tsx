import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation, site } from '../data/site';
import { useLockBodyScroll, useReducedMotion } from '../lib/hooks';
import { motionTiming, springSoft } from '../lib/motion';

const clockFormatter = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Europe/Moscow',
});

export function Nav() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(() => clockFormatter.format(new Date()));
  const headerRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useLockBodyScroll(open);

  useEffect(() => {
    const interval = window.setInterval(() => setTime(clockFormatter.format(new Date())), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => { setOpen(false); }, [location.key]);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const blur = Math.min(1, Math.max(0, window.scrollY / 120)) * 24;
      headerRef.current?.style.setProperty('--nav-blur', `${blur}px`);
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const main = document.getElementById('main-content');
    const footer = document.getElementById('site-footer');
    main?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');

    const focusable = () => Array.from(sheetRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    ) ?? []);

    const frame = window.requestAnimationFrame(() => focusable()[0]?.focus());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && (document.activeElement === first || !sheetRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const media = window.matchMedia('(min-width: 64rem)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    document.addEventListener('keydown', keydown);

    return () => {
      window.cancelAnimationFrame(frame);
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      document.removeEventListener('keydown', keydown);
      media.removeEventListener('change', closeOnDesktop);
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <header className="nav" ref={headerRef}>
        <div className="nav__blur" aria-hidden="true" />
        <div className="nav__inner container">
          <Link className="nav__monogram" to="/" aria-label="Сурков Артём — главная">АС</Link>
          <nav className="nav__desktop" aria-label="Основная навигация">
            {navigation.map((item) => (
              <NavLink className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`} to={item.to} key={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav__meta">
            <a href={site.telegram} className="nav__telegram mono">Telegram <span aria-hidden="true">↗</span></a>
            <span className="nav__time mono" aria-label={`Время в Москве ${time}`}>
              <span>МСК</span> <time>{time}</time>
            </span>
          </div>
          <button
            className="nav__toggle mono"
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
          >
            Меню <span className="nav__toggle-mark" aria-hidden="true">+</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={sheetRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Навигация по сайту"
            initial={reducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={reducedMotion ? { duration: motionTiming.reduced } : springSoft}
          >
            <div className="mobile-menu__top">
              <span className="mono">Сурков Артём</span>
              <button className="mobile-menu__close mono" type="button" onClick={() => setOpen(false)}>
                Закрыть <span aria-hidden="true">×</span>
              </button>
            </div>
            <motion.nav
              className="mobile-menu__links"
              aria-label="Мобильная навигация"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : motionTiming.menuStagger } } }}
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.to}
                  variants={{
                    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
                    visible: reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: reducedMotion ? motionTiming.reduced : motionTiming.shift }}
                >
                  <NavLink to={item.to} onClick={() => setOpen(false)}>{item.label}</NavLink>
                </motion.div>
              ))}
            </motion.nav>
            <a className="mobile-menu__telegram" href={site.telegram}>Написать в Telegram <span aria-hidden="true">↗</span></a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
