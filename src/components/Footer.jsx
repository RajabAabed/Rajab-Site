import { useRef } from "react";
import { gsap, SplitText, useDeferredGSAP, prefersReducedMotion } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";
import socialLinks, { email } from "../data/socialLinks";
import navLinks from "../data/navLinks";
import RollText from "./ui/RollText";
import Arrow from "./ui/Arrow";

export default function Footer() {
  const root = useRef(null);
  const year = new Date().getFullYear();

  useDeferredGSAP(
    () => {
      if (prefersReducedMotion) return;
      // Masks only live for the reveal; afterwards the wordmark is plain, unclipped text.
      const split = SplitText.create(".footer-mark", { type: "chars", mask: "chars" });
      gsap.set(split.masks, {
        paddingTop: "0.25em",
        paddingBottom: "0.3em",
        marginTop: "-0.25em",
        marginBottom: "-0.3em",
      });
      gsap.from(split.chars, {
        yPercent: 170,
        duration: 1.6,
        stagger: 0.035,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        onComplete: () => split.revert(),
      });
    },
    { scope: root }
  );

  const go = (e, href) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <footer ref={root} className="defer-render relative overflow-hidden border-t border-line bg-ink px-gutter pt-16">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
        <div className="col-span-2 md:col-span-5">
          <p className="max-w-sm text-2xl leading-tight tracking-[-0.02em] md:text-3xl">
            Available for freelance projects and <span className="serif">full-time</span> roles.
          </p>
          <a href={`mailto:${email}`} className="mt-6 inline-block text-mute transition-colors hover:text-bone">
            <RollText>{email}</RollText>
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-2 md:col-start-8">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-mute">Index</p>
          <ul className="space-y-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => go(e, link.href)}>
                  <RollText>{link.label}</RollText>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-mute">Social</p>
          <ul className="space-y-1.5">
            {socialLinks.map((s) => (
              <li key={s.id}>
                <a href={s.link} target="_blank" rel="noreferrer">
                  <RollText>{s.title}</RollText>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 md:text-right">
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mute hover:text-bone"
          >
            Top
            <Arrow direction="up" className="size-3 transition-transform duration-500 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="footer-mark -mx-[0.03em] mt-20 whitespace-nowrap text-center text-[16.4vw] font-medium leading-[0.78] tracking-[-0.06em] pb-[0.2em] md:mt-28"
      >
        Rajab Aabed
      </p>

      <div className="flex flex-wrap justify-between gap-3 border-t border-line py-6 text-[11px] uppercase tracking-[0.2em] text-mute">
        <span>© {year} Rajab Aabed</span>
        <span>Hand-built with React &amp; WebGL</span>
      </div>
    </footer>
  );
}
