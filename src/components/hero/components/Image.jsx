import { HiArrowUpRight } from "react-icons/hi2";
import rajab from "../../../assets/images/rajab aabed.webp";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-scroll";
import LazyLoad from "react-lazyload";
export default function Image() {
  const propsStyle = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" }, // Initial state
    to: { opacity: 1, transform: "scale(1)" }, // Final state
    config: { duration: 500 },
    delay: 1000, // Animation duration
  });

  return (
    <div className="absolute right-0 bottom-0 w-full h-[calc(100vh)]">
      <div className="animated-circle"></div>
      <div className="absolute left-1/2 bottom-0 z-20 -translate-x-1/2 w-full">
        <LazyLoad
          height={200}
          offset={100}
          placeholder={<div>trnrn</div>}
        >
          <animated.img
            src={rajab}
            alt="Rajab"
            className="lg:w-[26%] md:w-3/5   m-auto"
            style={propsStyle}
          />
        </LazyLoad>
        <div className="bg-transparent backdrop-blur-lg absolute left-1/2 sm:bottom-8 bottom-10 -translate-x-1/2 px-2 py-2 rounded-full border-2 border-gray-200 dark:border-secondary flex justify-between items-center">
          <Link
            className="cursor-pointer relative z-30 font-Lufga text-white bg-primary-500 rounded-full flex justify-between items-center px-6 py-3 me-3"
            to="portfolio"
            smooth={true}
            duration={1200}
            offset={-100}
          >
            Portfolio <HiArrowUpRight className="ms-2" />
          </Link>

          <Link
            className="cursor-pointer font-Lufga text-gray-800 px-6 py-3 w-max"
            to="contact"
            smooth={true}
            duration={1200}
            offset={-100}
          >
            Hire me
          </Link>
        </div>
      </div>
    </div>
  );
}
