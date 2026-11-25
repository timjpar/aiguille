"use client";

import Link from "next/link";
import { gradeScale, HOLD_COLORS, routeLabel, ROUTES, wallById } from "@/data/gym";
import { climbStore, routeStatus, useClimbs } from "@/lib/climbStore";

export default function ClimbLog() {
  const climbs = useClimbs();
  const byId = new Map(ROUTES.map((r) => [r.id, r]));
  const logs = [...climbs.logs].sort((a, b) => b.at - a.at);
  const sent = ROUTES.filter((r) => routeStatus(climbs, r.id).sent);

  // Sends per voted grade (boulder + rope scales side by side).
  const grades = new Map<string, number>();
  for (const r of sent) {
    const g = climbs.votes[r.id]?.grade ?? "Unrated";
    grades.set(g, (grades.get(g) ?? 0) + 1);
  }
  const order = [...gradeScale(ROUTES[0]), ...gradeScale(ROUTES.find((r) => r.lane)!), "Unrated"];
  const rows = order.filter((g) => grades.has(g)).map((g) => [g, grades.get(g)!] as const);
  const max = Math.max(1, ...rows.map(([, n]) => n));

  if (logs.length === 0)
    return (
      <div className="border border-line bg-chalk p-8 text-center">
        <p className="lede">Nothing logged yet.</p>
        <Link href="/walls" className="btn btn--send mt-6">
          Open the 3D map <span className="arrow">→</span>
        </Link>
      </div>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="space-y-6">
        <div className="grid grid-cols-3 border border-line bg-chalk text-center">
          {[
            ["Sent", sent.length],
            ["Flashes", climbs.logs.filter((l) => l.type === "flash").length],
            ["Tries", climbs.logs.filter((l) => l.type === "attempt").length],
          ].map(([k, v]) => (
            <div key={k} className="border-r border-line p-4 last:border-r-0">
              <div className="font-display text-3xl font-extrabold tabular-nums">{v}</div>
              <div className="eyebrow mt-1">{k}</div>
            </div>
          ))}
        </div>
        <div className="border border-line bg-chalk p-5">
          <p className="eyebrow">Sends by your grade</p>
          <ul className="mt-4 space-y-2">
            {rows.map(([g, n]) => (
              <li key={g} className="grid grid-cols-[56px_1fr_24px] items-center gap-2 text-sm">
                <span className="font-mono text-xs">{g}</span>
                <span className="h-3 bg-send" style={{ width: `${(n / max) * 100}%` }} />
                <span className="text-right tabular-nums text-granite">{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="btn btn--ghost w-full justify-center"
          onClick={() => {
            const blob = new Blob([climbStore.exportJSON()], { type: "application/json" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "aiguille-climbs.json";
            a.click();
          }}
        >
          Export my data
        </button>
      </div>

      <ul className="divide-y divide-line border border-line bg-chalk">
        {logs.map((l) => {
          const r = byId.get(l.routeId);
          if (!r) return null;
          return (
            <li key={l.id} className="flex items-center gap-3 px-4 py-3">
              <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: HOLD_COLORS[r.color] }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{routeLabel(r)}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-granite">
                  {wallById(r.wallId).name} · {new Date(l.at).toLocaleString()}
                </span>
              </span>
              <span className="font-mono text-xs text-granite">{climbs.votes[r.id]?.grade ?? "—"}</span>
              <span
                className={`w-16 text-right font-mono text-[11px] uppercase ${
                  l.type === "attempt" ? "text-granite" : "text-send"
                }`}
              >
                {l.type}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
