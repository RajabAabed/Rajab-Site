/* eslint-disable react/prop-types */
import LazyLoad from "react-lazyload";
import placeholder from "../../assets/images/placeholder.webp";
export default function LazyloadIamge({ imageScr, imageAlt, classes }) {
  return (
    <LazyLoad
      height={200}
      offset={100}
      placeholder={
        <img
          src={placeholder}
          alt="placeholder"
          className={classes}
        />
      }
    >
      <img
        src={imageScr}
        alt={imageAlt}
        className={classes}
      />
    </LazyLoad>
  );
}
