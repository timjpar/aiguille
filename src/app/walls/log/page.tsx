import type { Metadata } from "next";
import ClimbLog from "@/components/gym/ClimbLog";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "My climb log",
  description: "Your sends, flashes and attempts at Aiguille, with the grades you voted.",
};

export default function LogPage() {
  return (
    <>
      <PageHero
        eyebrow="Walls · Log"
        grade="V1"
        label="Log"
        title="Your climb log."
        lede="Every try, flash and send you've logged on the 3D map, plus how hard you rated each one."
      />
      <Section id="history" grade="V3" label="History" tone="limestone" className="!py-12">
        <div className="wrap">
          <ClimbLog />
        </div>
      </Section>
    </>
  );
}
