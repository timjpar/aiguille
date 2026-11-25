// Central content for Aiguille Rock Climbing Center.
// Real facts sourced from aiguille.com so pages stay in sync.

export const SITE = {
  name: "Aiguille Rock Climbing Center",
  short: "Aiguille",
  tagline: "Orlando's only full-service climbing gym.",
  established: 1997,
  phone: "407-332-1430",
  phoneHref: "tel:+14073321430",
  email: "operations@aiguille.com",
  address: {
    line1: "830 S. Ronald Reagan Blvd. #252",
    city: "Longwood",
    state: "FL",
    zip: "32750",
  },
  // Waiver / booking are handled by third-party systems on the live site.
  waiverUrl: "#waiver",
  bookUrl: "#book",
  membershipUrl: "#membership",
  social: {
    instagram: "https://www.instagram.com/aiguilleclimbing",
    facebook: "https://www.facebook.com/aiguilleclimbing",
    handle: "@aiguilleclimbing",
  },
} as const;

export const NAV = [
  { label: "First Visit", href: "/first-visit" },
  { label: "Pricing", href: "/pricing" },
  { label: "Classes", href: "/classes" },
  { label: "Walls", href: "/walls" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const HOURS = [
  { days: "Mon – Fri", open: "10 AM", close: "10 PM" },
  { days: "Saturday", open: "9 AM", close: "10 PM" },
  { days: "Sunday", open: "10 AM", close: "9 PM" },
] as const;

export const STATS = [
  { value: "10,000", unit: "sq ft", label: "of climbing" },
  { value: "24", unit: "ft", label: "wall height" },
  { value: "5", unit: "", label: "top-rope walls" },
  { value: "6", unit: "", label: "auto-belays" },
] as const;

export const WALLS = [
  {
    grade: "5.6+",
    name: "Top-rope",
    body: "Five roped walls up to 24 feet, with a staffed belay and rentals included in every day pass.",
  },
  {
    grade: "Auto",
    name: "Auto-belays",
    body: "Six auto-belays let you climb solo the moment you finish orientation — no partner required.",
  },
  {
    grade: "V0–V10",
    name: "Bouldering",
    body: "Rope-free problems close to the ground across multiple bouldering areas, reset on a rolling basis.",
  },
  {
    grade: "USAC",
    name: "Fresh routes",
    body: "A USAC-certified setting team rotates the walls every week, so there's always a new project waiting.",
  },
] as const;

export const FIRST_VISIT_STEPS = [
  {
    grade: "5.6",
    title: "Sign your waiver",
    body: "Fill it out online before you arrive, or at the front desk. Climbers 18+ sign their own with a photo ID; a parent or guardian signs for anyone under 18.",
    cta: { label: "Sign the waiver", href: SITE.waiverUrl },
  },
  {
    grade: "5.9",
    title: "Grab a day pass + gear",
    body: "One day pass covers every climbing type and the fitness floor, with no time limit. Shoes are required; a harness comes included, and rentals are ready at the desk.",
    cta: { label: "See pricing", href: "/pricing" },
  },
  {
    grade: "5.11",
    title: "Take the 10-minute tour",
    body: "A quick orientation walks you through the rules and the wall types. After that, the gym is yours — auto-belays, bouldering, and the fitness area included.",
    cta: null,
  },
] as const;

export const GOOD_TO_KNOW = [
  { k: "Bring", v: "A valid government-issued photo ID for everyone climbing." },
  { k: "Wear", v: "Comfortable athletic clothing. We rent shoes, harnesses, and belay devices." },
  { k: "Ages", v: "Climbers 5 and up, minimum 25 lbs. Under 14 need a supervisor who is 16 or older." },
  { k: "Time", v: "Day passes have no time limit — climb as long as the gym is open." },
] as const;

export type PriceRow = {
  name: string;
  price: string;
  unit?: string;
  note?: string;
};

export const DAY_PASSES: PriceRow[] = [
  { name: "Day Pass", price: "$20", note: "Harness included" },
  { name: "Student / Hero Day Pass", price: "$17", note: "Students & first-responder / military" },
  { name: "Shoe Rental", price: "$4", note: "Required if you don't bring your own" },
];

export const ROCK_BLOCKS: PriceRow[] = [
  { name: "Rock Block", price: "$100", note: "6 visits · harness included · never expires" },
  { name: "Rock Block + Rental", price: "$105", note: "6 visits with shoe rental included" },
];

export const MEMBERSHIPS: PriceRow[] = [
  { name: "Adult", price: "$65", unit: "/mo" },
  { name: "Student / Hero", price: "$55", unit: "/mo", note: "Students & first-responder / military" },
  { name: "Couple / Family (2)", price: "$110", unit: "/mo" },
  { name: "Add a family member", price: "$30", unit: "/mo", note: "Each additional member after the first two" },
];

export const MEMBER_PERKS = [
  "Free rental equipment, every visit",
  "Full facility access during business hours",
  "One complimentary guest pass each month",
  "Free yoga classes",
  "Belay & technique classes included",
  "Members-only sales, events, and competitions",
] as const;

export const CLASSES = [
  {
    grade: "5.8",
    name: "Intro to Belay",
    who: "Anyone moving past auto-belays",
    body: "Learn the essential knots and how to belay safely on our top-rope walls. Not required for a first visit, but the next step once you're ready for ropes.",
  },
  {
    grade: "5.9",
    name: "Technique Class",
    who: "Ages 12+ · one hour",
    body: "A one-hour foundation in movement and footwork for beginners ready to level up. The fundamentals carry across top-rope, bouldering, and lead.",
  },
  {
    grade: "V2",
    name: "Spotting & Falling",
    who: "Boulderers",
    body: "The safety skills that matter most on the pads — how to spot a partner and how to fall well so you absorb impact and stay healthy.",
  },
  {
    grade: "5.12",
    name: "Private Instruction",
    who: "By appointment",
    body: "One-on-one coaching tailored to you: lead climbing, sport and trad, rappelling, anchors, self-rescue, outdoor first-timers, and more.",
  },
] as const;

export const YOUTH = {
  title: "Youth Teams",
  body: "Recreational and competitive teams that build strength, technique, and confidence in a supportive crew of young climbers. Coached by our staff and open to a range of ages and abilities.",
} as const;
