"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Section = { id: string; grade: string; label: string };

/**
 * The signature element: a vertical route-grade rail pinned to the page edge.
 * It reads every [data-rail] section on the current page, marks the active one
 * as you scroll, and doubles as in-page navigation. On narrow screens it
 * collapses to a slim top progress bar.
 */
export default function GradeRail() {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState("");
  const [progress, setProgress] = useState(0);

  // (Re)scan the page whenever the route changes.
  useEffect(() => {
    const scan = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-rail]"),
      );
      setSections(
        nodes.map((n) => ({
          id: n.id,
          grade: n.dataset.railGrade ?? "",
          label: n.dataset.railLabel ?? "",
        })),
      );
    };
    scan();
    const t = window.setTimeout(scan, 350); // re-check after fonts/async layout
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);

        const marker = window.scrollY + window.innerHeight * 0.35;
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>("[data-rail]"),
        );
        let current = nodes[0]?.id ?? "";
        for (const n of nodes) {
          if (n.offsetTop <= marker) current = n.id;
        }
        setActiveId(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [pathname, sections.length]);

  const go = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  if (sections.length < 2) {
    return (
      <div
        className="grade-progress"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
    );
  }

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeId),
  );
  const fillPct = ((activeIndex + 0.5) / sections.length) * 100;

  return (
    <>
      <div
        className="grade-progress"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
      <nav className="grade-rail" aria-label="On this page">
        <div className="grade-rail__line" aria-hidden="true" />
        <div
          className="grade-rail__fill"
          style={{ height: `calc(${fillPct}% - 12px)` }}
          aria-hidden="true"
        />
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            className="grade-tick"
            data-active={s.id === activeId}
            aria-current={s.id === activeId ? "true" : undefined}
            aria-label={`${s.label} — grade ${s.grade}`}
            onClick={() => go(s.id)}
          >
            <span className="grade-tick__dot" aria-hidden="true" />
            <span className="grade-tick__meta" aria-hidden="true">
              <span className="grade-tick__grade">{s.grade}</span>
              <br />
              <span className="grade-tick__label">{s.label}</span>
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}
