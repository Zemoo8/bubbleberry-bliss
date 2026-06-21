export type Flavor = {
  id: string;
  name: string;
  note: string;
  color: string; // oklch for --flavor
  deep: string; // oklch for --flavor-deep
  tint: string; // hex/rgba overlay for cup
};

export const flavors: Flavor[] = [
  { id: "mangue", name: "Mangue", note: "Sun-ripe Alphonso, brewed jasmine.", color: "oklch(0.84 0.17 80)", deep: "oklch(0.6 0.18 70)", tint: "rgba(255, 175, 60, 0.55)" },
  { id: "peche", name: "Pêche", note: "White peach purée, cold oolong.", color: "oklch(0.85 0.1 40)", deep: "oklch(0.62 0.14 30)", tint: "rgba(255, 160, 130, 0.55)" },
  { id: "fraise", name: "Fraise", note: "Local strawberries, popping pearls.", color: "oklch(0.7 0.2 20)", deep: "oklch(0.45 0.2 18)", tint: "rgba(230, 60, 80, 0.55)" },
  { id: "passion", name: "Passion", note: "Tart passionfruit, lychee jelly.", color: "oklch(0.82 0.16 90)", deep: "oklch(0.55 0.16 80)", tint: "rgba(255, 200, 60, 0.55)" },
  { id: "myrtille", name: "Myrtille", note: "Wild blueberry, smoked black tea.", color: "oklch(0.55 0.16 290)", deep: "oklch(0.35 0.14 290)", tint: "rgba(100, 80, 200, 0.55)" },
  { id: "pomme", name: "Pomme", note: "Green apple, mint, white tea.", color: "oklch(0.82 0.14 140)", deep: "oklch(0.55 0.14 140)", tint: "rgba(160, 210, 110, 0.55)" },
  { id: "lychee", name: "Lychee", note: "Rose-lychee, our signature pearls.", color: "oklch(0.9 0.06 350)", deep: "oklch(0.7 0.12 350)", tint: "rgba(255, 200, 220, 0.6)" },
  { id: "coco", name: "Coco", note: "Toasted coconut, homemade tapioca.", color: "oklch(0.94 0.02 80)", deep: "oklch(0.75 0.04 70)", tint: "rgba(245, 230, 200, 0.55)" },
];

export const reviews = [
  { name: "Amine Bouamama", when: "7 months ago", text: "OMG!!! Best boba spot in Tunisia by far. I've never tasted better — and I say that as a big-time boba fan who has lived in many countries." },
  { name: "Aale Ataullah", when: "5 months ago", text: "The place needs more appreciation. Popping boba was nice but I loved the normal boba more, staff was really nice. Would recommend 10/10!" },
  { name: "Hisham B", when: "10 months ago", text: "Super cute place and the staff were really chill. Drinks were very refreshing. Definitely coming back 🧋" },
  { name: "Alexx Ke", when: "5 months ago", text: "Very authentic and cute place. The bubble tea was very delicious — made with love. Totally recommended." },
  { name: "delphine badard", when: "2 years ago", text: "Quite impressed by the high quality. Real tea base — oolong or jasmine — and fresh bubbles. The litchi/rose is my favorite." },
  { name: "medbb", when: "2 years ago", text: "Cute small place with a helpful staff. Strawberry iced tea with lychee pearls — one of the most refreshing drinks during the heat wave." },
];

export const shop = {
  name: "Booble",
  city: "La Marsa",
  rating: 4.7,
  reviewCount: 152,
  address: "2 Rue Imam Chafai, Marsa 2070",
  phone: "21 187 136",
  plusCode: "V8JJ+VR La Marsa",
  hours: "Opens 2 PM",
  services: ["Dine-in", "Drive-through", "Delivery"],
};
