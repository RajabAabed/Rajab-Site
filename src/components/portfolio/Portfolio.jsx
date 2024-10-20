import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import SliderCard from "./components/SliderCard";
import portfolioItems from "../../data/portfolio";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const optionsMobile = {
    gap: "1rem",
    type: "loop",
    perPage: 1,
    autoplay: true,
    pagination: true,
    arrows: false,
    perMove: 1,
  };
  const optionsLg = {
    gap: "1rem",
    type: "loop",
    perPage: 2,
    autoplay: true,
    pagination: true,
    arrows: false,
    perMove: 1,
  };
  return (
    <section
      name="portfolio"
      className="py-24 container mx-auto px-4 sm:px-6 lg:px-32"
    >
      <div className="flex flex-row justify-around items-center w-full">
        <div className=" ">
          <h3 className="font-Lufga font-semibold text-5xl leading-none text-secondary dark:text-neutral-200 text-start">
            Lets have a look at my
            <span className="text-primary-500"> Portfolio</span>
          </h3>
        </div>
      </div>
      <div className=" mt-10">
        <Splide
          aria-label="My Favorite Images "
          options={isSmallScreen ? optionsMobile : optionsLg}
        >
          {portfolioItems.map((item, index) => {
            return (
              <SplideSlide key={index}>
                <SliderCard title={item.title} image={item.coverImage} />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
}
