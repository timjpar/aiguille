import Link from "next/link";

type LinkSpec = { href: string; label: string };

type Props = {
  heading: React.ReactNode;
  kicker?: string;
  primary: LinkSpec;
  secondary?: LinkSpec;
  id?: string;
  grade?: string;
  label?: string;
};

function isInternal(href: string) {
  return href.startsWith("/");
}

/** Closing orange call-to-action band, reused across pages. */
export default function CtaBand({
  heading,
  kicker = "Ready when you are",
  primary,
  secondary,
  id = "cta",
  grade = "Top",
  label = "Visit",
}: Props) {
  return (
    <section
      id={id}
      data-rail
      data-rail-grade={grade}
      data-rail-label={label}
      className="relative scroll-mt-24 overflow-hidden bg-send text-chalk"
    >
      <div className="wrap relative py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-chalk/80">
              {kicker}
            </p>
            <h2 className="display-lg mt-4 text-chalk">{heading}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {isInternal(primary.href) ? (
              <Link href={primary.href} className="btn btn--chalk justify-center">
                {primary.label} <span className="arrow">→</span>
              </Link>
            ) : (
              <a href={primary.href} className="btn btn--chalk justify-center">
                {primary.label} <span className="arrow">→</span>
              </a>
            )}
            {secondary &&
              (isInternal(secondary.href) ? (
                <Link
                  href={secondary.href}
                  className="btn justify-center border-2 border-chalk/50 text-chalk hover:bg-chalk hover:text-send"
                >
                  {secondary.label}
                </Link>
              ) : (
                <a
                  href={secondary.href}
                  className="btn justify-center border-2 border-chalk/50 text-chalk hover:bg-chalk hover:text-send"
                >
                  {secondary.label}
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
