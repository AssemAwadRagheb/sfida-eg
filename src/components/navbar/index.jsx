"use client";

import React, { useEffect, useState } from "react";
import { NavbarRoutes } from "./parts/routes";
import { NavbarOptions } from "./parts/options";
import { NavbarLogo } from "./parts/logo";
import { useRouter } from "next/navigation";
import { SearchBar } from "./parts/searchBar";
import Link from "next/link";
import { getCart, getFavorites } from "@/utils/storage";

const Navbar = () => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const updateCounts = () => {
    setCartCount(getCart().length);
    setFavoritesCount(getFavorites().length);
  };

  useEffect(() => {
    updateCounts();
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => updateCounts();
    const handleFavoritesUpdate = () => updateCounts();

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToHome = () => {
    router.push(`/`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`sticky top-0 z-50 w-full`}>
      <nav
        className={`bg-[#2f67e8] text-[#FFF0D1] transition-all duration-300 ${
          isSticky ? "bg-opacity-90 shadow-xl" : "bg-opacity-100"
        }`}
      >
        {/* Mobile & Tablet View */}
        {(isMobile || isTablet) && (
          <>
            <div className="px-4 py-3 flex items-center justify-between gap-4">
              {/* Logo */}
              <div onClick={goToHome} className="flex-shrink-0">
                <NavbarLogo />
              </div>

              {/* Search Bar - Takes available space */}
              <div className="flex-1 min-w-0">
                <SearchBar />
              </div>

              {/* Icons Group with proper spacing */}
              <div className="flex items-center gap-5 pl-2">
                {/* Favorites Icon */}
                <Link href="/favorites" className="relative p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-900 text-white rounded-full text-[10px] h-4 w-4 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>

                {/* Cart Icon */}
                <Link href="/cart" className="relative p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-900 text-white rounded-full text-[10px] h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Menu Toggle Icon with extra space */}
                <button 
                  onClick={toggleMenu} 
                  className="p-1 ml-2 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="px-4 pb-3">
                <NavbarRoutes setIsMenuOpen={setIsMenuOpen} />
              </div>
            )}
          </>
        )}

        {/* Desktop View - Modified spacing */}
        {!isMobile && !isTablet && (
          <div className="px-5 xl:px-12 py-4 flex items-center justify-between">
            <div onClick={goToHome} className="flex-shrink-0">
              <NavbarLogo />
            </div>

            <NavbarRoutes setIsMenuOpen={setIsMenuOpen} />

            <div className="hidden md:flex items-center gap-8">
              <div className="w-64 mx-4">
                <SearchBar />
              </div>
              
              <div className="flex items-center gap-6">
                <NavbarOptions iconColor="#2f67e8" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;