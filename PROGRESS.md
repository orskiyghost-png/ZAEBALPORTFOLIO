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

- [ ] Vite + React + TypeScript project
- [ ] Dependencies: react-router-dom, motion, @fontsource packages
- [ ] Base path `/ZAEBALPORTFOLIO/`, router basename from `BASE_URL`
- [ ] `tokens.css`, `global.css`, fonts loaded
- [ ] Build passes

## Phase 2 — Shell

- [ ] App layout, route table, scroll restoration, page transitions
- [ ] Nav with progressive blur, desktop links, mobile sheet
- [ ] Footer, marquee, cursor, background grain and thread
- [ ] Motion primitives: reveal, split headline, magnetic button, parallax

## Phase 3 — Data and cards

- [ ] `src/data/projects.ts` typed, six projects from `CONTENT.md`
- [ ] Project card, cover image, metadata row, hover states
- [ ] Work index with filters

## Phase 4 — Pages

- [ ] Home: hero, marquee, selected work, capabilities, process, about teaser, CTA
- [ ] Work
- [ ] Project detail (dynamic route)
- [ ] About
- [ ] Contact
- [ ] 404

## Phase 5 — Assets

- [ ] Hero scarlet sculpture
- [ ] About portrait / figure
- [ ] Six project covers
- [ ] Favicon and social preview
- [ ] All images optimised, alt text in Russian

## Phase 6 — QA

- [ ] Responsive check 360 / 768 / 1280 / 1600
- [ ] Keyboard path, focus rings, contrast
- [ ] Reduced motion
- [ ] No console errors, no horizontal scroll
- [ ] Lighthouse pass

## Phase 7 — Deploy

- [ ] GitHub Actions Pages workflow
- [ ] `404.html` SPA fallback, `.nojekyll`
- [ ] Pages enabled with GitHub Actions source
- [ ] Live URL verified
- [ ] README with stack, structure, deploy notes

## Log

- 2026-11-16 — Directions, docs, skills, provider and MCP set up.
