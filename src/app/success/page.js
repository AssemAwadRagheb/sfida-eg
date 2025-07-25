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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        تم إرسال الطلب <span className="text-[green]">بنجاح!</span>
      </h1>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4">تفاصيل الطلب</h2>
        <h4 className="text-lg font-semibold mb-4">
          رقم الطلب: {orderDetails.orderId}
        </h4>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">معلومات العميل</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">الاسم:</span>{" "}
              {orderDetails.clientInfo.name}
            </p>
            <p>
              <span className="font-medium">البريد الإلكتروني:</span>{" "}
              {orderDetails.clientInfo.email}
            </p>
            <p>
              <span className="font-medium">رقم الهاتف:</span>{" "}
              {orderDetails.clientInfo.phone}
            </p>
            <p>
              <span className="font-medium">البلد:</span>{" "}
              {orderDetails.clientInfo.country.nameAr}
            </p>
            <p>
              <span className="font-medium">المحافظة:</span>{" "}
              {orderDetails.clientInfo.governorate.nameAr}
            </p>
            <p>
              <span className="font-medium">المدينة:</span>{" "}
              {orderDetails.clientInfo.city.nameAr}
            </p>
            <p>
              <span className="font-medium">الحي:</span>{" "}
              {orderDetails.clientInfo.district}
            </p>
            <p>
              <span className="font-medium">العنوان التفصيلي:</span>{" "}
              {orderDetails.clientInfo.detailedAddress}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">تفاصيل المنتجات</h3>
          {orderDetails.cartItems.map((item) => (
            <div key={item.uniqueId} className="mb-4">
              <p className="font-semibold">{item.titleAr}</p>
              <p className="text-sm text-gray-700">
                السعر: {item.selectedSize.price} ج.م
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <p>سعر الطلب</p>
            <p>{orderDetails.preTotalBeforeDiscount.toFixed(2)} ج.م</p>
          </div>

          {orderDetails.applicableOffers.some(
            (offer) => offer.type === "discount"
          ) && (
            <div className="flex justify-between">
              <p>خصم العروض</p>
              <p>
                <span className="text-green-500 font-bold">-</span>{" "}
                {(
                  orderDetails.discount -
                  (orderDetails.promocode
                    ? (orderDetails.preTotalBeforeDiscount *
                        orderDetails.promocode.value) /
                      100
                    : 0)
                ).toFixed(2)}{" "}
                ج.م
              </p>
            </div>
          )}

          {orderDetails.promocode && (
            <div className="flex justify-between">
              <p>
                كود الخصم ({orderDetails.promocode.value}%) -{" "}
                {orderDetails.promocode.code}
              </p>
              <p>
                <span className="text-green-500 font-bold">-</span>{" "}
                {(
                  (orderDetails.preTotalBeforeDiscount *
                    orderDetails.promocode.value) /
                  100
                ).toFixed(2)}{" "}
                ج.م
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <p>رسوم الشحن</p>
            {isSpecialShippingCost ? (
              <p className="flex items-center gap-2">
                <span className="text-red-500 font-bold">+</span> 50.00 ج.م
                <s>100.00 ج.م</s>
              </p>
            ) : (
              <p className="flex items-center gap-2">
                <span className="text-green-500">مجاني</span>
                <s>100.00 ج.م</s>
              </p>
            )}
          </div>

          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
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

      <p className="text-sm text-gray-700 my-[1rem] border-b pb-6">
        يتم توضيح توقيت وطريقة استلام الطلب من خلال خدمة العملاء، لا يزيد وقت
        استلام الطلب عن 1-2 يوم عمل من وقت تأكيد الطلب.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={copyOrderDetails}
          className="w-full bg-white text-blue-500 border-2 border-blue-500 p-3 rounded-lg hover:bg-blue-50 transition-colors"
        >
          نسخ تفاصيل الطلب
        </button>
      </div>

      <button
        onClick={handleBack}
        className="w-full mt-6 bg-white text-blue-500 border-2 border-blue-500 p-3 rounded-lg hover:bg-blue-50 transition-colors"
      >
        الرجوع للصفحة الرئيسية
      </button>
    </div>
  );
}
