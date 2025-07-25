import { Perfumes } from "@/data/perfumes.js";
import { useState, useEffect } from "react";
import DefaultPerfumeBottleSelector from "../images/DefaultPerfumeBottleSelector.jsx";
import { useRouter } from "next/navigation.js";

const MasonryGallery = () => {
  const [showMore, setShowMore] = useState(false);
  const [columns, setColumns] = useState([[], [], [], []]); // Default to 4 columns
  const [isMobile, setIsMobile] = useState(false); // Track mobile screen size
  const router = useRouter();

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Function to determine the number of columns based on screen width
  const getColumnCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1; // 1 column for mobile
      if (window.innerWidth < 1024) return 2; // 2 columns for tablets
      return 4; // 4 columns for desktop
    }
    return 4; // Default to 4 columns if window is not defined (e.g., during SSR)
  };

  // Split images into columns based on screen size
  const updateColumns = () => {
    const columnCount = getColumnCount();
    const newColumns = Array.from({ length: columnCount }, () => []);

    Perfumes.forEach((perfume, index) => {
      newColumns[index % columnCount].push(perfume);
    });

    setColumns(newColumns);
  };

  // Update columns and mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      updateColumns(); // Update columns
      setIsMobile(window.innerWidth < 640); // Update mobile state
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Go to PDP

  const goToPDP = (productSKU) => {
    router.push(`/product/${productSKU}`);
  };

  return (
    <div className="relative mb-[4rem]">
      {/* Flex Container for Masonry Layout */}
      <div
        className={`flex gap-4 transition-all duration-500 ease-in-out ${
          showMore
            ? "max-h-none" // Show all content
            : isMobile
            ? "max-h-[calc(600px+100vh)]" // Mobile: 600px + 100vh
            : "max-h-[1000px]" // Desktop: 600px
        } ${!showMore ? "overflow-hidden" : ""}`} // Add overflow-hidden when not showing more
      >
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {/* Map over images in each column */}
            {column.map((product, imgIndex) => (
              <div
                key={imgIndex}
                className="relative group hover:scale-[101%] transition-transform duration-300 ease-in-out cursor-pointer"
                onClick={() => goToPDP(product.sku)}
              >
                {/* Image */}
                <DefaultPerfumeBottleSelector
                  className="h-auto max-w-full rounded-lg transition-transform duration-300 scale-[100.5%] group-hover:scale-[101%] opacity-100"
                  imageDefaultSelector={product?.defaultImage}
                  alt={product?.titleEn}
                  width={1000}
                  height={1000}
                />
                <div className="absolute inset-0  bg-blue/20 flex flex-col justify-end p-16 text-center">
                  <h3 className="text-white text-[.825rem] font-bold">
                    {product.titleAr}
                  </h3>
                  <p className="text-white text-[.625rem]">
                    {product.descriptionArShort}
                  </p>
                </div>

                {/* Overlay with Details */}
                <div className="absolute inset-0 bg-blue/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-16 text-center">
                  <h3 className="text-white text-[.825rem] font-bold">
                    {product.titleAr}
                  </h3>
                  <p className="text-white text-[.625rem]">
                    {product.descriptionArShort}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Blur Overlay */}
      {!showMore && (
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[1px] transition-all duration-700 ease-in-out"></div>
      )}

      {/* See More Button */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center z-10 mb-[2rem]">
        <button
          onClick={toggleShowMore}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg opacity-80 hover:opacity-100"
        >
          {showMore ? "Show Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default MasonryGallery;
