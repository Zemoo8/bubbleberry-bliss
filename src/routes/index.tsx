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
  const [active, setActive] = useState(flavors[1]);
  const styleVars = {
    ["--flavor" as string]: active.color,
    ["--flavor-deep" as string]: active.deep,
  } as React.CSSProperties;

  return (
    <div style={styleVars} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero active={active} />
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
    <header className="fixed top-4 inset-x-4 z-50 flex items-center justify-between px-6 py-3 rounded-full bg-background/70 backdrop-blur border border-border max-w-6xl mx-auto">
      <a href="#top" className="font-display text-2xl text-primary leading-none">booble</a>
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

function Hero({ active }: { active: typeof flavors[0] }) {
  return (
    <section id="top" className="px-4 pt-24 pb-8">
      <div className="relative mx-auto max-w-[1400px] rounded-[3rem] bg-primary text-primary-foreground overflow-hidden p-8 md:p-14 ring-1 ring-inset ring-white/10 shadow-2xl">
        <div className="absolute -top-32 -right-32 size-[28rem] rounded-full opacity-30 blur-3xl" style={{ background: "var(--flavor)" }} />
        <div className="absolute -bottom-40 -left-20 size-[24rem] rounded-full opacity-20 blur-3xl" style={{ background: "var(--flavor-deep)" }} />

        <div className="relative grid md:grid-cols-2 gap-8 min-h-[70vh] items-center">
          <div className="flex flex-col gap-6 z-10">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em]">
              <span className="size-1.5 rounded-full bg-accent" /> {shop.city} · since the boba revolution
            </span>
            <h1 className="font-display text-[22vw] md:text-[10rem] leading-[0.85]">booble</h1>
            <p className="font-serif text-xl md:text-2xl max-w-md text-primary-foreground/85 italic">
              Real Taiwanese tea, fresh fruit purées, and tapioca we cook ourselves — every morning.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#flavors" className="rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold hover:scale-[1.02] transition">
                Pick your flavor →
              </a>
              <a href="#visit" className="rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition">
                Find the shop
              </a>
            </div>
            <div className="flex items-center gap-3 pt-4 text-sm text-primary-foreground/80">
              <Stars value={shop.rating} />
              <span className="font-semibold text-primary-foreground">{shop.rating}</span>
              <span>· {shop.reviewCount} Google reviews</span>
            </div>
          </div>

          <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-[80%] rounded-full" style={{ background: "radial-gradient(circle, var(--flavor) 0%, transparent 65%)" }} />
            </div>
            <img
              src={cupImg}
              alt={`${active.name} bubble tea`}
              width={1024}
              height={1536}
              className="relative h-full w-auto object-contain drop-shadow-2xl animate-float-cup"
              style={{ filter: `hue-rotate(${hueShift(active.id)}deg) saturate(1.1)` }}
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-display text-5xl md:text-7xl whitespace-nowrap">
              {active.name.toLowerCase()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Playground({ active, setActive }: { active: typeof flavors[0]; setActive: (f: typeof flavors[0]) => void }) {
  return (
    <section id="flavors" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">Eight flavors. One obsession.</p>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] max-w-xl">
              Tap a fruit. <em className="italic text-primary">Watch it pour.</em>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Every Booble cup starts with Taiwanese tea brewed in-house, then layered with the fruit you choose. No syrups pretending to be juice.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
          <div>
            <div className="flex flex-wrap gap-2.5">
              {flavors.map((f) => {
                const isActive = f.id === active.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActive(f)}
                    className={`rounded-full px-5 py-3 text-sm font-semibold border transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary scale-105"
                        : "bg-card text-foreground border-border hover:border-primary"
                    }`}
                  >
                    <span className="inline-block size-2.5 rounded-full mr-2 align-middle" style={{ background: f.color }} />
                    {f.name}
                  </button>
                );
              })}
            </div>
            <p key={active.id + "-note"} className="mt-8 text-2xl font-serif italic text-foreground/80 animate-fade-in">
              "{active.note}"
            </p>
          </div>

          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden flex items-center justify-center transition-colors" style={{ background: "var(--flavor)" }}>
            <img
              src={cupImg}
              alt={active.name}
              loading="lazy"
              width={1024}
              height={1536}
              className="h-[85%] w-auto object-contain drop-shadow-xl"
              style={{ filter: `hue-rotate(${hueShift(active.id)}deg) saturate(1.15)` }}
            />
            <div className="absolute top-6 left-6 font-display text-6xl md:text-8xl text-primary mix-blend-multiply leading-none">
              {active.name.toLowerCase()}
            </div>
            <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur rounded-full px-4 py-2 text-xs font-semibold">
              tap a flavor →
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
    <section id="why" className="px-4 py-24 bg-secondary">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-5xl md:text-6xl mb-16 max-w-2xl">
          Why people drive across Tunis for a <em className="italic text-primary">Booble</em>.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <article key={it.kicker} className="rounded-3xl bg-background p-8 border border-border hover:-translate-y-1 transition">
              <span className="font-display text-3xl text-primary">{it.kicker}</span>
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
    <section id="reviews" className="py-24 overflow-hidden">
      <div className="px-4 max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10 items-center mb-12">
        <div>
          <div className="font-display text-8xl text-primary leading-none">{shop.rating}</div>
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
            <article key={i} className="w-[340px] shrink-0 rounded-3xl bg-card border border-border p-6">
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
    <section id="visit" className="px-4 py-24">
      <div className="mx-auto max-w-6xl rounded-[3rem] bg-primary text-primary-foreground p-10 md:p-16 grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary-foreground/70 mb-4">Come say hi</p>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-8">
            We're on rue Imam Chafai, <em className="italic">two minutes</em> from the corniche.
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
        <div className="rounded-3xl overflow-hidden border border-white/10 min-h-[380px]">
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
        <span className="font-display text-4xl text-primary leading-none">booble</span>
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
