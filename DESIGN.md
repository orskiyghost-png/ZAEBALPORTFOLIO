# DESIGN.md

## Direction

**Print works, precision instruments.** The site behaves like a proof sheet from a print studio that happens to run code: paper white, ink black, scarlet registration marks, crop marks, grid coordinates, monospaced annotations, and one oversized display face. Richness goes into type, composition and a small number of rendered scarlet objects. Chrome stays quiet.

This is the opposite of the usual developer portfolio: no dark hero with floating glass cards, no purple gradient, no emoji labels, no "passionate about" copy. The page looks like a designed object with a spine.

Three references held in mind: Swiss editorial layout, Japanese print registration sheets, and Apple's spatial motion language.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#F7F4EF` | page background |
| `--paper-raised` | `#FFFDF9` | cards, sheets |
| `--ink` | `#141110` | primary text |
| `--ink-soft` | `#4A443F` | secondary text |
| `--ink-faint` | `#8C847C` | captions, metadata |
| `--line` | `#DED7CD` | hairlines, rules |
| `--scarlet` | `#E01B0B` | accent, marks, links, focus |
| `--scarlet-deep` | `#A81105` | pressed states |
| `--scarlet-wash` | `#FBE9E6` | rare accent surface |

Rules:

- Scarlet is an event, not a theme. One scarlet element per viewport is the target; two is the ceiling.
- Scarlet never carries long text. It marks, underlines, numbers, and single words.
- No gradients between paper and scarlet. Flat fills only. The only gradient allowed is the progressive blur mask, which is paper-coloured.
- Contrast: `--ink` on `--paper` is 15.9:1; `--scarlet` on `--paper` is 4.9:1 — fine for large text and marks, never for body copy.

## Typography

| Role | Family | Weight | Size range | Notes |
| --- | --- | --- | --- | --- |
| Display | Unbounded | 500–700 | `clamp(3rem, 12vw, 11rem)` | tight tracking `-0.04em`, line-height `0.86`, uppercase for headlines |
| Text | Onest | 400–600 | `1rem`–`1.5rem` | line-height `1.55`, max 62ch |
| Technical | JetBrains Mono | 400–500 | `0.6875rem`–`0.8125rem` | uppercase, tracking `0.12em`, used for labels, indices, coordinates |

Type rules:

- Display type is set in short lines, never centred, aligned to the grid's left edge.
- One italic accent per viewport maximum; Unbounded has no italic, so the accent is achieved with scarlet, not slant.
- Numbers in metadata use tabular figures.
- Cyrillic hyphenation is not forced; use `text-wrap: balance` on headlines and `pretty` on paragraphs.
- Never set body copy in mono. Never set a headline in Onest.

## Grid and spacing

- 12-column grid, `24px` gutter, page padding `clamp(20px, 4vw, 72px)`.
- Content max width `1440px`; editorial text max `720px`.
- Spacing scale (rem): `0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 12, 16`.
- Section rhythm: `clamp(96px, 14vh, 200px)` vertical.
- Hairlines are `1px` and always `--line`; never pure black.
- Registration marks and crop marks sit in the page margin, aligned to the grid, `opacity: 0.5`.

## Surfaces

- Cards are paper on paper, separated by a hairline and a small vertical offset, not by shadow.
- One shadow token only: `0 24px 60px -32px rgb(20 17 16 / 0.28)`, used for the lifted project card on hover.
- Blur is used in two places only: the progressive-blur nav edge and the image hover overlay.
- Border radius: `2px` on cards and inputs, `999px` on pills and buttons. Nothing in between.

## Components

**Nav** — fixed top bar, paper tint over a progressive blur mask. Left: monogram `АС` in a scarlet square. Centre: route links with a scarlet rule that grows from the active item. Right: Telegram link and a local-time chip. Mobile: full-screen sheet with staggered links, closes on route change and Escape.

**Hero** — oversized name, broken across two lines, one word in scarlet. A rendered scarlet sculpture sits behind or beside it, masked by the type. Bottom row: role list in mono, a scroll cue, and the proof-sheet coordinates.

**Project card** — full-bleed index number, title in display, one-line problem statement, stack in mono, cover image with a slow scale on hover. Hover lifts the card `-6px` and turns the index scarlet.

**Marquee** — one line of mono text and scarlet asterisks, `28s` linear loop, pauses on hover, hidden from screen readers.

**Buttons** — pill, ink fill on paper, scarlet fill on hover with a `2px` inner offset. Magnetic pull capped at `8px`. Arrow moves `4px` on hover.

**Footer** — large "Напишите" line, Telegram as the only primary action, sitemap in mono, copyright with the current year, and a scarlet registration mark.

## Page recipes

- **Home** — hero, marquee, selected work (3), capabilities, process (4 steps), about teaser, CTA.
- **Work** — index header, filter by type, six project rows with covers.
- **Project** — cover, fact table, problem, approach, three design decisions, stack, result, next project.
- **About** — editorial portrait, timeline, tools, principles, CTA.
- **Contact** — availability, Telegram, email, response time, FAQ of three questions.
- **404** — one line, a scarlet mark, link home.

## Anti-slop checklist

Before shipping any screen, confirm:

- No purple, no gradient text, no glassmorphism cards, no glow.
- No emoji in labels.
- No centred hero paragraph.
- No three equal feature cards with icons in a row.
- No fake numbers, logos or testimonials.
- Every spacing value comes from the scale.
- The screen has one memorable moment, and it is content, not chrome.
