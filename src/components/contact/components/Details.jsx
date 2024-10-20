/* eslint-disable react/prop-types */
import { FaRankingStar } from "react-icons/fa6";
import { BsAward } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";

export default function Details({ title, icon }) {
  let iconTag;
  const styleIcon = "text-secondary dark:text-primary-500 me-3 text-3xl ";
  if (icon === "FaRankingStar") {
    iconTag = <FaRankingStar className={styleIcon} />;
  } else if (icon === "BsAward") {
    iconTag = <BsAward className={styleIcon} />;
  } else if (icon === "AiFillSafetyCertificate") {
    iconTag = <AiFillSafetyCertificate className={styleIcon} />;
  }

  return (
    <div className="sm:w-1/3 w-1/2 flex flex-row justify-center items-center sm:mb-0 mb-5">
      {iconTag}
      <p className="text-base font-Lufga font-normal text-secondary dark:text-neutral-200">
        {title}
      </p>
    </div>
  );
}
