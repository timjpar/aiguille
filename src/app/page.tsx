import Link from "next/link";
import Contours from "@/components/Contours";
import HeroWall from "@/components/HeroWall";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import {
  CLASSES,
  FIRST_VISIT_STEPS,
  MEMBER_PERKS,
  SITE,
  STATS,
  WALLS,
  YOUTH,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section
        id="top"
        data-rail
        data-rail-grade="5.6"
        data-rail-label="Base"
        className="relative scroll-mt-24 overflow-hidden border-b border-line"
      >
        <Contours
          color="var(--color-glacier)"
          opacity={0.45}
          className="left-[-20%] top-[-30%] h-[150%] w-[75%]"
        />
        <div className="wrap relative grid items-center gap-10 pb-14 pt-12 sm:pb-16 sm:pt-16 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="eyebrow">Longwood · Orlando, FL — Est. {SITE.established}</p>
            <h1 className="display-xl mt-6">
              Everything
              <br />
              here goes
              <br />
              <span className="text-send">up.</span>
            </h1>
            <p className="lede mt-7 max-w-xl">
              Orlando&apos;s only full-service climbing gym. Ten thousand square
              feet of top-rope, bouldering, and auto-belays in Longwood — routes
              reset every week, and coaches for every level.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/first-visit" className="btn btn--send">
                Plan your first visit <span className="arrow">→</span>
              </Link>
              <Link href="/pricing" className="btn btn--ghost">
                See pricing
              </Link>
            </div>
            <a
              href={SITE.waiverUrl}
              className="mt-5 inline-block font-mono text-xs uppercase tracking-[0.14em] text-granite transition-colors hover:text-send"
            >
              Been in before? Sign the waiver →
            </a>
          </div>

          <div className="mx-auto hidden h-[500px] w-full max-w-[300px] lg:block">
            <HeroWall />
          </div>
        </div>

        {/* stat strip */}
        <div className="relative border-t border-line bg-chalk/70">
          <div className="wrap grid grid-cols-2 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`border-line px-5 py-6 ${
                  i > 1 ? "border-t sm:border-t-0" : ""
                } ${i % 2 === 1 ? "border-l" : ""} sm:border-l sm:first:border-l-0`}
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-basalt sm:text-4xl">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="font-mono text-xs text-granite">{s.unit}</span>
                  )}
                </div>
                <div className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-granite">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- First visit */}
      <Section id="first-visit" grade="5.8" label="First visit" tone="limestone">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">First visit</p>
            <h2 className="display-md mt-4">Three moves to your first climb.</h2>
            <p className="lede mt-4">
              No experience needed. Walk in, get set up, and you&apos;ll be on the
              wall the same day.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {FIRST_VISIT_STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90}>
                <div className="card card--hover flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-extrabold text-line-strong">
                      0{i + 1}
                    </span>
                    <span className="border border-line-strong px-2.5 py-1 font-mono text-[0.7rem] font-bold text-basalt">
                      {step.grade}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-granite">
                    {step.body}
                  </p>
                  {step.cta && (
                    <a
                      href={step.cta.href}
                      className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-send hover:text-send-deep"
                    >
                      {step.cta.label} →
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------------- The walls */}
      <Section id="walls" grade="5.10" label="The walls" tone="basalt">
        <Contours
          color="var(--color-glacier)"
          opacity={0.16}
          className="right-[-10%] top-[-20%] h-[140%] w-[55%]"
        />
        <div className="wrap relative">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <Reveal>
              <p className="eyebrow !text-glacier">The walls</p>
              <h2 className="display-lg mt-4 text-limestone">
                24 feet up,
                <br />
                reset weekly.
              </h2>
              <p className="lede mt-5 max-w-md !text-granite-400">
                Five top-rope walls, six auto-belays, and multiple bouldering
                areas across 10,000 square feet. A USAC-certified setting team
                keeps a fresh project on every wall.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {WALLS.map((w, i) => (
                <Reveal key={w.name} delay={i * 80}>
                  <div className="h-full border border-white/15 bg-basalt-800 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-bold uppercase tracking-tight text-limestone">
                        {w.name}
                      </h3>
                      <span className="font-mono text-xs font-bold text-send">
                        {w.grade}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-granite-400">
                      {w.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- Pricing */}
      <Section id="pricing" grade="5.11" label="Pricing" tone="chalk">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-xl">
              <p className="eyebrow">Pricing</p>
              <h2 className="display-md mt-4">Pay as you climb, or join.</h2>
            </Reveal>
            <Reveal>
              <Link href="/pricing" className="btn btn--ghost">
                Full pricing <span className="arrow">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                tag: "Drop in",
                name: "Day Pass",
                price: "$20",
                unit: "",
                note: "All climbing + fitness floor, harness included. No time limit.",
                featured: false,
              },
              {
                tag: "Best value",
                name: "Rock Block",
                price: "$100",
                unit: "/ 6 visits",
                note: "Six visits for the price of four. Never expires. Harness included.",
                featured: true,
              },
              {
                tag: "Membership",
                name: "From",
                price: "$55",
                unit: "/ mo",
                note: "Full access, free rentals, guest passes, yoga, and classes.",
                featured: false,
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div
                  className={`flex h-full flex-col p-7 ${
                    p.featured ? "bg-basalt text-limestone" : "card card--hover"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.68rem] uppercase tracking-[0.16em] ${
                      p.featured ? "text-send" : "text-granite"
                    }`}
                  >
                    {p.tag}
                  </span>
                  <div className="mt-6 font-display text-2xl font-bold uppercase tracking-tight">
                    {p.name}
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-5xl font-extrabold tracking-tight">
                      {p.price}
                    </span>
                    {p.unit && (
                      <span
                        className={`font-mono text-xs ${
                          p.featured ? "text-granite-400" : "text-granite"
                        }`}
                      >
                        {p.unit}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-4 flex-1 text-sm leading-relaxed ${
                      p.featured ? "text-granite-400" : "text-granite"
                    }`}
                  >
                    {p.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- Classes */}
      <Section id="classes" grade="5.12" label="Coaching" tone="limestone">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Coaching</p>
            <h2 className="display-md mt-4">Learn to belay. Then learn to send.</h2>
            <p className="lede mt-4">
              Certified instructors for every step — from your first knot to lead
              climbing and outdoor days.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {CLASSES.map((c, i) => (
              <Reveal key={c.name} delay={i * 70}>
                <div className="flex gap-5 border-b border-line py-6">
                  <span className="mt-1 shrink-0 font-mono text-xs font-bold text-send">
                    {c.grade}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                        {c.name}
                      </h3>
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-granite-400">
                        {c.who}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-granite">
                      {c.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 bg-chalk p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                  {YOUTH.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm text-granite">{YOUTH.body}</p>
              </div>
              <Link href="/classes" className="btn btn--ghost shrink-0">
                All classes <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ----------------------------------------------------------- About */}
      <Section id="about" grade="5.13" label="Since 1997" tone="chalk">
        <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Since 1997</p>
            <h2 className="display-md mt-4">A needle of rock, kept indoors.</h2>
            <p className="lede mt-5">
              <span className="font-mono text-base text-send">Aiguille</span> is
              French for the sharp, needle-like peaks of the high Alps. For more
              than 25 years we&apos;ve brought that vertical world to Central
              Florida — challenging, inspiring, and supporting climbers of all
              ages and abilities.
            </p>
            <Link href="/about" className="btn btn--ghost mt-7">
              Our story <span className="arrow">→</span>
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <ul className="grid gap-3">
              {MEMBER_PERKS.slice(0, 4).map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-3 border-l-2 border-send bg-limestone/60 py-3 pl-4 pr-3 text-sm text-basalt"
                >
                  <span className="font-mono text-xs text-send">✦</span>
                  {perk}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------- Visit CTA */}
      <section
        id="visit"
        data-rail
        data-rail-grade="Top"
        data-rail-label="Visit"
        className="relative scroll-mt-24 overflow-hidden bg-send text-chalk"
      >
        <div className="wrap relative py-20 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-chalk/80">
                Ready when you are
              </p>
              <h2 className="display-lg mt-4 text-chalk">
                Come get off
                <br />
                the ground.
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/first-visit" className="btn btn--chalk justify-center">
                Plan your first visit <span className="arrow">→</span>
              </Link>
              <a
                href={SITE.phoneHref}
                className="btn justify-center border-2 border-chalk/50 text-chalk hover:bg-chalk hover:text-send"
              >
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
