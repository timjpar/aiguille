import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { SITE, STATS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aiguille has been Central Florida's full-service climbing gym since 1997 — 10,000 sq ft, 24-foot walls, and a USAC-certified setting team.",
};

const COMMUNITY = [
  {
    title: "Memberships & yoga",
    body: "Monthly members get full access, free rentals, guest passes, and free yoga on the mats when the walls quiet down.",
  },
  {
    title: "Youth teams",
    body: "Recreational and competitive teams build strength and confidence for our youngest climbers, coached by our own staff.",
  },
  {
    title: "Groups & events",
    body: "Team outings, scout groups, and lock-ins — a staffed, welcoming way to get a crowd climbing together.",
  },
  {
    title: "Birthdays",
    body: "A party on the wall your kid will actually remember, with instructors handling the ropes and the belays.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About · Est. ${SITE.established}`}
        grade="5.6"
        label="Overview"
        title="A needle of rock, kept in Central Florida."
        lede="Aiguille is French for the sharp, needle-like peaks of the high Alps. Since 1997 we've brought that vertical world indoors to Longwood — Orlando's only full-service climbing gym."
      />

      {/* Story */}
      <Section id="story" grade="5.8" label="Our story" tone="limestone">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="display-md mt-4">
              More than 25 years on the wall.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-5 text-lg leading-relaxed text-granite">
              <p>
                We opened in 1997 with a simple idea: give Central Florida a real
                place to climb, whatever the weather outside. Decades later
                that&apos;s still the job — to{" "}
                <span className="text-basalt">
                  challenge, inspire, and support climbers of all ages and skill
                  levels
                </span>
                .
              </p>
              <p>
                From a nervous first-timer on the auto-belays to a member
                projecting at their limit, everyone shares the same 10,000 square
                feet — and the same welcome at the front desk.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The gym */}
      <Section id="gym" grade="5.10" label="The gym" tone="basalt">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-glacier">The gym</p>
            <h2 className="display-lg mt-4 text-limestone">
              Ten thousand square feet, always changing.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-px sm:grid-cols-4">
            {STATS.map((s) => (
              <Reveal key={s.label}>
                <div className="h-full border border-white/12 bg-basalt-800 p-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold tracking-tight text-limestone">
                      {s.value}
                    </span>
                    {s.unit && (
                      <span className="font-mono text-xs text-glacier">
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-granite-400">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Reveal>
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-limestone">
                A fresh set, every week
              </h3>
              <p className="mt-3 leading-relaxed text-granite-400">
                A USAC-certified routesetting team rotates the walls on a rolling
                schedule, so there&apos;s always a new problem or route waiting —
                whether you climb once a month or five times a week.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-limestone">
                A full pro shop
              </h3>
              <p className="mt-3 leading-relaxed text-granite-400">
                Our shop stocks the major climbing brands alongside boutique
                gear, so you can try shoes and equipment on the wall before you
                buy them.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Community */}
      <Section id="community" grade="5.12" label="Community" tone="chalk">
        <div className="wrap">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Community</p>
            <h2 className="display-md mt-4">A gym for the whole family.</h2>
            <p className="lede mt-4">
              Climbing is what we do, but community is why people stay.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {COMMUNITY.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className="h-full border border-line bg-limestone p-7">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-basalt">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-granite">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        kicker="Come see it for yourself"
        heading={
          <>
            Your first climb
            <br />
            is a walk-in away.
          </>
        }
        primary={{ href: "/first-visit", label: "Plan your first visit" }}
        secondary={{ href: "/contact", label: "Find us" }}
      />
    </>
  );
}
