import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DefaultPerfumeBottleSelector from "../images/DefaultPerfumeBottleSelector";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  addToCart,
} from "@/utils/storage";
import { AlertMessages } from "@/utils/alertMessages";
import { showToast } from "../toast/toast";

const ProductCard = ({ product, preventImageLink = true, hideDetailsButton = false }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const favorites = getFavorites();
    const isProductInFavorites = favorites.some(
      (item) => item.id === product.id
    );
    setIsFavorite(isProductInFavorites);
    setFavoritesCount(favorites.length);
  }, [product.id]);

  const handleOnClick = (link) => {
    router.push(link);
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      const favorites = getFavorites();
      const favoriteItem = favorites.find((item) => item.id === product.id);
      if (favoriteItem) {
        removeFromFavorites(favoriteItem.uniqueId);
      }
      showToast(AlertMessages.RemovedFromFavorites, "ar");
    } else {
      const productToAdd = {
        ...product,
        price: product.price || "غير محدد"
      };
      addToFavorites(productToAdd);
      showToast(AlertMessages.AddedToFavoritesSuccessfully, "ar");
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      id: product.id,
      sku: product.sku,
      titleAr: product.titleAr,
      defaultImage: product.defaultImage,
      uniqueId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    addToCart(productToAdd);
    showToast(AlertMessages.AddedToCartSuccessfully, "ar");
  };

  // حساب نسبة الخصم إذا كان هناك سعر قديم
  const calculateDiscountPercentage = () => {
    if (!product.oldPrice || product.oldPrice <= product.price) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  };

  const discountPercentage = calculateDiscountPercentage();

  return (
    <div key={product.id} className="px-2 mb-4 relative">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Favorite Icon */}
        <div
          className="absolute top-2 left-4 z-10 cursor-pointer"
          onClick={handleFavoriteClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${
              isFavorite
                ? "text-pink-500 fill-current"
                : "text-gray-300 fill-transparent"
            }`}
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
        </div>

        {/* عرض نسبة الخصم إذا كانت موجودة */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            خصم {discountPercentage}%
          </div>
        )}

        {/* Product Image */}
        <DefaultPerfumeBottleSelector
          imageDefaultSelector={product.defaultImage}
          alt={product.titleAr}
          className={`w-full h-64 object-cover ${
            !preventImageLink && "cursor-pointer"
          }`}
          onClick={
            !preventImageLink ? () => handleOnClick(product.link) : () => null
          }
        />

        {/* Product Details */}
        <div className="p-4 text-center">
          <h3 className="text-sm md:text-lg lg:text-xl font-semibold mb-2">
            {product.titleAr}
          </h3>
          
          {/* عرض الأسعار */}
          <div className="flex flex-col items-center justify-center mb-2">
            {product.oldPrice && product.oldPrice > product.price ? (
              <>
                <span className="text-gray-500 line-through text-sm">
                  {product.oldPrice} ج.م
                </span>
                <span className="text-red-600 font-bold text-lg">
                  {product.price} ج.م
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-bold text-lg">
                {product.price} ج.م
              </span>
            )}
          </div>
          
          {!hideDetailsButton && (
            <button
              onClick={() => handleOnClick(product.link)}
              className="mt-2 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              تفاصيل المنتج
            </button>
          )}
          
          <button
            onClick={handleAddToCart}
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${
              hideDetailsButton ? "mt-4" : "mt-2"
            }`}
          >
            أضف إلى العربة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;