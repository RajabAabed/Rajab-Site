import LazyloadIamge from "../lazyload/LazyloadImage";
import NavBar from "./components/NavBar";
import ThemeToggle from "./components/ThemeToggle";
import logo from "/assets/images/logo.svg";
export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav className="mt-4 relative max-w-4xl w-full bg-[#171717] border rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-0 md:px-4 md:mx-auto dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-4 md:px-0 flex justify-between items-center">
          <div>
            <a
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              href="#"
              aria-label="RajabAabed"
            >
              <LazyloadIamge
                imageScr={logo}
                imageAlt="logo"
                classes="w-[70px] p-1 box-border"
              />
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <ThemeToggle
              customStyle="me-3"
              width={45}
              height={45}
            />
            <button
              type="button"
              className="hs-collapse-toggle flex justify-center items-center size-11 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              id="hs-navbar-header-floating-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-header-floating"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-header-floating"
            >
              <svg
                className="hs-collapse-open:hidden shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line
                  x1="3"
                  x2="21"
                  y1="6"
                  y2="6"
                />
                <line
                  x1="3"
                  x2="21"
                  y1="12"
                  y2="12"
                />
                <line
                  x1="3"
                  x2="21"
                  y1="18"
                  y2="18"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <NavBar />
        <ThemeToggle
          customStyle="hidden md:flex"
          width={35}
          height={35}
        />
      </nav>
    </header>
  );
}
