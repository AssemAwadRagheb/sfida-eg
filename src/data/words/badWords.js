// Import the Filter class using named export syntax
import { Filter } from "bad-words";

// Create a new instance of the Filter
const filter = new Filter();

// Function to check for bad words
export const containsBadWords = (text) => {
  return filter.isProfane(text);
};