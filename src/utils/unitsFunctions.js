export const removeKeysFromObject = (obj, keysToRemove) => {
  const newObj = { ...obj }; // Create a shallow copy of the original object

  keysToRemove.forEach((key) => {
    delete newObj[key]; // Remove the specified keys from the new object
  });

  return newObj; // Return the new object without the specified keys
};
