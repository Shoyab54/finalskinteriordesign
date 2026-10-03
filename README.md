# SK Interior Design — Website

Premium interior design studio website for **SK Interior Design** (Andheri East, Mumbai).
A white + gold luxury theme with the brand's signature gold (#c9a86a), featuring a
cinematic hero, services, selected projects, a 107-frame filterable project gallery
with lightbox, client testimonials auto-slider, WhatsApp contact, Google Maps
location section and full SEO meta.

## Technology Stack

- **Frontend**: Vite + React 19 + TypeScript, Tailwind CSS v4, Motion (`motion/react`),
  Lenis smooth scrolling, react-router-dom, lucide-react icons
- **Backend** (optional): FastAPI + MongoDB (motor). The website itself is fully
  static — contact happens via WhatsApp / phone / email links, so no backend is
  required for the site to work.
- **Fonts** (self-hosted via Fontsource): Playfair Display Variable, Manrope Variable,
  IBM Plex Mono

## Features

- Hero with parallax image, staggered line reveals and gold cursor dot
- About section with company stats (12+ years, 160+ completed works)
- Services grid, selected-work slider with parallax cards
- Testimonials auto-slider (3 / 2 / 1 cards by viewport, loops, pauses on hover,
  swipe on touch, manual arrows + dots)
- Gallery page: 107 frames, category filters, masonry layout, keyboard- and
  swipe-enabled lightbox
- Project detail pages with story, materials, gallery and conceptual floor plan
- Floating WhatsApp button, click-to-call, email and Google Maps directions
- Responsive across desktop, laptop, tablet and mobile
- SEO: meta description, OpenGraph, JSON-LD LocalBusiness schema

## Project Structure

```
.
├── frontend/               # The website (Vite + React + TS)
│   ├── index.html          # SEO meta, favicons, JSON-LD
│   ├── public/
│   │   ├── gallery/        # 107 project frames (gallery-001..107.jpeg)
│   │   ├── logo.png        # Brand logo (gold crown SK monogram)
│   │   └── favicon.*
│   └── src/
│       ├── App.tsx         # Routes + scroll manager + cursor
│       ├── App.css         # Full design system (white + gold theme)
│       ├── data/site.ts    # All content: projects, gallery, testimonials, contact
│       ├── pages/          # Home, Gallery, ProjectDetail
│       └── components/     # Navbar, Footer, Lightbox, Testimonials, …
├── backend/                # Optional FastAPI + MongoDB service
│   ├── server.py
│   └── .env.example
└── vercel.json             # Vercel build config (SPA)
```

## Getting Started (VS Code)

Prerequisites: Node.js 20.19+ (or 22.12+) and Yarn 1.x (`npm install -g yarn`).

```bash
git clone <your-repo-url>
cd <repo-folder>

# install dependencies
yarn --cwd frontend install

# start the dev server  →  http://localhost:3000
yarn --cwd frontend dev
```

### Production build

```bash
yarn --cwd frontend build      # outputs static site to frontend/dist
yarn --cwd frontend preview    # serve the production build locally
```

## Environment Variables

The **frontend needs no environment variables** — it is a fully static site.

The optional backend reads `backend/.env` (never commit it — it is git-ignored).
Copy `backend/.env.example` and adjust:

| Variable       | Description                  |
| -------------- | ---------------------------- |
| `MONGO_URL`    | MongoDB connection string    |
| `DB_NAME`      | Database name                |
| `CORS_ORIGINS` | Allowed CORS origins (`*`)   |

## Deploying to Vercel (via GitHub)

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository.
3. No settings needed — the included root `vercel.json` installs and builds
   `frontend/` and publishes `frontend/dist`, with SPA rewrites so
   `/gallery` and `/projects/<slug>` work on refresh.
4. Deploy.

## GitHub checklist (already handled)

- `.gitignore` excludes `node_modules`, builds, logs and all `.env` files
- No API keys, secrets or credentials anywhere in the source
- Contact data (phone / WhatsApp / socials) is public business information,
  centralised in `frontend/src/data/site.ts`
