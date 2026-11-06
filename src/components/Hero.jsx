import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap, useDeferredGSAP, prefersReducedMotion } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";
import { afterLoad, onFirstInteraction, supportsFastWebGL } from "../lib/idle";
import Arrow from "./ui/Arrow";

// three.js is ~130 kB gzipped, so it is fetched on first interaction (or a few seconds
// after load for visitors who just watch) and only where WebGL is GPU accelerated.
const HeroCanvas = lazy(() => import("./HeroCanvas"));

const words = ["Rajab", "Aabed"];

function HeroName() {
  let index = 0;
  return (
    <h1
      aria-label="Rajab Aabed"
      className="hero-name -ms-[0.04em] whitespace-nowrap text-[28vw] font-medium leading-[0.86] tracking-[-0.055em] md:text-[16.4vw]"
    >
      {words.map((word, w) => (
        <span key={word} aria-hidden="true" className="block md:inline">
          {w > 0 && <span className="hidden md:inline"> </span>}
          {[...word].map((char) => (
            <span key={index} className="hero-mask">
              <span className="hero-char" style={{ "--i": index++ }}>
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const root = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    let started = false;
    let timer;
    const start = () => {
      if (started) return;
      started = true;
      if (supportsFastWebGL()) setShowCanvas(true);
    };
    const cancelInteraction = onFirstInteraction(start);
    const cancelLoad = afterLoad(() => {
      timer = setTimeout(start, 7000);
    });
    return () => {
      cancelInteraction();
      cancelLoad();
      clearTimeout(timer);
    };
  }, []);

  useDeferredGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.to(".hero-name", {
        yPercent: 35,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "30% top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative h-svh min-h-[640px] overflow-hidden bg-ink bg-[radial-gradient(60%_55%_at_82%_78%,rgba(212,184,138,0.12),transparent_70%),radial-gradient(70%_60%_at_20%_15%,rgba(237,233,226,0.05),transparent_70%)]"
    >
      {showCanvas && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}

      <div className="hero-content relative z-10 flex h-full flex-col justify-between px-gutter pb-6 pt-24 md:pt-28">
        <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-[0.2em] text-bone/70 md:grid-cols-3">
          <p className="hero-fade">Full-stack software engineer</p>
          <p className="hero-fade hidden text-center md:block" style={{ "--d": 1 }}>
            React · Next.js · Node.js
          </p>
          <p className="hero-fade flex items-center justify-end gap-2.5 text-right" style={{ "--d": 2 }}>
            <span className="size-1.5 shrink-0 rounded-full bg-gold" />
            Open to select projects
          </p>
        </div>

        <div>
          {/* Deliberately not animated: visible on the first frame, it is the page's LCP. */}
          <p className="mb-6 max-w-[22rem] text-[clamp(1.4rem,2.6vw,2.6rem)] leading-[1.05] md:mb-2 md:ms-auto md:max-w-[34rem] md:text-right">
            <span className="serif">Engineering web experiences</span>
            <span className="text-bone/60"> with precision &amp; intent.</span>
          </p>

          <HeroName />

          <div className="hero-rule mt-[4.5vw] h-px w-full bg-line md:mt-[2.4vw]" />

          <div className="flex items-center justify-between pt-4 text-[11px] uppercase tracking-[0.2em] text-bone/70">
            <button
              type="button"
              onClick={() => scrollToTarget("#about")}
              className="hero-fade group inline-flex items-center gap-3"
              style={{ "--d": 4 }}
            >
              <span className="grid size-8 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-bone">
                <Arrow direction="down" className="size-3" />
              </span>
              Scroll to explore
            </button>
            <p className="hero-fade tabular-nums" style={{ "--d": 5 }}>
              Est. 2020 — {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
