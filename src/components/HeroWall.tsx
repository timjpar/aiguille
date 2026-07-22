// Decorative hero graphic: a route drawn up a wall, with height + grade markers.
// The route "draws" on load and the holds pop in sequence (reduced-motion safe).

const HOLDS: { x: number; y: number; c: string; r: number }[] = [
  { x: 116, y: 494, c: "var(--color-basalt)", r: 7 },
  { x: 150, y: 430, c: "var(--color-send)", r: 8 },
  { x: 84, y: 366, c: "var(--color-glacier)", r: 6.5 },
  { x: 150, y: 300, c: "var(--color-basalt)", r: 7 },
  { x: 80, y: 240, c: "var(--color-send)", r: 8 },
  { x: 142, y: 184, c: "var(--color-glacier)", r: 6.5 },
  { x: 94, y: 120, c: "var(--color-basalt)", r: 7 },
  { x: 122, y: 54, c: "var(--color-send)", r: 9 },
];

const TICKS = [
  { y: 20, label: "24 ft" },
  { y: 140, label: "18 ft" },
  { y: 260, label: "12 ft" },
  { y: 380, label: "6 ft" },
  { y: 500, label: "0 ft" },
];

const GRADES = [
  { y: 430, label: "5.6" },
  { y: 300, label: "5.9" },
  { y: 184, label: "5.11-" },
  { y: 54, label: "5.12" },
];

export default function HeroWall() {
  const routePoints = HOLDS.map((h) => `${h.x},${h.y}`).join(" ");

  return (
    <svg
      viewBox="0 0 250 520"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a climbing route rising 24 feet up a wall, marked with route grades."
    >
      {/* wall panel */}
      <rect
        x="40"
        y="10"
        width="150"
        height="500"
        rx="7"
        fill="var(--color-chalk)"
        stroke="var(--color-line-strong)"
      />
      {/* faint grid seams on the panel */}
      {[70, 100, 130, 160].map((x) => (
        <line
          key={x}
          x1={x}
          y1="10"
          x2={x}
          y2="510"
          stroke="var(--color-line)"
          strokeWidth="1"
        />
      ))}

      {/* height ticks */}
      {TICKS.map((t) => (
        <g key={t.label}>
          <line
            x1="190"
            y1={t.y}
            x2="200"
            y2={t.y}
            stroke="var(--color-granite-400)"
            strokeWidth="1"
          />
          <text
            x="206"
            y={t.y + 3.5}
            fill="var(--color-granite)"
            fontFamily="var(--font-mono)"
            fontSize="11"
          >
            {t.label}
          </text>
        </g>
      ))}

      {/* route line */}
      <polyline
        points={routePoints}
        fill="none"
        stroke="var(--color-send)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={1}
        className="hero-route"
      />

      {/* grade chips */}
      {GRADES.map((g) => (
        <text
          key={g.label}
          x="50"
          y={g.y + 3.5}
          fill="var(--color-granite)"
          fontFamily="var(--font-mono)"
          fontSize="10.5"
          fontWeight="700"
        >
          {g.label}
        </text>
      ))}

      {/* holds */}
      {HOLDS.map((h, i) => (
        <g
          key={i}
          className="hero-hold"
          style={{ animationDelay: `${0.5 + i * 0.13}s` }}
        >
          <circle cx={h.x} cy={h.y} r={h.r} fill={h.c} />
          <circle cx={h.x} cy={h.y} r={h.r + 4} fill="none" stroke={h.c} strokeWidth="1" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
