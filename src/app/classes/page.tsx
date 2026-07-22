import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { CLASSES, SITE, YOUTH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Classes & Coaching",
  description:
    "Certified instruction for every level — belay classes, technique, spotting and falling, private coaching, and youth teams.",
};

export default function ClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Classes & coaching"
        grade="5.6"
        label="Overview"
        title="Learn to climb well."
        lede="Our certified instructors meet you wherever you are — from tying your first knot to leading outdoors. Classes aren't required to climb, but they're the fastest way to get better and stay safe."
      />

      {/* Classes */}
      <Section id="classes" grade="5.9" label="Classes" tone="limestone">
        <div className="wrap">
          <Reveal className="max-w-xl">
            <p className="eyebrow">What we teach</p>
            <h2 className="display-md mt-4">Skills, step by step.</h2>
          </Reveal>

          <div className="mt-10 grid gap-px sm:grid-cols-2">
            {CLASSES.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <div className="flex h-full flex-col border border-line bg-chalk p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-send">
                      {c.grade}
                    </span>
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-granite-400">
                      {c.who}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight">
                    {c.name}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-granite">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-granite">
              Class schedules and booking are handled online. For private
              instruction or anything not listed — outdoor days, anchors,
              self-rescue, mountaineering — reach out and we&apos;ll build it
              around you.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Youth */}
      <Section id="youth" grade="5.11" label="Youth teams" tone="chalk">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">For younger climbers</p>
            <h2 className="display-md mt-4">{YOUTH.title}</h2>
            <p className="lede mt-5">{YOUTH.body}</p>
            <a href={SITE.bookUrl} className="btn btn--ghost mt-7">
              Ask about teams <span className="arrow">→</span>
            </a>
          </Reveal>

          <Reveal delay={90}>
            <div className="grid grid-cols-2 gap-px">
              {[
                { k: "Ages 5+", v: "Minimum 25 lbs to start" },
                { k: "Rec + comp", v: "From first holds to competition" },
                { k: "Coached", v: "By our own certified staff" },
                { k: "Every week", v: "Fresh routes to train on" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="border border-line bg-limestone p-6"
                >
                  <div className="font-display text-lg font-bold uppercase tracking-tight text-basalt">
                    {item.k}
                  </div>
                  <div className="mt-1 text-sm text-granite">{item.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        kicker="Ready to level up?"
        heading={
          <>
            Book a class,
            <br />
            find your next grade.
          </>
        }
        primary={{ href: SITE.bookUrl, label: "Book a class" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
