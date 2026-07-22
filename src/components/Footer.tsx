import Link from "next/link";
import Contours from "@/components/Contours";
import { HOURS, NAV, SITE } from "@/lib/site";

const mapsQuery = encodeURIComponent(
  `${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`,
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-basalt text-limestone">
      <Contours color="var(--color-glacier)" opacity={0.14} className="!inset-auto right-[-8%] top-[-30%] h-[130%] w-[60%]" />
      <div className="wrap relative py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold uppercase tracking-tight">
                Aiguille
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-glacier">
                Est. {SITE.established}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-granite-400">
              {SITE.tagline} Longwood, Florida — since {SITE.established}.
            </p>
            <div className="mt-6 space-y-1.5 text-sm">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="block text-limestone transition-colors hover:text-send"
              >
                {SITE.address.line1}
                <br />
                {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              </a>
              <a
                href={SITE.phoneHref}
                className="block pt-2 font-mono text-limestone transition-colors hover:text-send"
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="block font-mono text-limestone transition-colors hover:text-send"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="eyebrow !text-glacier">Hours</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {HOURS.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                  <span className="text-granite-400">{h.days}</span>
                  <span className="font-mono">
                    {h.open} – {h.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore + social */}
          <div>
            <h3 className="eyebrow !text-glacier">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-granite-400 transition-colors hover:text-limestone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-[0.14em] text-glacier transition-colors hover:text-send"
              >
                Instagram
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-[0.14em] text-glacier transition-colors hover:text-send"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-granite-400 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>28.70° N · 81.34° W — Longwood, FL</span>
        </div>
      </div>
    </footer>
  );
}
