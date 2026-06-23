# Booble — La Marsa · Website

A single-page site for Booble bubble tea: animated hero flavor carousel, a
build-your-own-cup configurator, menu, reviews, and visit info. EN / FR toggle.

## Files

```
booble-website/
├── index.html      ← page structure (all sections, French toggle, smooth-scroll nav)
├── style.css       ← all styles, card designs, hero crossfade transitions
├── script.js       ← flavor switching, configurator, language toggle
└── assets/         ← logo, cup, fruit + menu photos, gallery photos, cursors
```

Keep all four together. `index.html` references `style.css`, `script.js`, and the
`assets/` folder by relative path, so the folder must stay intact.

---

## Run it locally in VSCode (step by step)

You need a *local server* — opening `index.html` by double-clicking can block
some browser features. The easiest server is the **Live Server** extension.

1. **Install VSCode** — https://code.visualstudio.com (skip if you have it).
2. **Save this folder** somewhere easy, e.g. `Documents/booble-website`.
   Make sure `index.html`, `style.css`, `script.js`, and the `assets/` folder
   are all inside it.
3. **Open the folder in VSCode**: `File → Open Folder…` and pick the
   `booble-website` folder (open the *folder*, not just the file).
4. **Install Live Server**:
   - Click the **Extensions** icon in the left sidebar (the four-squares icon),
     or press `Cmd+Shift+X` (Mac) / `Ctrl+Shift+X` (Windows).
   - Search for **Live Server** (by Ritwick Dey) and click **Install**.
5. **Start the server**: right-click `index.html` in the file explorer and
   choose **“Open with Live Server”** — or click **“Go Live”** in the bottom-right
   status bar.
6. Your browser opens at something like `http://127.0.0.1:5500/index.html`.
   That's the site running locally.

**Live reload:** with Live Server running, every time you save a file
(`Cmd/Ctrl+S`) the browser refreshes automatically — edit and watch it update.

---

## Where to change things

| You want to… | Edit |
|---|---|
| Add / change a menu drink | `MENU` array in `script.js` |
| Add / change a flavor | `FLAVORS` array in `script.js` |
| Change opening hours, address, phone | `HOURS` in `script.js` / Visit section in `index.html` |
| Change English / French copy | `DICT.en` / `DICT.fr` in `script.js` |
| Change the Glovo order link | `ORDER_URL` at the top of `script.js` |
| Adjust colors, spacing, fonts | `:root` variables at the top of `style.css` |
| Swap a photo | replace the file in `assets/` (keep the same name) |

---

## Notes on the animations

- **Hero carousel crossfade** — two stacked gradient layers fade between flavors
  (`.hero__bg` + `opacity` transition); the floating fruit images cross-fade and
  the cup hue morphs via a CSS `filter` transition. See `setHero()` in `script.js`.
- **Smooth scrolling** — `scroll-behavior: smooth` on `<html>` in `style.css`.
  Every in-page link (`href="#menu"`, etc.) glides instead of jumping.
- Respects `prefers-reduced-motion` for accessibility.

---

## Deploying later

Because it's plain HTML/CSS/JS with no build step, you can drop this folder onto
any static host — **Netlify** (drag-and-drop), **GitHub Pages**, **Vercel**, or
classic web hosting. No Node, no compiler required.
