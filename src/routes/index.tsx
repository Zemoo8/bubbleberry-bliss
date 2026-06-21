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
  const [active, setActive] = useState(flavors[2]); // fraise default (berry)
  const styleVars = {
    ["--flavor" as string]: active.color,
    ["--flavor-deep" as string]: active.deep,
  } as React.CSSProperties;

  return (
    <div style={styleVars} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero active={active} setActive={setActive} />
      <Why />
      <Reviews />
      <Visit />
      <Footer />
    </div>
  );
}

/* HERO: matches Midori reference — title, centered cup, flavor cards row, bg morphs on flavor change */
function Hero({ active, setActive }: { active: typeof flavors[0]; setActive: (f: typeof flavors[0]) => void }) {
  return (
    <section id="top" className="px-4 pt-4 pb-4">
      <div
        className="relative mx-auto max-w-[1500px] rounded-[2.5rem] overflow-hidden min-h-[96vh] p-3 md:p-4 shadow-2xl transition-colors duration-[1200ms] ease-out"
        style={{ background: "var(--flavor-deep)" }}
      >
        {/* inner framed stage */}
        <div className="relative h-full min-h-[92vh] rounded-[2rem] border border-white/15 overflow-hidden transition-colors duration-[1200ms] ease-out"
             style={{ background: "var(--flavor)" }}>

          {/* atmospheric blobs */}
          <div className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-white/20 blur-3xl animate-blob" />
          <div className="pointer-events-none absolute -bottom-48 -right-32 size-[40rem] rounded-full mix-blend-overlay blur-3xl animate-blob"
               style={{ background: "var(--flavor-deep)", animationDelay: "-6s" }} />

          {/* TOP BAR */}
          <div className="absolute top-5 left-5 right-5 z-30 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/85 font-medium">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-white animate-pulse" /> ui/ux animation case
            </span>
            <span className="hidden md:inline">booble la marsa · 2026</span>
          </div>

          {/* NAV */}
          <header className="absolute top-16 left-5 right-5 z-30 flex items-center justify-between">
            <a href="#top" className="font-display text-4xl text-white leading-none tracking-tight">booble</a>
            <nav className="hidden md:flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/20">
              {["Flavors", "Why", "Reviews", "Visit"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-white/90 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-white/20 transition">
                  {l}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a href={`tel:+216${shop.phone.replace(/\s/g, "")}`} className="hidden md:inline text-white/85 text-sm font-medium px-4 py-2">Sign in</a>
              <a href="#visit" className="rounded-full bg-cream text-ink px-5 py-2.5 text-sm font-semibold hover:bg-white transition">
                Visit us
              </a>
            </div>
          </header>

          {/* CENTER STAGE */}
          <div className="relative h-full min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-44">
            <p className="font-serif italic text-base md:text-lg text-white/85 mb-2 tracking-wide">choose your</p>
            <h1 className="font-display text-[18vw] md:text-[12rem] leading-[0.85] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.25)]">
              booble
            </h1>

            {/* meta strip */}
            <div className="mt-4 flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] text-white/75 font-medium">
              <span>since 2019</span>
              <span className="h-px w-12 bg-white/40" />
              <span>la marsa · tunis</span>
              <span className="h-px w-12 bg-white/40 hidden md:block" />
              <span className="hidden md:inline">4.7 ★ · {shop.reviewCount} reviews</span>
            </div>

            {/* CUP — centered, floating, contents tint via hue-rotate */}
            <div className="relative mt-[-1rem] md:mt-[-2rem] flex-1 w-full flex items-end justify-center">
              {/* glow halo behind cup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  key={active.id + "-halo"}
                  className="size-[60%] max-w-[520px] aspect-square rounded-full blur-3xl animate-draw-in"
                  style={{ background: "var(--flavor-deep)", opacity: 0.55 }}
                />
              </div>
              {/* pedestal shadow */}
              <div className="absolute bottom-0 w-72 h-6 rounded-full bg-black/30 blur-xl" />
              <img
                key={active.id + "-cup"}
                src={cupImg}
                alt={`${active.name} bubble tea`}
                width={1024}
                height={1536}
                className="relative h-[58vh] md:h-[62vh] w-auto object-contain drop-shadow-2xl animate-float-cup"
                style={{ filter: `hue-rotate(${hueShift(active.id)}deg) saturate(1.15)` }}
              />
              {/* flavor label badge */}
              <div key={active.id + "-badge"} className="absolute top-6 left-1/2 -translate-x-1/2 animate-draw-in">
                <span className="rounded-full bg-cream/95 text-ink px-4 py-1.5 text-xs font-semibold tracking-wide">
                  #{(flavors.indexOf(active) + 1).toString().padStart(2, "0")} · {active.name.toLowerCase()}
                </span>
              </div>
            </div>
          </div>

          {/* FLAVOR CARDS — bottom row, like the reference */}
          <div id="flavors" className="absolute bottom-6 left-0 right-0 z-30 px-6">
            <div className="mx-auto max-w-4xl">
              <div className="flex gap-3 overflow-x-auto pb-2 justify-center scrollbar-thin">
                {flavors.map((f) => {
                  const isActive = f.id === active.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActive(f)}
                      className={`group shrink-0 flex flex-col items-center gap-2 rounded-2xl p-3 border transition-all duration-300 ${
                        isActive
                          ? "bg-cream border-cream scale-110 shadow-2xl"
                          : "bg-white/15 border-white/25 backdrop-blur-md hover:scale-105 hover:bg-white/25"
                      }`}
                      style={{ minWidth: "104px" }}
                    >
                      <div
                        className="size-14 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6"
                        style={{ background: f.color }}
                      >
                        <span className="font-display text-2xl text-primary leading-none">
                          {f.name[0].toLowerCase()}
                        </span>
                      </div>
                      <span className={`text-xs font-semibold ${isActive ? "text-ink" : "text-white"}`}>
                        {f.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p key={active.id + "-note"} className="text-center text-white/90 font-serif italic text-sm md:text-base mt-3 animate-draw-in max-w-md mx-auto">
                "{active.note}"
              </p>
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
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">n° 02 / the craft</p>
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
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">n° 03 / the proof</p>
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
          <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60 mb-4">n° 04 / come say hi</p>
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
