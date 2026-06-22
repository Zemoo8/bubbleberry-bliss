# Implementing the changes in your React app (bubbleberry-bliss)

React + TanStack Router + Tailwind. These changes live in **2 code files** + a set of images.

## 1. Add the images
Copy every PNG in this `assets/` folder into your `src/assets/`:

- `logo-mark-white.png`  → white pinwheel (header + footer logo)
- `logo-cup.png`         → black line-art cup stamp (on the cup + build preview)
- `cursor-nav-sm.png`, `cursor-hand-sm.png` → boba cursors
- `menu-fraise.png`, `menu-caramel.png`, `menu-taro.png`, `menu-matcha.png`, `menu-choco.png`, `menu-mangue.png` → the 6 menu cups (cropped from the Booble poster)

## 2. Replace 2 files
- `src/data/booble.ts`   ← the `booble.ts` here (now holds all EN/FR copy in `TXT`, the menu, sizes, etc.)
- `src/routes/index.tsx` ← the `index.tsx` here

## 3. Set your Glovo link
In `src/data/booble.ts`, change `shop.glovo` (placeholder `https://glovoapp.com/tn/en/tunis/`) to Booble's exact Glovo store URL.

## 4. Run
```
$env:Path += ";C:\Users\GAMING\.bun\bin"   # if bun isn't on PATH
bun install
bun dev
```

## What's new in this version
- **EN / FR toggle** in the header — flips all copy (nav, hero, builder, menu, sections, footer). All strings live in `TXT` in `booble.ts`.
- **"New to boba?"** welcome band under the hero — 3 short lines.
- **Menu strip** between the builder and "Why us" — 6 bestsellers with photos + prices, "Bestseller" tag on Fraise Latte.
- **Builder** has a **size** step (Little 13 / Medium 16 / Big 20 DT); price depends only on size.
- **New footer** (dark): white pinwheel logo (no box), social links (Instagram / WhatsApp / Maps), a WhatsApp signup form, and a "We're hiring" line.

## Notes
- Copy text is bound through the `TXT` dictionary so the toggle can swap languages — edit wording there, not in the JSX.
- Relies on the Tailwind tokens/animations already in your `styles.css` (animate-blob, animate-float-cup, animate-fruit-float, animate-marquee, font-display, font-serif, bg-cream, text-ink, bg-ink, text-primary, bg-secondary, text-accent, etc.).
- The menu cups were cropped from the premium poster you sent. Swap in cleaner per-drink photos anytime by replacing the `menu-*.png` files.
