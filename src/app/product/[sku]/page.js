"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { Perfumes } from "@/data/perfumes";
import DefaultPerfumeBottleSelector from "@/components/images/DefaultPerfumeBottleSelector";
import BottleSelectionHandler from "@/components/product/bottleSelectionHandler";
const PerfumeBottles = [
  // يمكنك وضع البيانات هنا مباشرة أو استيرادها من مكان آخر
  // أو إزالة الاعتماد عليها تماماً إذا لم تعد ضرورية
];
import BottleSelector from "@/components/images/BottleSelector";
import MainLoader from "@/components/common/loaders/mainLoader";
import { addToCart, addToFavorites } from "@/utils/storage";
import { showToast } from "@/components/toast/toast";
import { AlertMessages } from "@/utils/alertMessages";
import { removeKeysFromObject } from "@/utils/unitsFunctions";
import SelectedOrderDetails from "@/components/product/selectedOrderDetails";
import { useRouter } from "next/navigation";
import GenderIndicator from "@/components/common/GenderIndicator";

export default function ProductPage({ params }) {
  const unwrappedParams = use(params);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [selectedBottleData, setSelectedBottleData] = useState(null);
  const [selectedSizeData, setSelectedSizeeData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const foundProduct = Perfumes?.find((p) => p.sku === unwrappedParams.sku);
    setProduct(foundProduct);
  }, [unwrappedParams.sku]);

  const availableSizes = product?.sizes?.filter((size) => size.available);

  const handleAddToCart = () => {
    if (!product) return;

    // تحديد السعر الافتراضي - إما سعر المنتج الأساسي أو أصغر حجم متاح
    let defaultPrice = product.price || 0;
    let defaultSize = "غير محدد";
    
    // إذا كانت هناك أحجام متاحة، نستخدم أصغر حجم كافتراضي
    if (availableSizes && availableSizes.length > 0) {
      const smallestSize = availableSizes.reduce((prev, current) => 
        (prev.price < current.price) ? prev : current
      );
      defaultPrice = smallestSize.price;
      defaultSize = smallestSize.size;
    }

    // إنشاء عنصر السلة مع القيم الافتراضية
    const cartItem = {
      ...product,
      selectedBottle: selectedBottleData || {
        image: product.defaultImage,
        name: "الزجاجة الافتراضية"
      },
      selectedSize: selectedSizeData || {
        size: defaultSize,
        price: defaultPrice,
        available: true,
        sizeKey: "default"
      },
      quantity: 1,
      readyForCart: true
    };

    // تنظيف البيانات قبل الإرسال
    const cleanedCartItem = removeKeysFromObject(cartItem, [
      "unitCost",
      "unitPriceAbs",
    ]);

    console.log("Adding to cart:", cleanedCartItem); // للتأكد من البيانات
    
    try {
      addToCart(cleanedCartItem);
      showToast(AlertMessages.AddedToCartSuccessfully, "ar");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("حدث خطأ أثناء إضافة المنتج إلى السلة", "ar");
    }
  };

  const handleBuyNow = () => {
    handleAddToCart(); // أضف المنتج إلى السلة أولاً
    router.push("/cart"); // ثم انتقل إلى صفحة السلة
  };

  const handleAddToFavorites = () => {
    const favoriteItem = { ...product };
    addToFavorites(favoriteItem);
    showToast(AlertMessages.AddedToFavoritesSuccessfully, "ar");
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  if (!product) {
    return <MainLoader />;
  }

  return (
    <section className="container mx-auto p-4 md:p-8">
      {/* Product Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {product.titleAr}
        </h1>
        <h5 className="text-sm md:text-lg font-semibold text-gray-700 mt-4">
          {product.descriptionArShort}
        </h5>
        <div className="text-center mb-8">
          <div className="mt-2 flex justify-center">
            <GenderIndicator gender={product.gender} />
          </div>
        </div>
      </div>

      {/* Product Flex Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div
          className={`w-full md:w-1/3 relative rounded-lg overflow-hidden shadow-lg ${
            isTablet && "flex flex-col items-center"
          }`}
        >
          <DefaultPerfumeBottleSelector
            className="h-auto max-w-full rounded-lg"
            imageDefaultSelector={product?.defaultImage}
            alt={product?.titleEn}
            width={500}
            height={500}
          />
          
          {(isMobile || isTablet) && (
            <>
              <SelectedOrderDetails
                selectedBottleData={selectedBottleData}
                selectedSizeData={selectedSizeData}
                isTablet={isTablet}
              />
            </>
          )}
          
          <BottleSelectionHandler
            availableSizes={availableSizes}
            PerfumeBottles={PerfumeBottles}
            setSelectedBottleData={setSelectedBottleData}
            setSelectedSizeeData={setSelectedSizeeData}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>

        {(isMobile || isTablet) && (
          <div className="flex flex-wrap justify-between gap-[.5rem]">
            <button
              onClick={handleAddToCart}
              className={`flex flex-row-reverse gap-2 justify-center w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors ${
                isMobile ? "min-w-[100%]" : "w-[49%]"
              }`}
            >
              أضف إلى العربة
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
            </button>

            <button
              className={`flex flex-row-reverse gap-2 justify-center w-full bg-white py-3 rounded-lg border-[#FFF0D1] text-[#FFC107] border-[2px] hover:bg-[#FFC107] hover:text-[#111827] transition-colors ${
                isMobile ? "min-w-[100%]" : "w-[49%]"
              }`}
              onClick={handleBuyNow}
            >
              إتمام الطلب
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button
              onClick={handleAddToFavorites}
              className={`flex flex-row-reverse gap-2 justify-center w-full bg-white py-3 rounded-lg border-blue-500 text-blue-500 border-[2px] hover:bg-blue-600 hover:text-white transition-colors ${
                isMobile ? "min-w-[100%]" : "w-[49%]"
              }`}
            >
              أضف إلى المفضلة{" "}
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
            </button>
            <button
              className={`flex flex-row-reverse gap-2 justify-center w-full bg-white py-3 rounded-lg border-blue-500 text-blue-500 border-[2px] hover:bg-blue-600 hover:text-white transition-colors ${
                isMobile ? "min-w-[100%]" : "w-[49%]"
              }`}
              onClick={handleContinueShopping}
            >
              متابعة التسوق
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
                  d="M6 2h12a2 2 0 012 2v2H4V4a2 2 0 012-2zm0 4h12v16H6V6zm3 4h6v2H9v-2z"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Product Details */}
        <div className="w-full md:w-2/3 space-y-6 text-right">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-right">
            <h3 className="text-xl font-semibold text-gray-800">وصف المنتج</h3>
            <div className="mt-4 space-y-4">
              <p className="text-gray-700">{product.descriptionArLong}</p>
            </div>
          </div>

          {!isMobile && !isTablet && (
            <SelectedOrderDetails
              selectedBottleData={selectedBottleData}
              selectedSizeData={selectedSizeData}
            />
          )}

          {!isMobile && !isTablet && (
            <div className="flex flex-wrap justify-between gap-[.5rem]">
              <button
                onClick={handleAddToCart}
                className={`flex flex-row-reverse gap-2 justify-center w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors ${
                  isMobile ? "min-w-[100%]" : "w-[49%]"
                }`}
              >
                أضف إلى العربة
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
              </button>

              <button
                className={`flex flex-row-reverse gap-2 justify-center w-full bg-white py-3 rounded-lg border-[#FFF0D1] text-[#FFC107] border-[2px] hover:bg-[#FFC107] hover:text-[#111827] transition-colors ${
                  isMobile ? "min-w-[100%]" : "w-[49%]"
                }`}
                onClick={handleBuyNow}
              >
                إتمام الطلب
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <button
                onClick={handleAddToFavorites}
                className={`flex flex-row-reverse gap-2 justify-center w-full bg-white py-3 rounded-lg border-blue-500 text-blue-500 border-[2px] hover:bg-blue-600 hover:text-white transition-colors ${
                  isMobile ? "min-w-[100%]" : "w-[49%]"
                }`}
              >
                أضف إلى المفضلة{" "}
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
              </button>
              <button
                className={`flex flex-row-reverse gap-2 justify-center w-full bg-white py-3 rounded-lg border-blue-500 text-blue-500 border-[2px] hover:bg-blue-600 hover:text-white transition-colors ${
                  isMobile ? "min-w-[100%]" : "w-[49%]"
                }`}
                onClick={handleContinueShopping}
              >
                متابعة التسوق
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
                    d="M6 2h12a2 2 0 012 2v2H4V4a2 2 0 012-2zm0 4h12v16H6V6zm3 4h6v2H9v-2z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}