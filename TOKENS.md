# TOKENS.md

Exact values. `src/styles/tokens.css` is the implementation; this file explains intent.

## Colour

```css
--paper: #F7F4EF;
--paper-raised: #FFFDF9;
--ink: #141110;
--ink-soft: #4A443F;
--ink-faint: #8C847C;
--line: #DED7CD;
--line-strong: #C4BAB0;
--scarlet: #E01B0B;
--scarlet-deep: #A81105;
--scarlet-wash: #FBE9E6;
--selection: #E01B0B;
```

## Type

```css
--font-display: "Unbounded", "Arial Black", sans-serif;
--font-text: "Onest", "Helvetica Neue", Arial, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;

--step--1: 0.75rem;
--step-0: 1rem;
--step-1: 1.1875rem;
--step-2: 1.5rem;
--step-3: clamp(1.75rem, 2.4vw, 2.25rem);
--step-4: clamp(2.25rem, 4vw, 3.5rem);
--step-5: clamp(3rem, 7vw, 5.5rem);
--step-6: clamp(3.5rem, 12vw, 9rem);
```

## Space

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.5rem;
--space-6: 2rem;
--space-7: 3rem;
--space-8: 4rem;
--space-9: 6rem;
--section: clamp(6rem, 14vh, 12rem);
--gutter: clamp(1.25rem, 4vw, 4.5rem);
--max: 1440px;
--measure: 62ch;
```

## Motion

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--dur-1: 140ms;
--dur-2: 260ms;
--dur-3: 520ms;
--dur-4: 900ms;
```

Springs live in `src/lib/motion.ts`:

```ts
export const springSoft = { type: "spring", stiffness: 170, damping: 22, mass: 0.9 };
export const springSnap = { type: "spring", stiffness: 420, damping: 30, mass: 0.6 };
```

## Layers

```css
--z-base: 1;
--z-grid: 2;
--z-content: 3;
--z-nav: 40;
--z-menu: 50;
--z-cursor: 60;
```

## Radii and borders

```css
--radius-sm: 2px;
--radius-pill: 999px;
--hairline: 1px solid var(--line);
--shadow-lift: 0 24px 60px -32px rgb(20 17 16 / 0.28);
```
