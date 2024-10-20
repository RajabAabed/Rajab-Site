import { animated } from "@react-spring/web";

/* eslint-disable react/prop-types */
export default function ExperinceItem({
  title,
  startDate,
  endDate,
  company,
  description,
  style,
}) {
  return (
    <animated.div
      style={style}
      className="flex flex-row justify-start items-stretch group"
    >
      <div className="w-1/5  text-center sm:hidden block">
        <div className="w-9 h-9 group-even:bg-secondary group-odd:bg-primary-500 rounded-full outline-2 outline-secondary dark:outline-neutral-200 outline-dashed m-auto outline-offset-[3px]"></div>
        <div className="group-last:hidden w-[1px] h-[calc(100%-36px)] mt-[3px] border-2 border-secondary dark:border-neutral-200 border-dashed m-auto"></div>
      </div>
      <div className="sm:w-2/5 w-4/5">
        <h3 className="font-Lufga font-semibold text-3xl text-secondary dark:text-neutral-200">
          {company}
        </h3>
        <span className="text-[#98A2B3] dark:text-primary-500 font-Lufga font-normal text-sm">
          {startDate} - {endDate}
        </span>
        <div className="sm:hidden block mt-5">
          <h3 className="font-Lufga font-semibold text-xl  text-primary-500 mb-2">
            {title}
          </h3>
          <p
            className="text-[#98A2B3] dark:text-neutral-200 font-Lufga font-normal text-sm pb-16"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
      <div className="w-1/5 text-center sm:block hidden ">
        <div className="w-9 h-9 group-even:bg-secondary group-odd:bg-primary-500 rounded-full outline-2 outline-secondary dark:outline-neutral-200 outline-dashed m-auto outline-offset-[3px]"></div>
        <div className="group-last:hidden w-[1px] h-[calc(100%-36px)] mt-[3px] border-2 border-secondary dark:border-neutral-200 border-dashed m-auto"></div>
      </div>
      <div className="sm:w-2/5  text-start ps-24 sm:block hidden">
        <h3 className="font-Lufga font-semibold text-3xl text-secondary dark:text-primary-500 mb-2">
          {title}
        </h3>
        <p
          className="text-[#98A2B3] dark:text-neutral-200 font-Lufga font-normal text-sm pb-16"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </animated.div>
  );
}
