# ZAEBALPORTFOLIO

Personal portfolio of Artem Surkov (Сурков Артём): web developer, automation engineer, app developer, AI engineer.

Live: https://orskiyghost-png.github.io/ZAEBALPORTFOLIO/
Telegram: https://t.me/bigth

## What it is

A multi-page animated portfolio built as a designed object, not a template: paper white, ink black, scarlet registration marks, display typography, technical grid. Each section has its own route, motion plan and layout. Projects are labelled honestly as pet projects, concepts or open source; there are no invented clients, awards or metrics.

## Stack

- Vite, React 19, TypeScript
- React Router with a base path for GitHub Pages
- Motion for springs, page transitions and reveals
- Plain CSS with design tokens; no UI framework
- Self-hosted Unbounded, Onest and JetBrains Mono via `@fontsource`

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, selected work, capabilities, process, about teaser, contact CTA |
| `/work` | Project index with type filters |
| `/work/:slug` | Case study: cover, facts, problem, approach, decisions, next project |
| `/about` | Editorial profile, timeline, principles, tools |
| `/contact` | Telegram, availability, FAQ |
| `*` | 404 |

## Structure

```
src/
  components/   layout, navigation, motion primitives, cards
  data/         projects.ts, site.ts
  lib/          hooks and spring definitions
  pages/        one component per route
  styles/       tokens.css, global.css, app.css, fonts.css
public/
  assets/       generated scarlet still lifes and project covers
  .nojekyll
.github/workflows/deploy.yml
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

The build runs `tsc --noEmit` first, then Vite. Output goes to `dist/`.

## Deploy

Push to `main`. The GitHub Actions workflow builds the site, copies `dist/index.html` to `dist/404.html` for SPA routing, and publishes to GitHub Pages. In repository settings, Pages source must be **GitHub Actions**.

Base path is `/ZAEBALPORTFOLIO/`; the router derives its basename from `import.meta.env.BASE_URL`.

## Design documentation

- `DESIGN.md` — direction, colour, type, grid, components, page recipes
- `MOTION.md` — durations, springs, page transitions, reduced motion
- `CONTENT.md` — copy deck and project facts
- `TOKENS.md` — exact CSS values
- `AGENTS.md` — rules for anyone (human or agent) changing the site
- `PROGRESS.md` — build status
