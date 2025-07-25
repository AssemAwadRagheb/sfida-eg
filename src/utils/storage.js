import { Promocodes } from "@/data/promocodes/promocedes";
import { triggerCartUpdate, triggerFavoritesUpdate } from "./events";

// Generate a unique ID for each item
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Cart functions
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const uniqueId = generateUniqueId(); // Generate a unique ID for the item
  const cartItem = { ...product, uniqueId }; // Add the unique ID to the item
  cart.push(cartItem); // Add the item to the cart
  localStorage.setItem("cart", JSON.stringify(cart));
  triggerCartUpdate(); // Trigger cart update event
};

export const removeFromCart = (uniqueId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.uniqueId !== uniqueId); // Remove by uniqueId
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  triggerCartUpdate(); // Trigger cart update event
};

export const clearCart = () => {
  localStorage.removeItem("cart"); // Clear the cart
  triggerCartUpdate(); // Trigger cart update event
};

// Favorites functions
export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (product) => {
  const favorites = getFavorites();
  // Check if the product already exists in favorites based on its id
  if (!favorites.some((item) => item.id === product.id)) {
    const uniqueId = generateUniqueId(); // Generate a unique ID for the item
    const favoriteItem = { ...product, uniqueId }; // Add the unique ID to the item
    favorites.push(favoriteItem); // Add to favorites if not already present
    localStorage.setItem("favorites", JSON.stringify(favorites));
    triggerFavoritesUpdate(); // Trigger favorites update event
  }
};

export const removeFromFavorites = (uniqueId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(
    (item) => item.uniqueId !== uniqueId
  ); // Remove by uniqueId
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  triggerFavoritesUpdate(); // Trigger favorites update event
};

export const clearFavorites = () => {
  localStorage.removeItem("favorites"); // Clear the favorites
  triggerFavoritesUpdate(); // Trigger favorites update event
};

//  Promocode functions

// Save promocode and provider to localStorage as an array of objects

export const savePromocodeData = (pm, provider) => {
  if (pm) {
    // Get existing promocodes from localStorage
    const promocodes = JSON.parse(localStorage.getItem("promocodes")) || [];

    // Find the promocode in the Promocodes array
    const promocodeDetails = Promocodes.find((pc) => pc.code === pm);

    if (promocodeDetails) {
      // Check if the promocode already exists in localStorage
      const existingPromocode = promocodes.find((pc) => pc.code === pm);

      if (!existingPromocode) {
        // Add new promocode object to the array with all details
        promocodes.push({
          code: promocodeDetails.code,
          provider: provider || "Unknown Provider",
          usedBy: [], // Track users who used this promocode
          isUsed: false, // Mark as unused by default
          value: promocodeDetails.value, // Promocode discount percentage
          maxDiscountPercentage: promocodeDetails.maxDiscountPercentage, // Max discount percentage
          minOrderAmount: promocodeDetails.minOrderAmount, // Minimum order amount
          usageLimit: promocodeDetails.usageLimit, // Usage limit
          realUsedTimes: 0, // Track actual usage count
        });

        // Save updated array to localStorage
        localStorage.setItem("promocodes", JSON.stringify(promocodes));
      }
    }
  }
};
// Get all promocodes from localStorage
export const getPromocodes = () => {
  return JSON.parse(localStorage.getItem("promocodes")) || [];
};

// Get a specific promocode by code
export const getPromocode = (code) => {
  const promocodes = getPromocodes();
  const promocode = promocodes.find((pc) => pc.code === code);

  if (promocode) {
    // Ensure the promocode has all necessary details
    const promocodeDetails = Promocodes.find((pc) => pc.code === code);

    if (promocodeDetails) {
      return {
        ...promocode,
        value: promocodeDetails.value,
        maxDiscountPercentage: promocodeDetails.maxDiscountPercentage,
        minOrderAmount: promocodeDetails.minOrderAmount,
      };
    }
  }

  return null;
};

// Mark a promocode as used
export const markPromocodeAsUsed = (code, email) => {
  const promocodes = getPromocodes();
  const updatedPromocodes = promocodes.map((pc) => {
    if (pc.code === code) {
      return {
        ...pc,
        usedBy: [...pc.usedBy, email], // Add user email to usedBy array
        isUsed: true, // Mark as used
        realUsedTimes: pc.realUsedTimes + 1, // Increment usage count
      };
    }
    return pc;
  });

  // Save updated array to localStorage
  localStorage.setItem("promocodes", JSON.stringify(updatedPromocodes));
};

// Clear all promocodes from localStorage
export const clearPromocodes = () => {
  localStorage.removeItem("promocodes");
};
