# MOTION.md

Motion rule: **respond, don't perform.** Every animation starts from the value on screen, runs on a spring where it can be interrupted, and never delays the next action.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | entrances, reveals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | exits, crossfades |
| `--dur-1` | `140ms` | hover, focus, tap feedback |
| `--dur-2` | `260ms` | small layout shifts, menu items |
| `--dur-3` | `520ms` | section reveals |
| `--dur-4` | `900ms` | page transitions, image masks |
| spring-soft | `{ stiffness: 170, damping: 22, mass: 0.9 }` | cards, panels |
| spring-snap | `{ stiffness: 420, damping: 30, mass: 0.6 }` | buttons, toggles |

No animation longer than `900ms`. No bounce with damping below `20`. No infinite animation except the marquee and the hero drift, both disabled under reduced motion.

## Page transitions

Route change: current page drops `opacity` to `0` and `scale` to `0.99` over `180ms`; incoming page rises from `y: 18px`, `opacity: 0` to rest over `520ms` with `--ease-out`. Scroll resets to top before the incoming page is revealed. Shared header never animates.

## Entrances

- **Split headline** — lines rise from `y: 110%` inside an overflow-hidden mask, `stagger: 0.07`, `520ms`, `--ease-out`. Words, not letters: letter-by-letter is noise.
- **Body copy** — `opacity 0 → 1`, `y: 12px`, triggered at `amount: 0.3`, once.
- **Images** — a paper shutter translates from `y: 0%` to `-101%` inside a static `clip-path: inset(0)` boundary, `900ms`, plus a `scale: 1.06 → 1` settle. Clip-path itself never animates.
- **Rules and marks** — width or path length grows in `520ms`. Registration marks fade in last, `80ms` after the section.

## Interaction

- **Buttons** — magnetic pull toward the pointer, capped at `8px`, spring-snap; fill sweeps from the pointer entry side; label shifts `2px`.
- **Links** — underline draws from left in `140ms`; active route keeps a `2px` scarlet rule.
- **Cards** — hover lifts `-6px` with spring-soft, image scales `1.04` over `600ms`, index number flips to scarlet, metadata slides `4px`.
- **Nav** — progressive blur increases with scroll distance, `0 → 24px`, mapped over the first `120px` of scroll. No jump.
- **Menu (mobile)** — sheet opens from the pointer side with spring-soft; links stagger `0.05`; backdrop fades `200ms`; Escape reverses exactly.
- **Cursor** — optional scarlet dot on pointer-fine devices, grows over links. Never replaces the system cursor. Hidden on touch and under reduced motion.

## Scroll

- **Hero parallax** — sculpture translates `0 → -40px` and headline `0 → 24px` across the first viewport; clamped, no jitter.
- **Progress** — a `2px` scarlet bar at the very top shows page scroll progress.
- **Sticky headings** — project sections keep the section label sticky for the duration of the block.
- **Reveal** — one IntersectionObserver per page via a shared hook; `threshold: 0.25`, `rootMargin: -10% 0px`.

## Background

- Paper grain: a static SVG noise at `opacity: 0.035`, never animated.
- Scarlet thread: a single SVG curve that draws on load and drifts `±10px` with pointer position, `spring-soft`. Disabled on touch and reduced motion.
- Grid: a hairline grid revealed only inside the hero, fading out downward.

## Reduced motion

`prefers-reduced-motion: reduce` means:

- All transforms become `none`; opacity transitions limited to `150ms`.
- Marquees stop and become static rows.
- Parallax and magnetic pull disabled; pointer handlers return early.
- Page transitions become a `150ms` fade.
- Nothing depends on animation to become visible.

## Performance

- Animate only `transform` and `opacity`; never `top`, `left`, `filter` in loops.
- Blur values are static per element; scroll-mapped blur is updated in one `requestAnimationFrame`.
- `will-change` only on elements that are actively animating; removed after.
- No more than 12 concurrently animating elements.
- Images decode off the main thread; covers use `content-visibility: auto` below the fold.
