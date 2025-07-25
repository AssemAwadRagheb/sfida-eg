// Utility functions for local storage

// Custom event triggers
export const triggerCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

export const triggerFavoritesUpdate = () => {
  window.dispatchEvent(new Event("favoritesUpdated"));
};
