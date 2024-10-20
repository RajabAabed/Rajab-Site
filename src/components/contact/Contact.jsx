import { useSpring, animated } from "@react-spring/web";
import ContactFrom from "./components/ContactForm";
import "preline/preline";
import Details from "./components/Details";
import SocialItem from "./components/SocialItem";
import socialLinks from "../../data/socialLinks";

export default function Contact() {
  const headingAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
    delay: 300,
  });
  return (
    <section
      name="contact"
      className="relative py-24 container mx-auto px-4 sm:px-6 lg:px-32"
    >
      <animated.h2
        style={headingAnimation}
        className="font-Lufga font-medium sm:text-5xl text-3xl text-secondary dark:text-neutral-200 text-center sm:w-1/2 w-full m-auto"
      >
        Have an Awsome Project Idea?
        <span className="text-primary-500"> Work Experience</span>
      </animated.h2>

      <div className="flex flex-row flex-wrap w-full sm:my-10 my-6">
        <Details title="4.9/5 Average Ratings" icon="FaRankingStar" />
        <Details title="25+ Winning Awards" icon="BsAward" />
        <Details
          title="Certified Front-End Development"
          icon="AiFillSafetyCertificate"
        />
      </div>

      <div className="flex flex-row flex-wrap w-full sm:mt-14 mt-0  sm:justify-start sm:items-start justify-center items-center">
        <div className="sm:w-2/5  py-7 sm:px-16 px-5 flex sm:flex-col flex-row flex-wrap ">
          {socialLinks.map((item, index) => {
            return (
              <SocialItem
                key={index}
                title={item.title}
                link={item.link}
                icon={item.icon}
              />
            );
          })}
        </div>
        <ContactFrom />
      </div>
    </section>
  );
}
