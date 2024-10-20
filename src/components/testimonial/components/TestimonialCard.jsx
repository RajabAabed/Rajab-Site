/* eslint-disable react/prop-types */
import { HiMiniStar } from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa6";

export default function TestimonialCard({ name, jobTitle, avatar, review }) {
  return (
    <div className="bg-white bg-opacity-15 min-h-[350px] md:min-h-72 rounded-3xl">
      <div className="flex flex-row justify-center items-center w-full p-5">
        <div className="w-1/2">
          <div className="flex flex-row justify-start items-start w-full ">
            <div className="w-12 mr-3">
              <img
                className="inline-block size-[46px] rounded-full"
                src={avatar}
                alt="Avatar"
              ></img>
            </div>
            <div className="w-/12">
              <h4 className="text-lg text-white font-Lufga font-medium mb-0 leading-4">
                {name}
              </h4>
              <span className="text-xs text-white font-Lufga font-light">
                {jobTitle}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-start mt-3">
            {[...Array(5)].map((_, i) => (
              <HiMiniStar key={i} className="text-primary-500 text-2xl" />
            ))}
            <span className="text-xl text-white font-Lufga font-medium ms-2">
              5.0
            </span>
          </div>
        </div>
        <div className="w-1/2">
          <FaQuoteLeft className="text-8xl text-[#667085] opacity-65 rotate-180  ms-auto" />
        </div>
      </div>
      <div className="p-5">
        <p className="text-white font-Lufga font-light text-base">{review}</p>
      </div>
    </div>
  );
}
