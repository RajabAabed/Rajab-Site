import { useEffect, useRef } from "react";
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/motion";
import { vertexShader, fragmentShader } from "../shaders/silk";

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;

    let renderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
    } catch {
      return undefined; // No WebGL — the section's dark background stands in.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2() },
      uMouse: { value: new Vector2(0.35, -0.1) },
      uReveal: { value: 0 },
      uScroll: { value: 0 },
    };

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    scene.add(new Mesh(geometry, material));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      renderer.setSize(w, h, false);
      const dpr = renderer.getPixelRatio();
      uniforms.uResolution.value.set(w * dpr, h * dpr);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const mouseTarget = uniforms.uMouse.value.clone();
    const onPointerMove = (e) => {
      const rect = host.getBoundingClientRect();
      mouseTarget.set(
        (e.clientX - rect.left - rect.width / 2) / rect.height,
        -(e.clientY - rect.top - rect.height / 2) / rect.height
      );
    };
    window.addEventListener("pointermove", onPointerMove);

    let visible = true;
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(host);

    const scrollTrigger = ScrollTrigger.create({
      trigger: host,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        uniforms.uScroll.value = self.progress;
      },
    });

    const speed = prefersReducedMotion ? 0.2 : 1;
    const tick = (_, deltaMs) => {
      if (!visible) return;
      uniforms.uTime.value += (deltaMs / 1000) * speed;
      uniforms.uMouse.value.lerp(mouseTarget, 0.04);
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    // Fade over the CSS gradient that stands in until three.js arrives
    const intro = [
      gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out" }),
      gsap.to(uniforms.uReveal, { value: 1, duration: 2.8, ease: "power2.inOut" }),
    ];

    return () => {
      gsap.ticker.remove(tick);
      intro.forEach((tween) => tween.kill());
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersection.disconnect();
      scrollTrigger.kill();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0" aria-hidden="true" />;
}
