# Booble — Bubble Tea Landing Page

Interactive one-page website for **Booble**, a bubble-tea shop in La Marsa, Tunis.

## Features

- Scroll-driven landing page with an animated hero
- **Flavor selector**: pick a flavor (mango, peach, strawberry, passion fruit, lychee...) and the cup, colors and tasting notes change with it
- **English / French** toggle
- Mobile-first, responsive layout
- Deployed on Vercel

## Tech stack

React · TypeScript · TanStack Start · Vite · Tailwind CSS · shadcn/ui · Vercel

## Run locally

```bash
bun install      # or: npm install
bun run dev      # or: npm run dev
```

Other scripts: `build`, `preview`, `lint`, `format`.

## Editing content

Flavors, copy and translations live in `src/data/booble.ts`. The page itself is `src/routes/index.tsx`.
