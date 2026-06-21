import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import cupImg from "../assets/cup.png";
import { flavors, reviews, shop } from "../data/booble";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Booble — Bubble Tea La Marsa" },
      { name: "description", content: "Booble La Marsa: real Taiwanese tea, fresh fruit purées and homemade tapioca. 4.7★ on Google. 2 Rue Imam Chafai, Marsa 2070." },
      { property: "og:title", content: "Booble — Bubble Tea La Marsa" },
      { property: "og:description", content: "Real tea base, fresh fruit, homemade tapioca. The best boba in Tunisia." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function hueShift(id: string) {
  const map: Record<string, number> = {
    mangue: 20, peche: 0, fraise: -40, passion: 30, myrtille: 200, pomme: 90, lychee: -20, coco: 10,
  };
  return map[id] ?? 0;
}

function Index() {
  const [active, setActive] = useState(flavors[6]); // lychee default like soft pink/cream
  const styleVars = {
    ["--flavor" as string]: active.color,
    ["--flavor-deep" as string]: active.deep,
  } as React.CSSProperties;

  return (
    <div style={styleVars} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Playground active={active} setActive={setActive} />
      <Why />
      <Reviews />
      <Visit />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-4 inset-x-4 z-50 flex items-center justify-between px-6 py-3 rounded-full bg-cream/80 backdrop-blur border border-border max-w-6xl mx-auto">
      <a href="#top" className="font-display text-3xl text-primary leading-none tracking-tight">booble</a>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#flavors" className="hover:text-primary transition">Flavors</a>
        <a href="#why" className="hover:text-primary transition">Why Booble</a>
        <a href="#reviews" className="hover:text-primary transition">Reviews</a>
        <a href="#visit" className="hover:text-primary transition">Visit</a>
      </nav>
      <a href={`tel:+216${shop.phone.replace(/\s/g, "")}`} className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold hover:opacity-90 transition">
        {shop.phone}
      </a>
    </header>
  );
}

/* --- HERO: giant rounded matcha card with centered script wordmark, midori-style --- */
function Hero() {
  return (
    <section id="top" className="px-4 pt-24 pb-4">
      <div className="relative mx-auto max-w-[1500px] rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden min-h-[92vh] p-3 md:p-4 shadow-2xl">
        {/* inner frame ring like the reference */}
        <div className="relative h-full min-h-[88vh] rounded-[2rem] border border-white/15 overflow-hidden">
          {/* soft blobs */}
          <div className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-accent/30 blur-3xl animate-blob" />
          <div className="pointer-events-none absolute -bottom-48 -right-32 size-[40rem] rounded-full bg-white/10 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />

          {/* top label row */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-primary-foreground/70 font-medium">
            <span>booble · est. la marsa</span>
            <span className="hidden md:inline">interactive · 2026</span>
            <span>n° 01 / boba</span>
          </div>

          {/* center wordmark */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="font-serif italic text-sm md:text-base text-primary-foreground/70 mb-4 animate-draw-in">— bubble tea, brewed slow —</p>
            <h1 className="font-display text-[28vw] md:text-[18rem] leading-[0.8] text-primary-foreground animate-draw-in" style={{ animationDelay: "0.1s" }}>
              booble
            </h1>
            <p className="mt-6 font-serif text-lg md:text-2xl max-w-xl text-primary-foreground/85 animate-draw-in" style={{ animationDelay: "0.25s" }}>
              Real Taiwanese tea. Fresh fruit purées. Tapioca we cook every morning.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-draw-in" style={{ animationDelay: "0.4s" }}>
              <a href="#flavors" className="group rounded-full bg-cream text-primary px-7 py-3.5 font-semibold flex items-center gap-2 hover:bg-accent transition">
                Pick your flavor
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#visit" className="rounded-full border border-white/30 px-7 py-3.5 font-semibold hover:bg-white/10 transition">
                Find the shop
              </a>
            </div>
          </div>

          {/* bottom row */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-xs text-primary-foreground/70">
            <div className="flex items-center gap-3">
              <Stars value={shop.rating} />
              <span><span className="text-primary-foreground font-semibold">{shop.rating}</span> · {shop.reviewCount} Google reviews</span>
            </div>
            <div className="hidden md:flex items-center gap-6 font-mono">
              <span>scroll ↓</span>
              <span>{shop.city}, TN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- PLAYGROUND: tilted product card on a tinted rounded panel --- */
function Playground({ active, setActive }: { active: typeof flavors[0]; setActive: (f: typeof flavors[0]) => void }) {
  return (
    <section id="flavors" className="px-4 py-6">
      <div className="mx-auto max-w-[1500px] rounded-[2.5rem] overflow-hidden p-8 md:p-16 transition-colors duration-700" style={{ background: "var(--flavor)" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink/60 mb-4">n° 02 / the playground</p>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] max-w-2xl text-ink">
              Tap a fruit. <em className="italic">Watch it pour.</em>
            </h2>
          </div>
          <p className="max-w-sm text-ink/70">
            Eight flavors, one obsession. Every cup starts with Taiwanese tea brewed in-house, then layered with the fruit you choose. No syrups pretending to be juice.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
          {/* product stage */}
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-cream/40 backdrop-blur-sm border border-white/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-[70%] rounded-full" style={{ background: "radial-gradient(circle, var(--flavor-deep) 0%, transparent 65%)", opacity: 0.5 }} />
            </div>
            <img
              src={cupImg}
              alt={active.name}
              width={1024}
              height={1536}
              className="absolute inset-0 m-auto h-[85%] w-auto object-contain drop-shadow-2xl animate-float-cup"
              style={{ filter: `hue-rotate(${hueShift(active.id)}deg) saturate(1.15)` }}
            />
            <div key={active.id} className="absolute top-6 left-6 right-6 font-display text-7xl md:text-9xl text-primary mix-blend-multiply leading-none animate-draw-in">
              {active.name.toLowerCase()}
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="bg-cream/90 backdrop-blur rounded-2xl px-4 py-2 text-xs font-mono text-ink">
                #{(flavors.indexOf(active) + 1).toString().padStart(2, "0")} — {active.name.toLowerCase()}
              </div>
              <div className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-xs font-semibold">
                tap a flavor →
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-2.5">
              {flavors.map((f) => {
                const isActive = f.id === active.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActive(f)}
                    className={`rounded-full px-5 py-3 text-sm font-semibold border transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary scale-105 shadow-lg"
                        : "bg-cream/70 text-ink border-white/40 hover:border-primary hover:scale-105"
                    }`}
                  >
                    <span className="inline-block size-2.5 rounded-full mr-2 align-middle" style={{ background: f.color }} />
                    {f.name}
                  </button>
                );
              })}
            </div>

            <div key={active.id + "-card"} className="rounded-3xl bg-cream/70 backdrop-blur border border-white/40 p-7 animate-draw-in">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/60 mb-4">
                <span>now serving</span>
                <span>n° {(flavors.indexOf(active) + 1).toString().padStart(2, "0")}</span>
              </div>
              <h3 className="font-display text-6xl text-primary leading-none mb-3">{active.name.toLowerCase()}</h3>
              <p className="font-serif italic text-xl text-ink/80">"{active.note}"</p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                {[
                  { k: "Tea", v: "Jasmine / Oolong" },
                  { k: "Fruit", v: "30–50% real" },
                  { k: "Pearls", v: "Homemade" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl bg-cream/80 p-3">
                    <div className="text-ink/50 uppercase tracking-wider">{s.k}</div>
                    <div className="font-semibold text-ink mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">n° 03 / the craft</p>
        <h2 className="font-serif text-5xl md:text-6xl mb-16 max-w-2xl">
          Why people drive across Tunis for a <em className="italic text-primary">Booble</em>.
        </h2>
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
        <h2 className="font-serif text-4xl md:text-5xl">
          What La Marsa says <em className="italic text-primary">about us.</em>
        </h2>
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

function Visit() {
  return (
    <section id="visit" className="px-4 py-16">
      <div className="mx-auto max-w-[1500px] rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-16 grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60 mb-4">n° 05 / come say hi</p>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-8">
            On rue Imam Chafai, <em className="italic">two minutes</em> from the corniche.
          </h2>
          <dl className="space-y-5 text-lg">
            <Row label="Address" value={shop.address} />
            <Row label="Phone" value={shop.phone} />
            <Row label="Hours" value={shop.hours} />
            <Row label="Plus Code" value={shop.plusCode} />
          </dl>
          <div className="flex flex-wrap gap-2 mt-8">
            {shop.services.map((s) => (
              <span key={s} className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm">{s}</span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-white/10 min-h-[420px]">
          <iframe
            title="Booble La Marsa map"
            src="https://www.google.com/maps?q=2+Rue+Imam+Chafai,+Marsa+2070&output=embed"
            className="w-full h-full grayscale"
            loading="lazy"
          />
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
        <span className="font-display text-5xl text-primary leading-none">booble</span>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Booble La Marsa. Made with real tea and stubbornness.</p>
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
