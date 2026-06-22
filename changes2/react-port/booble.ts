// src/data/booble.ts  — REPLACE your existing file with this

export type Flavor = {
  id: string;
  name: string;
  note: string;
  color: string; // oklch for --flavor
  deep: string; // oklch for --flavor-deep
  hue: number; // hue-rotate degrees for the cup photo
  fruits: string; // spotlight: the fruit(s)
  notes: string; // spotlight: tasting notes
  pairing: string; // spotlight: best pairing
};

// NOTE: a "flavor" is the FRUIT SYRUP (what you taste). The drink itself is the
// tea base (see `bases`), and the pearls are separate (see `bobas`).
export const flavors: Flavor[] = [
  { id: "mangue",   name: "Mangue",   note: "Sun-ripe Alphonso, brewed jasmine.",  color: "oklch(0.84 0.17 80)",  deep: "oklch(0.6 0.18 70)",   hue: 20,  fruits: "Alphonso mango",     notes: "Honeyed, floral, sunshine-sweet", pairing: "Brown-sugar tapioca pearls" },
  { id: "peche",    name: "Pêche",    note: "White peach purée, cold oolong.",     color: "oklch(0.85 0.1 40)",   deep: "oklch(0.62 0.14 30)",  hue: 0,   fruits: "White peach",        notes: "Soft, juicy, lightly floral",     pairing: "Rose tapioca" },
  { id: "fraise",   name: "Fraise",   note: "Local strawberries, popping pearls.", color: "oklch(0.7 0.2 20)",    deep: "oklch(0.45 0.2 18)",   hue: -40, fruits: "Local strawberries", notes: "Bright, jammy, a little tart",    pairing: "Popping strawberry pearls" },
  { id: "passion",  name: "Passion",  note: "Tart passionfruit, lychee jelly.",    color: "oklch(0.82 0.16 90)",  deep: "oklch(0.55 0.16 80)",  hue: 30,  fruits: "Passionfruit",       notes: "Tangy, tropical, zippy",          pairing: "Lychee jelly cubes" },
  { id: "myrtille", name: "Myrtille", note: "Wild blueberry, smoked black tea.",   color: "oklch(0.55 0.16 290)", deep: "oklch(0.35 0.14 290)", hue: 200, fruits: "Wild blueberry",     notes: "Deep, berry-dark, a touch smoky", pairing: "Vanilla tapioca" },
  { id: "pomme",    name: "Pomme",    note: "Green apple, mint, white tea.",       color: "oklch(0.82 0.14 140)", deep: "oklch(0.55 0.14 140)", hue: 90,  fruits: "Green apple & mint", notes: "Crisp, cool, refreshing",         pairing: "Aloe vera cubes" },
  { id: "lychee",   name: "Lychee",   note: "Rose-lychee, our signature pearls.",  color: "oklch(0.9 0.06 350)",  deep: "oklch(0.7 0.12 350)",  hue: -20, fruits: "Rose & lychee",      notes: "Perfumed, delicate, signature",   pairing: "Rose-lychee popping pearls" },
  { id: "coco",     name: "Coco",     note: "Toasted coconut, homemade tapioca.",  color: "oklch(0.94 0.02 80)",  deep: "oklch(0.75 0.04 70)",  hue: 10,  fruits: "Toasted coconut",    notes: "Creamy, nutty, mellow",           pairing: "Homemade brown-sugar tapioca" },
];

// the DRINK base
export type TeaBase = { id: string; name: string; desc: string; color: string; price: number };
export const bases: TeaBase[] = [
  { id: "jasmine", name: "Jasmine Tea", desc: "Floral Taiwanese green", color: "oklch(0.86 0.09 100)", price: 9 },
  { id: "black",   name: "Black Tea",   desc: "Bold, malty Taiwanese",  color: "oklch(0.5 0.08 55)",   price: 9 },
  { id: "coffee",  name: "Viet Coffee", desc: "Rich slow-drip robusta", color: "oklch(0.36 0.04 50)",  price: 11 },
];

// the PEARLS
export type Boba = { id: string; name: string; color: string; shape: "round" | "square"; price: number };
export const bobas: Boba[] = [
  { id: "tapioca",    name: "Brown-sugar tapioca", color: "#3a2418", shape: "round",  price: 1.5 },
  { id: "strawberry", name: "Strawberry popping",  color: "#e0335a", shape: "round",  price: 2 },
  { id: "passion",    name: "Passion popping",     color: "#f0a429", shape: "round",  price: 2 },
  { id: "lychee",     name: "Lychee jelly",        color: "#f2b8d6", shape: "square", price: 1.5 },
  { id: "aloe",       name: "Aloe vera",           color: "#bfe3a6", shape: "square", price: 1.5 },
];

export const reviews = [
  { name: "Amine Bouamama", when: "7 months ago", text: "OMG!!! Best boba spot in Tunisia by far. I've never tasted better — and I say that as a big-time boba fan who has lived in many countries." },
  { name: "Aale Ataullah", when: "5 months ago", text: "The place needs more appreciation. Popping boba was nice but I loved the normal boba more, staff was really nice. Would recommend 10/10!" },
  { name: "Hisham B", when: "10 months ago", text: "Super cute place and the staff were really chill. Drinks were very refreshing. Definitely coming back 🧋" },
  { name: "Alexx Ke", when: "5 months ago", text: "Very authentic and cute place. The bubble tea was very delicious — made with love. Totally recommended." },
  { name: "delphine badard", when: "2 years ago", text: "Quite impressed by the high quality. Real tea base — oolong or jasmine — and fresh bubbles. The litchi/rose is my favorite." },
  { name: "medbb", when: "2 years ago", text: "Cute small place with a helpful staff. Strawberry iced tea with lychee pearls — one of the most refreshing drinks during the heat wave." },
];

// dow: 0 = Sunday … 6 = Saturday (matches new Date().getDay())
export const hoursWeekly = [
  { day: "Monday", time: "2 – 9 PM", dow: 1 },
  { day: "Tuesday", time: "2 – 9 PM", dow: 2 },
  { day: "Wednesday", time: "2 – 9 PM", dow: 3 },
  { day: "Thursday", time: "2 – 9 PM", dow: 4 },
  { day: "Friday", time: "2 – 10 PM", dow: 5 },
  { day: "Saturday", time: "2 – 10 PM", dow: 6 },
  { day: "Sunday", time: "2 – 9 PM", dow: 0 },
];

export const shop = {
  name: "Booble",
  city: "La Marsa",
  since: 2021,
  rating: 4.7,
  reviewCount: "230+",
  address: "2 Rue Imam Chafai, Marsa 2070",
  phone: "21 187 136",
  plusCode: "V8JJ+VR La Marsa",
  instagram: "https://www.instagram.com/bubble_tea_booble_marsa/",
  maps: "https://www.google.com/maps/search/?api=1&query=Booble%20bubble%20tea%202%20Rue%20Imam%20Chafai%20Marsa%202070",
  // TODO: replace with Booble's exact Glovo store link before deploy
  glovo: "https://glovoapp.com/tn/en/tunis/",
  services: ["Dine-in", "Drive-through", "Delivery"],
};
