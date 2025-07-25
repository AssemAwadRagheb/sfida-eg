import Link from "next/link";
import { useEffect, useState } from "react";

const EmptyState = ({
  type = "DEFAULT",
  minHeight = "80vh",
  minWidth = "100%",
  imageWidth = 300,
  imageHeight = 300,
  backLink = "/products",
  backLinkText = "تصفح المنتجات",
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Update columns and mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Update mobile state
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Determine the image based on the type
  const getImageSrc = () => {
    switch (type) {
      case "FAVORITES":
        return "/imgs/common/empty-favorites.svg"; // For FAVORITES
      case "CART":
        return "/imgs/common/empty-cart.svg"; // For CART
      default:
        return "/imgs/common/empty-default.svg"; // For DEFAULT
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ minHeight, minWidth }}
    >
      {/* Image */}
      <img
        src={getImageSrc()}
        alt="Empty State"
        className="mb-6 "
        style={{ width: imageWidth, height: imageHeight }}
      />

      {/* Message */}
      <h2 className="text-2xl font-semibold text-[#2E7CF6] mb-4">
        {type === "FAVORITES"
          ? "قائمة المفضلة فارغة!"
          : type === "CART"
          ? "عربة التسوق فارغة!"
          : "لا توجد بيانات متاحة"}
      </h2>

      {/* Back Button */}
      <Link
        href={backLink}
        className={`${isMobile ? "min-w-[100%]" : "min-w-[40%]"} mt-[.5rem] `}
      >
        <button
          className={`flex flex-row-reverse gap-2 justify-center w-full bg-white py-3 rounded-lg border-blue-500 text-blue-500 border-[2px] hover:bg-blue-600 hover:text-white transition-colors `}
        >
          {backLinkText}
        </button>
      </Link>
    </div>
  );
};

export default EmptyState;
