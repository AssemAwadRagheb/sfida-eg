"use client";

import React, { useState, useEffect } from "react";
import {
  getFavorites,
  removeFromFavorites,
  clearFavorites,
} from "@/utils/storage";
import { AlertMessages } from "@/utils/alertMessages";
import { showToast } from "@/components/toast/toast";
import EmptyState from "@/components/common/emptyState/emptyState";
import DefaultPerfumeBottleSelector from "@/components/images/DefaultPerfumeBottleSelector";
import { useRouter } from "next/navigation";

const Favorites = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites on component mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Handle removing an item from favorites
  const handleRemoveFromFavorites = (productUniqueId) => {
    removeFromFavorites(productUniqueId);
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.uniqueId !== productUniqueId)
    );
    showToast(AlertMessages.RemovedFromFavorites, "ar"); // Change 'ar' to 'en' for English
  };

  // Handle clearing all favorites
  const handleClearFavorites = () => {
    clearFavorites(); // Clear favorites from localStorage
    setFavorites([]); // Clear favorites from state
    showToast(AlertMessages.FavoritesCleared, "ar"); // Show confirmation toast
  };

  const handleGoToPDP = (productSku) => {
    router.push(`/product/${productSku}`);
  };

  return (
    <div className="p-6 min-h-[100vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">المفضلة</h1>
        {favorites.length > 0 && (
          <button
            onClick={handleClearFavorites}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            مسح الكل
          </button>
        )}
      </div>

      {favorites.length > 0 ? (
        favorites.map((item) => (
          <div
            key={item.uniqueId}
            className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center"
          >
            <div
              className="first flex items-center gap-4 cursor-pointer"
              onClick={() => handleGoToPDP(item.sku)}
            >
              <DefaultPerfumeBottleSelector
                className="h-auto max-w-full rounded-lg"
                imageDefaultSelector={item?.defaultImage}
                alt={item?.titleEn}
                width={80}
                height={80}
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{item.titleAr}</h2>
                <p className="lg:text-sm text-[.8rem]">
                  {item.descriptionArShort}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleRemoveFromFavorites(item.uniqueId)}
              className="mt-2 text-red-500 hover:text-red-700  hidden lg:block"
            >
              إزالة من المفضلة
            </button>

            <button
              onClick={() => handleRemoveFromFavorites(item.uniqueId)}
              className="mt-2 text-red-500 hover:text-red-700 block lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 30 30"
                fill="#EF4444"
              >
                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
              </svg>
            </button>
          </div>
        ))
      ) : (
        <>
          <EmptyState type="FAVORITES" />
        </>
      )}
    </div>
  );
};

export default Favorites;
