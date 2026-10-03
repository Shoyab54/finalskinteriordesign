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

Prerequisites: Node.js 20.19+ (or 22.12+) and npm.

```bash
git clone <your-repo-url>
cd <repo-folder>/frontend

# install dependencies
npm install

# start the dev server  →  http://localhost:3000
npm run dev
```

### Production build

```bash
cd frontend
npm run build      # outputs static site to frontend/dist
npm run preview    # serve the production build locally
```

## Environment Variables

The **frontend needs no environment variables** — it is a fully static site
(no VITE_* variables are used anywhere in the source).

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
3. In the project settings use exactly:

   | Setting          | Value           |
   | ---------------- | --------------- |
   | Root Directory   | `frontend`      |
   | Framework Preset | Vite            |
   | Install Command  | `npm install`   |
   | Build Command    | `npm run build` |
   | Output Directory | `dist`          |

4. Deploy. `frontend/vercel.json` adds the SPA rewrite, so refreshing
   `/gallery` or `/projects/<slug>` never returns a 404.

The site is fully static, so the FastAPI `backend/` is **not** required on
Vercel. If you ever want the backend API online, deploy it separately
(e.g. Render/Railway) — the website does not call it.

(Alternative: if you import the repo without setting a Root Directory, the
root-level `vercel.json` builds `frontend/` and publishes `frontend/dist`
automatically — both paths produce the same site.)

## GitHub checklist (already handled)

- `.gitignore` excludes `node_modules`, `dist`, builds, logs and all
  `.env` / `.env.*` files (while keeping `.env.example`)
- `frontend/package.json` + `frontend/package-lock.json` are committed and
  verified with a clean `npm install && npm run build`
- No API keys, secrets or credentials anywhere in the source
- Contact data (phone / WhatsApp / socials) is public business information,
  centralised in `frontend/src/data/site.ts`
