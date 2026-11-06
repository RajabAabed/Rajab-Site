import experiences from "../data/experience";
import Eyebrow from "./ui/Eyebrow";

export default function Experience() {
  return (
    <section id="experience" className="defer-render relative px-gutter py-28 md:py-44">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-24">
        <div>
          <Eyebrow index="04" className="mb-8">
            Experience
          </Eyebrow>
          <h2
            data-reveal="lines"
            className="text-[clamp(3rem,9vw,9rem)] font-medium leading-[0.9] tracking-[-0.055em]"
          >
            The <span className="serif">record</span>
          </h2>
        </div>
        <p data-reveal="fade" className="text-[11px] uppercase tracking-[0.2em] text-mute tabular-nums">
          2020 — Present
        </p>
      </div>

      <ol>
        {experiences.map((job) => {
          const current = job.endDate === "Present";
          return (
            <li key={job.id} className="group">
              <div data-reveal="rule" className="h-px w-full bg-line" />
              <div data-reveal="fade" className="grid grid-cols-12 gap-x-4 gap-y-4 py-9 md:py-12">
                <p className="col-span-12 flex items-center gap-2.5 self-start text-sm text-mute tabular-nums md:col-span-3 md:pt-3">
                  {current && <span className="size-1.5 rounded-full bg-gold" />}
                  {job.startDate} — {job.endDate}
                </p>
                <div className="col-span-12 md:col-span-5">
                  <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em] transition-transform duration-700 ease-expo group-hover:translate-x-2">
                    {job.title}
                  </h3>
                  <p className="serif mt-2 text-xl text-bone/60 md:text-2xl">{job.company}</p>
                </div>
                <ul className="col-span-12 space-y-2.5 text-[15px] leading-relaxed text-bone/65 md:col-span-4">
                  {job.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-mute" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="h-px w-full bg-line" />
    </section>
  );
}
