'use client';
import React  from "react";
import { useState } from "react";
import Link from "next/link";
import { MdMenu, MdMenuOpen } from "react-icons/md";

type NavBarProps = {
    title: string;
    menuItems: { label: string; link: string }[];
    logo?: string;
    titleLink?: string;
}

const NavBar = ({title, menuItems, logo, titleLink}: NavBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-green-600 m-4 mb-0 rounded text-white shadow-lg">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 mr-2 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <MdMenuOpen className="block h-6 w-6 text-white" aria-hidden="true" />
              ) : (
                <MdMenu className="block h-6 w-6 text-white" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Logo and navigation links */}
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-between">
            <div className="flex shrink-0 items-center">
              <Link href={titleLink || "/"} className="flex items-center">
                {logo ? (
                    <div className="flex flex-row">
                        <img
                            className="block h-8 w-auto"
                            src={logo}
                            alt="Logo"
                        />
                        <span className="text-white text-lg font-bold">{title}</span>
                    </div>
                ) : (
                  <span className="text-white text-lg font-bold">{title}</span>
                )}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:flex-row sm:justify-end">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    className="text-green-100 hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="flex flex-col items-center space-y-1 px-2 pt-2 pb-3">
            {menuItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.link}
                    className="text-green-100 w-full hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                    {item.label}
                </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;