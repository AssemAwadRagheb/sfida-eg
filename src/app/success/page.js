"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { AlertMessages } from "@/utils/alertMessages";
import { showToast } from "@/components/toast/toast";
import { SocialMedia } from "@/components/footer/socialMedia";
import { cities } from "@/data/geo/geo";

export default function SuccessPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);

  const saveOrderToDashboard = (orderDetails) => {
    try {
      const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];

      if (!allOrders.some(order => order.orderId === orderDetails.orderId)) {
        const newOrder = {
          ...orderDetails,
          status: "new",
          createdAt: new Date().toISOString(),
        };

        allOrders.unshift(newOrder);
        localStorage.setItem("allOrders", JSON.stringify(allOrders));
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const details = JSON.parse(localStorage.getItem("orderDetails"));
      setOrderDetails(details);

      if (details) {
        saveOrderToDashboard(details);
      } else {
        router.push("/");
      }
    }
  }, [router]);

  const copyOrderDetails = async () => {
    if (!orderDetails) return;

    const orderId = orderDetails.orderId;
    const clientInfoText = `
      الاسم: ${orderDetails.clientInfo.name}
      البريد الإلكتروني: ${orderDetails.clientInfo.email}
      رقم الهاتف: ${orderDetails.clientInfo.phone}
      البلد: ${orderDetails.clientInfo.country.nameAr}
      المحافظة: ${orderDetails.clientInfo.governorate.nameAr}
      المدينة: ${orderDetails.clientInfo.city.nameAr}
      الحي: ${orderDetails.clientInfo.district}
      العنوان التفصيلي: ${orderDetails.clientInfo.detailedAddress}
    `;

    const orderItemsText = orderDetails.cartItems
      .map(
        (item) =>
          `${item.titleAr} - ${item.selectedSize.price} ج.م`
      )
      .join("\n");

    // Determine shipping cost based on total
    const isSpecialShippingCost =
      orderDetails.preTotalBeforeDiscount === 250 ||
      orderDetails.preTotalBeforeDiscount === 350 ||
      orderDetails.preTotalBeforeDiscount === 450;

    const shippingCostText = isSpecialShippingCost ? "50.00 ج.م ~~100.00 ج.م~~" : "مجاني ~~100.00 ج.م~~";

    // Discount from Offers
    const discountFromOffers = orderDetails.applicableOffers.some(
      (offer) => offer.type === "discount"
    )
      ? orderDetails.discount -
        (orderDetails.promocode
          ? (orderDetails.preTotalBeforeDiscount *
              orderDetails.promocode.value) /
            100
          : 0)
      : 0;

    const discountFromOffersText =
      discountFromOffers > 0
        ? `خصم العروض: - ${discountFromOffers.toFixed(2)} ج.م`
        : "";

    // Discount from Promocode
    const discountFromPromocode = orderDetails.promocode
      ? (orderDetails.preTotalBeforeDiscount * orderDetails.promocode.value) /
        100
      : 0;

    const discountFromPromocodeText = orderDetails.promocode
      ? `كود الخصم (${orderDetails.promocode.value}% - ${
          orderDetails.promocode.code
        }): - ${discountFromPromocode.toFixed(2)} ج.م`
      : "";

    const totalAmount =
      orderDetails.preTotalBeforeDiscount -
      orderDetails.discount +
      (isSpecialShippingCost ? 50 : 0);

    const text = `
      رقم الطلب:
      ${orderId}

      تفاصيل العميل:
      ${clientInfoText}

      تفاصيل المنتجات:
      ${orderItemsText}

      سعر الطلب: ${orderDetails.preTotalBeforeDiscount.toFixed(2)} ج.م
      ${discountFromOffersText}
      ${discountFromPromocodeText}
      رسوم الشحن: ${shippingCostText}

      ----------------------------
      الإجمالي: ${totalAmount.toFixed(2)} ج.م
    `;

    await navigator.clipboard.writeText(text);
    showToast(AlertMessages.OrderDetailsCopied, "ar");
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("orderDetails");
    }
    router.push("/");
  };

  if (!orderDetails) {
    return null;
  }

  // Determine shipping cost based on total
  const isSpecialShippingCost =
    orderDetails.preTotalBeforeDiscount === 250 ||
    orderDetails.preTotalBeforeDiscount === 350 ||
    orderDetails.preTotalBeforeDiscount === 450;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-3xl w-full border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          تم إرسال الطلب
          <span className="text-green-600">بنجاح!</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </h1>

        <div className="bg-blue-50 p-5 rounded-lg shadow-inner mb-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2 border-blue-300">
            تفاصيل الطلب
          </h2>
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            رقم الطلب: <span className="text-blue-600">{orderDetails.orderId}</span>
          </h4>

          <div className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2 border-gray-200">معلومات العميل</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">الاسم:</span>{" "}
                {orderDetails.clientInfo.name}
              </p>
              <p>
                <span className="font-semibold text-gray-900">البريد الإلكتروني:</span>{" "}
                {orderDetails.clientInfo.email}
              </p>
              <p>
                <span className="font-semibold text-gray-900">رقم الهاتف:</span>{" "}
                {orderDetails.clientInfo.phone}
              </p>
              <p>
                <span className="font-semibold text-gray-900">البلد:</span>{" "}
                {orderDetails.clientInfo.country.nameAr}
              </p>
              <p>
                <span className="font-semibold text-gray-900">المحافظة:</span>{" "}
                {orderDetails.clientInfo.governorate.nameAr}
              </p>
              <p>
                <span className="font-semibold text-gray-900">المدينة:</span>{" "}
                {orderDetails.clientInfo.city.nameAr}
              </p>
              <p>
                <span className="font-semibold text-gray-900">الحي:</span>{" "}
                {orderDetails.clientInfo.district}
              </p>
              <p>
                <span className="font-semibold text-gray-900">العنوان التفصيلي:</span>{" "}
                {orderDetails.clientInfo.detailedAddress}
              </p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2 border-gray-200">تفاصيل المنتجات</h3>
            {orderDetails.cartItems.map((item) => (
              <div key={item.uniqueId} className="mb-3 last:mb-0 p-2 bg-gray-50 rounded-md border border-gray-100">
                <p className="font-semibold text-gray-800">{item.titleAr}</p>
                <p className="text-sm text-gray-600">
                  السعر: <span className="font-medium text-blue-600">{item.selectedSize.price} ج.م</span>
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <p className="font-medium">سعر الطلب</p>
              <p className="font-semibold text-gray-800">{orderDetails.preTotalBeforeDiscount.toFixed(2)} ج.م</p>
            </div>

            {orderDetails.applicableOffers.some(
              (offer) => offer.type === "discount"
            ) && (
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <p className="font-medium">خصم العروض</p>
                <p>
                  <span className="text-green-600 font-bold">-</span>{" "}
                  <span className="font-semibold text-green-700">
                    {(
                      orderDetails.discount -
                      (orderDetails.promocode
                        ? (orderDetails.preTotalBeforeDiscount *
                            orderDetails.promocode.value) /
                          100
                        : 0)
                    ).toFixed(2)}{" "}
                    ج.م
                  </span>
                </p>
              </div>
            )}

            {orderDetails.promocode && (
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <p className="font-medium">
                  كود الخصم (<span className="text-purple-600">{orderDetails.promocode.value}%</span>) -{" "}
                  <span className="text-purple-600">{orderDetails.promocode.code}</span>
                </p>
                <p>
                  <span className="text-green-600 font-bold">-</span>{" "}
                  <span className="font-semibold text-green-700">
                    {(
                      (orderDetails.preTotalBeforeDiscount *
                        orderDetails.promocode.value) /
                      100
                    ).toFixed(2)}{" "}
                    ج.م
                  </span>
                </p>
              </div>
            )}

            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <p className="font-medium">رسوم الشحن</p>
              {isSpecialShippingCost ? (
                <p className="flex items-center gap-2 font-semibold text-red-600">
                  <span className="text-red-600 font-bold">+</span> 50.00 ج.م
                  <s className="text-gray-500 text-sm">100.00 ج.م</s>
                </p>
              ) : (
                <p className="flex items-center gap-2 font-semibold text-green-600">
                  <span className="text-green-600">مجاني</span>
                  <s className="text-gray-500 text-sm">100.00 ج.م</s>
                </p>
              )}
            </div>

            <div className="border-t-2 border-blue-300 pt-4 mt-4">
              <div className="flex justify-between font-extrabold text-xl text-blue-800">
                <p>الإجمالي</p>
                <p>
                  {(
                    orderDetails.preTotalBeforeDiscount -
                    orderDetails.discount +
                    (isSpecialShippingCost ? 50 : 0)
                  ).toFixed(2)}{" "}
                  ج.م
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center my-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <span className="font-bold text-yellow-800">ملاحظة هامة:</span> يتم توضيح توقيت وطريقة استلام الطلب من خلال خدمة العملاء، لا يزيد وقت
          استلام الطلب عن 1-2 يوم عمل من وقت تأكيد الطلب.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={copyOrderDetails}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 text-lg font-semibold shadow-md hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            نسخ تفاصيل الطلب
          </button>
        </div>

        <button
          onClick={handleBack}
          className="w-full mt-4 bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 text-lg font-semibold shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          الرجوع للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}
