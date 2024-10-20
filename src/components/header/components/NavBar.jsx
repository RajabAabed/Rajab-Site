import { Link } from "react-scroll";

export default function NavBar() {
  const menuItems = [
    { title: "Home", url: "main" },
    { title: "Service", url: "service" },
    { title: "Resume", url: "experience" },
    { title: "portfolio", url: "portfolio" },
    { title: "Testimonial", url: "testimonial" },
    { title: "Contact", url: "contact" },
  ];

  let activeStyle =
    " md:px-6  font-medium text-white dark:text-white bg-primary-500 rounded-3xl";
  let generalStyle =
    "cursor-pointer py-3 md:py-3 px-4 md:px-3 font-Lufga text-neutral-400 hover:text-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-200";
  return (
    <div
      id="hs-navbar-header-floating"
      className=" hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block"
      aria-labelledby="hs-navbar-header-floating-collapse"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
        {menuItems.map((item, index) => {
          return (
            <Link
              key={index}
              className={generalStyle}
              activeClass={activeStyle}
              to={item.url}
              smooth={true}
              duration={1200}
              offset={-100}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
