/* eslint-disable react/prop-types */
import LazyLoad from "react-lazyload";

export default function LazyloadIamge({ imageScr, imageAlt, classes }) {
  return (
    <LazyLoad
      height={200}
      offset={100}
      placeholder={<div></div>}
    >
      <img
        src={imageScr}
        alt={imageAlt}
        className={classes}
      />
    </LazyLoad>
  );
}
