"use client";

import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "@/utils/storage";
import EmptyState from "@/components/common/emptyState/emptyState";
import { showToast } from "@/components/toast/toast";
import { AlertMessages } from "@/utils/alertMessages";
import DefaultPerfumeBottleSelector from "@/components/images/DefaultPerfumeBottleSelector";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cart = getCart();
    setCartItems(cart);

    // حساب السعر الإجمالي مع التحقق من وجود selectedSize و price
    const calculatedTotal = cart.reduce((sum, item) => {
      const itemPrice = item.selectedSize?.price || 0;
      return sum + itemPrice;
    }, 0);
    setTotal(calculatedTotal);
  }, []);

  const handleRemoveFromCart = (productUniqueId) => {
    removeFromCart(productUniqueId);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.uniqueId !== productUniqueId)
    );

    const updatedCart = getCart();
    const updatedTotal = updatedCart.reduce((sum, item) => {
      const itemPrice = item.selectedSize?.price || 0;
      return sum + itemPrice;
    }, 0);
    setTotal(updatedTotal);

    showToast(AlertMessages.RemovedFromCart, "ar");
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
    setTotal(0);
    showToast(AlertMessages.CartCleared, "ar");
  };

  const handleGoToPDP = (productSku) => {
    router.push(`/product/${productSku}`);
  };

  const handleGoToCheckout = () => {
    router.push(`/checkout`);
  };

  return (
    <section className="p-6 min-h-[100vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
          عربة التسوق
        </h1>
        {cartItems.length > 0 && (
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            مسح العربة
          </button>
        )}
      </div>
      {cartItems.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item, _idx) => (
              <div
                key={_idx}
                className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => handleGoToPDP(item.sku)}
                >
                  <DefaultPerfumeBottleSelector
                    className="h-auto max-w-full rounded-lg"
                    imageDefaultSelector={item?.defaultImage}
                    alt={item?.titleEn}
                    width={80}
                    height={80}
                  />
                  <div>
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-[.5rem]">
                      {item.titleAr}
                    </h2>
                  
                    <p className="lg:text-sm text-[.8rem] text-gray-700">
                      السعر: {item.selectedSize?.price || 0} ج.م
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.uniqueId)}
                  className="text-red-500 hover:text-red-700 text-sm sm:text-base hidden lg:block"
                >
                  إزالة من العربة
                </button>

                <button
                  onClick={() => handleRemoveFromCart(item.uniqueId)}
                  className="text-red-500 hover:text-red-700 text-sm sm:text-base block lg:hidden"
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
            ))}
          </div>
          <div className="h-[1px] w-full mt-[2rem] bg-gray-200"></div>
          <div className="mt-6">
            <p className="text-lg sm:text-xl font-semibold">
              الإجمالي: {total.toFixed(2)} ج.م
            </p>
            <button
              onClick={handleGoToCheckout}
              className={`flex flex-row-reverse gap-2 justify-center w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-[1rem]          
              ${isMobile ? "min-w-[100%] " : "w-[49%]"}`}
            >
              إتمام الشراء
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
          </div>
        </>
      ) : (
        <EmptyState type="CART" />
      )}
    </section>
  );
}