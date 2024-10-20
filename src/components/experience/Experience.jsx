import { useSpring, animated, useTrail } from "@react-spring/web";
import experiences from "../../data/experience";
import ExperienceItem from "./components/ExperienceItem";

export default function Experience() {
  const headingAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
    delay: 300,
  });
  const trail = useTrail(experiences.length, {
    from: { opacity: 0, transform: "translateX(-40px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    config: { tension: 200, friction: 20, duration: 1000 },
    delay: 700,
  });
  return (
    <section
      name="experience"
      className="relative py-24 container mx-auto px-4 sm:px-6 lg:px-32"
    >
      <animated.h2
        style={headingAnimation}
        className="font-Lufga font-medium text-5xl text-secondary dark:text-neutral-200 text-center"
      >
        My <span className="text-primary-500">Work Experience</span>
      </animated.h2>

      <div className=" flex flex-col mt-28">
        {trail.map((style, index) => (
          <ExperienceItem
            key={index}
            style={style}
            title={experiences[index].title}
            company={experiences[index].company}
            startDate={experiences[index].startDate}
            endDate={experiences[index].endDate}
            description={experiences[index].description}
          />
        ))}
      </div>
    </section>
  );
}
