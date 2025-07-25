"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Perfumes } from "@/data/perfumes"; // Import your Perfumes data

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track highlighted suggestion
  const router = useRouter();
  const searchBarRef = useRef(null);

  // Detect if the input text is Arabic
  const isArabic = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
  };

  // Fetch suggestions from Perfumes data
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter Perfumes based on the search query
    const filteredSuggestions = Perfumes.filter((product) => {
      if (isArabic(searchQuery)) {
        return product.titleAr
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      } else {
        return product.titleEn
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
    }).slice(0, 3); // Show only the first 3 suggestions

    setSuggestions(filteredSuggestions);
    setHighlightedIndex(-1); // Reset highlighted index when suggestions change
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showSuggestions) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
            handleSuggestionClick(suggestions[highlightedIndex]);
          } else {
            handleSearch(e);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showSuggestions, suggestions, highlightedIndex]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Navigate to the products page with the search query
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);

    // Simulate a delay of 0.4 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const handleSuggestionClick = (suggestion) => {
    const selectedTitle = isArabic(searchQuery)
      ? suggestion.titleAr
      : suggestion.titleEn;
    setSearchQuery(selectedTitle);
    setShowSuggestions(false);
    router.push(`/products?search=${encodeURIComponent(selectedTitle)}`);
  };

  return (
    <div className="relative" ref={searchBarRef}>
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder=""
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full max-w-[150px] lg:max-w-[unset] px-2 py-1 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-[#FFF0D1] text-[#111827]"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-1 bg-[#FFF0D1] text-[#111827] rounded-l-md hover:bg-[#FFF0D1ee] focus:outline-none focus:ring-2 focus:ring-[#FFF0D1] flex items-center justify-center min-w-[4rem] min-h-[2rem]"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-[#111827] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "🔍"
          )}
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && searchQuery.trim() && (
        <div className="absolute top-full lg:left-0 w-full max-w-[150px] lg:max-w-[unset] bg-white border border-gray-300 rounded-b-md shadow-lg mt-1 z-[1000]">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`p-2 hover:bg-gray-100 cursor-pointer text-[#111827] ${
                  highlightedIndex === index ? "bg-gray-100" : ""
                }`}
              >
                {isArabic(searchQuery)
                  ? suggestion.titleAr
                  : suggestion.titleEn}
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">لا توجد نتائج</div>
          )}
        </div>
      )}
    </div>
  );
};
