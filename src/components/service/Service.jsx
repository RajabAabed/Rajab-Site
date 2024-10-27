import Parallax from "./components/Parallax";
import services from "../../data/service";
import ServiceItem from "./components/ServiceItem";

export default function Service() {
  return (
    <section
      name="service"
      className="relative py-24 rounded-[50px] mx-auto px-4 sm:px-6 lg:px-32"
    >
      <div className="rounded-[50px] absolute inset-0 bg-[url('/assets/images/service-bg.webp')] bg-center bg-no-repeat bg-cover opacity-80 z-[-1]"></div>
      <div className="rounded-[50px] absolute inset-0 bg-[#171717] opacity-90 z-[-1]"></div>
      <Parallax />
      <div className="flex w-full justify-between sm:flex-row flex-col">
        <h2 className="font-Lufga font-medium text-neutral-200 text-5xl sm:w-2/4 w-full">
          My <span className="text-primary-500">Services</span>
        </h2>
        <p className="font-Lufga sm:w-2/4 w-full text-neutral-200 mt-3 sm:mt-0">
          Transform your ideas into stunning, high-performance websites with
          expert front-end and full-stack development, specializing in ReactJS,
          NextJS, and WordPress.
        </p>
      </div>
      <div className="flex justify-between items-center w-full mt-14 sm:flex-row flex-col">
        {services.map((service, index) => {
          return (
            <ServiceItem
              key={index}
              name={service.name}
              image={service.image}
              skills={service.skills}
            />
          );
        })}
      </div>
    </section>
  );
}
