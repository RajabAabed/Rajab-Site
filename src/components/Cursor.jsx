import { useEffect, useRef } from "react";
import { gsap, isFinePointer } from "../lib/motion";

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    if (!isFinePointer()) return undefined;
    const el = ref.current;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (el.dataset.state === "out") el.dataset.state = "";
    };
    const onOver = (e) => {
      if (e.target.closest("input, textarea, select, iframe")) el.dataset.state = "hidden";
      else if (e.target.closest("a, button, [data-cursor]")) el.dataset.state = "hover";
      else el.dataset.state = "";
    };
    const onLeave = () => {
      el.dataset.state = "out";
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor hidden [@media(pointer:fine)]:block" data-state="out" aria-hidden="true">
      <div className="cursor-ball" />
    </div>
  );
}
