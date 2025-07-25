import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCart, getFavorites } from "@/utils/storage";
import { SearchBar } from "../searchBar";

export const NavbarMobile = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Function to update cart and favorites counts
  const updateCounts = () => {
    setCartCount(getCart().length);
    setFavoritesCount(getFavorites().length);
  };

  // Update counts on component mount
  useEffect(() => {
    updateCounts();
  }, []);

  // Listen for custom events to update counts
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

  // Update counts on window resize
  useEffect(() => {
    const handleResize = () => updateCounts();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-between gap-6 p-4 xl:hidden">
      {/* Search Bar */}
      <div className="flex-1">
        <SearchBar />
      </div>

      {/* Favorites Icon with Count */}
      <Link href="/favorites" className="hover:text-gray-200 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full text-xs px-1">
            {favoritesCount}
          </span>
        )}
      </Link>

      {/* Cart Icon with Count */}
      <Link
        href="/cart"
        className="flex items-center hover:text-gray-200 relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full text-xs px-1">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};
