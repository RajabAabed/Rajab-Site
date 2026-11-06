import { useCallback, useRef, useState } from "react";
import { gsap, SplitText, useGSAP, useDeferredGSAP, prefersReducedMotion } from "../lib/motion";
import testimonials from "../data/testimonial";
import Eyebrow from "./ui/Eyebrow";
import Arrow from "./ui/Arrow";

const AUTOPLAY_SECONDS = 9;

export default function Testimonials() {
  const root = useRef(null);
  const splits = useRef([]);
  const progress = useRef(null);
  const autoplay = useRef(null);
  const [active, setActive] = useState(0);
  const previous = useRef(0);

  useDeferredGSAP(
    () => {
      splits.current = gsap.utils.toArray(".quote-text").map((el) =>
        SplitText.create(el, { type: "lines", mask: "lines", aria: "none", linesClass: "split-line", autoSplit: true })
      );
    },
    { scope: root }
  );

  const go = useCallback((dir) => {
    setActive((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  useGSAP(
    () => {
      const from = previous.current;
      previous.current = active;
      const quotes = gsap.utils.toArray(".quote");

      if (from !== active) {
        const outLines = splits.current[from]?.lines ?? [];
        const inLines = splits.current[active]?.lines ?? [];
        const duration = prefersReducedMotion ? 0 : 1;
        gsap
          .timeline()
          .to(outLines, { yPercent: -110, duration: duration * 0.7, ease: "expo.in", stagger: 0.03 })
          .to(quotes[from], { autoAlpha: 0, duration: 0.3 }, "<0.2")
          .set(quotes[active], { autoAlpha: 1 })
          .fromTo(inLines, { yPercent: 110 }, { yPercent: 0, duration: duration * 1.2, stagger: 0.06 })
          .fromTo(
            quotes[active].querySelector(".quote-meta"),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration },
            "<0.2"
          );
      }

      autoplay.current?.scrollTrigger?.kill();
      autoplay.current?.kill();
      if (prefersReducedMotion) return;
      autoplay.current = gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTOPLAY_SECONDS,
          ease: "none",
          onComplete: () => go(1),
          scrollTrigger: { trigger: root.current, start: "top 70%", toggleActions: "play pause resume pause" },
        }
      );
    },
    { scope: root, dependencies: [active], revertOnUpdate: false }
  );

  return (
    <section id="testimonials" ref={root} className="defer-render relative overflow-hidden bg-ink-2 px-gutter py-28 md:py-40">
      <div className="mb-16 flex items-center justify-between md:mb-24">
        <Eyebrow index="05">Kind words</Eyebrow>
        <p className="text-[11px] tracking-[0.2em] text-mute tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <span aria-hidden="true" className="serif col-span-12 -mb-6 text-[8rem] leading-[0.6] text-gold md:col-span-1 md:text-[10rem]">
          &ldquo;
        </span>

        <div className="col-span-12 grid md:col-span-10" aria-live="polite">
          {testimonials.map((t, i) => (
            <figure
              key={t.id}
              className="quote [grid-area:1/1]"
              aria-hidden={i !== active}
              style={i === 0 ? undefined : { visibility: "hidden", opacity: 0 }}
            >
              <blockquote className="quote-text text-[clamp(1.6rem,3.3vw,3.25rem)] leading-[1.12] tracking-[-0.025em]">
                {t.review}
              </blockquote>
              <figcaption className="quote-meta mt-10 flex items-center gap-4">
                <span className="h-px w-10 bg-gold" />
                <span className="text-base">{t.name}</span>
                <span className="serif text-lg text-mute">{t.jobTitle}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-20 flex items-center gap-6 md:ms-[calc(100%/12)]">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-14 place-items-center rounded-full border border-line transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
          >
            <Arrow direction="left" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid size-14 place-items-center rounded-full border border-line transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
          >
            <Arrow direction="right" className="size-4" />
          </button>
        </div>
        <div className="h-px flex-1 bg-line">
          <div ref={progress} className="h-full origin-left scale-x-0 bg-bone/70" />
        </div>
      </div>
    </section>
  );
}
