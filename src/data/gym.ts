/**
 * Aiguille gym model, built from the 54 reference photos (gym-photos/raw/pNN.jpg).
 *
 * Units are feet. x runs west→east, z runs north→south, y is up.
 * Wall shapes, hold colours and the set of routes on each wall come from the
 * photos; exact hold positions are approximated (see `generateHolds`) and can
 * be corrected in the viewer's edit mode (/walls?edit=1).
 */

export type Vec2 = [number, number];

/** One stacked band of a wall segment: `lean` is degrees past vertical (+ = overhang). */
export type Tier = { h: number; lean: number };

/**
 * A straight run of wall from `a` to `b` (floor plan). The climber stands on
 * the side given by rotating a→b 90° counter-clockwise, i.e. normal = (-dz, dx).
 */
export type Segment = { a: Vec2; b: Vec2; tiers: Tier[] };

export type Volume = { seg: number; u: number; v: number; s: number };

export type WallKind = "boulder" | "toprope" | "autobelay" | "training";

export type Wall = {
  id: string;
  name: string;
  kind: WallKind;
  blurb: string;
  photos: number[];
  segments: Segment[];
  volumes?: Volume[];
  /** Panel tint; defaults to the gym's gray. */
  tint?: string;
  /** Dense "every hold is on" boards (spray / LED / campus). */
  pattern?: "spray" | "led" | "campus";
};

export type HoldColor =
  | "pink"
  | "yellow"
  | "blue"
  | "purple"
  | "green"
  | "lime"
  | "white"
  | "black"
  | "red"
  | "orange"
  | "gray"
  | "teal";

export const HOLD_COLORS: Record<HoldColor, string> = {
  pink: "#ef3e8a",
  yellow: "#f6c90e",
  blue: "#2f7fd1",
  purple: "#6a4bb3",
  green: "#2e8b47",
  lime: "#9acd32",
  white: "#ece6d6",
  black: "#1d1f22",
  red: "#d1283a",
  orange: "#f0702a",
  gray: "#8d9399",
  teal: "#22a6b3",
};

export type Size = "s" | "m" | "l" | "mix";

export type Route = {
  id: string;
  wallId: string;
  color: HoldColor;
  /** Segment index on the wall. */
  seg: number;
  /** Horizontal band (0–1 across the segment) the route wanders within. */
  u: [number, number];
  holds: number;
  size: Size;
  /** Colour of the start tape, when visible in a photo. */
  tag?: string;
  /** Rope lane number for top-rope / auto-belay walls. */
  lane?: number;
  note?: string;
  photos: number[];
};

/* ------------------------------------------------------------------ *
 * Walls
 * ------------------------------------------------------------------ */

export const WALLS: Wall[] = [
  {
    id: "cave",
    name: "The Cave",
    kind: "boulder",
    blurb:
      "Steep U-shaped cave. Vertical kicker into a 40° band and a near-roof, with big pink and yellow volumes.",
    photos: [1, 3, 7, 8, 9, 10, 11],
    segments: [
      // west side (climber faces west)
      { a: [2, 34], b: [2, 14], tiers: [{ h: 6, lean: 0 }, { h: 9, lean: 28 }] },
      // back (north) of the cave
      { a: [2, 14], b: [26, 14], tiers: [{ h: 5, lean: 0 }, { h: 7, lean: 55 }, { h: 4, lean: 15 }] },
      // east arête side
      { a: [26, 14], b: [26, 30], tiers: [{ h: 7, lean: 5 }, { h: 8, lean: 20 }] },
    ],
    volumes: [
      { seg: 0, u: 0.35, v: 0.55, s: 2.4 },
      { seg: 0, u: 0.62, v: 0.42, s: 2 },
      { seg: 0, u: 0.8, v: 0.45, s: 1.8 },
      { seg: 1, u: 0.2, v: 0.58, s: 1.6 },
      { seg: 1, u: 0.5, v: 0.5, s: 1.3 },
      { seg: 1, u: 0.78, v: 0.55, s: 1.8 },
      { seg: 2, u: 0.3, v: 0.6, s: 1.5 },
    ],
  },
  {
    id: "prow",
    name: "Prow Wall",
    kind: "boulder",
    blurb:
      "Long, gently overhung face running from the cave toward the fan, with orange edges and pink-on-volume problems.",
    photos: [12, 13],
    segments: [{ a: [2, 62], b: [2, 36], tiers: [{ h: 3, lean: 0 }, { h: 12, lean: 14 }] }],
    volumes: [
      { seg: 0, u: 0.55, v: 0.68, s: 2.2 },
      { seg: 0, u: 0.42, v: 0.42, s: 2.6 },
      { seg: 0, u: 0.62, v: 0.42, s: 2 },
    ],
  },
  {
    id: "tower",
    name: "Tower Boulder",
    kind: "boulder",
    blurb:
      "Freestanding tower near the rules sign. Tall overhung arête on one side, a vertical face with gray and purple circuits on the other.",
    photos: [2, 4, 5, 6],
    segments: [
      { a: [34, 30], b: [34, 42], tiers: [{ h: 5, lean: 0 }, { h: 11, lean: 12 }] },
      { a: [34, 42], b: [46, 42], tiers: [{ h: 6, lean: 0 }, { h: 10, lean: 4 }] },
      { a: [46, 42], b: [46, 30], tiers: [{ h: 16, lean: 6 }] },
      { a: [46, 30], b: [34, 30], tiers: [{ h: 16, lean: 0 }] },
    ],
    volumes: [
      { seg: 0, u: 0.55, v: 0.75, s: 2 },
      { seg: 0, u: 0.7, v: 0.45, s: 1.8 },
      { seg: 1, u: 0.92, v: 0.4, s: 2 },
    ],
  },
  {
    id: "toprope",
    name: "Top-Rope Wall",
    kind: "toprope",
    blurb:
      "24-ft lanes on purple carpet. Big black spheres and hex volumes on the left, the giant yellow jug line on the right.",
    photos: [14, 15],
    segments: [{ a: [96, 70], b: [70, 70], tiers: [{ h: 24, lean: 0 }] }],
    volumes: [
      { seg: 0, u: 0.22, v: 0.55, s: 3.6 },
      { seg: 0, u: 0.27, v: 0.72, s: 2 },
    ],
  },
  {
    id: "pillar",
    name: "The Pillar",
    kind: "toprope",
    blurb:
      "The tall Aiguille-logo pillar with roped lanes up both faces and an inside corner into the auto-belay wall.",
    photos: [21, 22, 23, 24, 28],
    segments: [
      { a: [84, 34], b: [84, 50], tiers: [{ h: 24, lean: 0 }] },
      { a: [100, 34], b: [84, 34], tiers: [{ h: 24, lean: 0 }] },
    ],
  },
  {
    id: "autobelay",
    name: "Auto-Belay Wall",
    kind: "autobelay",
    blurb:
      "Six Perfect Descent auto-belays on a slightly-past-vertical 24-ft face. Clip-in triangles mark each lane.",
    photos: [16, 17, 18, 19, 20, 28],
    segments: [{ a: [100, 2], b: [100, 34], tiers: [{ h: 24, lean: 3 }] }],
  },
  {
    id: "vert",
    name: "Vert Wall",
    kind: "boulder",
    blurb:
      "The long vertical bouldering wall on a raised mat, labeled VERT WALL. Pyramid volumes and a tall wedge feature.",
    photos: [25, 26, 27, 29, 30, 31, 32, 33, 34, 35],
    segments: [{ a: [28, 2], b: [64, 2], tiers: [{ h: 15, lean: 0 }] }],
    volumes: [
      { seg: 0, u: 0.12, v: 0.55, s: 1.6 },
      { seg: 0, u: 0.2, v: 0.4, s: 1.8 },
      { seg: 0, u: 0.3, v: 0.75, s: 1.4 },
      { seg: 0, u: 0.42, v: 0.5, s: 2.4 },
      { seg: 0, u: 0.58, v: 0.62, s: 1.6 },
      { seg: 0, u: 0.82, v: 0.3, s: 1.5 },
    ],
  },
  {
    id: "annex",
    name: "Annex Overhang",
    kind: "boulder",
    blurb:
      "Long overhanging wall in the second room with stacked pyramid volumes and a mix of crimps and pinches.",
    photos: [41, 42, 43, 44, 50, 51],
    segments: [{ a: [108, 4], b: [150, 4], tiers: [{ h: 3, lean: 0 }, { h: 12, lean: 18 }] }],
    volumes: [
      { seg: 0, u: 0.12, v: 0.55, s: 2 },
      { seg: 0, u: 0.22, v: 0.5, s: 2.4 },
      { seg: 0, u: 0.38, v: 0.75, s: 2.2 },
      { seg: 0, u: 0.48, v: 0.35, s: 1.8 },
      { seg: 0, u: 0.66, v: 0.55, s: 2.6 },
      { seg: 0, u: 0.82, v: 0.62, s: 2 },
      { seg: 0, u: 0.9, v: 0.35, s: 2.2 },
    ],
  },
  {
    id: "spray",
    name: "Spray Wall",
    kind: "training",
    blurb: "Steep freestanding spray wall over a deep pit mat — every hold is on. Make up your own problems.",
    photos: [49, 53],
    pattern: "spray",
    tint: "#2a2d31",
    segments: [{ a: [134, 40], b: [118, 40], tiers: [{ h: 3, lean: 0 }, { h: 13, lean: 40 }] }],
  },
  {
    id: "campus",
    name: "Campus Board",
    kind: "training",
    blurb: "Overhung campus board with wooden rungs and a peg grid, next to the rules sign in the annex.",
    photos: [52],
    pattern: "campus",
    segments: [{ a: [158, 14], b: [158, 26], tiers: [{ h: 4, lean: 0 }, { h: 9, lean: 22 }] }],
  },
  {
    id: "led",
    name: "LED Board",
    kind: "training",
    blurb: "Adjustable LED training board (Flux) on a steel frame, next to the spin bike.",
    photos: [47, 48],
    pattern: "led",
    tint: "#c9a46e",
    segments: [{ a: [134, 48], b: [126, 48], tiers: [{ h: 1, lean: 0 }, { h: 10, lean: 30 }] }],
  },
];

/* ------------------------------------------------------------------ *
 * Routes — one entry per colour circuit visible in the photos.
 * ------------------------------------------------------------------ */

const R = (
  wallId: string,
  color: HoldColor,
  seg: number,
  u: [number, number],
  holds: number,
  size: Size,
  photos: number[],
  extra: Partial<Route> = {},
): Route => ({
  id: `${wallId}-${color}${extra.lane ? `-l${extra.lane}` : ""}${extra.id ?? ""}`,
  wallId,
  color,
  seg,
  u,
  holds,
  size,
  photos,
  ...extra,
});

export const ROUTES: Route[] = [
  // The Cave
  R("cave", "pink", 0, [0.25, 0.75], 9, "l", [1, 10, 11], { note: "Big pink slopers on the volumes" }),
  R("cave", "blue", 0, [0.05, 0.35], 12, "m", [1, 12], { tag: "teal" }),
  R("cave", "lime", 0, [0.45, 0.95], 10, "m", [1, 11], { note: "Striped lime pinches" }),
  R("cave", "yellow", 1, [0.55, 0.95], 11, "mix", [1, 7, 8, 9], { note: "Yellow ripples + bananas" }),
  R("cave", "green", 1, [0.05, 0.45], 10, "m", [7, 8, 9], { tag: "teal", note: "Dark green roof line" }),
  R("cave", "purple", 1, [0.25, 0.7], 9, "m", [1, 3, 8, 9]),
  R("cave", "white", 1, [0.3, 0.85], 8, "l", [3, 7, 10]),
  R("cave", "black", 2, [0.2, 0.7], 8, "l", [10, 11], { note: "Big black blobs" }),
  R("cave", "red", 2, [0.4, 1], 12, "s", [10, 11]),
  R("cave", "teal", 1, [0.4, 0.7], 6, "s", [3]),

  // Prow Wall
  R("prow", "orange", 0, [0.02, 0.35], 12, "mix", [12, 13]),
  R("prow", "purple", 0, [0.05, 0.4], 12, "m", [12, 13]),
  R("prow", "blue", 0, [0.25, 0.55], 12, "m", [12, 13], { tag: "teal" }),
  R("prow", "pink", 0, [0.5, 0.95], 10, "mix", [12, 13]),
  R("prow", "green", 0, [0.3, 0.6], 9, "s", [12, 13], { tag: "teal", note: "Long green rails" }),
  R("prow", "yellow", 0, [0.55, 0.9], 10, "s", [12, 13]),

  // Tower Boulder
  R("tower", "yellow", 0, [0.0, 0.25], 7, "l", [4, 6], { note: "Yellow arête slopers" }),
  R("tower", "red", 0, [0.2, 0.5], 10, "s", [2, 4, 5, 6]),
  R("tower", "purple", 1, [0.05, 0.4], 14, "m", [4, 5, 6], { tag: "green" }),
  R("tower", "lime", 1, [0.35, 0.65], 11, "mix", [4, 5, 6], { tag: "teal" }),
  R("tower", "blue", 1, [0.65, 0.95], 9, "s", [2, 4, 5]),
  R("tower", "orange", 1, [0.55, 0.85], 9, "s", [4, 5, 6]),
  R("tower", "gray", 1, [0.25, 0.75], 10, "m", [4, 5, 6]),
  R("tower", "white", 2, [0.2, 0.7], 8, "l", [2, 5]),
  R("tower", "black", 2, [0.35, 0.8], 9, "m", [2], { note: "Black edges up the prow" }),

  // Top-Rope Wall
  R("toprope", "black", 0, [0.05, 0.3], 10, "l", [14, 15], { lane: 1, note: "Spheres + hex volumes" }),
  R("toprope", "blue", 0, [0.2, 0.45], 18, "s", [14, 15], { lane: 2, tag: "teal" }),
  R("toprope", "white", 0, [0.42, 0.62], 16, "m", [14, 15], { lane: 3, note: "Cream bananas" }),
  R("toprope", "lime", 0, [0.45, 0.65], 20, "s", [14, 15], { lane: 3 }),
  R("toprope", "yellow", 0, [0.68, 0.95], 22, "l", [14, 15], { lane: 4, note: "Giant yellow jug ladder" }),
  R("toprope", "red", 0, [0.82, 1], 14, "s", [14, 15], { lane: 5 }),

  // The Pillar
  R("pillar", "lime", 0, [0.15, 0.5], 16, "m", [23, 24], { lane: 1 }),
  R("pillar", "white", 0, [0.3, 0.65], 16, "s", [23, 24], { lane: 1 }),
  R("pillar", "blue", 1, [0.35, 0.7], 18, "mix", [21, 22, 23], { lane: 2, tag: "teal" }),
  R("pillar", "pink", 1, [0.55, 0.9], 18, "m", [21, 22, 23], { lane: 2 }),
  R("pillar", "black", 1, [0.0, 0.25], 18, "m", [21, 22], { lane: 3 }),

  // Auto-Belay Wall (lanes left → right facing the wall)
  R("autobelay", "black", 0, [0.02, 0.12], 14, "l", [17, 18], { lane: 1 }),
  R("autobelay", "white", 0, [0.08, 0.18], 10, "l", [17, 18], { lane: 1, note: "White shells" }),
  R("autobelay", "green", 0, [0.22, 0.38], 14, "l", [17, 18], { lane: 2 }),
  R("autobelay", "yellow", 0, [0.25, 0.4], 14, "s", [17, 18], { lane: 2, id: "-small" }),
  R("autobelay", "pink", 0, [0.42, 0.56], 16, "m", [16, 19, 20], { lane: 3 }),
  R("autobelay", "white", 0, [0.42, 0.58], 22, "s", [16, 19, 20], { lane: 3, id: "-cream" }),
  R("autobelay", "purple", 0, [0.6, 0.7], 10, "l", [16, 19, 20], { lane: 4, note: "Long purple pinches" }),
  R("autobelay", "yellow", 0, [0.62, 0.74], 24, "s", [16, 19, 20], { lane: 4 }),
  R("autobelay", "blue", 0, [0.76, 0.88], 20, "s", [16, 19, 20], { lane: 5 }),
  R("autobelay", "black", 0, [0.74, 0.86], 14, "m", [16, 19, 20], { lane: 5, id: "-horns" }),
  R("autobelay", "orange", 0, [0.88, 0.99], 18, "s", [16, 20], { lane: 6 }),

  // Vert Wall
  R("vert", "yellow", 0, [0.02, 0.2], 12, "mix", [33, 34]),
  R("vert", "lime", 0, [0.1, 0.3], 8, "m", [32, 33], { tag: "purple" }),
  R("vert", "red", 0, [0.2, 0.35], 10, "s", [32, 33]),
  R("vert", "blue", 0, [0.32, 0.5], 12, "mix", [30, 31, 32], { tag: "green", note: "Blue donuts + big rail" }),
  R("vert", "green", 0, [0.3, 0.45], 12, "s", [30, 31, 32], { tag: "green" }),
  R("vert", "black", 0, [0.35, 0.55], 9, "s", [31, 32], { tag: "teal" }),
  R("vert", "orange", 0, [0.48, 0.66], 11, "mix", [26, 29, 30, 31], { tag: "teal" }),
  R("vert", "pink", 0, [0.62, 0.8], 12, "m", [25, 26, 29]),
  R("vert", "purple", 0, [0.55, 0.75], 10, "s", [26, 27, 29], { tag: "green" }),
  R("vert", "white", 0, [0.72, 0.95], 10, "m", [25, 26]),
  R("vert", "gray", 0, [0.78, 0.98], 9, "s", [25, 26]),

  // Annex Overhang
  R("annex", "blue", 0, [0.02, 0.2], 14, "s", [41]),
  R("annex", "red", 0, [0.05, 0.3], 12, "mix", [41, 42], { note: "Red crimps on volumes" }),
  R("annex", "white", 0, [0.1, 0.35], 11, "m", [41, 42]),
  R("annex", "purple", 0, [0.3, 0.5], 8, "l", [41, 42], { note: "Long purple dog-bones" }),
  R("annex", "orange", 0, [0.35, 0.55], 12, "m", [42]),
  R("annex", "lime", 0, [0.28, 0.6], 9, "m", [41, 42]),
  R("annex", "pink", 0, [0.55, 0.75], 14, "mix", [42, 43]),
  R("annex", "yellow", 0, [0.5, 0.7], 6, "mix", [42, 43]),
  R("annex", "green", 0, [0.65, 0.9], 11, "m", [43, 44, 45]),
  R("annex", "black", 0, [0.62, 0.92], 11, "m", [43, 44]),
  R("annex", "gray", 0, [0.55, 0.85], 8, "s", [43, 44]),
  R("annex", "blue", 0, [0.6, 0.75], 4, "l", [43, 44], { id: "-big", note: "Big blue scoops" }),
];

/* ------------------------------------------------------------------ *
 * Rooms, floor features and equipment
 * ------------------------------------------------------------------ */

export const ROOMS = [
  { id: "main", name: "Main hall", x: [0, 100] as Vec2, z: [0, 72] as Vec2 },
  { id: "annex", name: "Annex & training", x: [100, 160] as Vec2, z: [0, 50] as Vec2 },
  { id: "lobby", name: "Lobby / shoes", x: [100, 160] as Vec2, z: [50, 72] as Vec2 },
];

/** Floor pads: [x0, z0, x1, z1, height, colour] */
export const MATS: [number, number, number, number, number, string][] = [
  [2, 14, 26, 36, 1, "#9aa1a6"], // cave
  [2, 36, 14, 62, 1, "#9aa1a6"], // prow
  [30, 26, 50, 46, 1, "#9aa1a6"], // tower
  [28, 2, 64, 14, 1.6, "#9aa1a6"], // vert (raised)
  [66, 2, 100, 72, 0.15, "#6b3fb5"], // rope area carpet
  [108, 4, 150, 16, 1.4, "#9aa1a6"], // annex
  [114, 26, 138, 40, 1.8, "#3a3e44"], // spray pit
  [146, 12, 158, 28, 1.2, "#9aa1a6"], // campus
  [126, 42, 134, 48, 0.8, "#222"], // LED board pads
];

export type Equipment = {
  name: string;
  count: string;
  where: string;
  photos: number[];
  sure: boolean;
};

export const EQUIPMENT: Equipment[] = [
  { name: "Power rack with barbell", count: "1", where: "Annex weights corner", photos: [46], sure: true },
  { name: "Olympic plates (iron + bumper)", count: "~12", where: "Plate tree + on rack", photos: [45, 46], sure: true },
  { name: "Dumbbell rack (two tiers)", count: "~10 pairs", where: "Weights corner wall", photos: [45, 46], sure: true },
  { name: "Adjustable benches", count: "2", where: "Weights corner", photos: [45, 46], sure: true },
  { name: "Kettlebells", count: "3–4", where: "Under dumbbell rack", photos: [45], sure: true },
  { name: "Gymnastic rings", count: "1 pair", where: "Hung from power rack", photos: [46], sure: true },
  { name: "Suspension straps (TRX-style)", count: "1 set", where: "Power rack", photos: [46], sure: true },
  { name: "Resistance bands", count: "~8", where: "Wall hook rail", photos: [45, 46], sure: true },
  { name: "Hangboards", count: "2", where: "Mounted on annex wall corner", photos: [45], sure: true },
  { name: "Campus board", count: "1", where: "Annex, by rules sign", photos: [52], sure: true },
  { name: "Spray wall", count: "1", where: "Annex pit", photos: [49, 53], sure: true },
  { name: "LED training board (Flux)", count: "1", where: "Annex corner", photos: [47, 48], sure: true },
  { name: "Spin bike (LifeCycle GX)", count: "1", where: "In front of LED board", photos: [48], sure: true },
  { name: "Plyo box", count: "1", where: "Beside power rack", photos: [46], sure: true },
  { name: "Medicine / slam balls", count: "2–3", where: "Weights corner floor", photos: [45, 46], sure: true },
  { name: "Foam roller", count: "1", where: "Beside dumbbell rack", photos: [45], sure: true },
  { name: "Dip / parallette stand", count: "1", where: "Back of weights corner", photos: [45, 46], sure: false },
  { name: "Auto-belays (Perfect Descent)", count: "6", where: "Auto-belay wall", photos: [16, 17, 18, 19, 20], sure: true },
  { name: "Crash-pad / brush sticks", count: "several", where: "Leaning on walls", photos: [34, 49, 51], sure: true },
  { name: "Floor fans", count: "4+", where: "Around both halls", photos: [12, 14, 40, 48, 50], sure: true },
];

/* ------------------------------------------------------------------ *
 * Geometry helpers (pure, shared by the viewer and edit mode)
 * ------------------------------------------------------------------ */

export type V3 = [number, number, number];

export function segmentFrame(s: Segment) {
  const dx = s.b[0] - s.a[0];
  const dz = s.b[1] - s.a[1];
  const len = Math.hypot(dx, dz);
  const t: V3 = [dx / len, 0, dz / len];
  const n: V3 = [-dz / len, 0, dx / len];
  return { len, t, n };
}

export function segmentHeight(s: Segment) {
  return s.tiers.reduce((acc, t) => acc + t.h, 0);
}

/**
 * Point + outward surface normal at (u, v) on a segment, where v runs 0→1
 * up the full stack of tiers (measured along the panel surface).
 */
export function surfacePoint(s: Segment, u: number, v: number) {
  const { len, t, n } = segmentFrame(s);
  const total = segmentHeight(s);
  let along = v * total;
  let y = 0;
  let out = 0;
  let lean = s.tiers[0].lean;
  for (const tier of s.tiers) {
    lean = tier.lean;
    const take = Math.min(along, tier.h);
    const r = (lean * Math.PI) / 180;
    y += take * Math.cos(r);
    out += take * Math.sin(r);
    along -= take;
    if (along <= 1e-6) break;
  }
  const r = (lean * Math.PI) / 180;
  const base: V3 = [s.a[0] + t[0] * u * len, 0, s.a[1] + t[2] * u * len];
  const p: V3 = [base[0] + n[0] * out, y, base[2] + n[2] * out];
  const normal: V3 = [n[0] * Math.cos(r), -Math.sin(r), n[2] * Math.cos(r)];
  return { p, normal, t };
}

/** Inverse of surfacePoint for clicks in edit mode (approximate). */
export function surfaceUV(s: Segment, p: V3) {
  const { len, t } = segmentFrame(s);
  const u = ((p[0] - s.a[0]) * t[0] + (p[2] - s.a[1]) * t[2]) / len;
  // walk tiers by height
  let y = p[1];
  let along = 0;
  for (const tier of s.tiers) {
    const c = Math.cos((tier.lean * Math.PI) / 180);
    const tierY = tier.h * c;
    if (y <= tierY) {
      along += y / Math.max(c, 0.05);
      y = 0;
      break;
    }
    along += tier.h;
    y -= tierY;
  }
  return { u: clamp01(u), v: clamp01(along / segmentHeight(s)) };
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/* ------------------------------------------------------------------ *
 * Hold generation
 * ------------------------------------------------------------------ */

export type Hold = { u: number; v: number; s: number };

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SIZE: Record<Exclude<Size, "mix">, [number, number]> = {
  s: [0.22, 0.38],
  m: [0.38, 0.6],
  l: [0.6, 1.1],
};

/**
 * Deterministic hold layout for a route: the route climbs from the bottom to
 * the top of its wall segment, wandering inside its `u` band.
 */
export function generateHolds(route: Route): Hold[] {
  const rand = rng(hash(route.id));
  const out: Hold[] = [];
  const [u0, u1] = route.u;
  let u = u0 + (u1 - u0) * (0.3 + rand() * 0.4);
  const topV = 0.95;
  for (let i = 0; i < route.holds; i++) {
    const v = 0.04 + (topV - 0.04) * (i / Math.max(1, route.holds - 1)) + (rand() - 0.5) * 0.03;
    u += (rand() - 0.5) * (u1 - u0) * 0.55;
    u = Math.min(u1, Math.max(u0, u));
    const kind: Exclude<Size, "mix"> =
      route.size === "mix" ? (["s", "m", "l"] as const)[Math.floor(rand() * 3)] : route.size;
    const [a, b] = SIZE[kind];
    out.push({ u, v: Math.min(0.98, Math.max(0.02, v)), s: a + rand() * (b - a) });
  }
  return out;
}

export function wallById(id: string) {
  return WALLS.find((w) => w.id === id)!;
}

export function routeLabel(r: Route) {
  const name = r.color[0].toUpperCase() + r.color.slice(1);
  const extra = r.id.endsWith("-small")
    ? " (small)"
    : r.id.endsWith("-cream")
      ? " (cream)"
      : r.id.endsWith("-horns")
        ? " (horns)"
        : r.id.endsWith("-big")
          ? " (big)"
          : "";
  return `${name}${extra}${r.lane ? ` · Lane ${r.lane}` : ""}`;
}

export const isRope = (r: Route) => wallById(r.wallId).kind !== "boulder";

export const BOULDER_GRADES = ["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10"];
export const ROPE_GRADES = ["5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13"];

export function gradeScale(r: Route) {
  return isRope(r) ? ROPE_GRADES : BOULDER_GRADES;
}

/** Camera preset: stand back from the middle of the wall's first segment. */
export function wallCamera(w: Wall) {
  const s = w.segments[Math.floor((w.segments.length - 1) / 2)];
  const h = segmentHeight(s);
  const mid = surfacePoint(s, 0.5, 0.45);
  const { n, len } = segmentFrame(s);
  // Stand fairly close but high, so freestanding walls in between don't block the view.
  const back = Math.max(22, len * 0.72);
  const target: V3 = [mid.p[0], h * 0.45, mid.p[2]];
  const position: V3 = [target[0] + n[0] * back, h + Math.max(8, len * 0.35), target[2] + n[2] * back];
  return { target, position };
}
