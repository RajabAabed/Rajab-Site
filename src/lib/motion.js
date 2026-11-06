import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { onFirstInteraction } from "./idle";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: "expo.out", duration: 1.2 });

export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/**
 * useGSAP for scroll-driven setup: it waits for the visitor's first interaction, so
 * splitting text and measuring triggers never competes with the initial load.
 */
export function useDeferredGSAP(setup, config) {
  useGSAP((_, contextSafe) => onFirstInteraction(contextSafe(setup)), config);
}

/**
 * Wires up the declarative reveals used across sections:
 *  data-reveal="lines" – lines rise out of a mask
 *  data-reveal="fade"  – soft fade-up
 *  data-reveal="rule"  – hairline draws from the left
 */
export function initReveals() {
  if (prefersReducedMotion) return;

  gsap.utils.toArray('[data-reveal="lines"]').forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      aria: "none",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.4,
          stagger: 0.09,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
    });
  });

  gsap.utils.toArray('[data-reveal="fade"]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      autoAlpha: 0,
      duration: 1.4,
      delay: Number(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  gsap.utils.toArray('[data-reveal="rule"]').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.6,
      ease: "expo.inOut",
      scrollTrigger: { trigger: el, start: "top 95%", once: true },
    });
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
