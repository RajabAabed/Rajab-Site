import { Splide, SplideSlide } from "@splidejs/react-splide";
import TestimonialCard from "./components/TestimonialCard";
import { useEffect, useState } from "react";
import testimonials from "../../data/testimonial";

export default function Testimonial() {
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
    focus: "center",
    autoplay: true,
    pagination: true,
    arrows: false,
    perMove: 1,
  };
  const optionsLg = {
    gap: "1rem",
    type: "loop",
    perPage: 2,
    focus: "center",
    autoplay: true,
    pagination: true,
    arrows: false,
    perMove: 1,
  };
  return (
    <section
      name="testimonial"
      className="relative py-24 rounded-[50px] mx-auto "
    >
      <div className="rounded-[50px] absolute inset-0 bg-[url('/assets/images/service-bg.webp')] bg-center bg-no-repeat bg-cover opacity-80 z-[-1]"></div>
      <div className="rounded-[50px] absolute inset-0 bg-[#171717] opacity-90 z-[-1]"></div>

      <div className="">
        <h2 className="font-Lufga font-medium text-neutral-200 sm:text-5xl text-3xl text-center sm:w-2/6 w-full m-auto sm:leading-[60px] leading-none">
          Testimonials That Speak to
          <span className="text-primary-500"> My Results</span>
        </h2>
      </div>
      <div className=" mt-10 px-2">
        <Splide
          aria-label="My Favorite Images "
          options={isSmallScreen ? optionsMobile : optionsLg}
        >
          {testimonials.map((item) => {
            return (
              <SplideSlide key={item.id}>
                <TestimonialCard
                  name={item.name}
                  jobTitle={item.jobTitle}
                  avatar={item.avatar}
                  review={item.review}
                />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
}
