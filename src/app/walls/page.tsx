import type { Metadata } from "next";
import { Suspense } from "react";
import WallsApp from "@/components/gym/WallsApp";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { EQUIPMENT, ROUTES, WALLS } from "@/data/gym";

export const metadata: Metadata = {
  title: "Walls",
  description:
    "Explore Aiguille in 3D: every wall, every colour circuit. Log your sends and vote on how hard each climb feels.",
};

export default function WallsPage() {
  const climbing = WALLS.filter((w) => w.kind !== "training");
  return (
    <>
      <PageHero
        eyebrow="Walls · 3D map"
        grade="V0"
        label="Map"
        title="Every wall. Every circuit."
        lede={`${climbing.length} climbing areas and ${ROUTES.length} colour-coded climbs, modelled from photos of the gym. Tap a hold to log it and vote on its grade.`}
      />

      <Section id="map" grade="V2" label="3D gym" tone="limestone" className="!py-10 sm:!py-14">
        <div className="wrap">
          <Suspense fallback={<div className="h-[62vh] border border-line bg-chalk" />}>
            <WallsApp />
          </Suspense>
          <p className="mt-4 max-w-3xl text-xs text-granite">
            Wall shapes, hold colours and circuits come from the reference photos. Hold positions
            are approximate. Open <code className="font-mono">/walls?edit=1</code> to correct a
            route by hand.
          </p>
        </div>
      </Section>

      <Section id="equipment" grade="V4" label="Equipment" tone="chalk">
        <div className="wrap">
          <p className="eyebrow">Training floor</p>
          <h2 className="display-md mt-4">Equipment spotted</h2>
          <p className="lede mt-4 max-w-2xl">
            Everything outside the walls that showed up in the photos: the annex weights corner
            and the training boards.
          </p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-line-strong font-mono text-[11px] uppercase tracking-[0.14em] text-granite">
                <tr>
                  <th className="py-3 pr-4">Item</th>
                  <th className="py-3 pr-4">Count</th>
                  <th className="py-3 pr-4">Where</th>
                  <th className="py-3">Photos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {EQUIPMENT.map((e) => (
                  <tr key={e.name}>
                    <td className="py-3 pr-4 font-semibold text-basalt">
                      {e.name}
                      {!e.sure && (
                        <span className="ml-2 font-mono text-[10px] uppercase text-granite">
                          unclear
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4 tabular-nums">{e.count}</td>
                    <td className="py-3 pr-4 text-granite">{e.where}</td>
                    <td className="py-3 font-mono text-xs text-granite">
                      {e.photos.map((p) => `p${String(p).padStart(2, "0")}`).join(" ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </>
  );
}
