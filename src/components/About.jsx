import { useRef } from "react";
import { gsap, SplitText, useDeferredGSAP, prefersReducedMotion } from "../lib/motion";
import portraitSmall from "../assets/images/portrait-640.webp";
import portraitLarge from "../assets/images/portrait-1080.webp";
import Eyebrow from "./ui/Eyebrow";

const stats = [
  { value: 6, suffix: "+", label: "Years building for the web" }, // since Oct 2020
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 3, suffix: "", label: "Institutions taught & mentored at" },
];

export default function About() {
  const root = useRef(null);

  useDeferredGSAP(
    () => {
      if (prefersReducedMotion) return;

      SplitText.create(".about-statement", {
        type: "words",
        tag: "span",
        aria: "none",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.4 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 50%", scrub: true },
            }
          ),
      });

      gsap.fromTo(
        ".about-frame",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.8,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".about-frame", start: "top 80%", once: true },
        }
      );
      // Keeps the CSS framing (centred face, 1.15 zoom); x: 0 stops GSAP double-counting
      // the translate it parses from the stylesheet.
      gsap.fromTo(
        ".about-portrait",
        // Zoom from the top edge and only drift downwards: the head is never cropped, the
        // photo's lower edge always covers the frame, and the cutout's transparent top
        // blends into the frame colour.
        { x: 0, xPercent: 4, yPercent: 0, scale: 1.15, transformOrigin: "50% 0%" },
        {
          x: 0,
          xPercent: 4,
          yPercent: 10,
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: ".about-frame", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      gsap.utils.toArray(".stat-value").forEach((el) => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: Number(el.dataset.value),
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value)).padStart(2, "0");
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="defer-render relative px-gutter py-28 md:py-44">
      <div className="mb-14 flex items-center justify-between md:mb-20">
        <Eyebrow index="01">About</Eyebrow>
        <p data-reveal="fade" className="text-[11px] uppercase tracking-[0.2em] text-mute">
          Rajab Aabed
        </p>
      </div>

      <p className="about-statement max-w-[72rem] text-[clamp(1.75rem,3.9vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.03em] [text-indent:18%] [&_span]:[text-indent:0]">
        I&rsquo;m a full-stack engineer who builds fast, reliable and{" "}
        <span className="serif">considered</span> products for the web — from pixel-perfect interfaces in React
        &amp; Next.js to robust Node.js back ends. Forty-plus projects in, one standard throughout: work that{" "}
        <span className="serif">holds up</span> long after launch.
      </p>

      <div className="mt-24 grid grid-cols-12 gap-x-4 gap-y-14 md:mt-36">
        <figure className="col-span-12 sm:col-span-8 sm:col-start-3 md:col-span-5 md:col-start-1">
          <div data-cursor className="about-frame group relative aspect-[4/5] overflow-hidden bg-[#D6D0C6]">
            <img
              src={portraitLarge}
              srcSet={`${portraitSmall} 640w, ${portraitLarge} 1080w`}
              sizes="(min-width: 768px) 40vw, (min-width: 640px) 66vw, 92vw"
              width="1080"
              height="1273"
              alt="Portrait of Rajab Aabed"
              loading="lazy"
              decoding="async"
              // The face sits ~46% across the source photo; nudge it to the frame's centre
              className="about-portrait absolute inset-0 h-full w-full origin-top translate-x-[4%] scale-[1.15] object-cover object-top grayscale transition-[filter] duration-1000 group-hover:grayscale-0"
            />
          </div>
          <figcaption className="mt-4 flex justify-between text-[11px] uppercase tracking-[0.2em] text-mute">
            <span>Rajab Aabed</span>
            <span>Software Engineer</span>
          </figcaption>
        </figure>

        <div className="col-span-12 flex flex-col gap-14 md:col-span-6 md:col-start-7 md:self-center md:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-bone/70 md:text-xl">
            <p data-reveal="lines">
              Most of my days are spent turning detailed designs into production code that performs — careful
              about motion, accessibility and the small details that make an interface feel right.
            </p>
            <p data-reveal="lines">
              Alongside client work, I&rsquo;ve taught web development at Amideast and the University College of
              Applied Sciences, and mentored freelancers at Gaza Sky Geeks. I explain as well as I execute.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-3 max-w-[10rem] text-xs leading-snug text-mute md:text-sm">{stat.label}</dt>
                <dd className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none tracking-[-0.05em] tabular-nums">
                  <span className="stat-value" data-value={stat.value}>
                    {String(stat.value).padStart(2, "0")}
                  </span>
                  <span className="text-gold">{stat.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
