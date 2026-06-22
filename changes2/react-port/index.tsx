// src/routes/index.tsx  — REPLACE your existing file with this
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import cupImg from "../assets/cup.png";
import logoMarkWhite from "../assets/logo-mark-white.png"; // NEW asset
import logoMarkGreen from "../assets/logo-mark-green.png"; // NEW asset
import logoCup from "../assets/logo-cup.png";              // NEW asset (line-art stamp)
import cursorNav from "../assets/cursor-nav-sm.png";       // NEW asset
import cursorHand from "../assets/cursor-hand-sm.png";     // NEW asset
import shop1 from "../assets/shop-1.jpg";
import shop2 from "../assets/shop-2.jpg";
import shop3 from "../assets/shop-3.jpg";
import shop4 from "../assets/shop-4.jpg";
import shop5 from "../assets/shop-5.jpg";
import shop6 from "../assets/shop-6.jpg";
import fMangue from "../assets/fruit-mangue.png";
import fPeche from "../assets/fruit-peche.png";
import fFraise from "../assets/fruit-fraise.png";
import fPassion from "../assets/fruit-passion.png";
import fMyrtille from "../assets/fruit-myrtille.png";
import fPomme from "../assets/fruit-pomme.png";
import fLychee from "../assets/fruit-lychee.png";
import fCoco from "../assets/fruit-coco.png";
import { flavors, bases, bobas, reviews, hoursWeekly, shop, type Flavor } from "../data/booble";

const FRUIT: Record<string, string> = {
  mangue: fMangue, peche: fPeche, fraise: fFraise, passion: fPassion,
  myrtille: fMyrtille, pomme: fPomme, lychee: fLychee, coco: fCoco,
};

// floating fruit slots: depth = parallax factor
const FRUIT_SLOTS = [
  { top: "18%", left: "8%",  size: 110, delay: 0,   blur: 0, rot: -12, depth: 0.22 },
  { top: "26%", left: "88%", size: 90,  delay: 1.4, blur: 5, rot: 14,  depth: 0.12 },
  { top: "62%", left: "4%",  size: 80,  delay: 0.8, blur: 3, rot: 8,   depth: 0.30 },
  { top: "55%", left: "92%", size: 130, delay: 2.1, blur: 0, rot: -18, depth: 0.08 },
  { top: "10%", left: "55%", size: 70,  delay: 1.7, blur: 7, rot: 20,  depth: 0.18 },
  { top: "70%", left: "70%", size: 95,  delay: 0.5, blur: 2, rot: -6,  depth: 0.26 },
];

const TOP3 = ["fraise", "mangue", "passion"]; // hero auto-rotates through these

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Booble — Bubble Tea La Marsa" },
      { name: "description", content: "Booble La Marsa: real Taiwanese tea, fresh fruit syrups and homemade tapioca. 4.7★ on Google. 2 Rue Imam Chafai, Marsa 2070." },
      { property: "og:title", content: "Booble — Bubble Tea La Marsa" },
      { property: "og:description", content: "Build your cup: tea base, fruit syrup, pearls. The best boba in Tunisia." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  // build-your-cup selections
  const [baseId, setBaseId] = useState("jasmine");
  const [flavorId, setFlavorId] = useState("fraise");
  const [bobaId, setBobaId] = useState("tapioca");
  // hero auto-rotating flavor
  const [heroId, setHeroId] = useState("fraise");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const base = bases.find((b) => b.id === baseId)!;
  const flavor = flavors.find((f) => f.id === flavorId)!;
  const boba = bobas.find((b) => b.id === bobaId)!;
  const hero = flavors.find((f) => f.id === heroId) ?? flavors[2];

  const startRotate = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setHeroId((id) => TOP3[(TOP3.indexOf(id) + 1) % TOP3.length]);
    }, 3600);
  };
  const cycleHero = (dir: number) => {
    setHeroId((id) => TOP3[(TOP3.indexOf(id) + dir + TOP3.length) % TOP3.length]);
    startRotate();
  };

  useEffect(() => {
    startRotate();
    const onScroll = () => rootRef.current?.style.setProperty("--sy", String(window.scrollY || 0));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      if (timer.current) clearInterval(timer.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const heroVars = {
    ["--flavor" as string]: hero.color,
    ["--flavor-deep" as string]: hero.deep,
  } as React.CSSProperties;

  const today = new Date().getDay();
  const price = Math.round(base.price + 2 + boba.price);
  const summary = `${base.name} · ${flavor.name} syrup · ${boba.name}`;

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* boba cursors: arrow for the page, hand pointer for clickable things */}
      <style>{`
        body { cursor: url(${cursorNav}) 3 2, auto; }
        a, button, [role="button"] { cursor: url(${cursorHand}) 8 1, pointer; }
      `}</style>

      {/* ===================== HERO ===================== */}
      <section
        id="top"
        style={{ ...heroVars, background: "radial-gradient(ellipse at 50% 65%, var(--flavor) 0%, var(--flavor-deep) 60%, color-mix(in oklab, var(--flavor-deep) 70%, black) 100%)" }}
        className="relative min-h-screen overflow-hidden transition-colors duration-[900ms] ease-out"
      >
        <div className="pointer-events-none absolute top-[30%] left-[6%] size-32 rounded-full blur-2xl animate-blob" style={{ background: "var(--flavor)", opacity: 0.6 }} />
        <div className="pointer-events-none absolute top-[40%] right-[8%] size-40 rounded-full blur-2xl animate-blob" style={{ background: "var(--flavor)", opacity: 0.5, animationDelay: "-5s" }} />
        <div className="pointer-events-none absolute bottom-[20%] left-[15%] size-24 rounded-full blur-2xl animate-blob" style={{ background: "var(--flavor-deep)", opacity: 0.5, animationDelay: "-8s" }} />

        {/* floating fruits w/ parallax */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {FRUIT_SLOTS.map((s, i) => (
            <div key={i} className="absolute" style={{ top: s.top, left: s.left, width: s.size, height: s.size, transform: `translate(-50%,-50%) translateY(calc(var(--sy,0) * ${s.depth}px))` }}>
              <img
                src={FRUIT[hero.id]}
                alt=""
                aria-hidden
                className="w-full h-full object-contain animate-fruit-float"
                style={{
                  transform: `rotate(${s.rot}deg)`,
                  filter: s.blur ? `blur(${s.blur}px) drop-shadow(0 12px 18px rgba(0,0,0,.25))` : "drop-shadow(0 14px 22px rgba(0,0,0,.3))",
                  animationDelay: `${s.delay}s`,
                  opacity: s.blur ? 0.85 : 1,
                }}
              />
            </div>
          ))}
        </div>

        {/* nav arrows */}
        <button aria-label="Previous flavor" onClick={() => cycleHero(-1)} className="absolute left-5 top-1/2 -translate-y-1/2 z-30 size-14 rounded-full flex items-center justify-center active:scale-90 transition" style={{ background: "rgba(255,255,255,0.16)", border: "1.5px solid rgba(255,255,255,0.5)", backdropFilter: "blur(6px)" }}>
          <span style={{ width: 13, height: 13, borderTop: "3px solid #fff", borderRight: "3px solid #fff", borderRadius: 2, transform: "translateX(2px) rotate(-135deg)" }} />
        </button>
        <button aria-label="Next flavor" onClick={() => cycleHero(1)} className="absolute right-5 top-1/2 -translate-y-1/2 z-30 size-14 rounded-full flex items-center justify-center active:scale-90 transition" style={{ background: "rgba(255,255,255,0.16)", border: "1.5px solid rgba(255,255,255,0.5)", backdropFilter: "blur(6px)" }}>
          <span style={{ width: 13, height: 13, borderTop: "3px solid #fff", borderRight: "3px solid #fff", borderRadius: 2, transform: "translateX(-2px) rotate(45deg)" }} />
        </button>

        <header className="absolute top-6 left-0 right-0 z-30 px-8 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 no-underline">
            <img src={logoMarkWhite} alt="Booble" className="size-11 rounded-full shadow-lg" />
            <span className="font-display text-3xl text-cream leading-none tracking-tight">booble</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cream/90">
            <a href="#build" className="hover:text-cream transition">Build your cup</a>
            <a href="#why" className="hover:text-cream transition">Why us</a>
            <a href="#shop" className="hover:text-cream transition">In the shop</a>
            <a href="#visit" className="hover:text-cream transition">Visit</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href={`tel:+216${shop.phone.replace(/\s/g, "")}`} className="hidden md:inline text-sm font-medium text-cream/90 hover:text-cream">Call us</a>
            <a href="#build" className="rounded-full bg-cream text-ink px-5 py-2 text-sm font-semibold hover:bg-white transition">Order now</a>
          </div>
        </header>

        <div className="relative z-10 pt-32 pb-40 flex flex-col items-center text-center px-6">
          <p className="text-cream/90 text-sm md:text-base tracking-[0.35em] uppercase font-semibold mb-3">Build your</p>
          <div className="relative w-full max-w-[1200px]">
            <h1 className="text-cream leading-[0.9] uppercase tracking-tight" style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(4rem, 16vw, 12rem)" }}>booble tea</h1>
            <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
              <div className="relative mt-[-2rem] md:mt-[-3rem]" style={{ transform: "translateY(calc(var(--sy,0) * -0.05px))" }}>
                <div className="absolute inset-0 m-auto size-[420px] rounded-full blur-3xl transition-colors duration-700" style={{ background: "var(--flavor-deep)", opacity: 0.7 }} />
                <div className="relative h-[62vh] w-auto animate-float-cup">
                  <img src={cupImg} alt={`${hero.name} bubble tea`} className="h-full w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.4)] transition-[filter] duration-700" style={{ filter: `hue-rotate(${hero.hue}deg) saturate(1.15)` }} />
                  <img src={logoCup} alt="" className="absolute left-1/2 top-[54%] -translate-x-1/2 w-[19%] opacity-90 select-none" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,.25))" }} />
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-[55%] text-cream/90 text-xs md:text-sm tracking-[0.3em] uppercase font-semibold hidden md:block">since {shop.since}</div>
            <div className="absolute right-0 top-[55%] text-cream/90 text-xs md:text-sm tracking-[0.3em] uppercase font-semibold hidden md:block">best of la marsa · {shop.rating}★</div>
          </div>
        </div>

        {/* hero CTAs + rotating pill */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex flex-col items-center gap-4 px-4">
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase text-cream" style={{ background: "rgba(0,0,0,0.16)", border: "1px solid rgba(255,255,255,0.4)", backdropFilter: "blur(4px)" }}>
            <span className="size-3 rounded-full" style={{ background: hero.color, boxShadow: "0 0 0 3px rgba(255,255,255,.25)", transition: "background 700ms ease" }} />
            Now pouring · {hero.name}
          </span>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <a href="#build" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-cream text-ink px-7 py-3.5 text-[15px] font-bold no-underline" style={{ boxShadow: "0 18px 40px -16px rgba(0,0,0,.5)" }}>Build your cup ↓</a>
            <a href={shop.glovo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full text-cream px-7 py-3.5 text-[15px] font-semibold no-underline" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.4)", backdropFilter: "blur(4px)" }}>Order on Glovo</a>
          </div>
        </div>
      </section>

      {/* ===================== BUILD YOUR CUP ===================== */}
      <Build base={base} flavor={flavor} boba={boba} today={today} price={price} summary={summary}
        setBaseId={setBaseId} setFlavorId={setFlavorId} setBobaId={setBobaId} />

      <Why />
      <Gallery />
      <Reviews />
      <Visit today={today} />
      <Footer />
    </div>
  );
}

function Build({ base, flavor, boba, price, summary, setBaseId, setFlavorId, setBobaId }: {
  base: typeof bases[0]; flavor: Flavor; boba: typeof bobas[0]; today: number; price: number; summary: string;
  setBaseId: (s: string) => void; setFlavorId: (s: string) => void; setBobaId: (s: string) => void;
}) {
  const liquid = `linear-gradient(180deg, ${base.color} 0%, ${flavor.color} 48%, ${flavor.deep} 100%)`;
  const pearls = Array.from({ length: 11 });
  return (
    <section id="build" className="py-24" style={{ background: `linear-gradient(180deg, color-mix(in oklab, ${flavor.color} 14%, var(--background)) 0%, var(--background) 55%)`, transition: "background 900ms ease-out" }}>
      <div className="mx-auto max-w-[1180px] px-6">
        <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: flavor.deep }}>n° 01 — make it yours</p>
        <h2 className="font-serif leading-[0.95] mb-3" style={{ fontSize: "clamp(2.5rem,6vw,4.25rem)" }}>Build your cup.</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-[34rem] leading-relaxed">Pick a tea base, a fruit syrup and your pearls. Watch it come together, then send your order straight to Glovo.</p>

        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-14 items-start">
          {/* live cup preview */}
          <div className="md:sticky md:top-8">
            <div className="relative rounded-[32px] p-8 overflow-hidden" style={{ background: `radial-gradient(ellipse at 50% 30%, color-mix(in oklab, ${flavor.color} 75%, white) 0%, ${flavor.color} 55%, ${flavor.deep} 100%)`, boxShadow: "0 30px 70px -30px rgba(0,0,0,.45)" }}>
              <div className="relative mx-auto" style={{ width: 220, height: 330 }}>
                <div style={{ position: "absolute", left: "60%", top: -8, width: 16, height: 160, borderRadius: 8, background: flavor.deep, transform: "rotate(9deg)", transformOrigin: "bottom center", boxShadow: "inset -4px 0 0 rgba(0,0,0,.14)", zIndex: 4 }} />
                <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 192, height: 52, borderRadius: "120px 120px 14px 14px", background: "rgba(255,255,255,.55)", border: "2px solid rgba(255,255,255,.65)", zIndex: 3 }} />
                <div style={{ position: "absolute", top: 34, left: 0, width: "100%", height: 292, clipPath: "polygon(9% 0, 91% 0, 80% 100%, 20% 100%)", background: "rgba(255,255,255,.16)", overflow: "hidden", boxShadow: "inset 0 0 0 2px rgba(255,255,255,.22)" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "78%", background: liquid, transition: "background .6s" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: "78%", height: 9, background: "rgba(255,255,255,.5)", filter: "blur(1px)" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 70, display: "flex", flexWrap: "wrap", alignContent: "flex-end", justifyContent: "center", gap: 4, padding: "6px 22px" }}>
                    {pearls.map((_, i) => (
                      <div key={i} style={{ width: 14, height: 14, borderRadius: boba.shape === "square" ? 4 : 9999, background: boba.color, boxShadow: "inset -2px -2px 0 rgba(0,0,0,.28), inset 2px 2px 0 rgba(255,255,255,.28)" }} />
                    ))}
                  </div>
                </div>
                <img src={logoCup} alt="" style={{ position: "absolute", bottom: 74, left: "50%", transform: "translateX(-50%)", width: 72, height: 72, zIndex: 5, opacity: 0.92 }} />
              </div>
              <p className="text-center font-serif italic text-cream mt-4" style={{ textShadow: "0 1px 6px rgba(0,0,0,.3)" }}>{summary}</p>
            </div>
          </div>

          {/* steps */}
          <div className="flex flex-col gap-9">
            <Step n="Step 1" label="Your tea base" accent={flavor.deep}>
              <div className="grid grid-cols-3 gap-3">
                {bases.map((b) => (
                  <OptCard key={b.id} selected={b.id === base.id} accent={flavor.deep} onClick={() => setBaseId(b.id)}>
                    <span className="size-5 rounded-full mb-0.5" style={{ background: b.color, boxShadow: "inset 0 0 0 2px rgba(255,255,255,.5)" }} />
                    <span className="text-[15px] font-bold text-ink">{b.name}</span>
                    <span className="text-xs text-muted-foreground leading-snug">{b.desc}</span>
                  </OptCard>
                ))}
              </div>
            </Step>

            <Step n="Step 2" label="Your fruit syrup" accent={flavor.deep}>
              <div className="grid grid-cols-4 gap-3">
                {flavors.map((f) => {
                  const sel = f.id === flavor.id;
                  return (
                    <button key={f.id} onClick={() => setFlavorId(f.id)} className="flex flex-col items-center gap-2 rounded-2xl p-3" style={{ background: sel ? f.color : "oklch(0.99 0.005 80)", border: sel ? "2px solid transparent" : "2px solid oklch(0.9 0.015 70)", outline: sel ? `2px solid ${f.deep}` : "none", outlineOffset: 2, boxShadow: sel ? "0 20px 38px -16px rgba(0,0,0,.45)" : "0 2px 8px -6px rgba(0,0,0,.2)", transform: sel ? "scale(1.07)" : "scale(1)", transformOrigin: "center", transition: "transform 320ms cubic-bezier(.2,.7,.2,1), box-shadow 320ms ease, background 320ms ease" }}>
                      <span className="flex items-center justify-center rounded-xl overflow-hidden" style={{ width: 54, height: 54, background: "rgba(250,246,236,0.6)" }}>
                        <img src={FRUIT[f.id]} alt="" style={{ width: "118%", height: "118%", objectFit: "contain", filter: "saturate(1.15)" }} />
                      </span>
                      <span className="text-[13px] font-semibold text-ink">{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n="Step 3" label="Your pearls" accent={flavor.deep}>
              <div className="flex flex-wrap gap-3">
                {bobas.map((b) => {
                  const sel = b.id === boba.id;
                  return (
                    <button key={b.id} onClick={() => setBobaId(b.id)} className="flex items-center gap-2.5 rounded-full pl-3 pr-[18px] py-2.5" style={{ background: sel ? "oklch(1 0 0)" : "oklch(0.99 0.005 80)", border: sel ? `2px solid ${flavor.deep}` : "2px solid oklch(0.9 0.015 70)", boxShadow: sel ? "0 16px 30px -16px rgba(0,0,0,.4)" : "0 2px 8px -6px rgba(0,0,0,.2)", transform: sel ? "scale(1.07)" : "scale(1)", transformOrigin: "center", transition: "transform 320ms cubic-bezier(.2,.7,.2,1), box-shadow 320ms ease" }}>
                      <span style={{ width: 22, height: 22, flex: "none", borderRadius: b.shape === "square" ? 5 : 9999, background: b.color, boxShadow: "inset -2px -2px 0 rgba(0,0,0,.25), inset 2px 2px 0 rgba(255,255,255,.3)" }} />
                      <span className="text-[13px] font-semibold text-ink">{b.name}</span>
                    </button>
                  );
                })}
              </div>
            </Step>

            {/* tasting note */}
            <div className="rounded-[18px] bg-card border border-border px-[22px] py-[18px] flex items-center gap-4">
              <span className="size-[30px] rounded-full flex-none" style={{ background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, ${flavor.color} 85%, white), ${flavor.deep})` }} />
              <p className="text-[15px] text-muted-foreground leading-relaxed m-0"><strong className="text-ink">{flavor.name}</strong> — {flavor.notes}. Pairs beautifully with {flavor.pairing.charAt(0).toLowerCase() + flavor.pairing.slice(1)}.</p>
            </div>

            {/* summary + order */}
            <div className="rounded-[22px] bg-ink text-cream px-[26px] py-[22px] flex items-center justify-between gap-5 flex-wrap">
              <div>
                <p className="m-0 mb-1 text-xs tracking-[0.16em] uppercase text-cream/60">Your cup</p>
                <p className="m-0 font-serif text-[22px]">{summary}</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="text-right">
                  <p className="m-0 text-xs text-cream/60">approx.</p>
                  <p className="m-0 font-display text-3xl leading-none">{price} DT</p>
                </div>
                <a href={shop.glovo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-[30px] py-[15px] text-base font-bold no-underline" style={{ background: flavor.deep, color: "oklch(0.99 0.01 80)", boxShadow: "0 14px 30px -12px rgba(0,0,0,.6)" }}>Order on Glovo →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ n, label, accent, children }: { n: string; label: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase font-bold text-muted-foreground mb-3.5"><span style={{ color: accent }}>{n}</span> · {label}</p>
      {children}
    </div>
  );
}

function OptCard({ selected, accent, onClick, children }: { selected: boolean; accent: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="flex flex-col items-start gap-1.5 text-left rounded-2xl p-4" style={{ background: selected ? "oklch(1 0 0)" : "oklch(0.99 0.005 80)", border: selected ? `2px solid ${accent}` : "2px solid oklch(0.9 0.015 70)", boxShadow: selected ? "0 18px 34px -16px rgba(0,0,0,.4)" : "0 2px 8px -6px rgba(0,0,0,.2)", transform: selected ? "scale(1.05)" : "scale(1)", transformOrigin: "center", transition: "transform 320ms cubic-bezier(.2,.7,.2,1), box-shadow 320ms ease, border-color 220ms ease" }}>
      {children}
    </button>
  );
}

function Why() {
  const items = [
    { kicker: "01", title: "Real Taiwanese tea", body: "Oolong, jasmine and black tea brewed locally — the actual base, not flavored powder." },
    { kicker: "02", title: "Fresh fruit purées", body: "30–50% real fruit. Natural syrups. Nothing pretends to be something it isn't." },
    { kicker: "03", title: "Homemade tapioca", body: "We cook our pearls in-house in rose, vanilla, brown sugar, strawberry and chocolate." },
  ];
  return (
    <section id="why" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">n° 02 / the craft</p>
        <h2 className="font-serif text-5xl md:text-6xl mb-16 max-w-2xl">Why people drive across Tunis for a <em className="italic text-primary">Booble</em>.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <article key={it.kicker} className="rounded-3xl bg-card p-8 border border-border hover:-translate-y-1 hover:border-primary transition">
              <span className="font-display text-5xl text-primary leading-none">{it.kicker}</span>
              <h3 className="font-serif text-2xl mt-4 mb-3">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const tiles: { src: string; tall?: boolean; wide?: boolean; alt: string }[] = [
    { src: shop1, tall: true, alt: "Booble storefront with neon flamingo" },
    { src: shop2, tall: true, alt: "New Latte Cheesecake Fraise" },
    { src: shop6, alt: "Sprinkle crepe cone" },
    { src: shop3, tall: true, alt: "Two iced bubble teas" },
    { src: shop4, alt: "Matcha bubble tea" },
    { src: shop5, wide: true, alt: "Pink interior with rattan chairs" },
  ];
  return (
    <section id="shop" className="bg-ink text-cream py-24 px-4 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">n° 03 — in the shop</p>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95]">Pink flamingos.<br /><span className="italic text-cream/55">Neon cups. Real chairs.</span></h2>
          </div>
          <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="story-link text-sm text-cream/80 hover:text-cream">Follow @bubble_tea_booble_marsa →</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {tiles.map((t, i) => (
            <figure key={i} className={`reveal relative overflow-hidden rounded-2xl group ${t.tall ? "row-span-2" : ""} ${t.wide ? "col-span-2" : ""}`} style={{ animationDelay: `${i * 90}ms` }}>
              <img src={t.src} alt={t.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute bottom-3 left-4 right-4 text-xs uppercase tracking-widest text-cream translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{t.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const loop = [...reviews, ...reviews];
  return (
    <section id="reviews" className="py-24 overflow-hidden bg-secondary">
      <div className="px-4 max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10 items-center mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">n° 04 / the proof</p>
          <div className="font-display text-9xl text-primary leading-none">{shop.rating}</div>
          <Stars value={shop.rating} className="mt-3" />
          <p className="mt-3 text-muted-foreground">{shop.reviewCount} reviews on Google</p>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl">What La Marsa says <em className="italic text-primary">about us.</em></h2>
      </div>
      <div className="relative">
        <div className="flex gap-5 w-max animate-marquee">
          {loop.map((r, i) => (
            <article key={i} className="w-[340px] shrink-0 rounded-3xl bg-cream border border-border p-6">
              <Stars value={5} />
              <p className="mt-4 text-foreground/85 leading-relaxed text-sm">"{r.text}"</p>
              <div className="mt-5 pt-4 border-t border-border flex justify-between text-xs">
                <span className="font-semibold">{r.name}</span>
                <span className="text-muted-foreground">{r.when}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit({ today }: { today: number }) {
  return (
    <section id="visit" className="px-4 py-16">
      <div className="mx-auto max-w-[1500px] rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-16 grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60 mb-4">n° 05 / come say hi</p>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-8">On rue Imam Chafai, <em className="italic">two minutes</em> from the corniche.</h2>
          <dl className="space-y-3 text-lg">
            <Row label="Address" value={shop.address} />
            <Row label="Phone" value={shop.phone} />
          </dl>
          <p className="uppercase text-xs tracking-widest text-primary-foreground/60 mt-6 mb-2.5">Opening hours</p>
          <div className="flex flex-col gap-0.5">
            {hoursWeekly.map((h) => {
              const isToday = h.dow === today;
              return (
                <div key={h.day} className="flex justify-between items-center px-3 py-1.5 rounded-[10px]" style={{ background: isToday ? "rgba(255,255,255,0.14)" : "transparent" }}>
                  <span className="text-[15px]" style={{ color: isToday ? "oklch(0.97 0.02 80)" : "rgba(250,246,236,0.7)", fontWeight: isToday ? 700 : 500 }}>{h.day}</span>
                  <span className="font-serif text-base">{h.time}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 mt-7">
            {shop.services.map((s) => (
              <span key={s} className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm">{s}</span>
            ))}
          </div>
          <a href={shop.maps} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 rounded-full bg-cream text-primary px-6 py-2.5 text-sm font-bold no-underline">Open in Google Maps →</a>
        </div>
        <div className="rounded-3xl overflow-hidden border border-white/10 min-h-[440px]">
          <iframe title="Booble La Marsa map" src="https://maps.google.com/maps?q=2%20Rue%20Imam%20Chafai%2C%20Marsa%202070&t=&z=16&ie=UTF8&iwloc=&output=embed" className="w-full h-full" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-white/10 pb-3">
      <dt className="text-primary-foreground/60 uppercase text-xs tracking-widest pt-1">{label}</dt>
      <dd className="font-serif text-xl text-right">{value}</dd>
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-border">
        <div className="flex items-center gap-3">
          <img src={logoMarkGreen} alt="Booble" className="size-11" />
          <span className="font-display text-5xl text-primary leading-none">booble</span>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold no-underline">Instagram</a>
          <a href={shop.maps} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold no-underline">Map</a>
          <p className="text-sm text-muted-foreground m-0">© {new Date().getFullYear()} Booble La Marsa. Made with real tea and stubbornness.</p>
        </div>
      </div>
    </footer>
  );
}

function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`inline-flex gap-0.5 text-accent ${className}`} aria-label={`${value} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4 fill-current">
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1z" opacity={i + 1 <= Math.round(value) ? 1 : 0.25} />
        </svg>
      ))}
    </div>
  );
}
