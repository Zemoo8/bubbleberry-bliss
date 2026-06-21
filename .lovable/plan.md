# Booble La Marsa — Interactive Landing Page

A polished, sellable one-page site for **Booble La Marsa** (the real bubble tea shop in La Marsa, Tunis), modeled exactly on Dmitrii Mikhailov's "Matcha Tea UI — Interactive Landing Page" (the "midori" shot) on Dribbble — but reskinned to Booble's brand: fruity bubble tea instead of matcha, with their real data (rating, reviews, address, phone, hours).

## Reference lock

The Dribbble shot is the structural and stylistic spec. We copy its composition verbatim:
- Full-bleed dark colored "card" hero with chunky rounded corners and a subtle inner highlight ring
- Large hand-script wordmark dead-center ("Booble" replacing "midori")
- Minimal top nav: small logo left, 3–4 nav links center, a single pill CTA right
- Massive product cup floating to one side once you scroll/interact, with flavor selector chips that swap the cup color + label
- Big serif/script display type paired with a clean grotesk for body
- Generous negative space, single accent color per section, smooth scroll-driven transitions

Palette pivots from matcha-green to a warm fruity bubble-tea palette (deep berry, peach, lychee cream) since Booble is fruit/tea-forward, not matcha — confirmed by their menu (Mangue, Pêche, Fraise, Passion, Myrtille, Pomme, Lychee, Coco) and review notes ("fruity/tea drinks, not milk tea").

## Sections (single page, scroll story)

1. **Hero card** — Dark berry rounded panel, "Booble" script wordmark centered, tiny tagline "La Marsa · since the boba revolution", nav floating on top.
2. **Flavor playground** — Giant tilted cup centered, 8 flavor chips (Mangue, Pêche, Fraise, Passion, Myrtille, Pomme, Lychee, Coco). Clicking a chip morphs cup color, swaps the flavor name in huge type, and updates a short flavor note. This is the "interactive" beat from the reference.
3. **Why Booble** — 3 quiet cards: Real Taiwanese tea base · Fresh fruit purées (30–50% fruit) · Homemade tapioca (rose, vanilla, brown sugar, strawberry, chocolate). Pulled from the owner's own review responses.
4. **Reviews rail** — Horizontal marquee of 4–5 real Google reviews (Amine Bouamama, Aale Ataullah, Hisham B, Alexx Ke, delphine badard), each with the big "4.7 ★ · 152 reviews" stat anchored on the left.
5. **Visit us** — Address (2 Rue Imam Chafai, Marsa 2070), phone (21 187 136), hours teaser ("Opens 2 PM"), Plus Code (V8JJ+VR), service badges (Dine-in · Drive-through · Delivery). Simple map embed or stylized illustration of the storefront block.
6. **Footer** — Wordmark again, socials placeholder, copyright.

## Visual system

- **Colors** (tokens in `src/styles.css`, all oklch):
  - `--background`: warm off-cream
  - `--foreground`: deep espresso brown
  - `--primary`: deep berry / boba-burgundy (hero card + CTAs)
  - `--accent`: peach
  - `--accent-2`: lychee cream
  - Per-flavor accent variables swapped on chip click
- **Type**: Display = a romantic script (e.g. Caveat Brush or Allura) for the wordmark + flavor names; Body = Inter or DM Sans. Loaded via `<link>` in `__root.tsx` (Tailwind v4 rule).
- **Motion**: Framer Motion / Motion for React for chip → cup color crossfade, wordmark entrance, scroll-fade on sections. Nothing heavier (no WebGL, no 3D).

## Cup illustration

Generate the bubble tea cup as a PNG via `imagegen` (premium, transparent background) — a clean, slightly-tilted clear cup with visible boba pearls, straw, domed lid, soft studio shadow. One base image; flavor color comes from a tinted overlay so we don't regenerate 8 cups. Saved to `src/assets/`.

## Tech notes

- TanStack Start single route at `src/routes/index.tsx`, replacing the placeholder.
- Sections as components in `src/components/booble/` (Hero, FlavorPlayground, WhyBooble, Reviews, Visit, Footer).
- Reusable `<NavBar />` floating over the hero.
- All copy + reviews live in a typed `src/data/booble.ts` so the buyer can edit easily.
- SEO: `head()` with title "Booble — Bubble Tea La Marsa", meta description using the shop's pitch, og:image = the generated cup, JSON-LD `LocalBusiness` with address, phone, geo, rating 4.7 / 152 reviews.
- No backend needed (no Lovable Cloud) — pure marketing site.

## Out of scope

- Online ordering, cart, auth, CMS — this is a sales-ready static landing.
- Real Instagram embed (we'll leave a styled placeholder linking out, since no IG handle was provided).

Confirm and I'll build it.