# Implementing the changes in your React app (bubbleberry-bliss)

Your site is React + TanStack Router + Tailwind, so these changes live in **2 code files** and **5 new images**. Everything here is a drop-in.

## 1. Add the new images
Copy these 5 files into `src/assets/` (next to your existing cup.png / fruit-*.png):

- `logo-mark-white.png`  → white pinwheel (header logo)
- `logo-mark-green.png`  → green pinwheel (footer logo)
- `logo-cup.png`         → black line-art cup stamp (on the cup + build preview)
- `cursor-nav-sm.png`    → boba arrow cursor (default)
- `cursor-hand-sm.png`   → boba hand cursor (hover on links/buttons)

(They're in the `assets/` folder of this download.)

## 2. Replace 2 files
- Replace `src/data/booble.ts`  with the `booble.ts` in this folder.
- Replace `src/routes/index.tsx` with the `index.tsx` in this folder.

## 3. Set your Glovo link
In `src/data/booble.ts`, change the `glovo` field (currently a placeholder
`https://glovoapp.com/tn/en/tunis/`) to Booble's exact Glovo store URL.

## 4. Run it
```
bun install      # if you haven't
bun run dev
```

## What changed
- **Build your cup** section: tea base (Jasmine / Black / Viet Coffee) → fruit syrup
  (the 8 flavors) → pearls (tapioca, popping, jelly), with a live cup preview, price,
  and an "Order on Glovo" button. (Flavor = syrup, drink = tea base, pearls = boba.)
- **Hero** auto-rotates through the top 3 flavors with left/right arrows for manual control,
  plus a "Now pouring · …" pill.
- **Boba cursors**: arrow on the page, hand pointer on hover over links/buttons.
- **Real Booble logo** (pinwheel) in header/footer and the cup stamp on the cup.
- Fixes: "since 2021", full weekly opening hours (Sun–Thu 2–9 PM, Fri–Sat 2–10 PM),
  working Instagram (@bubble_tea_booble_marsa) + Google Maps links, "230+ reviews".

## Notes
- The cursors are injected via a small `<style>` block inside the page component
  (using the imported PNG URLs) — no changes needed to `styles.css`.
- The component relies on the Tailwind utilities/animations you already have
  (animate-blob, animate-float-cup, animate-fruit-float, animate-marquee, font-display,
  bg-cream, text-ink, bg-ink, etc.) — all already defined in your `styles.css`.
