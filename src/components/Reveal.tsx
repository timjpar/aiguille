"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { ["--reveal-delay" as string]: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
