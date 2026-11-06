import services from "../data/service";
import Eyebrow from "./ui/Eyebrow";

export default function Services() {
  return (
    <section id="services" className="defer-render relative py-28 md:py-44">
      <div className="mb-16 grid grid-cols-12 items-end gap-4 px-gutter md:mb-24">
        <div className="col-span-12 md:col-span-7">
          <Eyebrow index="02" className="mb-8">
            Services
          </Eyebrow>
          <h2
            data-reveal="lines"
            className="text-[clamp(3rem,9vw,9rem)] font-medium leading-[0.9] tracking-[-0.055em]"
          >
            What I <span className="serif">do</span>
          </h2>
        </div>
        <p
          data-reveal="fade"
          className="col-span-12 max-w-sm text-base leading-relaxed text-mute md:col-span-4 md:col-start-9"
        >
          Three disciplines, one way of working: clear communication, honest timelines and code you can build on.
        </p>
      </div>

      <ul className="border-b border-line">
        {services.map((service, i) => (
          <li key={service.id} className="group relative overflow-hidden">
            <div data-reveal="rule" className="h-px w-full bg-line" />
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-700 ease-expo group-hover:scale-y-100" />
            <div
              data-reveal="fade"
              className="relative grid grid-cols-12 gap-x-4 gap-y-5 px-gutter py-10 transition-colors duration-700 group-hover:text-ink md:py-14"
            >
              <span className="col-span-2 pt-2 text-sm tabular-nums text-mute transition-colors duration-700 group-hover:text-ink/60 md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="col-span-10 text-[clamp(2.2rem,5.4vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.045em] transition-transform duration-700 ease-expo group-hover:translate-x-3 md:col-span-6">
                {service.name} <span className="serif block">{service.accent}</span>
              </h3>
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <p className="text-base leading-relaxed text-bone/70 transition-colors duration-700 group-hover:text-ink/75">
                  {service.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-xs text-bone/80 transition-colors duration-700 group-hover:border-ink/20 group-hover:text-ink"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
