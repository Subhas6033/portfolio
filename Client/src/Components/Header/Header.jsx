/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import {Loader} from '../index'



const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      title: "Skill",
      slug: "/skill",
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-14 left-0 w-full z-20 bg-[#1B2549] text-white shadow-md"
          >
            <ul className="flex flex-col items-center p-4">
              {navItems.map((nav, index) => (
                <motion.li
                  key={index}
                  className="py-3"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <button
                    onClick={() => {
                      navigate(nav.slug);
                      setIsMenuOpen(false);
                    }}
                    className="text-lg"
                  >
                    {nav.title}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
