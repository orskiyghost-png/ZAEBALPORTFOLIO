# AGENTS.md

Instructions for any agent working on this repository. Read this file first, then `DESIGN.md`, `MOTION.md` and `CONTENT.md`.

## What this project is

Personal portfolio of Artem Surkov (Сурков Артём): web developer, automation engineer, app developer, AI engineer. One site, several pages, heavily animated, white paper and scarlet ink. The site is the product: it must demonstrate craft, not claim it.

Repository: https://github.com/orskiyghost-png/ZAEBALPORTFOLIO
Deployed at: https://orskiyghost-png.github.io/ZAEBALPORTFOLIO/
Telegram: https://t.me/bigth

## Hard rules

1. Never invent clients, testimonials, awards, revenue or usage metrics. Projects are labelled `Пет-проект`, `Концепт` or `Open source` in the data file. If a claim cannot be supported by the repository, cut it.
2. Palette is locked: paper white, ink black, scarlet accent, one neutral grey ramp. No second accent hue, no gradients on chrome, no glow.
3. Every animation must have a reason: feedback, spatial continuity or hierarchy. Motion specs live in `MOTION.md`; do not add ad-hoc durations.
4. Respect `prefers-reduced-motion`: content is always visible and readable without animation.
5. No text baked into generated images. Type is HTML.
6. All copy is Russian, typographic quotes `«»`, no emoji, no exclamation marks in body copy.
7. Any new file: commit and push immediately with a meaningful message.
8. Keep the repository buildable. `npm run build` must pass before a push.

## Stack

- Vite + React + TypeScript
- React Router (`basename` from `import.meta.env.BASE_URL`)
- Motion (formerly Framer Motion) for springs and orchestration
- Plain CSS with custom properties in `src/styles/tokens.css`; no UI framework
- Self-hosted fonts via `@fontsource` packages: Unbounded (display), Onest (text), JetBrains Mono (technical labels)

## Structure

```
src/
  components/   shared UI, motion primitives, layout
  data/         projects.ts and other typed content
  pages/        one file per route
  styles/       tokens.css, global.css
  lib/          hooks and helpers
public/         images, favicon, 404.html
.github/workflows/deploy.yml
```

## Conventions

- Components are named exports, one component per file, PascalCase filenames.
- Data is typed and lives in `src/data`; pages do not hardcode project facts.
- Class names are BEM-ish and scoped by block: `.work-card__title`.
- No inline styles except CSS custom properties for measured values (pointer position, progress).
- Use `rem` for type and spacing; `px` only for hairlines and blur radii.
- Every interactive element has a visible focus ring and a keyboard path.
- Images: AVIF/WebP, explicit `width`/`height`, `loading="lazy"` below the fold, `alt` in Russian.

## Verification before push

```bash
npm run build
npx tsc --noEmit
```

Then check in a browser: no horizontal scroll at 360, 768, 1280, 1600 px; all routes reachable; reduced motion honoured; no console errors.

## Agent workflow

- `PROGRESS.md` is the single source of truth for status. Update it when a phase changes, not after every command.
- Work autonomously: pick the next unchecked item, finish it, verify, commit, push.
- Do not stop to ask for visual approval. Decisions already made are in the docs; make new ones in the same direction.
- When a decision changes the design system, update `DESIGN.md` in the same commit.
