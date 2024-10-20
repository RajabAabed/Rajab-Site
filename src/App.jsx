import Contact from "./components/contact/Contact";
import Experience from "./components/experience/Experience";
import Hero from "./components/hero/Hero";
import Hire from "./components/hire/Hire";
import Layout from "./components/layout/Layout";
import Portfolio from "./components/portfolio/Portfolio";
import Service from "./components/service/Service";
import Testimonial from "./components/testimonial/Testimonial";

export default function App() {
  return (
    <Layout>
      <Hero />
      <Service />
      <Experience />
      <Hire />
      <Portfolio />
      <Testimonial />
      <Contact />
    </Layout>
  );
}
