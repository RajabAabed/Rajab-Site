import Footer from "../footer/Footer";
import Header from "../header/Header";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
