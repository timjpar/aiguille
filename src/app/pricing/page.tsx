import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import {
  DAY_PASSES,
  MEMBER_PERKS,
  MEMBERSHIPS,
  type PriceRow,
  ROCK_BLOCKS,
  SITE,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing & Membership",
  description:
    "Day passes from $17, Rock Block 6-visit passes, and monthly memberships from $55. Harness always included.",
};

function PriceRows({
  rows,
  dark = false,
}: {
  rows: PriceRow[];
  dark?: boolean;
}) {
  return (
    <div>
      {rows.map((r) => (
        <div
          key={r.name}
          className={`flex items-baseline justify-between gap-6 border-t py-5 ${
            dark ? "border-white/12" : "border-line"
          }`}
        >
          <div>
            <div className="font-display text-lg font-bold uppercase tracking-tight">
              {r.name}
            </div>
            {r.note && (
              <div
                className={`mt-1 text-xs ${
                  dark ? "text-granite-400" : "text-granite"
                }`}
              >
                {r.note}
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-baseline gap-1">
            <span className="font-display text-2xl font-extrabold tracking-tight">
              {r.price}
            </span>
            {r.unit && (
              <span
                className={`font-mono text-xs ${
                  dark ? "text-granite-400" : "text-granite"
                }`}
              >
                {r.unit}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing & membership"
        grade="5.6"
        label="Overview"
        title="Simple pricing. Climb your way."
        lede="Drop in for the day, grab a 6-visit Rock Block, or join as a member. A harness is included with every option — you'll only ever add shoes."
      />

      {/* Passes */}
      <Section id="passes" grade="5.8" label="Day passes" tone="limestone">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Drop in</p>
            <h2 className="display-md mt-4">Day passes</h2>
            <p className="mt-3 max-w-md text-granite">
              All climbing plus the fitness floor, no time limit. Stay as long as
              the gym is open.
            </p>
            <div className="mt-6">
              <PriceRows rows={DAY_PASSES} />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow">Best value</p>
            <h2 className="display-md mt-4">Rock Blocks</h2>
            <p className="mt-3 max-w-md text-granite">
              Six visits for the price of four. No expiration date — share them
              across the year or bring a friend.
            </p>
            <div className="mt-6">
              <PriceRows rows={ROCK_BLOCKS} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Membership */}
      <Section id="membership" grade="5.11" label="Membership" tone="basalt">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow !text-glacier">Membership</p>
            <h2 className="display-lg mt-4 text-limestone">
              Climb all month.
            </h2>
            <p className="mt-4 max-w-md text-granite-400">
              Monthly EFT billing, cancel anytime. First-time and reinstating
              members add a one-time $25 startup fee.
            </p>
            <div className="mt-6">
              <PriceRows rows={MEMBERSHIPS} dark />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-white/12 bg-basalt-800 p-8">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-limestone">
                Every membership includes
              </h3>
              <ul className="mt-5 space-y-3">
                {MEMBER_PERKS.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-3 text-sm text-limestone"
                  >
                    <span className="mt-0.5 font-mono text-send">✦</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href={SITE.membershipUrl}
                className="btn btn--send mt-8 w-full justify-center"
              >
                Become a member <span className="arrow">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        kicker="Questions about pricing?"
        heading={
          <>
            Call us —
            <br />
            we&apos;ll sort it out.
          </>
        }
        primary={{ href: SITE.phoneHref, label: `Call ${SITE.phone}` }}
        secondary={{ href: "/first-visit", label: "Plan a first visit" }}
      />
    </>
  );
}
