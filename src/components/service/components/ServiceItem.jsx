import LazyloadIamge from "../../lazyload/LazyloadImage";

/* eslint-disable react/prop-types */
export default function ServiceItem({ name, image, skills }) {
  return (
    <div className="group sm:w-[30%] w-full sm:mt-0 mt-5  border border-gray-200 rounded-3xl bg-white bg-opacity-5 backdrop-blur-[2px]">
      <div className="border-b border-gray-200 px-5 py-5">
        <h3 className="text-neutral-200 my-0 text-lg font-medium font-Lufga">
          {name}
        </h3>
      </div>
      <div className="pt-20">
        <div className=" before:block before:absolute before:content-[''] before:w-[90%] before:h-64  before:bg-[#9E9D9D] before:z-30 before:-top-5 before:left-1/2 before:-translate-x-1/2 before:rounded-3xl relative after:block after:absolute after:content-[''] after:w-[80%] after:h-64  after:bg-[#757575] after:bg-opacity-50 after:backdrop-blur-[5px] after:z-20 after:-top-10 after:left-1/2 after:-translate-x-1/2 after:rounded-3xl  group-hover:before:translate-y-[5px]  group-hover:after:translate-y-[6px] after:transition-all after:ease-in-out after:duration-300 abfore:duration-300 befoer:transition-all befoer:ease-in-out ">
          <LazyloadIamge
            imageScr={image}
            imageAlt={skills}
            classes="w-full h-64 object-cover rounded-3xl relative z-50"
          />
        </div>
      </div>
    </div>
  );
}
