import { HiMiniStar } from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa6";
import Typewriter from "typewriter-effect";

import Image from "./components/Image";
export default function Hero() {
  return (
    <section
      name="main"
      className="relative h-dvh pt-16 overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2"
    >
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="flex justify-center">
          <span className=" font-Lufga inline-flex items-center gap-x-2 bg-white border border-gray-800 text-sm text-gray-800 p-1 px-4 py-1 rounded-full transition hover:border-primary-500 focus:outline-none focus:border-primary-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-primary-500 dark:focus:border-primary-500">
            Hello
          </span>
        </div>
        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className=" font-Lufga block font-medium text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
            I&apos;m
            <span className="sm:ms-5 ms-2 bg-clip-text bg-gradient-to-tl from-primary-500 to-primary-800 text-transparent">
              Rajab
            </span>
            <span className=" inline-block">
              <span className="sm:me-7 inline-block">Software</span> Engineer
            </span>
          </h1>
        </div>
        <div className="absolute sm:left-16 sm:top-2/4 z-20 top-[280px] left-7 sm:block hidden">
          <FaQuoteLeft className="text-secondary text-5xl dark:text-primary-400" />

          <p className="font-Lufga text-secondary dark:text-neutral-200 max-w-72 font-medium text-lg">
            <Typewriter
              options={{
                strings: [
                  "Rajab is a very talented person in the development of sites and has a great personality that I wish him well in his career",
                ],
                autoStart: true,
                hideCursorAfterText: true,
                typeSpeed: 50,
                loop: true,
              }}
            />
          </p>
        </div>
        <Image />
        <div className="absolute right-16 top-2/4 z-20 sm:block hidden">
          <div className="flex flex-row justify-end">
            {[...Array(5)].map((_, i) => (
              <HiMiniStar
                key={i}
                className="text-primary-500 text-2xl"
              />
            ))}
          </div>
          <p className="font-Lufga text-end text-3xl font-semibold text-text dark:text-neutral-200">
            5 Years
            <span className="block text-base font-normal">Experince</span>
          </p>
        </div>
      </div>
    </section>
  );
}
