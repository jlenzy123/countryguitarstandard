# Country Guitar Standard — Site Plan

## What you're building

1. **Songwriting template** — Free PDF to capture ideas, verses, structure, and Nashville numbers.
2. **Shop & Guides** — Song guides, artist deep dives, industry reports, and album/tab PDFs available for purchase.
3. **Chord progression tool** — Browse progressions in any key or get suggestions based on chords you’re playing.

---

## Site structure

| Page | Purpose |
|------|--------|
| **/** | Landing: value prop, link to template, shop, and chord tool. |
| **/songwriting** | Songwriting template (download or embed) + short copy. |
| **/shop** | List of country albums (PDFs). Each links to Gumroad/Lemon Squeezy. |
| **/chord-tool** | Generate chord progressions (key + country style); later: “search song” → suggest chords + “get full tab in our shop”. |

---

## Tools

- **Chord progression tool**  
  Browse dozens of progressions in every key, or enter the chords you're playing and get suggestions for what often follows. 

- **More tools coming** (Nashville Number cheat sheet, songwriting template, etc.)

---

## Tech stack (no budget)

- **Framework:** Next.js (deploy free on Vercel).
- **Styling:** Tailwind CSS.
- **Payments:** Gumroad or Lemon Squeezy (per-product links; no backend).
- **Songwriting template:** Host as PDF (e.g. in `/public`) or link to Notion/Google Doc.

---

## Content you’ll add

- Copy for landing, songwriting, and shop pages.
- Songwriting template PDF (or Notion link).
- Shop: one product per album (title, image, short description, link to Gumroad/Lemon Squeezy).
- Chord tool: expand progression bank for “country” (and optionally more styles later).

---

## Deploy

```bash
npm install
npm run dev
```

Then connect the repo to Vercel and deploy. Point a domain later if you want.
