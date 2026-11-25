"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  generateHolds,
  gradeScale,
  type Hold,
  HOLD_COLORS,
  type HoldColor,
  type Route,
  routeLabel,
  ROUTES,
  surfaceUV,
  type V3,
  wallById,
  wallCamera,
  WALLS,
} from "@/data/gym";
import { climbStore, routeStatus, useClimbs } from "@/lib/climbStore";
import type { CameraGoal } from "./GymScene";
import { OVERVIEW } from "./overview";

const GymScene = dynamic(() => import("./GymScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-[0.2em] text-granite">
      Loading the gym…
    </div>
  ),
});

type Status = "all" | "todo" | "sent";

export default function WallsApp() {
  const params = useSearchParams();
  const editing = params.get("edit") === "1";
  const climbs = useClimbs();

  const [wallFilter, setWallFilter] = useState<string>("all");
  const [colorFilter, setColorFilter] = useState<HoldColor | "all">("all");
  const [status, setStatus] = useState<Status>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [goal, setGoal] = useState<CameraGoal>(null);

  const holdsByRoute = useMemo(() => {
    const out: Record<string, Hold[]> = {};
    for (const r of ROUTES) out[r.id] = climbs.holds[r.id] ?? generateHolds(r);
    return out;
  }, [climbs.holds]);

  const sentIds = useMemo(
    () => new Set(ROUTES.filter((r) => routeStatus(climbs, r.id).sent).map((r) => r.id)),
    [climbs],
  );

  const filtered = useMemo(
    () =>
      ROUTES.filter(
        (r) =>
          (wallFilter === "all" || r.wallId === wallFilter) &&
          (colorFilter === "all" || r.color === colorFilter) &&
          (status === "all" || (status === "sent" ? sentIds.has(r.id) : !sentIds.has(r.id))),
      ),
    [wallFilter, colorFilter, status, sentIds],
  );
  const visible = useMemo(() => new Set(filtered.map((r) => r.id)), [filtered]);
  const selected = ROUTES.find((r) => r.id === selectedId) ?? null;

  const flyToWall = (wallId: string) => {
    const cam = wallCamera(wallById(wallId));
    setGoal({ ...cam, key: Date.now() });
  };

  const chooseWall = (id: string) => {
    setWallFilter(id);
    setSelectedId(null);
    if (id === "all") setGoal({ ...OVERVIEW, key: Date.now() });
    else flyToWall(id);
  };

  const select = (id: string | null) => {
    setSelectedId(id);
    if (id) {
      const r = ROUTES.find((x) => x.id === id)!;
      if (wallFilter !== r.wallId) flyToWall(r.wallId);
    }
  };

  const onWallClick = (wallId: string, seg: number, p: V3) => {
    if (!selected || selected.wallId !== wallId || selected.seg !== seg) return;
    const { u, v } = surfaceUV(wallById(wallId).segments[seg], p);
    const current = holdsByRoute[selected.id];
    climbStore.setHolds(selected.id, [...current, { u, v, s: 0.45 }]);
  };

  const colors = useMemo(
    () => Array.from(new Set(ROUTES.map((r) => r.color))) as HoldColor[],
    [],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      {/* ------------------------------------------------ viewer */}
      <div className="flex min-w-0 flex-col gap-3">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible [&>button]:shrink-0" role="toolbar" aria-label="Jump to wall">
          <Chip active={wallFilter === "all"} onClick={() => chooseWall("all")}>
            Whole gym
          </Chip>
          {WALLS.map((w) => (
            <Chip key={w.id} active={wallFilter === w.id} onClick={() => chooseWall(w.id)}>
              {w.name}
            </Chip>
          ))}
        </div>
        <div className="relative h-[62vh] min-h-[420px] overflow-hidden border border-line bg-chalk">
          <GymScene
            routes={ROUTES}
            holdsByRoute={holdsByRoute}
            visible={visible}
            selectedId={selectedId}
            sentIds={sentIds}
            onSelect={select}
            goal={goal}
            editing={editing}
            onWallClick={onWallClick}
          />
          <p className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-granite">
            Drag to orbit · scroll to zoom · tap a hold to pick its route
          </p>
          {editing && (
            <p className="absolute right-3 top-3 bg-send px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-chalk">
              Edit mode
            </p>
          )}
        </div>
        {wallFilter !== "all" && <WallNote wallId={wallFilter} />}
      </div>

      {/* ------------------------------------------------ side panel */}
      <aside className="flex min-w-0 flex-col gap-4">
        {selected ? (
          <RoutePanel
            route={selected}
            onClose={() => setSelectedId(null)}
            editing={editing}
            holds={holdsByRoute[selected.id]}
          />
        ) : (
          <div className="border border-line bg-chalk p-5">
            <p className="eyebrow">Pick a climb</p>
            <p className="mt-2 text-sm text-granite">
              Tap any hold in the model, or choose from the list. Climbs you&apos;ve sent fade
              slightly so projects stand out.
            </p>
          </div>
        )}

        <div className="border border-line bg-chalk p-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <ColorDot
              active={colorFilter === "all"}
              onClick={() => setColorFilter("all")}
              label="All colours"
            />
            {colors.map((c) => (
              <ColorDot
                key={c}
                color={HOLD_COLORS[c]}
                active={colorFilter === c}
                onClick={() => setColorFilter(c)}
                label={c}
              />
            ))}
          </div>
          <div className="mt-3 flex gap-1.5">
            {(["all", "todo", "sent"] as Status[]).map((s) => (
              <Chip key={s} small active={status === s} onClick={() => setStatus(s)}>
                {s === "all" ? "All" : s === "todo" ? "Projects" : "Sent"}
              </Chip>
            ))}
          </div>
          <ul className="mt-3 max-h-[46vh] divide-y divide-line overflow-auto">
            {filtered.map((r) => {
              const st = routeStatus(climbs, r.id);
              return (
                <li key={r.id}>
                  <button
                    onClick={() => select(r.id)}
                    className={`flex w-full items-center gap-3 px-1 py-2.5 text-left hover:bg-limestone ${
                      selectedId === r.id ? "bg-limestone" : ""
                    }`}
                  >
                    <span
                      className="h-4 w-4 shrink-0 rounded-full border border-line-strong"
                      style={{ background: HOLD_COLORS[r.color] }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-basalt">
                        {routeLabel(r)}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-granite">
                        {wallById(r.wallId).name}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-granite">
                      {st.vote ?? "—"}
                      {st.sent && <span className="ml-1.5 text-send">✓</span>}
                    </span>
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="py-6 text-center text-sm text-granite">No climbs match.</li>
            )}
          </ul>
        </div>
        <Link href="/walls/log" className="btn btn--ink justify-center">
          My climb log <span className="arrow">→</span>
        </Link>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function RoutePanel({
  route,
  onClose,
  editing,
  holds,
}: {
  route: Route;
  onClose: () => void;
  editing: boolean;
  holds: Hold[];
}) {
  const climbs = useClimbs();
  const st = routeStatus(climbs, route.id);
  const wall = wallById(route.wallId);
  const scale = gradeScale(route);

  return (
    <div className="border border-line bg-chalk">
      <div className="h-2" style={{ background: HOLD_COLORS[route.color] }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow">{wall.name}</p>
            <h2 className="display-md mt-2">{routeLabel(route)}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="font-mono text-lg leading-none text-granite hover:text-basalt"
          >
            ×
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-granite">Holds</dt>
          <dd>{holds.length}</dd>
          {route.tag && (
            <>
              <dt className="text-granite">Start tape</dt>
              <dd className="capitalize">{route.tag}</dd>
            </>
          )}
          <dt className="text-granite">Your log</dt>
          <dd>
            {st.attempts} tries · {st.sends} sends
          </dd>
          <dt className="text-granite">Photos</dt>
          <dd className="font-mono text-xs">{route.photos.map((p) => `p${String(p).padStart(2, "0")}`).join(" ")}</dd>
        </dl>
        {route.note && <p className="mt-3 text-sm text-granite">{route.note}</p>}

        <div className="mt-5 grid grid-cols-3 gap-2">
          <button className="btn btn--ghost justify-center px-2" onClick={() => climbStore.addLog(route.id, "attempt")}>
            Try
          </button>
          <button className="btn btn--ink justify-center px-2" onClick={() => climbStore.addLog(route.id, "flash")}>
            Flash
          </button>
          <button className="btn btn--send justify-center px-2" onClick={() => climbStore.addLog(route.id, "send")}>
            Send
          </button>
        </div>

        <div className="mt-6">
          <p className="eyebrow">How hard does it feel?</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {scale.map((g) => (
              <button
                key={g}
                onClick={() => climbStore.setVote(route.id, st.vote === g ? null : g)}
                aria-pressed={st.vote === g}
                className={`min-w-11 border px-2 py-1.5 font-mono text-xs ${
                  st.vote === g
                    ? "border-send bg-send text-chalk"
                    : "border-line-strong text-basalt hover:border-basalt"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-granite">
            Your vote is saved on this device. Gym-wide averages need a shared backend.
          </p>
        </div>

        {st.logs.length > 0 && (
          <ul className="mt-5 space-y-1 border-t border-line pt-3 text-xs">
            {st.logs
              .slice(-5)
              .reverse()
              .map((l) => (
                <li key={l.id} className="flex items-center justify-between font-mono text-granite">
                  <span className="uppercase">{l.type}</span>
                  <span>{new Date(l.at).toLocaleDateString()}</span>
                  <button onClick={() => climbStore.removeLog(l.id)} className="hover:text-send">
                    undo
                  </button>
                </li>
              ))}
          </ul>
        )}

        {editing && (
          <div className="mt-5 space-y-2 border-t border-line pt-4 text-xs">
            <p className="text-granite">
              Click this route&apos;s wall to add a hold. Remove the last hold or reset to the
              generated layout below, then export the JSON.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                className="btn btn--ghost px-3 py-2"
                onClick={() => climbStore.setHolds(route.id, holds.slice(0, -1))}
              >
                Remove last
              </button>
              <button className="btn btn--ghost px-3 py-2" onClick={() => climbStore.setHolds(route.id, [])}>
                Clear
              </button>
              <button className="btn btn--ghost px-3 py-2" onClick={() => climbStore.setHolds(route.id, null)}>
                Reset
              </button>
              <button
                className="btn btn--ink px-3 py-2"
                onClick={() => {
                  const blob = new Blob([climbStore.exportJSON()], { type: "application/json" });
                  const a = document.createElement("a");
                  a.href = URL.createObjectURL(blob);
                  a.download = "aiguille-climbs.json";
                  a.click();
                }}
              >
                Export JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WallNote({ wallId }: { wallId: string }) {
  const w = wallById(wallId);
  return (
    <div className="border-l-2 border-send bg-chalk px-4 py-3 text-sm text-granite">
      <span className="font-semibold text-basalt">{w.name}.</span> {w.blurb}{" "}
      <span className="font-mono text-[11px]">
        Photos: {w.photos.map((p) => `p${String(p).padStart(2, "0")}`).join(" ")}
      </span>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  small,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`border font-mono uppercase tracking-[0.12em] transition-colors ${
        small ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"
      } ${active ? "border-basalt bg-basalt text-chalk" : "border-line-strong text-basalt hover:border-basalt"}`}
    >
      {children}
    </button>
  );
}

function ColorDot({
  color,
  active,
  onClick,
  label,
}: {
  color?: string;
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`h-7 w-7 rounded-full border-2 ${active ? "border-basalt" : "border-transparent"}`}
    >
      <span
        className="block h-full w-full rounded-full border border-line-strong"
        style={{
          background: color ?? "conic-gradient(#ef3e8a, #f6c90e, #9acd32, #2f7fd1, #6a4bb3, #ef3e8a)",
        }}
      />
    </button>
  );
}
