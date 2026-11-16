# PROGRESS.md

Living status file. Update when a phase changes.

## Phase 0 — Setup

- [x] Repository cloned, `main` tracked
- [x] Skills installed into `.agents/skills/` (`apple-design`, `frontend-design`, `copywriting`, `marketing-psychology`, `animation-vocabulary`, `improve-animations`, `review-animations`, `web-design-guidelines`)
- [x] Naïve provider verified (`naive-openai/openai/gpt-6.1-sol`, high reasoning)
- [x] Naïve MCP connected (381 tools)
- [x] Design direction, content, motion and tokens documented
- [ ] Node toolchain pinned, lockfile committed

## Phase 1 — Scaffold

- [x] Vite + React + TypeScript project
- [x] Dependencies: react-router-dom, motion, @fontsource packages
- [x] Base path `/ZAEBALPORTFOLIO/`, router basename from `BASE_URL`
- [x] `tokens.css`, `global.css`, fonts loaded
- [x] Build passes

## Phase 2 — Shell

- [x] App layout, route table, scroll restoration, page transitions
- [x] Nav with progressive blur, desktop links, mobile sheet
- [ ] Footer, marquee, cursor, background grain and thread
  - [x] Footer, marquee, cursor, background grain, scroll progress
  - [ ] Scarlet thread
- [ ] Motion primitives: reveal, split headline, magnetic button, parallax
  - [x] Reveal, split headline, magnetic button, shared reveal observer
  - [x] Parallax

## Phase 3 — Data and cards

Current phase: all page compositions are implemented and browser-verified. Remaining work is asset optimisation, deployment verification and the explicitly unchecked polish below. Implementation plan: `docs/superpowers/plans/2026-11-16-PAGES.md`.

- [x] `src/data/projects.ts` typed, six projects from `CONTENT.md`
- [x] Project card, cover image, metadata row, hover states
- [x] Work index with filters

## Phase 4 — Pages

- [x] Home: hero, marquee, selected work, capabilities, process, about teaser, CTA
- [x] Work
- [x] Project detail (dynamic route)
- [x] About
- [x] Contact
- [x] 404

## Phase 5 — Assets

- [x] Hero scarlet sculpture
- [x] About portrait / figure
- [x] Six project covers
- [ ] Favicon and social preview
- [ ] All images optimised, alt text in Russian

## Phase 6 — QA

- [x] Responsive check 360 / 768 / 1280 / 1600
- [ ] Keyboard path, focus rings, contrast
  - [x] Keyboard navigation, focus rings, focus-equivalent project preview, mobile menu Escape and focus restoration
  - [ ] Full contrast audit
- [x] Reduced motion
- [x] No console errors, no horizontal scroll
- [ ] Lighthouse pass

## Phase 7 — Deploy

- [ ] GitHub Actions Pages workflow
- [ ] `404.html` SPA fallback, `.nojekyll`
- [ ] Pages enabled with GitHub Actions source
- [ ] Live URL verified
- [ ] README with stack, structure, deploy notes

## Log

- 2026-11-16 — Directions, docs, skills, provider and MCP set up.
- 2026-11-16 — Scaffold and shared shell built. All routes have minimal real content. `npm run build` and `npx tsc --noEmit` pass. Chromium checks cover twelve route cases at 360, 768, 1280, and 1600px, keyboard navigation, mobile focus containment, scroll restoration, progressive blur, and reduced motion. No console or network errors. Project slugs were assigned; decision bodies absent from `CONTENT.md` remain empty. Full page content, artwork, scarlet thread, and parallax remain for later phases.
- 2026-11-16 — Replaced all six placeholder pages with full editorial compositions. Fixed all six JPEG paths and the `tihiy-chas` slug, completed decision bodies, added honest project questions and concept notes. Home includes selected projects, capabilities, process, about teaser, CTA and clamped one-frame hero counter-parallax. Work has counted filters, including research concepts; details have five facts, three decisions and cycling next-project links. Contact uses Telegram only, clipboard feedback and native FAQ. Build and strict TypeScript pass. Chromium verified twelve route cases at 360/768/1280/1600, all image requests, filter counts 6/2/3/1, keyboard project preview, next-project cycling, clipboard success/failure, native disclosures, mobile menu Escape and reduced motion. Parallax clamps at -40px/+24px; reduced motion removes transforms and image shutters. Screenshots saved under `/tmp/opencode/`; this environment cannot visually inspect image inputs. Lighthouse, a full contrast audit, image format optimisation and live deployment verification remain unchecked.
