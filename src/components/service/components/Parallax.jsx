import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";

export default function Parallax() {
  const [springProps, api] = useSpring(() => ({
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 80;
    api.start({
      backgroundPositionX: x,
      backgroundPositionY: y,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [api]);

  return (
    <animated.div
      style={{
        ...springProps,
        backgroundImage: `url('/assets/images/property.webp')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${springProps.backgroundPositionX.to(
          (x) => `${x}px`
        )} ${springProps.backgroundPositionY.to((y) => `${y}px`)}`,
      }}
      className="rounded-[50px] absolute inset-0 opacity-80 z-[-1]"
    ></animated.div>
  );
}
