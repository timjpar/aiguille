// Topographic contour texture — nested "needle peak" rings.
// Purely decorative; hidden from assistive tech.

type Props = {
  className?: string;
  color?: string;
  /** 0..1 base opacity */
  opacity?: number;
};

// One organic closed loop centered on 200,200; scaled to make contours.
const LOOP =
  "M200 48 C282 40 356 104 352 190 C349 258 300 300 250 330 C214 352 168 360 122 336 C74 311 44 258 50 196 C56 128 118 56 200 48 Z";

export default function Contours({
  className = "",
  color = "var(--color-glacier)",
  opacity = 0.5,
}: Props) {
  const rings = Array.from({ length: 11 }, (_, i) => 0.12 + i * 0.086);
  return (
    <div className={`contours ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
        <g stroke={color} strokeWidth="1.1">
          {rings.map((s, i) => (
            <path
              key={i}
              d={LOOP}
              transform={`translate(200 200) scale(${s}) translate(-200 -200) rotate(${i * 4} 200 200)`}
              style={{ opacity: opacity * (0.35 + (i / rings.length) * 0.65) }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
