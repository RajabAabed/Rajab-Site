import LazyloadIamge from "../../lazyload/LazyloadImage";

/* eslint-disable react/prop-types */
export default function SliderCard({ title, image }) {
  return (
    <div className="relative rounded-lg overflow-hidden h-96">
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
      <LazyloadIamge
        imageScr={image}
        imageAlt="Protfolio Image"
        classes="w-full object-cover h-96"
      />
      <h4 className="text-white font-Lufga font-medium text-4xl absolute bottom-6 left-7">
        {title}
      </h4>
    </div>
  );
}
