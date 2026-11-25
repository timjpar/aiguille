import type { V3 } from "@/data/gym";

/** Whole-gym camera view (kept outside GymScene so it doesn't pull in three.js). */
export const OVERVIEW: { position: V3; target: V3 } = {
  position: [78, 120, 168],
  target: [78, 0, 36],
};
