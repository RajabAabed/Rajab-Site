/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
const defaultProperties = {
  light: {
    circle: {
      r: 9,
    },
    mask: {
      cx: 12,
      cy: 4,
    },
    svg: {
      transform: "rotate(40deg)",
    },
    lines: {
      opacity: 0,
    },
  },
  dark: {
    circle: {
      r: 5,
    },
    mask: {
      cx: 30,
      cy: 4,
    },
    svg: {
      transform: "rotate(90deg)",
    },
    lines: {
      opacity: 1,
    },
  },
  springConfig: { mass: 4, tension: 250, friction: 35 },
};

export default function ThemeToggle({ customStyle, width, height }) {
  const [theme, setTheme] = useState("light");
  const detectPreferredTheme = () => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkScheme ? "dark" : "light";
  };
  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const preferredTheme = detectPreferredTheme();
      setTheme(preferredTheme);
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    sessionStorage.setItem("theme", newTheme);
  };
  const { circle, svg, mask, lines } = defaultProperties[theme];

  const [svgProps, setSvgProps] = useSpring(() => ({
    ...svg,
    config: defaultProperties.springConfig,
  }));
  const [maskedCircleProps, setMaskedCircleProps] = useSpring(() => ({
    ...mask,
    config: defaultProperties.springConfig,
  }));
  const [centerCircleProps, setCenterCircleProps] = useSpring(() => ({
    ...circle,
    config: defaultProperties.springConfig,
  }));
  const [linesProps, setLinesProps] = useSpring(() => ({
    ...lines,
    config: defaultProperties.springConfig,
  }));
  setSvgProps(svg);
  setSvgProps(svg);
  setMaskedCircleProps(mask);
  setCenterCircleProps(circle);
  setLinesProps(lines);
  return (
    <div onClick={handleThemeToggle} data-theme={theme} className={customStyle}>
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        style={{ cursor: "pointer", ...svgProps }}
      >
        <mask id="myMask2">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <animated.circle
            style={{ ...maskedCircleProps }}
            r="9"
            fill="black"
          />
        </mask>
        <animated.circle
          cx="12"
          cy="12"
          style={{ ...centerCircleProps }}
          fill={theme === "dark" ? "#FDB813" : "white"}
          mask="url(#myMask2)"
        />
        <animated.g stroke="#FDB813" style={{ ...linesProps }}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </animated.g>
      </animated.svg>
    </div>
  );
}
