import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { FIRST_VISIT_STEPS, GOOD_TO_KNOW, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "First Visit",
  description:
    "Everything a first-time climber needs: sign the waiver, grab a day pass, take the orientation, and you're on the wall the same day.",
};

export default function FirstVisitPage() {
  return (
    <>
      <PageHero
        eyebrow="First visit"
        grade="5.6"
        label="Overview"
        title="Your first visit, start to finish."
        lede="Never climbed before? Perfect. There's nothing to book and no gear to buy — walk in, get set up in a few minutes, and you'll be on the wall the same day."
      />

      {/* Steps */}
      <Section id="steps" grade="5.8" label="The steps" tone="limestone">
        <div className="wrap">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Three steps</p>
            <h2 className="display-md mt-4">From the door to the wall.</h2>
          </Reveal>

          <ol className="mt-12 space-y-px">
            {FIRST_VISIT_STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 60}>
                <div className="grid items-start gap-5 border-t border-line py-8 sm:grid-cols-[auto_1fr] sm:gap-10">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-6xl font-extrabold leading-none text-line-strong">
                      0{i + 1}
                    </span>
                    <span className="border border-line-strong px-2.5 py-1 font-mono text-[0.7rem] font-bold text-basalt">
                      {step.grade}
                    </span>
                  </div>
                  <div className="max-w-2xl">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-granite">{step.body}</p>
                    {step.cta && (
                      <a
                        href={step.cta.href}
                        className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.12em] text-send hover:text-send-deep"
                      >
                        {step.cta.label} →
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Good to know */}
      <Section id="know" grade="5.10" label="Good to know" tone="chalk">
        <div className="wrap">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Good to know</p>
            <h2 className="display-md mt-4">A few details before you come in.</h2>
          </Reveal>

          <div className="mt-10 grid gap-px sm:grid-cols-2">
            {GOOD_TO_KNOW.map((item, i) => (
              <Reveal key={item.k} delay={i * 60}>
                <div className="h-full border border-line bg-limestone p-7">
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-send">
                    {item.k}
                  </div>
                  <p className="mt-3 text-basalt">{item.v}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-granite">
              Waivers can be signed at{" "}
              <a href={SITE.waiverUrl} className="text-send hover:text-send-deep">
                aiguille.com
              </a>{" "}
              before you arrive or at the front desk. Climbers 18 and older sign
              their own; a parent or legal guardian signs for anyone younger, with
              a valid photo ID on hand.
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        id="waiver"
        grade="Top"
        label="Waiver"
        kicker="Skip the wait"
        heading={
          <>
            Sign your waiver,
            <br />
            then come climb.
          </>
        }
        primary={{ href: SITE.waiverUrl, label: "Sign the waiver" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
      />
    </>
  );
}
