import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { HiX } from "react-icons/hi";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false); //for slide up animation

  useEffect(() => {
    if (isMenuOpen) {
      setRenderMenu(true);
    } else {
      // TO close the menuBar with slide-up animation
      const timer = setTimeout(() => {
        setRenderMenu(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handelScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handelScroll);
    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, [isScrolled]);

  const navigate = useNavigate();
  const navItems = [
    {
      title: "Home",
      slug: "/",
    },
    {
      title: "About me",
      slug: "/about",
    },
    {
      title: "Education",
      slug: "/education",
    },
    {
      title: "Projects",
      slug: "/projects",
    },
    {
      title: "Contact me",
      slug: "/contact",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 flex justify-between py-3 px-6 bg-gradient-to-r from-[#7696CF] to-[#1B2549] text-white ${
        isScrolled
          ? "bg-white/60 backdrop-blur-md shadow-md"
          : "bg-gradient-to-r from-[#7696CF] to-[#1B2549]"
      }`}
    >
      <h1 className="text-2xl font-bold font-orbitron text-black focus:outline-none">
        <Link to={"https://github.com/Subhas6033"}>
          <span>&lt;</span> Subhas <span>&#47;</span>
          <span>&gt;</span>
        </Link>
      </h1>

      {/* Navigations Link */}
      <nav className="">
        <ul className="hidden md:flex justify-center gap-6 md:px-3">
          {navItems.map((nav, index) => (
            <li key={index} className="group relative transition duration-300">
              <button
                onClick={() => navigate(nav.slug)}
                className="text-white group-hover:text-yellow-300 transition duration-300 hover:cursor-pointer"
              >
                {nav.title}
              </button>

              {/* Underline animation */}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-yellow-300 transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Hemberg icon for small screen */}
        <button
          className="md:hidden absolute top-3 right-3"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiX className="size-10" />
          ) : (
            <IoReorderThree className="size-10" />
          )}
        </button>
      </nav>

      {/* Navigations links for the small screen */}
      {renderMenu && (
        <nav
          className={`
            fixed top-14 left-0 w-full z-20 bg-[#1B2549] text-white shadow-md
            transform transition-all duration-700 ease-linear
            ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
            }
          `}
        >
          <ul className="flex flex-col items-center p-4">
            {navItems.map((nav, index) => (
              <li className="py-3" key={index}>
                <button
                  onClick={() => {
                    navigate(nav.slug);
                    setIsMenuOpen(false); // triggers slide-up
                  }}
                  className="text-lg"
                >
                  {nav.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
