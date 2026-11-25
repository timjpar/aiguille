"use client";

import { useSyncExternalStore } from "react";

/**
 * Climb log + difficulty votes.
 *
 * v1 keeps everything in this browser's localStorage, so it works for one
 * climber with no accounts. All reads/writes go through this module, so a
 * shared backend (for gym-wide votes) can replace `persist`/`load` later
 * without touching the UI.
 */

export type LogType = "attempt" | "flash" | "send";

export type LogEntry = { id: string; routeId: string; type: LogType; at: number };
export type Vote = { routeId: string; grade: string; at: number };

/** Hold positions corrected in edit mode, keyed by route id. */
export type HoldOverride = { u: number; v: number; s: number }[];

type State = {
  logs: LogEntry[];
  votes: Record<string, Vote>;
  holds: Record<string, HoldOverride>;
};

const KEY = "aiguille.climbs.v1";
const EMPTY: State = { logs: [], votes: {}, holds: {} };

let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    state = EMPTY;
  }
}

function persist(next: State) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full / private mode — keep in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => EMPTY;

export function useClimbs() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export const climbStore = {
  addLog(routeId: string, type: LogType) {
    persist({ ...state, logs: [...state.logs, { id: uid(), routeId, type, at: Date.now() }] });
  },
  removeLog(id: string) {
    persist({ ...state, logs: state.logs.filter((l) => l.id !== id) });
  },
  setVote(routeId: string, grade: string | null) {
    const votes = { ...state.votes };
    if (grade) votes[routeId] = { routeId, grade, at: Date.now() };
    else delete votes[routeId];
    persist({ ...state, votes });
  },
  setHolds(routeId: string, holds: HoldOverride | null) {
    const next = { ...state.holds };
    if (holds) next[routeId] = holds;
    else delete next[routeId];
    persist({ ...state, holds: next });
  },
  exportJSON() {
    return JSON.stringify(state, null, 2);
  },
};

/** Summary of one route for the UI. */
export function routeStatus(s: State, routeId: string) {
  const logs = s.logs.filter((l) => l.routeId === routeId);
  const sent = logs.some((l) => l.type !== "attempt");
  const flashed = logs.some((l) => l.type === "flash");
  return {
    attempts: logs.filter((l) => l.type === "attempt").length,
    sends: logs.filter((l) => l.type !== "attempt").length,
    sent,
    flashed,
    vote: s.votes[routeId]?.grade ?? null,
    logs,
  };
}
