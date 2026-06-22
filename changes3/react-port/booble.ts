// src/data/booble.ts  — REPLACE your existing file with this
export type Lang = "en" | "fr";

export type Flavor = {
  id: string; name: string; color: string; deep: string; hue: number;
  notes: string; notesFr: string; pairing: string; pairingFr: string;
};
export const flavors: Flavor[] = [
  { id: "mangue",   name: "Mangue",   color: "oklch(0.84 0.17 80)",  deep: "oklch(0.6 0.18 70)",   hue: 20,  notes: "Honeyed, floral, sunshine-sweet", notesFr: "Mielleux, floral, plein de soleil",  pairing: "Brown-sugar tapioca pearls", pairingFr: "perles de tapioca au sucre roux" },
  { id: "peche",    name: "Pêche",    color: "oklch(0.85 0.1 40)",   deep: "oklch(0.62 0.14 30)",  hue: 0,   notes: "Soft, juicy, lightly floral",     notesFr: "Doux, juteux, légèrement floral",    pairing: "Rose tapioca", pairingFr: "tapioca à la rose" },
  { id: "fraise",   name: "Fraise",   color: "oklch(0.7 0.2 20)",    deep: "oklch(0.45 0.2 18)",   hue: -40, notes: "Bright, jammy, a little tart",    notesFr: "Vif, confituré, un peu acidulé",     pairing: "Popping strawberry pearls", pairingFr: "perles popping fraise" },
  { id: "passion",  name: "Passion",  color: "oklch(0.82 0.16 90)",  deep: "oklch(0.55 0.16 80)",  hue: 30,  notes: "Tangy, tropical, zippy",          notesFr: "Acidulé, tropical, pétillant",       pairing: "Lychee jelly cubes", pairingFr: "cubes de gelée de litchi" },
  { id: "myrtille", name: "Myrtille", color: "oklch(0.55 0.16 290)", deep: "oklch(0.35 0.14 290)", hue: 200, notes: "Deep, berry-dark, a touch smoky", notesFr: "Profond, fruité-foncé, un brin fumé", pairing: "Vanilla tapioca", pairingFr: "tapioca à la vanille" },
  { id: "pomme",    name: "Pomme",    color: "oklch(0.82 0.14 140)", deep: "oklch(0.55 0.14 140)", hue: 90,  notes: "Crisp, cool, refreshing",         notesFr: "Croquant, frais, désaltérant",       pairing: "Aloe vera cubes", pairingFr: "cubes d'aloe vera" },
  { id: "lychee",   name: "Lychee",   color: "oklch(0.9 0.06 350)",  deep: "oklch(0.7 0.12 350)",  hue: -20, notes: "Perfumed, delicate, signature",   notesFr: "Parfumé, délicat, signature",        pairing: "Rose-lychee popping pearls", pairingFr: "perles popping rose-litchi" },
  { id: "coco",     name: "Coco",     color: "oklch(0.94 0.02 80)",  deep: "oklch(0.75 0.04 70)",  hue: 10,  notes: "Creamy, nutty, mellow",           notesFr: "Crémeux, noiseté, doux",             pairing: "Homemade brown-sugar tapioca", pairingFr: "tapioca maison au sucre roux" },
];

export type TeaBase = { id: string; name: string; nameFr: string; desc: string; descFr: string; color: string; price: number };
export const bases: TeaBase[] = [
  { id: "jasmine", name: "Jasmine Tea", nameFr: "Thé Jasmin", desc: "Floral Taiwanese green", descFr: "Vert taïwanais floral", color: "oklch(0.86 0.09 100)", price: 9 },
  { id: "black",   name: "Black Tea",   nameFr: "Thé Noir",   desc: "Bold, malty Taiwanese",  descFr: "Corsé, malté, taïwanais", color: "oklch(0.5 0.08 55)", price: 9 },
  { id: "coffee",  name: "Viet Coffee", nameFr: "Café Viet",  desc: "Rich slow-drip robusta", descFr: "Robusta goutte-à-goutte", color: "oklch(0.36 0.04 50)", price: 11 },
];

export type Boba = { id: string; name: string; nameFr: string; color: string; shape: "round" | "square"; price: number };
export const bobas: Boba[] = [
  { id: "tapioca",    name: "Brown-sugar tapioca", nameFr: "Tapioca sucre roux", color: "#3a2418", shape: "round",  price: 1.5 },
  { id: "strawberry", name: "Strawberry popping",  nameFr: "Popping fraise",     color: "#e0335a", shape: "round",  price: 2 },
  { id: "passion",    name: "Passion popping",     nameFr: "Popping passion",    color: "#f0a429", shape: "round",  price: 2 },
  { id: "lychee",     name: "Lychee jelly",        nameFr: "Gelée litchi",       color: "#f2b8d6", shape: "square", price: 1.5 },
  { id: "aloe",       name: "Aloe vera",           nameFr: "Aloe vera",          color: "#bfe3a6", shape: "square", price: 1.5 },
];

export type Size = { id: string; name: string; nameFr: string; ml: string; price: number; scale: number };
export const sizes: Size[] = [
  { id: "little", name: "Little", nameFr: "Petit", ml: "350 ml", price: 13, scale: 0.78 },
  { id: "medium", name: "Medium", nameFr: "Moyen", ml: "500 ml", price: 16, scale: 0.9 },
  { id: "big",    name: "Big",    nameFr: "Grand", ml: "700 ml", price: 20, scale: 1 },
];

// 6 bestsellers — `img` is the asset key (see FRUIT/MENU_IMG maps in index.tsx)
export type MenuItem = { key: string; price: number; best: boolean; en: { name: string; desc: string }; fr: { name: string; desc: string } };
export const menu: MenuItem[] = [
  { key: "fraise",  price: 14, best: true,  en: { name: "Fraise Latte", desc: "Local strawberry milk tea, popping pearls" }, fr: { name: "Latte Fraise", desc: "Thé au lait fraise locale, perles popping" } },
  { key: "caramel", price: 13, best: false, en: { name: "Caramel Brown Sugar", desc: "Brown-sugar milk tea, tapioca" }, fr: { name: "Caramel Sucre Roux", desc: "Thé au lait sucre roux, tapioca" } },
  { key: "taro",    price: 13, best: false, en: { name: "Taro Crème", desc: "Creamy taro latte, homemade tapioca" }, fr: { name: "Taro Crémeux", desc: "Latte taro crémeux, tapioca maison" } },
  { key: "matcha",  price: 14, best: false, en: { name: "Matcha Latte", desc: "Stone-ground matcha, fresh milk" }, fr: { name: "Matcha Latte", desc: "Matcha moulu à la pierre, lait frais" } },
  { key: "choco",   price: 14, best: false, en: { name: "Choco Frappé", desc: "Chocolate frappé, brownie bits" }, fr: { name: "Choco Frappé", desc: "Frappé chocolat, éclats de brownie" } },
  { key: "mangue",  price: 13, best: false, en: { name: "Mangue Passion", desc: "Mango & passionfruit, jelly cubes" }, fr: { name: "Mangue Passion", desc: "Mangue & passion, cubes de gelée" } },
];

export const reviews = [
  { name: "Amine Bouamama", when: "7 months ago", text: "OMG!!! Best boba spot in Tunisia by far. I've never tasted better — and I say that as a big-time boba fan who has lived in many countries." },
  { name: "Aale Ataullah", when: "5 months ago", text: "The place needs more appreciation. Popping boba was nice but I loved the normal boba more, staff was really nice. Would recommend 10/10!" },
  { name: "Hisham B", when: "10 months ago", text: "Super cute place and the staff were really chill. Drinks were very refreshing. Definitely coming back 🧋" },
  { name: "Alexx Ke", when: "5 months ago", text: "Very authentic and cute place. The bubble tea was very delicious — made with love. Totally recommended." },
  { name: "delphine badard", when: "2 years ago", text: "Quite impressed by the high quality. Real tea base — oolong or jasmine — and fresh bubbles. The litchi/rose is my favorite." },
  { name: "medbb", when: "2 years ago", text: "Cute small place with a helpful staff. Strawberry iced tea with lychee pearls — one of the most refreshing drinks during the heat wave." },
];

export const hoursWeekly = [
  { day: "Monday",    dayFr: "Lundi",    time: "2 – 9 PM",  dow: 1 },
  { day: "Tuesday",   dayFr: "Mardi",    time: "2 – 9 PM",  dow: 2 },
  { day: "Wednesday", dayFr: "Mercredi", time: "2 – 9 PM",  dow: 3 },
  { day: "Thursday",  dayFr: "Jeudi",    time: "2 – 9 PM",  dow: 4 },
  { day: "Friday",    dayFr: "Vendredi", time: "2 – 10 PM", dow: 5 },
  { day: "Saturday",  dayFr: "Samedi",   time: "2 – 10 PM", dow: 6 },
  { day: "Sunday",    dayFr: "Dimanche", time: "2 – 9 PM",  dow: 0 },
];

export const shop = {
  since: 2021, rating: 4.7, reviewCount: "230+",
  address: "2 Rue Imam Chafai, Marsa 2070", phone: "21 187 136",
  instagram: "https://www.instagram.com/bubble_tea_booble_marsa/",
  whatsapp: "https://wa.me/21621187136",
  maps: "https://www.google.com/maps/search/?api=1&query=Booble%20bubble%20tea%202%20Rue%20Imam%20Chafai%20Marsa%202070",
  // TODO: replace with Booble's exact Glovo store link before deploy
  glovo: "https://glovoapp.com/tn/en/tunis/",
};

// ---- UI copy, per language ----
export const TXT = {
  en: {
    navBuild: "Build your cup", navMenu: "Menu", navWhy: "Why us", navVisit: "Visit", orderNow: "Order now",
    heroKicker: "Build your", since: "since 2021", bestOf: "best of la marsa · 4.7★",
    ctaBuild: "Build your cup ↓", ctaGlovo: "Order on Glovo",
    newKicker: "First time?", newTitle: "New to boba?",
    newLines: [
      "Boba (bubble tea) is iced tea with chewy tapioca pearls you sip through a fat straw.",
      "Pick a tea, a fruit flavour and your pearls — sweet, fruity, and a little bit fun.",
      "Not sure? Ask us in the shop. We'll happily build your first one with you.",
    ],
    buildKicker: "n° 01 — make it yours", buildTitle: "Build your cup.",
    buildIntro: "Pick a size, a tea base, a fruit syrup and your pearls. Watch it come together, then send your order straight to Glovo.",
    step: "Step", stepSize: "Your size", stepBase: "Your tea base", stepSyrup: "Your fruit syrup", stepPearls: "Your pearls",
    syrupWord: "syrup", pairsWith: "Pairs beautifully with",
    yourCup: "Your cup", approx: "approx.", orderGlovo: "Order on Glovo →",
    menuKicker: "n° 02 — the favourites", menuTitle: "The menu.",
    menuIntro: "Our six most-ordered cups. Or compose your own above.", menuCta: "See full menu on Glovo →", bestseller: "Bestseller",
    whyKicker: "n° 03 / the craft", whyTitle1: "Why people drive across Tunis for a ", whyTitle2: ".",
    whyCards: [
      { title: "Real Taiwanese tea", body: "Oolong, jasmine and black tea brewed locally — the actual base, not flavored powder." },
      { title: "Fresh fruit purées", body: "30–50% real fruit. Natural syrups. Nothing pretends to be something it isn't." },
      { title: "Homemade tapioca", body: "We cook our pearls in-house in rose, vanilla, brown sugar, strawberry and chocolate." },
    ],
    shopKicker: "n° 04 — in the shop", shopTitle1: "Pink flamingos.", shopTitle2: "Neon cups. Real chairs.", follow: "Follow @bubble_tea_booble_marsa →",
    proofKicker: "n° 05 / the proof", reviewsCount: "230+ reviews on Google", proofTitle1: "What La Marsa says ", proofTitleEm: "about us.",
    visitKicker: "n° 06 / come say hi", visitTitle1: "On rue Imam Chafai, ", visitTitleEm: "two minutes", visitTitle2: " from the corniche.",
    address: "Address", phone: "Phone", openingHours: "Opening hours",
    svcDinein: "Dine-in", svcDrive: "Drive-through", svcDelivery: "Delivery", openMaps: "Open in Google Maps →",
    footTag: "Real Taiwanese tea, fresh fruit and homemade tapioca — served on rue Imam Chafai, La Marsa.",
    footNewsTitle: "A free topping on your next cup.",
    footNewsSub: "Drop your number — we send the secret menu and one-off deals on WhatsApp. No spam, just boba.",
    footNewsPlaceholder: "Your phone number", footNewsBtn: "Join on WhatsApp", footThanks: "Thanks! We'll text you on WhatsApp soon. 🧋",
    footHiring: "We're hiring baristas who smile — pass by with a CV →",
    footRights: "© 2026 Booble La Marsa. Made with real tea and stubbornness.",
  },
  fr: {
    navBuild: "Composez", navMenu: "Carte", navWhy: "Pourquoi nous", navVisit: "Nous trouver", orderNow: "Commander",
    heroKicker: "Composez votre", since: "depuis 2021", bestOf: "n°1 à la marsa · 4.7★",
    ctaBuild: "Composez votre verre ↓", ctaGlovo: "Commander sur Glovo",
    newKicker: "Première fois ?", newTitle: "Le bubble tea, c'est quoi ?",
    newLines: [
      "Le bubble tea, c'est un thé glacé avec des perles de tapioca moelleuses qu'on aspire avec une grosse paille.",
      "Choisissez un thé, un parfum de fruit et vos perles — sucré, fruité et plein de peps.",
      "Pas sûr ? Demandez-nous en boutique, on compose votre premier avec plaisir.",
    ],
    buildKicker: "n° 01 — à votre goût", buildTitle: "Composez votre verre.",
    buildIntro: "Choisissez une taille, une base de thé, un sirop de fruit et vos perles. Regardez-le prendre forme, puis commandez sur Glovo.",
    step: "Étape", stepSize: "Votre taille", stepBase: "Votre base de thé", stepSyrup: "Votre sirop de fruit", stepPearls: "Vos perles",
    syrupWord: "sirop", pairsWith: "Se marie à merveille avec",
    yourCup: "Votre verre", approx: "environ", orderGlovo: "Commander sur Glovo →",
    menuKicker: "n° 02 — les favoris", menuTitle: "La carte.",
    menuIntro: "Nos six verres les plus commandés. Ou composez le vôtre ci-dessus.", menuCta: "Voir toute la carte sur Glovo →", bestseller: "Best-seller",
    whyKicker: "n° 03 / le savoir-faire", whyTitle1: "Pourquoi on traverse Tunis pour un ", whyTitle2: ".",
    whyCards: [
      { title: "Vrai thé taïwanais", body: "Oolong, jasmin et thé noir infusés sur place — la vraie base, pas de la poudre aromatisée." },
      { title: "Purées de fruits frais", body: "30–50 % de vrai fruit. Sirops naturels. Rien ne fait semblant d'être autre chose." },
      { title: "Tapioca maison", body: "On cuit nos perles maison : rose, vanille, sucre roux, fraise et chocolat." },
    ],
    shopKicker: "n° 04 — la boutique", shopTitle1: "Flamants roses.", shopTitle2: "Néons. Vraies chaises.", follow: "Suivez @bubble_tea_booble_marsa →",
    proofKicker: "n° 05 / la preuve", reviewsCount: "230+ avis sur Google", proofTitle1: "Ce que La Marsa dit ", proofTitleEm: "de nous.",
    visitKicker: "n° 06 / passez nous voir", visitTitle1: "Rue Imam Chafai, à ", visitTitleEm: "deux minutes", visitTitle2: " de la corniche.",
    address: "Adresse", phone: "Téléphone", openingHours: "Horaires",
    svcDinein: "Sur place", svcDrive: "Au volant", svcDelivery: "Livraison", openMaps: "Ouvrir dans Google Maps →",
    footTag: "Vrai thé taïwanais, fruits frais et tapioca maison — rue Imam Chafai, La Marsa.",
    footNewsTitle: "Un topping offert sur votre prochain verre.",
    footNewsSub: "Laissez votre numéro — on envoie le menu secret et les offres sur WhatsApp. Pas de spam, que du boba.",
    footNewsPlaceholder: "Votre numéro", footNewsBtn: "Rejoindre sur WhatsApp", footThanks: "Merci ! On vous écrit bientôt sur WhatsApp. 🧋",
    footHiring: "On recrute des baristas qui sourient — passez avec un CV →",
    footRights: "© 2026 Booble La Marsa. Fait avec du vrai thé et de l'obstination.",
  },
} as const;
