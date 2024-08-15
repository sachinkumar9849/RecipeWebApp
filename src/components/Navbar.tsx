"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="p-4 themeColor">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0 mx-auto flex items-center justify-between">
        <Link href={"/"} className="text-white text-2xl font-bold">
          Recipe
        </Link>

        {/* Menu Toggle for Mobile */}
        <button className="text-white block lg:hidden" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navbar Links */}
        <div
          className={`lg:flex lg:items-center lg:space-x-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link href={"/"} className="text-white hover:text-gray-900 ml-4">
            Home
          </Link>

          <a href="#" className="text-white hover:text-gray-900 ml-4">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-900 ml-4">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
