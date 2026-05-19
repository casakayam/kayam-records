# Kayam Records — Landing Page

Music residency studio website for Kayam Records, Guatapé, Colombia.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7, Tailwind CSS 4
- **UI Components**: Radix UI, Framer Motion, Lucide React
- **Backend**: Node.js + Express (static SPA server)
- **Routing**: Wouter

## Requirements

- Node.js >= 20.19 (or 22.12+)
- npm >= 9 (or pnpm, yarn)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Development server (hot reload on http://localhost:3000)
npm run dev

# 3. Production build
npm run build

# 4. Start production server
npm start
```

## Project Structure

```
├── client/
│   ├── public/
│   │   └── assets/          # All images and static assets
│   └── src/
│       ├── components/       # React components
│       │   ├── ui/           # Radix UI base components
│       │   ├── Hero.tsx
│       │   ├── WhyChoosingKayam.tsx
│       │   ├── Services.tsx
│       │   ├── Accommodation.tsx
│       │   ├── BuildPackage.tsx
│       │   ├── Header.tsx
│       │   ├── Footer.tsx
│       │   ├── Testimonials.tsx
│       │   └── VideoSection.tsx
│       ├── contexts/         # Language + Theme context
│       ├── hooks/            # Custom React hooks
│       ├── pages/            # Page components (Home, NotFound)
│       ├── index.css         # Global styles + Tailwind
│       └── main.tsx          # App entry point
├── server/
│   └── index.ts             # Express server (serves built SPA)
├── shared/
│   └── const.ts             # Shared constants
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Environment Variables

Copy `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |

## Assets

All images are in `client/public/assets/`. They are served at `/assets/*` in the browser.

## Languages

The site supports **English** and **Spanish**. Language strings are managed in `client/src/contexts/LanguageContext.tsx`.

## Brand Colors

| Name | Hex |
|---|---|
| Beige | `#e4e2dd` |
| Orange | `#e63f0a` |
| Forest | `#074242` |
| Ink | `#1a1a1a` |

## Typography

- **Anton** — Display headings
- **Allura** — Script/cursive accents
- **Akshar** — Body text
- **DM Mono** — Monospace details

Fonts are loaded via Google Fonts in `client/index.html`.
