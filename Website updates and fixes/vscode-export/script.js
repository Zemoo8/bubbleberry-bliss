/* =================================================================
   Booble — La Marsa  ·  script.js
   - Hero flavor carousel with silky crossfade transitions
   - Build-your-cup configurator (live preview + price)
   - EN / FR language toggle
   - Menu, reviews, hours rendering
   (Smooth anchor scrolling is handled in CSS via scroll-behavior.)
   ================================================================= */
(function () {
  "use strict";

  /* ------------------------------- DATA ------------------------------- */
  var ORDER_URL = "https://glovoapp.com/tn/en/tunis/";

  var BASES = [
    { id: "jasmine", name: "Jasmine Tea", nameFr: "Thé Jasmin", desc: "Floral Taiwanese green", descFr: "Vert taïwanais floral", color: "oklch(0.86 0.09 100)", price: 9 },
    { id: "black",   name: "Black Tea",   nameFr: "Thé Noir",   desc: "Bold, malty Taiwanese",  descFr: "Corsé, malté, taïwanais", color: "oklch(0.5 0.08 55)", price: 9 },
    { id: "coffee",  name: "Viet Coffee", nameFr: "Café Viet",  desc: "Rich slow-drip robusta", descFr: "Robusta goutte-à-goutte", color: "oklch(0.36 0.04 50)", price: 11 }
  ];

  var FLAVORS = [
    { id: "mangue",   name: "Mangue",   color: "oklch(0.84 0.17 80)",  deep: "oklch(0.6 0.18 70)",   hue: 20,  fruit: "assets/fruit-mangue.png",   notes: "Honeyed, floral, sunshine-sweet", notesFr: "Mielleux, floral, plein de soleil",  pairing: "Brown-sugar tapioca pearls", pairingFr: "perles de tapioca au sucre roux" },
    { id: "peche",    name: "Pêche",    color: "oklch(0.85 0.1 40)",   deep: "oklch(0.62 0.14 30)",  hue: 0,   fruit: "assets/fruit-peche.png",    notes: "Soft, juicy, lightly floral",     notesFr: "Doux, juteux, légèrement floral",    pairing: "Rose tapioca", pairingFr: "tapioca à la rose" },
    { id: "fraise",   name: "Fraise",   color: "oklch(0.7 0.2 20)",    deep: "oklch(0.45 0.2 18)",   hue: -40, fruit: "assets/fruit-fraise.png",   notes: "Bright, jammy, a little tart",    notesFr: "Vif, confituré, un peu acidulé",     pairing: "Popping strawberry pearls", pairingFr: "perles popping fraise" },
    { id: "passion",  name: "Passion",  color: "oklch(0.82 0.16 90)",  deep: "oklch(0.55 0.16 80)",  hue: 30,  fruit: "assets/fruit-passion.png",  notes: "Tangy, tropical, zippy",          notesFr: "Acidulé, tropical, pétillant",       pairing: "Lychee jelly cubes", pairingFr: "cubes de gelée de litchi" },
    { id: "myrtille", name: "Myrtille", color: "oklch(0.55 0.16 290)", deep: "oklch(0.35 0.14 290)", hue: 200, fruit: "assets/fruit-myrtille.png", notes: "Deep, berry-dark, a touch smoky", notesFr: "Profond, fruité-foncé, un brin fumé", pairing: "Vanilla tapioca", pairingFr: "tapioca à la vanille" },
    { id: "pomme",    name: "Pomme",    color: "oklch(0.82 0.14 140)", deep: "oklch(0.55 0.14 140)", hue: 90,  fruit: "assets/fruit-pomme.png",    notes: "Crisp, cool, refreshing",         notesFr: "Croquant, frais, désaltérant",       pairing: "Aloe vera cubes", pairingFr: "cubes d'aloe vera" },
    { id: "lychee",   name: "Lychee",   color: "oklch(0.9 0.06 350)",  deep: "oklch(0.7 0.12 350)",  hue: -20, fruit: "assets/fruit-lychee.png",   notes: "Perfumed, delicate, signature",   notesFr: "Parfumé, délicat, signature",        pairing: "Rose-lychee popping pearls", pairingFr: "perles popping rose-litchi" },
    { id: "coco",     name: "Coco",     color: "oklch(0.94 0.02 80)",  deep: "oklch(0.75 0.04 70)",  hue: 10,  fruit: "assets/fruit-coco.png",     notes: "Creamy, nutty, mellow",           notesFr: "Crémeux, noiseté, doux",             pairing: "Homemade brown-sugar tapioca", pairingFr: "tapioca maison au sucre roux" }
  ];

  var SIZES = [
    { id: "little", name: "Little", nameFr: "Petit", ml: "350 ml", price: 13, scale: 0.78 },
    { id: "medium", name: "Medium", nameFr: "Moyen", ml: "500 ml", price: 16, scale: 0.9 },
    { id: "big",    name: "Big",    nameFr: "Grand", ml: "700 ml", price: 20, scale: 1 }
  ];

  var BOBAS = [
    { id: "tapioca",    name: "Brown-sugar tapioca", nameFr: "Tapioca sucre roux", color: "#3a2418", shape: "round" },
    { id: "strawberry", name: "Strawberry popping",  nameFr: "Popping fraise",     color: "#e0335a", shape: "round" },
    { id: "passion",    name: "Passion popping",     nameFr: "Popping passion",    color: "#f0a429", shape: "round" },
    { id: "lychee",     name: "Lychee jelly",        nameFr: "Gelée litchi",       color: "#f2b8d6", shape: "square" },
    { id: "aloe",       name: "Aloe vera",           nameFr: "Aloe vera",          color: "#bfe3a6", shape: "square" }
  ];

  var MENU = [
    { img: "assets/menu-fraise.png",  price: 14, best: true,  en: { name: "Fraise Latte", desc: "Local strawberry milk tea, popping pearls" }, fr: { name: "Latte Fraise", desc: "Thé au lait fraise locale, perles popping" } },
    { img: "assets/menu-caramel.png", price: 13, best: false, en: { name: "Caramel Brown Sugar", desc: "Brown-sugar milk tea, tapioca" }, fr: { name: "Caramel Sucre Roux", desc: "Thé au lait sucre roux, tapioca" } },
    { img: "assets/menu-taro.png",    price: 13, best: false, en: { name: "Taro Crème", desc: "Creamy taro latte, homemade tapioca" }, fr: { name: "Taro Crémeux", desc: "Latte taro crémeux, tapioca maison" } },
    { img: "assets/menu-matcha.png",  price: 14, best: false, en: { name: "Matcha Latte", desc: "Stone-ground matcha, fresh milk" }, fr: { name: "Matcha Latte", desc: "Matcha moulu à la pierre, lait frais" } },
    { img: "assets/menu-choco.png",   price: 14, best: false, en: { name: "Choco Frappé", desc: "Chocolate frappé, brownie bits" }, fr: { name: "Choco Frappé", desc: "Frappé chocolat, éclats de brownie" } },
    { img: "assets/menu-mangue.png",  price: 13, best: false, en: { name: "Mangue Passion", desc: "Mango & passionfruit, jelly cubes" }, fr: { name: "Mangue Passion", desc: "Mangue & passion, cubes de gelée" } }
  ];

  var REVIEWS = [
    { name: "Amine Bouamama", when: "7 months ago", text: "OMG!!! Best boba spot in Tunisia by far. I've never tasted better — and I say that as a big-time boba fan who has lived in many countries." },
    { name: "Aale Ataullah", when: "5 months ago", text: "The place needs more appreciation. Popping boba was nice but I loved the normal boba more, staff was really nice. Would recommend 10/10!" },
    { name: "Hisham B", when: "10 months ago", text: "Super cute place and the staff were really chill. Drinks were very refreshing. Definitely coming back 🧋" },
    { name: "Alexx Ke", when: "5 months ago", text: "Very authentic and cute place. The bubble tea was very delicious — made with love. Totally recommended." },
    { name: "delphine badard", when: "2 years ago", text: "Quite impressed by the high quality. Real tea base — oolong or jasmine — and fresh bubbles. The litchi/rose is my favorite." },
    { name: "medbb", when: "2 years ago", text: "Cute small place with a helpful staff. Strawberry iced tea with lychee pearls — one of the most refreshing drinks during the heat wave." }
  ];

  var HOURS = [
    { day: "Monday",    dayFr: "Lundi",    time: "2 – 9 PM",  dow: 1 },
    { day: "Tuesday",   dayFr: "Mardi",    time: "2 – 9 PM",  dow: 2 },
    { day: "Wednesday", dayFr: "Mercredi", time: "2 – 9 PM",  dow: 3 },
    { day: "Thursday",  dayFr: "Jeudi",    time: "2 – 9 PM",  dow: 4 },
    { day: "Friday",    dayFr: "Vendredi", time: "2 – 10 PM", dow: 5 },
    { day: "Saturday",  dayFr: "Samedi",   time: "2 – 10 PM", dow: 6 },
    { day: "Sunday",    dayFr: "Dimanche", time: "2 – 9 PM",  dow: 0 }
  ];

  /* floating hero fruit layout */
  var HF = [
    { top: "18%", left: "8%",  w: 110, depth: 0.22, rot: -12, delay: 0,   blur: 0, op: 1 },
    { top: "26%", left: "88%", w: 90,  depth: 0.12, rot: 14,  delay: 1.4, blur: 5, op: 0.85 },
    { top: "62%", left: "4%",  w: 80,  depth: 0.30, rot: 8,   delay: 0.8, blur: 3, op: 0.9 },
    { top: "55%", left: "92%", w: 130, depth: 0.08, rot: -18, delay: 2.1, blur: 0, op: 1 },
    { top: "10%", left: "55%", w: 70,  depth: 0.18, rot: 20,  delay: 1.7, blur: 7, op: 0.8 },
    { top: "70%", left: "70%", w: 95,  depth: 0.26, rot: -6,  delay: 0.5, blur: 2, op: 0.92 }
  ];

  /* ------------------------------ i18n ------------------------------ */
  var DICT = {
    en: {
      navBuild: "Build your cup", navMenu: "Menu", navWhy: "Why us", navVisit: "Visit", orderNow: "Order now",
      heroKicker: "Build your", since: "since 2021", bestOf: "best of la marsa · 4.7★",
      ctaBuild: "Build your cup ↓", ctaGlovo: "Order on Glovo",
      newKicker: "First time?", newTitle: "New to boba?", step: "Step",
      newLine0: "Boba (bubble tea) is iced tea with chewy tapioca pearls you sip through a fat straw.",
      newLine1: "Pick a tea, a fruit flavour and your pearls — sweet, fruity, and a little bit fun.",
      newLine2: "Not sure? Ask us in the shop. We'll happily build your first one with you.",
      buildKicker: "n° 01 — make it yours", buildTitle: "Build your cup.",
      buildIntro: "Pick a size, a tea base, a fruit syrup and your pearls. Watch it come together, then send your order straight to Glovo.",
      stepSize: "Your size", stepBase: "Your tea base", stepSyrup: "Your fruit syrup", stepPearls: "Your pearls",
      syrupWord: "syrup", pairsWith: "Pairs beautifully with",
      yourCup: "Your cup", approx: "approx.", orderGlovo: "Order on Glovo →",
      menuKicker: "n° 02 — the favourites", menuTitle: "The menu.",
      menuIntro: "Our six most-ordered cups. Or compose your own above.", menuCta: "See full menu on Glovo →", bestseller: "Bestseller",
      whyKicker: "n° 03 / the craft", whyTitle1: "Why people drive across Tunis for a ", whyTitle2: ".",
      why: [
        { title: "Real Taiwanese tea", body: "Oolong, jasmine and black tea brewed locally — the actual base, not flavored powder." },
        { title: "Fresh fruit purées", body: "30–50% real fruit. Natural syrups. Nothing pretends to be something it isn't." },
        { title: "Homemade tapioca", body: "We cook our pearls in-house in rose, vanilla, brown sugar, strawberry and chocolate." }
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
      footRights: "© 2026 Booble La Marsa. Made with real tea and stubbornness."
    },
    fr: {
      navBuild: "Composez", navMenu: "Carte", navWhy: "Pourquoi nous", navVisit: "Nous trouver", orderNow: "Commander",
      heroKicker: "Composez votre", since: "depuis 2021", bestOf: "n°1 à la marsa · 4.7★",
      ctaBuild: "Composez votre verre ↓", ctaGlovo: "Commander sur Glovo",
      newKicker: "Première fois ?", newTitle: "Le bubble tea, c'est quoi ?", step: "Étape",
      newLine0: "Le bubble tea, c'est un thé glacé avec des perles de tapioca moelleuses qu'on aspire avec une grosse paille.",
      newLine1: "Choisissez un thé, un parfum de fruit et vos perles — sucré, fruité et plein de peps.",
      newLine2: "Pas sûr ? Demandez-nous en boutique, on compose votre premier avec plaisir.",
      buildKicker: "n° 01 — à votre goût", buildTitle: "Composez votre verre.",
      buildIntro: "Choisissez une taille, une base de thé, un sirop de fruit et vos perles. Regardez-le prendre forme, puis commandez sur Glovo.",
      stepSize: "Votre taille", stepBase: "Votre base de thé", stepSyrup: "Votre sirop de fruit", stepPearls: "Vos perles",
      syrupWord: "sirop", pairsWith: "Se marie à merveille avec",
      yourCup: "Votre verre", approx: "environ", orderGlovo: "Commander sur Glovo →",
      menuKicker: "n° 02 — les favoris", menuTitle: "La carte.",
      menuIntro: "Nos six verres les plus commandés. Ou composez le vôtre ci-dessus.", menuCta: "Voir toute la carte sur Glovo →", bestseller: "Best-seller",
      whyKicker: "n° 03 / le savoir-faire", whyTitle1: "Pourquoi on traverse Tunis pour un ", whyTitle2: ".",
      why: [
        { title: "Vrai thé taïwanais", body: "Oolong, jasmin et thé noir infusés sur place — la vraie base, pas de la poudre aromatisée." },
        { title: "Purées de fruits frais", body: "30–50 % de vrai fruit. Sirops naturels. Rien ne fait semblant d'être autre chose." },
        { title: "Tapioca maison", body: "On cuit nos perles maison : rose, vanille, sucre roux, fraise et chocolat." }
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
      footRights: "© 2026 Booble La Marsa. Fait avec du vrai thé et de l'obstination."
    }
  };

  /* ------------------------------ STATE ------------------------------ */
  var state = {
    lang: "en",
    sizeId: "medium", baseId: "jasmine", flavorId: "fraise", bobaId: "tapioca",
    heroId: "fraise", signedUp: false
  };
  var TOP3 = ["fraise", "mangue", "passion"];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var byId = function (id) { return document.getElementById(id); };
  var find = function (arr, id) { for (var i = 0; i < arr.length; i++) { if (arr[i].id === id) return arr[i]; } return arr[0]; };
  function t() { return DICT[state.lang]; }
  function fr() { return state.lang === "fr"; }

  /* =============================== HERO =============================== */
  var heroLayers, activeLayer = 0, rotateTimer;

  function heroGradient(f) {
    return "radial-gradient(ellipse at 50% 65%, " + f.color + " 0%, " + f.deep +
      " 60%, color-mix(in oklab, " + f.deep + " 70%, black) 100%)";
  }

  function buildFruits() {
    var box = byId("heroFruits");
    box.innerHTML = "";
    HF.forEach(function (f, i) {
      var wrap = document.createElement("div");
      wrap.className = "hero__fruit";
      wrap.style.top = f.top; wrap.style.left = f.left;
      wrap.style.width = f.w + "px"; wrap.style.height = f.w + "px";
      wrap.style.opacity = f.op;
      var img = document.createElement("div");
      img.className = "hero__fruit-img";
      img.style.transform = "rotate(" + f.rot + "deg)";
      img.style.animationDelay = f.delay + "s";
      if (f.blur) img.style.filter = "blur(" + f.blur + "px) drop-shadow(0 14px 22px rgba(0,0,0,.28))";
      wrap.appendChild(img);
      box.appendChild(wrap);
    });
    paintFruits(find(FLAVORS, state.heroId));
    parallax();
  }

  function paintFruits(f) {
    var imgs = byId("heroFruits").querySelectorAll(".hero__fruit-img");
    for (var i = 0; i < imgs.length; i++) imgs[i].style.backgroundImage = "url(" + f.fruit + ")";
  }

  function setHero(id, instant) {
    state.heroId = id;
    var f = find(FLAVORS, id);
    var hero = byId("top");

    /* blobs + glow read these; they CSS-transition background */
    hero.style.setProperty("--flavor", f.color);
    hero.style.setProperty("--flavor-deep", f.deep);

    /* gradient crossfade between the two stacked layers */
    var next = activeLayer === 0 ? 1 : 0;
    heroLayers[next].style.background = heroGradient(f);
    if (instant) {
      heroLayers[next].style.transition = "none";
      heroLayers[next].classList.add("is-active");
      heroLayers[activeLayer].classList.remove("is-active");
      // force reflow then restore transition
      void heroLayers[next].offsetWidth;
      heroLayers[next].style.transition = "";
    } else {
      heroLayers[next].classList.add("is-active");
      heroLayers[activeLayer].classList.remove("is-active");
    }
    activeLayer = next;

    /* cup hue morph (filter is transitioned in CSS) */
    byId("heroCup").style.filter =
      "hue-rotate(" + f.hue + "deg) saturate(1.15) drop-shadow(0 30px 50px rgba(0,0,0,0.4))";

    /* fruit crossfade: fade out, swap image, fade back in */
    var box = byId("heroFruits");
    if (instant) { paintFruits(f); }
    else {
      box.style.opacity = "0";
      setTimeout(function () { paintFruits(f); box.style.opacity = "1"; }, 220);
    }
  }

  function cycleHero(dir) {
    var i = (TOP3.indexOf(state.heroId) + dir + TOP3.length) % TOP3.length;
    setHero(TOP3[i]);
    startRotate();
  }
  function startRotate() {
    clearInterval(rotateTimer);
    rotateTimer = setInterval(function () {
      var i = (TOP3.indexOf(state.heroId) + 1) % TOP3.length;
      setHero(TOP3[i]);
    }, 3600);
  }

  /* parallax on the floating fruits + cup */
  function parallax() {
    var y = window.scrollY || window.pageYOffset || 0;
    var wraps = byId("heroFruits").querySelectorAll(".hero__fruit");
    for (var i = 0; i < wraps.length; i++) {
      wraps[i].style.transform = "translate(-50%,-50%) translateY(" + (y * HF[i].depth) + "px)";
    }
  }

  /* ========================== CONFIGURATOR ========================== */
  function applyFlavorVars() {
    var f = find(FLAVORS, state.flavorId);
    var build = byId("build");
    build.style.setProperty("--flavor", f.color);
    build.style.setProperty("--flavor-deep", f.deep);
  }

  function renderSizes() {
    var wrap = byId("sizeOpts"); wrap.innerHTML = "";
    SIZES.forEach(function (z) {
      var sel = z.id === state.sizeId;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "opt opt--size" + (sel ? " is-selected" : "");
      b.innerHTML =
        '<span class="opt__price">' + z.price + ' DT</span>' +
        '<span class="opt__name">' + (fr() ? z.nameFr : z.name) + '</span>' +
        '<span class="opt__ml">' + z.ml + '</span>';
      b.addEventListener("click", function () { state.sizeId = z.id; renderConfigurator(); });
      wrap.appendChild(b);
    });
  }

  function renderBases() {
    var wrap = byId("baseOpts"); wrap.innerHTML = "";
    BASES.forEach(function (base) {
      var sel = base.id === state.baseId;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "opt opt--base" + (sel ? " is-selected" : "");
      b.innerHTML =
        '<span class="opt__dot" style="background:' + base.color + '"></span>' +
        '<span class="opt__name">' + (fr() ? base.nameFr : base.name) + '</span>' +
        '<span class="opt__desc">' + (fr() ? base.descFr : base.desc) + '</span>';
      b.addEventListener("click", function () { state.baseId = base.id; renderConfigurator(); });
      wrap.appendChild(b);
    });
  }

  function renderFlavors() {
    var wrap = byId("flavorOpts"); wrap.innerHTML = "";
    FLAVORS.forEach(function (f) {
      var sel = f.id === state.flavorId;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "opt opt--flavor" + (sel ? " is-selected" : "");
      if (sel) b.style.background = f.color;
      b.innerHTML =
        '<span class="opt__thumb"><span style="background-image:url(' + f.fruit + ')"></span></span>' +
        '<span class="opt__name">' + f.name + '</span>';
      b.addEventListener("click", function () { state.flavorId = f.id; renderConfigurator(); });
      wrap.appendChild(b);
    });
  }

  function renderBobas() {
    var wrap = byId("bobaOpts"); wrap.innerHTML = "";
    BOBAS.forEach(function (bo) {
      var sel = bo.id === state.bobaId;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "opt opt--boba" + (sel ? " is-selected" : "");
      b.innerHTML =
        '<span class="opt__swatch" style="background:' + bo.color +
        ';border-radius:' + (bo.shape === "square" ? "5px" : "9999px") + '"></span>' +
        '<span class="opt__name">' + (fr() ? bo.nameFr : bo.name) + '</span>';
      b.addEventListener("click", function () { state.bobaId = bo.id; renderConfigurator(); });
      wrap.appendChild(b);
    });
  }

  function renderCup() {
    var base = find(BASES, state.baseId);
    var size = find(SIZES, state.sizeId);
    var boba = find(BOBAS, state.bobaId);
    byId("cupPreview").style.transform = "scale(" + size.scale + ")";
    byId("cupLiquid").style.setProperty("--base-color", base.color);

    var pearls = byId("cupPearls"); pearls.innerHTML = "";
    for (var i = 0; i < 11; i++) {
      var p = document.createElement("div");
      p.className = "cup__pearl";
      p.style.background = boba.color;
      p.style.borderRadius = boba.shape === "square" ? "4px" : "9999px";
      pearls.appendChild(p);
    }
  }

  function summaryText() {
    var base = find(BASES, state.baseId);
    var f = find(FLAVORS, state.flavorId);
    var boba = find(BOBAS, state.bobaId);
    return (fr() ? base.nameFr : base.name) + " · " + f.name + " " + t().syrupWord +
      " · " + (fr() ? boba.nameFr : boba.name);
  }

  function renderNote() {
    var f = find(FLAVORS, state.flavorId);
    var pairing = fr() ? f.pairingFr : f.pairing;
    var pairLower = pairing.charAt(0).toLowerCase() + pairing.slice(1);
    byId("flavorNote").innerHTML =
      '<span class="note__dot"></span>' +
      '<p class="note__text"><strong>' + f.name + '</strong> — ' +
      (fr() ? f.notesFr : f.notes) + '. ' + t().pairsWith + ' ' + pairLower + '.</p>';
  }

  function renderConfigurator() {
    applyFlavorVars();
    renderSizes(); renderBases(); renderFlavors(); renderBobas();
    renderCup(); renderNote();
    var summary = summaryText();
    byId("previewSummary").textContent = summary;
    byId("orderSummary").textContent = summary;
    byId("orderPrice").textContent = find(SIZES, state.sizeId).price;
  }

  /* ====================== STATIC LIST RENDERS ====================== */
  function renderMenu() {
    var grid = byId("menuGrid"); grid.innerHTML = "";
    MENU.forEach(function (m) {
      var loc = fr() ? m.fr : m.en;
      var card = document.createElement("article");
      card.className = "menu-card";
      card.innerHTML =
        '<div class="menu-card__media">' +
          (m.best ? '<span class="menu-card__tag">' + t().bestseller + '</span>' : '') +
          '<div style="background-image:url(' + m.img + ')"></div>' +
        '</div>' +
        '<div class="menu-card__body">' +
          '<div class="menu-card__row">' +
            '<h3 class="menu-card__name">' + loc.name + '</h3>' +
            '<span class="menu-card__price">' + m.price + ' DT</span>' +
          '</div>' +
          '<p class="menu-card__desc">' + loc.desc + '</p>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function renderWhy() {
    var grid = byId("whyGrid"); grid.innerHTML = "";
    t().why.forEach(function (c, i) {
      var card = document.createElement("article");
      card.className = "why-card";
      card.innerHTML =
        '<span class="why-card__n">0' + (i + 1) + '</span>' +
        '<h3 class="why-card__title">' + c.title + '</h3>' +
        '<p class="why-card__body">' + c.body + '</p>';
      grid.appendChild(card);
    });
  }

  function renderReviews() {
    var track = byId("reviewsTrack"); track.innerHTML = "";
    var loop = REVIEWS.concat(REVIEWS);
    loop.forEach(function (r) {
      var a = document.createElement("article");
      a.className = "review";
      a.innerHTML =
        '<div class="review__stars">★★★★★</div>' +
        '<p class="review__text">"' + r.text + '"</p>' +
        '<div class="review__foot"><span class="review__name">' + r.name +
        '</span><span class="review__when">' + r.when + '</span></div>';
      track.appendChild(a);
    });
  }

  function renderHours() {
    var list = byId("hoursList"); list.innerHTML = "";
    var today = new Date().getDay();
    HOURS.forEach(function (h) {
      var row = document.createElement("div");
      row.className = "hours-row" + (h.dow === today ? " is-today" : "");
      row.innerHTML =
        '<span class="hours-row__day">' + (fr() ? h.dayFr : h.day) + '</span>' +
        '<span class="hours-row__time">' + h.time + '</span>';
      list.appendChild(row);
    });
  }

  /* ============================ i18n APPLY ============================ */
  function applyStatic() {
    var d = t();
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (d[key] != null) nodes[i].textContent = d[key];
    }
    var ph = document.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < ph.length; j++) {
      var k = ph[j].getAttribute("data-i18n-ph");
      if (d[k] != null) ph[j].setAttribute("placeholder", d[k]);
    }
    document.documentElement.lang = state.lang;
  }

  function setLang(lang) {
    state.lang = lang;
    var btns = document.querySelectorAll(".lang__btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("is-active", btns[i].getAttribute("data-lang") === lang);
    }
    applyStatic();
    renderConfigurator();
    renderMenu(); renderWhy(); renderReviews(); renderHours();
    var msg = byId("signupMsg");
    if (state.signedUp) msg.textContent = t().footThanks;
  }

  /* ============================== ORDER ============================== */
  function wireOrderLinks() {
    var links = document.querySelectorAll(".js-order");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", ORDER_URL);
      links[i].setAttribute("target", "_blank");
      links[i].setAttribute("rel", "noopener noreferrer");
    }
  }

  /* ============================== INIT ============================== */
  function init() {
    heroLayers = [$(".hero__bg--a"), $(".hero__bg--b")];
    buildFruits();
    setHero(state.heroId, true);   /* paint first flavor with no transition */
    startRotate();

    byId("heroPrev").addEventListener("click", function () { cycleHero(-1); });
    byId("heroNext").addEventListener("click", function () { cycleHero(1); });

    var lbtns = document.querySelectorAll(".lang__btn");
    for (var i = 0; i < lbtns.length; i++) {
      (function (btn) {
        btn.addEventListener("click", function () { setLang(btn.getAttribute("data-lang")); });
      })(lbtns[i]);
    }

    renderConfigurator();
    renderMenu(); renderWhy(); renderReviews(); renderHours();
    applyStatic();
    wireOrderLinks();

    byId("signupForm").addEventListener("submit", function (e) {
      e.preventDefault();
      state.signedUp = true;
      byId("signupMsg").textContent = t().footThanks;
    });

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { parallax(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
