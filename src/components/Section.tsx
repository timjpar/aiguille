type Tone = "limestone" | "chalk" | "basalt";

const TONES: Record<Tone, string> = {
  limestone: "bg-limestone text-basalt",
  chalk: "bg-chalk text-basalt",
  basalt: "bg-basalt text-limestone",
};

type Props = {
  id: string;
  /** Route grade shown on the rail, e.g. "5.10" */
  grade: string;
  /** Short label shown on the rail */
  label: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

/**
 * A page section that registers itself with the GradeRail via data-* attrs.
 */
export default function Section({
  id,
  grade,
  label,
  tone = "limestone",
  className = "",
  children,
}: Props) {
  return (
    <section
      id={id}
      data-rail
      data-rail-grade={grade}
      data-rail-label={label}
      className={`relative scroll-mt-24 overflow-hidden py-20 sm:py-28 ${TONES[tone]} ${className}`}
    >
      {children}
    </section>
  );
}
