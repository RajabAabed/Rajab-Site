import { useEffect } from "react";
import { ScrollTrigger, initReveals, useGSAP } from "./lib/motion";
import { initSmoothScroll } from "./lib/scroll";
import { onFirstInteraction } from "./lib/idle";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  // Queued after the sections' own deferred setup (child effects run first), so the
  // Work pin exists before the reveal triggers that sit below it.
  useGSAP((_, contextSafe) =>
    onFirstInteraction(
      contextSafe(() => {
        initReveals();
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      })
    )
  );

  useEffect(() => {
    let destroy = () => {};
    const cancel = onFirstInteraction(() => {
      destroy = initSmoothScroll();
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      cancel();
      window.removeEventListener("load", refresh);
      destroy();
    };
  }, []);

  return (
    <>
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
