import Contours from "@/components/Contours";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  id?: string;
  grade: string;
  label: string;
  children?: React.ReactNode;
};

/** Standard inner-page hero. Registers itself with the GradeRail. */
export default function PageHero({
  eyebrow,
  title,
  lede,
  id = "top",
  grade,
  label,
  children,
}: Props) {
  return (
    <section
      id={id}
      data-rail
      data-rail-grade={grade}
      data-rail-label={label}
      className="relative scroll-mt-24 overflow-hidden border-b border-line bg-limestone"
    >
      <Contours
        color="var(--color-glacier)"
        opacity={0.4}
        className="right-[-15%] top-[-40%] h-[150%] w-[70%]"
      />
      <div className="wrap relative pb-14 pt-14 sm:pb-20 sm:pt-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-5 max-w-4xl text-balance">{title}</h1>
        {lede && <p className="lede mt-6 max-w-2xl">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
