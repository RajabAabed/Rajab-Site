import { useRef } from "react";
import { gsap, useDeferredGSAP, prefersReducedMotion } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";
import projects from "../data/portfolio";
import Eyebrow from "./ui/Eyebrow";
import Arrow from "./ui/Arrow";
import RollText from "./ui/RollText";

function ProjectCard({ project, index }) {
  return (
    <article data-cursor className="work-card group w-full shrink-0 lg:w-auto">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-2 lg:h-[54vh] lg:max-h-[620px]">
        <img
          src={project.coverImage}
          alt={`${project.title} — website preview`}
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
          className="work-img absolute inset-0 h-full w-full object-cover saturate-[0.35] transition-[filter,transform] duration-[1.4s] ease-expo group-hover:scale-[1.04] group-hover:saturate-100 lg:-left-[8%] lg:w-[116%] lg:max-w-none"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-line pt-4">
        <div className="flex items-baseline gap-4">
          <span className="text-xs tabular-nums text-mute">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">{project.title}</h3>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-mute">{project.stack.join(" · ")}</p>
      </div>
    </article>
  );
}

export default function Work() {
  const root = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);

  useDeferredGSAP(
    () => {
      if (prefersReducedMotion) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;

        const scroller = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(".work-progress", { scaleX: self.progress }),
          },
        });

        gsap.utils.toArray(".work-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: 7 },
            {
              xPercent: -7,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: scroller,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray(".work-card").forEach((card) => {
          gsap.from(card, {
            y: 60,
            autoAlpha: 0,
            duration: 1.4,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="work" ref={root} className="defer-render relative overflow-hidden bg-ink">
      <div ref={pin} className="flex flex-col justify-center py-28 lg:h-svh lg:py-0">
        <div className="mb-12 flex items-end justify-between gap-6 px-gutter lg:mb-10">
          <div>
            <Eyebrow index="03" className="mb-8">
              Selected work
            </Eyebrow>
            <h2
              data-reveal="lines"
              className="text-[clamp(3rem,7.5vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.055em]"
            >
              Recent <span className="serif">projects</span>
            </h2>
          </div>
          <p data-reveal="fade" className="hidden max-w-xs text-base leading-relaxed text-mute md:block">
            A selection of websites and products built for clients and studios, from storefronts to app launches.
          </p>
        </div>

        <div
          ref={track}
          className="flex flex-col gap-16 px-gutter lg:w-max lg:flex-row lg:items-end lg:gap-[4vw] lg:pe-[6vw]"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          <div className="flex shrink-0 flex-col justify-end border-t border-line pt-8 lg:h-[54vh] lg:max-h-[620px] lg:w-[34vw] lg:border-l lg:border-t-0 lg:ps-[3vw] lg:pt-0">
            <p className="text-[clamp(2rem,3.4vw,3.5rem)] leading-[1] tracking-[-0.04em]">
              Have a project <span className="serif">in mind?</span>
            </p>
            <button
              type="button"
              onClick={() => scrollToTarget("#contact")}
              className="group mt-8 inline-flex items-center gap-3 self-start text-sm uppercase tracking-[0.16em]"
            >
              <RollText>Start a conversation</RollText>
              <Arrow className="size-3.5 transition-transform duration-500 group-hover:rotate-45" />
            </button>
          </div>
        </div>

        <div className="mx-gutter mt-12 hidden h-px bg-line lg:block">
          <div className="work-progress h-full origin-left scale-x-0 bg-bone" />
        </div>
      </div>
    </section>
  );
}
