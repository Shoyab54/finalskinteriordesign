# PRD — SK Interior Design Website (White + Gold Redesign)

## Original problem statement
Recreate the client's existing Emergent-built website (from uploaded ZIP
`skinteriordesign-main.zip`) in this account, preserving ALL design, layout,
animations, pages, routes, components, gallery, filters, WhatsApp/contact
functionality, SEO and responsiveness — with ONE transformation: BLACK+GOLD →
WHITE+GOLD. The brand gold (#c9a86a) and the logo must remain exactly the same.
Also: update About Us with 12+ years experience / 160+ completed works, integrate
22 new images from a second ZIP into the gallery, add a premium testimonials
auto-slider (8 selected positive reviews, 3/2/1 cards, hover pause, swipe),
and make the project GitHub / VS Code / Vercel ready (.gitignore, .env.example,
README, vercel.json, successful production build).

## Architecture
- Frontend: Vite + React 19 + TypeScript (`/app/frontend`), Tailwind v4 shell +
  full custom design system in `src/App.css`, Motion (`motion/react`), Lenis,
  react-router-dom. Routes: `/`, `/gallery`, `/projects/:slug`.
- Backend: FastAPI template (`/app/backend/server.py`) — the site itself is fully
  static; contact is WhatsApp/phone/email/maps links. Backend kept for future use.
- Content single source: `frontend/src/data/site.ts` (projects, gallery meta
  wiring, testimonials, phone/socials/maps).
- Images: `frontend/public/gallery/gallery-001..107.jpeg` + `gallery-meta.json`
  (width/height per frame for masonry aspect ratios).

## User personas
- Prospective clients (homeowners/commercial) browsing work, reading reviews,
  contacting via WhatsApp.
- The studio owner (showcases portfolio; gold brand identity is non-negotiable).

## Core requirements (static)
- Gold #c9a86a preserved exactly; black theme converted to premium white/light.
- All original animations (hero reveals, parallax, marquee, hover, lightbox) kept.
- Responsive desktop/laptop/tablet/mobile.
- No secrets in repo; portable via GitHub → Vercel.

## Implemented
- 2026-10-03: Full port of the ZIP site into this environment (Vite+TS).
  White+gold transformation (bg #faf8f3 / #f1ede2, ink text; gold buttons,
  borders, icons, hovers unchanged; small gold text uses the original design's
  own light-section gold #9d7c42 / #98783f for legibility — mirrors the
  original's light sections). Logo file untouched.
- 2026-10-03: About Us rewritten with provided copy + stats row
  (12+ Years of Experience, 160+ Successfully Completed Works).
- 2026-10-03: Testimonials auto-slider (8 curated reviews: Hakimullah Khan,
  Pratham Daima, Kaif Khan, Dalpat Singh, Isha Patel, Adnan Syed, Salman Sallu,
  Rafeek Saif), 3/2/1 cards, loop, hover-pause, arrows + dots, touch swipe,
  hover scale 1.03, gold 5-star ratings.
- 2026-10-03: 22 new images optimized (EXIF-fixed, ≤1600px, q84) and added as
  gallery frames 086–107 with categories; counts updated to 107 everywhere.
- 2026-10-03: GitHub/Vercel readiness: .gitignore (.env covered), backend
  .env.example, root vercel.json (Vite SPA build + rewrites), full README.
- Verified: `yarn typecheck` clean, `yarn build` succeeds, /api curl OK,
  desktop + mobile screenshots of all pages/flows.

## Backlog
- P0: none
- P1: real contact form with email delivery (Resend) if the owner wants
  enquiries by email in addition to WhatsApp
- P1: replace showcase project write-ups (Obsidian House etc.) with real named
  projects once the owner provides details
- P2: blog/journal section, Instagram feed embed, per-project video walkthroughs

## Next tasks
- Owner review of white+gold theme and testimonial wording
- Deploy to Vercel from GitHub when ready
