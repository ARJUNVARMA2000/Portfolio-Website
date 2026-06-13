"use client";

import { useRef } from "react";
import type { Metric } from "@/content/case-studies";
import { gsap, useGSAP, MOTION_OK, SCRAMBLE_CHARS } from "@/lib/gsap";

const NUM_RE = /-?\d[\d,]*\.?\d*/;

/**
 * Provenance 2.0 — claims that prove themselves. Each card: the value counts up,
 * a citation marker pops in, then an accent rule draws down the edge while the
 * provenance footnote types itself in. No uncited stats.
 */
export function CitedMetrics({ metrics }: { metrics: Metric[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-card]"));

      gsap.matchMedia().add(MOTION_OK, () => {
        cards.forEach((card, i) => {
          const valueEl = card.querySelector<HTMLElement>("[data-value]");
          const citeEl = card.querySelector<HTMLElement>("[data-cite]");
          const edgeEl = card.querySelector<HTMLElement>("[data-edge]");
          const provEl = card.querySelector<HTMLElement>("[data-prov]");
          if (!valueEl || !citeEl || !edgeEl || !provEl) return;

          const value = metrics[i]?.value ?? valueEl.textContent ?? "";
          const provenance = metrics[i]?.provenance ?? "";

          gsap.set(citeEl, { autoAlpha: 0, scale: 0 });
          gsap.set(edgeEl, { scaleY: 0, transformOrigin: "center top" });
          gsap.set(provEl, { autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: "top 82%", once: true },
            delay: i * 0.15,
          });

          // ① the value counts up
          const match = value.match(NUM_RE);
          if (match && match.index !== undefined) {
            const numStr = match[0];
            const prefix = value.slice(0, match.index);
            const suffix = value.slice(match.index + numStr.length);
            const hasComma = numStr.includes(",");
            const target = parseFloat(numStr.replace(/,/g, ""));
            const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
            const fmt = (n: number) =>
              `${prefix}${
                hasComma
                  ? n.toLocaleString("en-US", {
                      minimumFractionDigits: decimals,
                      maximumFractionDigits: decimals,
                    })
                  : n.toFixed(decimals)
              }${suffix}`;
            valueEl.textContent = fmt(0);
            const proxy = { v: 0 };
            tl.to(proxy, {
              v: target,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                valueEl.textContent = fmt(proxy.v);
              },
              onComplete: () => {
                valueEl.textContent = value;
              },
            });
          } else {
            tl.from(valueEl, { autoAlpha: 0, y: 10, duration: 0.6, ease: "power2.out" });
          }

          // ② citation marker lands as the number settles
          tl.to(citeEl, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(3)" }, "-=0.35");

          // ③ the metric writes its own footnote
          tl.to(edgeEl, { scaleY: 1, duration: 0.6, ease: "power3.inOut" }, "-=0.15").to(
            provEl,
            {
              autoAlpha: 1,
              duration: 0.9,
              scrambleText: { text: provenance, chars: SCRAMBLE_CHARS, speed: 0.6 },
            },
            "-=0.45"
          );
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
      {metrics.map((m, i) => (
        <div
          key={m.label}
          data-card
          className="relative bg-surface p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_var(--accent-glow)]"
        >
          <span data-edge aria-hidden className="absolute left-0 top-0 h-full w-px bg-accent" />
          <div className="stat-value text-[clamp(1.7rem,3.4vw,2.3rem)] text-accent">
            <span data-value>{m.value}</span>
            <sup data-cite className="ml-1 inline-block font-mono text-[0.45em] text-accent">
              *{i + 1}
            </sup>
          </div>
          <div className="mono-label mt-2 !text-ink">{m.label}</div>
          <div data-prov className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
            {m.provenance}
          </div>
        </div>
      ))}
    </div>
  );
}
