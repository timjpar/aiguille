import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { HOURS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Hours",
  description:
    "Find Aiguille Rock Climbing Center in Longwood, FL. Hours, phone, email, and directions.",
};

const fullAddress = `${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`;
const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & hours"
        grade="5.6"
        label="Overview"
        title="Come find us in Longwood."
        lede="Just north of Orlando off Ronald Reagan Boulevard. Walk in during business hours — no appointment needed to climb."
      />

      {/* Visit */}
      <Section id="visit" grade="5.8" label="Visit" tone="limestone">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* Details */}
            <Reveal>
              <p className="eyebrow">Get in touch</p>
              <h2 className="display-md mt-4">The details.</h2>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-send">
                    Address
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg text-basalt hover:text-send"
                    >
                      {SITE.address.line1}
                      <br />
                      {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-send">
                    Phone
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={SITE.phoneHref}
                      className="font-display text-2xl font-bold tracking-tight text-basalt hover:text-send"
                    >
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-send">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-lg text-basalt hover:text-send"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-send">
                    Social
                  </dt>
                  <dd className="mt-2 flex gap-4">
                    <a
                      href={SITE.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg text-basalt hover:text-send"
                    >
                      Instagram
                    </a>
                    <a
                      href={SITE.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg text-basalt hover:text-send"
                    >
                      Facebook
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            {/* Hours */}
            <Reveal delay={80}>
              <div className="border border-line bg-chalk p-8">
                <h3 className="eyebrow">Hours</h3>
                <ul className="mt-5">
                  {HOURS.map((h) => (
                    <li
                      key={h.days}
                      className="flex items-baseline justify-between gap-4 border-t border-line py-4"
                    >
                      <span className="font-display text-lg font-bold uppercase tracking-tight text-basalt">
                        {h.days}
                      </span>
                      <span className="font-mono text-sm text-granite">
                        {h.open} – {h.close}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-granite">
                  Last check-in is a little before close so you have time to
                  climb. New climbers should arrive at least an hour before
                  closing to finish orientation.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={120}>
            <div className="mt-12 overflow-hidden border border-line">
              <iframe
                title={`Map to ${SITE.name}`}
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full border-0 grayscale-[0.2]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        kicker="Before you drive over"
        heading={
          <>
            Sign your waiver,
            <br />
            skip the wait.
          </>
        }
        primary={{ href: SITE.waiverUrl, label: "Sign the waiver" }}
        secondary={{ href: SITE.phoneHref, label: `Call ${SITE.phone}` }}
      />
    </>
  );
}
