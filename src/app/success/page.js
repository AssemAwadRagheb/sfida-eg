// pages/checkout.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { clearCart, getCart, getPromocodes } from "@/utils/storage";
import DefaultPerfumeBottleSelector from "@/components/images/DefaultPerfumeBottleSelector";
import { countries, governorates, cities } from "@/data/geo/geo";
import MainLoader from "@/components/common/loaders/mainLoader";
import { showToast } from "@/components/toast/toast";
import { AlertMessages } from "@/utils/alertMessages";
import { triggerCartUpdate } from "@/utils/events";
import { BasicOffers } from "@/data/offers/basicOffers";
import {
  getPromocode,
  markPromocodeAsUsed,
  savePromocodeData,
} from "@/utils/storage";
import { Promocodes } from "@/data/promocodes/promocedes";

const CheckoutSchema = Yup.object().shape({
  name: Yup.string().required("الاسم مطلوب"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
  phone: Yup.string()
    .matches(/^01[0-9]{9}$/, "رقم الهاتف غير صحيح")
    .required("رقم الهاتف مطلوب"),
  country: Yup.string().required("البلد مطلوب"),
  governorate: Yup.string().required("المحافظة مطلوبة"),
  city: Yup.string().required("المدينة مطلوبة"),
  district: Yup.string().required("الحي مطلوب"),
  detailedAddress: Yup.string().required("العنوان التفصيلي مطلوب"),
});

// Generate a unique orderId starting with "ORDER-"
const generateOrderId = () =>
  `MS-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

export default function Checkout() {
  const router = useRouter();
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkoutMainLoading, setCheckoutMainLoading] = useState(true);
  const [applicableOffers, setApplicableOffers] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [luckyDrawMessage, setLuckyDrawMessage] = useState("");
  const [promocode, setPromocode] = useState(null); // State for applied promocode
  const [isPromocodeOpen, setIsPromocodeOpen] = useState(false); // State for promocode section
  const [promocodeInput, setPromocodeInput] = useState(""); // State for promocode input
  const [providerInput, setProviderInput] = useState(""); // State for provider input
  const [promocodeError, setPromocodeError] = useState(""); // State for promocode error

  const [previousPromocode, setPreviousPromocode] = useState(null);
  const [previousProvider, setPreviousProvider] = useState("");

  // Fetch applied promocode from localStorage
  useEffect(() => {
    const savedPromocodes = getPromocodes();

    // Find the first unused promocode that hasn't reached its usage limit
    const unusedPromocode = savedPromocodes.find(
      (pc) =>
        !pc.isUsed &&
        pc.realUsedTimes < pc.usageLimit &&
        total >= pc.minOrderAmount
    );

    if (unusedPromocode) {
      // Ensure the promocode has all necessary details
      const promocodeDetails = Promocodes.find(
        (pc) => pc.code === unusedPromocode.code
      );

      if (promocodeDetails) {
        setPromocode({
          ...unusedPromocode,
          value: promocodeDetails.value,
          maxDiscountPercentage: promocodeDetails.maxDiscountPercentage,
          minOrderAmount: promocodeDetails.minOrderAmount,
        });
        setPromocodeInput(unusedPromocode.code);
        setProviderInput(unusedPromocode.provider);
        setIsPromocodeOpen(true);
      }
    }
  }, [total]);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      governorate: "",
      city: "",
      district: "",
      detailedAddress: "",
    },
    validationSchema: CheckoutSchema,
    onSubmit: async (values) => {
      const orderId = generateOrderId();

      const selectedCountry = countries.find((c) => +c.id === +values.country);
      const selectedGovernorate = governorates.find(
        (g) => +g.id === +values.governorate
      );
      const selectedCity = cities.find((c) => +c.id === +values.city);

      const orderDetails = {
        orderId,
        clientInfo: {
          ...values,
          country: selectedCountry,
          governorate: selectedGovernorate,
          city: selectedCity,
        },
        cartItems,
        preTotalBeforeDiscount: total,
        total: finalTotal,
        discount: discount || 0, // Ensure discount is a valid number
        shippingCost: shippingCost || 0, // Ensure shippingCost is a valid number
        pointsEarned,
        applicableOffers,
        luckyDraw: luckyDrawMessage,
        promocode: promocode
          ? {
              code: promocode.code,
              value: parseFloat(promocode.value) || 0, // Ensure value is a valid number
              maxDiscountPercentage:
                parseFloat(promocode.maxDiscountPercentage) || 0, // Ensure maxDiscountPercentage is a valid number
              minOrderAmount: parseFloat(promocode.minOrderAmount) || 0, // Ensure minOrderAmount is a valid number
              provider: providerInput || "--",
            }
          : null,
        createdAt: new Date().toISOString(),
      };

      try {
        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientEmail: values.email,
            orderDetails,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          console.error("Error Response:", responseData);
          showToast(
            responseData.error || "حدث خطأ أثناء إرسال البريد الإلكتروني",
            "ar"
          );
        } else {
          // Store order details in localStorage
          localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

          // Mark promocode as used
          if (promocode) {
            markPromocodeAsUsed(promocode.code, values.email);
          }

          // Show success message
          showToast(AlertMessages.OrderSubmittedSuccessfully, "ar");

          // Clear the cart and trigger updates
          clearCart();
          triggerCartUpdate();

          // Redirect to success page
          router.push("/success");
        }
      } catch (error) {
        console.error("Network Error:", error);
        showToast("حدث خطأ أثناء إرسال البريد الإلكتروني", "ar");
      }
    },
  });

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const cart = getCart();
    setCartItems(cart);

    // Calculate total price
    const calculatedTotal = cart.reduce(
      (sum, item) => sum + item.selectedSize.price,
      0
    );
    setTotal(calculatedTotal);

    // Prevent access if cart is empty
    if (cart.length === 0) {
      router.push("/");
    } else {
      setCheckoutMainLoading(false);
    }
  }, [router]);

  // Fetch applied promocode from localStorage
  useEffect(() => {
    const savedPromocode = getPromocode();
    if (savedPromocode) {
      setPromocode(savedPromocode);
      setIsPromocodeOpen(true); // Open promocode section if promocode exists
    }
  }, []);

  // Calculate applicable offers and apply them
  useEffect(() => {
    const applicable = BasicOffers.filter((offer) => offer.condition(total));
    setApplicableOffers(applicable);

    let currentShippingCost = 0;
    if (total === 250 || total === 350 || total === 450) {
      currentShippingCost = 50;
    } else {
      currentShippingCost = 0; // Free shipping for other totals
    }

    // Apply discounts, free shipping, and lucky draw
    let totalDiscount = 0;

    applicable.forEach((offer) => {
      if (offer.type === "discount") {
        totalDiscount += offer.action(total);
      } else if (offer.type === "freeShipping") {
        // This offer type will now only apply if the total is NOT 250, 350, or 450
        if (!(total === 250 || total === 350 || total === 450)) {
          currentShippingCost = offer.action(currentShippingCost);
        }
      } else if (offer.type === "rewardPoints") {
        const points = offer.action(total);
        setPointsEarned(points);
        localStorage.setItem("rewardPoints", points);
      } else if (offer.type === "luckyDraw") {
        const message = offer.action(total);
        setLuckyDrawMessage(message);
      }
    });

    // Apply promocode discount (if applicable)
    if (promocode && total >= promocode.minOrderAmount) {
      const maxDiscount = (total * promocode.maxDiscountPercentage) / 100;
      const remainingDiscount = maxDiscount - totalDiscount;

      if (remainingDiscount > 0) {
        const promocodeDiscount = Math.min(
          (total * promocode.value) / 100,
          remainingDiscount
        );
        totalDiscount += promocodeDiscount;
      }
    }

    setDiscount(totalDiscount);
    setShippingCost(currentShippingCost);
  }, [total, formik.values.city, promocode]); // Add promocode to dependency array

  // Calculate final total
  const finalTotal = total - discount + shippingCost;

  const handleBack = async () => {
    router.push("/cart");
  };

  // Handle promocode submission
  const handlePromocodeSubmit = () => {
    // If the user is trying to apply a new promocode, clear the previous information
    setPreviousPromocode(null);
    setPreviousProvider("");

    const enteredPromocode = Promocodes.find(
      (pc) => pc.code === promocodeInput
    );

    if (!enteredPromocode) {
      setPromocodeError("كود الخصم غير صحيح");
      return;
    }

    if (!enteredPromocode.isActive) {
      setPromocodeError("كود الخصم غير نشط");
      return;
    }

    const now = new Date();
    const startDate = new Date(enteredPromocode.startDate);
    const endDate = new Date(enteredPromocode.endDate);

    if (now < startDate || now > endDate) {
      setPromocodeError("كود الخصم منتهي الصلاحية");
      return;
    }

    // Check if the promocode has exceeded its usage limit
    const savedPromocode = getPromocode(enteredPromocode.code);
    if (
      savedPromocode &&
      savedPromocode.realUsedTimes >= enteredPromocode.usageLimit
    ) {
      setPromocodeError("كود الخصم قد استخدم بالكامل");
      return;
    }

    // Check if the order total meets the minimum order amount
    if (total < enteredPromocode.minOrderAmount) {
      setPromocodeError(
        `الحد الأدنى للطلب لتطبيق هذا الكود هو ${enteredPromocode.minOrderAmount} ج.م`
      );
      return;
    }

    // If all checks pass, apply the promocode
    setPromocode(enteredPromocode);
    setPromocodeError("");
    savePromocodeData(enteredPromocode.code, providerInput);
    setIsPromocodeOpen(true);
  };

  // Disable fields based on selections
  const isGovernorateDisabled = !formik.values.country;
  const isCityDisabled = !formik.values.governorate;
  const isDistrictDisabled = !formik.values.city;

  useEffect(() => {
    const applicable = BasicOffers.filter((offer) => offer.condition(total));
    setApplicableOffers(applicable);

    let currentShippingCost = 0;
    if (total === 250 || total === 350 || total === 450) {
      currentShippingCost = 50;
    } else {
      currentShippingCost = 0; // Free shipping for other totals
    }

    // Apply discounts, free shipping, and lucky draw
    let totalDiscount = 0;

    applicable.forEach((offer) => {
      if (offer.type === "discount") {
        totalDiscount += parseFloat(offer.action(total)) || 0;
      } else if (offer.type === "freeShipping") {
        // This offer type will now only apply if the total is NOT 250, 350, or 450
        if (!(total === 250 || total === 350 || total === 450)) {
          currentShippingCost = parseFloat(offer.action(currentShippingCost)) || 0;
        }
      } else if (offer.type === "rewardPoints") {
        const points = parseFloat(offer.action(total)) || 0;
        setPointsEarned(points);
        localStorage.setItem("rewardPoints", points);
      } else if (offer.type === "luckyDraw") {
        const message = offer.action(total);
        setLuckyDrawMessage(message);
      }
    });

    // Apply promocode discount (if applicable)
    if (promocode && total >= promocode.minOrderAmount) {
      const maxDiscount =
        (total * (parseFloat(promocode.maxDiscountPercentage) || 0)) / 100;
      const remainingDiscount = maxDiscount - totalDiscount;

      if (remainingDiscount > 0) {
        const promocodeDiscount = Math.min(
          (total * (parseFloat(promocode.value) || 0)) / 100,
          remainingDiscount
        );
        totalDiscount += promocodeDiscount;
      }
    }

    setDiscount(totalDiscount);
    setShippingCost(currentShippingCost);
  }, [total, formik.values.city, promocode]);

  const handleResetPromocode = () => {
    // Store the current promocode and provider information
    setPreviousPromocode(promocode);
    setPreviousProvider(providerInput);

    // Reset the current promocode and provider information
    setPromocode(null);
    setPromocodeInput("");
    setProviderInput("");
    setPromocodeError("");
  };

  useEffect(() => {
    if (isPromocodeOpen && !promocode && previousPromocode) {
      setPromocodeInput(previousPromocode.code);
      setProviderInput(previousProvider);
    }
  }, [isPromocodeOpen, promocode, previousPromocode, previousProvider]);

  return checkoutMainLoading ? (
    <MainLoader />
  ) : (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">إتمام الطلب</h1>

      {/* Order Details Accordion */}
      <div className="mb-6">
        <button
          onClick={() => setIsOrderDetailsOpen(!isOrderDetailsOpen)}
          className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg"
        >
          <span className="font-semibold">تفاصيل الطلب</span>
          <span>{isOrderDetailsOpen ? "▲" : "▼"}</span>
        </button>
        {isOrderDetailsOpen && (
          <div className="mt-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.uniqueId}
                className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <DefaultPerfumeBottleSelector
                    className="h-auto max-w-full rounded-lg"
                    imageDefaultSelector={item?.defaultImage}
                    alt={item?.titleEn}
                    width={80}
                    height={80}
                  />
                  <div>
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                      {item.titleAr}
                    </h2>
                    {/* <p className="text-sm sm:text-base text-gray-700">
                      الحجم: {item.selectedBottle.weightValue}{" "}
                      {item.selectedBottle.weightUnitAr}{" "}
                    </p> */}
                    <p className="text-sm sm:text-base text-gray-700">
                      السعر: {item.selectedSize.price} ج.م
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center border-t pt-4">
              <p className="font-semibold">الإجمالي</p>
              <p className="font-semibold">{total.toFixed(2)} ج.م</p>
            </div>
          </div>
        )}
      </div>

      {/* Promocode Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsPromocodeOpen(!isPromocodeOpen)}
          className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg"
        >
          <span className="font-semibold">كود الخصم</span>
          <span>{isPromocodeOpen ? "▲" : "▼"}</span>
        </button>
        {isPromocodeOpen && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            {promocode ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">كود الخصم:</span>{" "}
                  {promocode.code}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">نسبة الخصم:</span>{" "}
                  {promocode.value}%
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">المقدم:</span>{" "}
                  {providerInput || "--"}
                </p>
                <button
                  onClick={handleResetPromocode}
                  className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  إعادة تعيين الكود
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="promocode"
                    className="block text-sm font-medium text-gray-700 mb-[.5rem]"
                  >
                    كود الخصم
                  </label>
                  <input
                    id="promocode"
                    type="text"
                    value={promocodeInput}
                    onChange={(e) => setPromocodeInput(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="أدخل كود الخصم"
                  />
                </div>
                <div>
                  <label
                    htmlFor="provider"
                    className="block text-sm font-medium text-gray-700 mb-[.5rem]"
                  >
                    المقدم (اختياري)
                  </label>
                  <input
                    id="provider"
                    type="text"
                    value={providerInput}
                    onChange={(e) => setProviderInput(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="أدخل اسم المقدم"
                  />
                </div>
                {promocodeError && (
                  <p className="text-red-500 text-sm">{promocodeError}</p>
                )}
                <button
                  onClick={handlePromocodeSubmit}
                  className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  تطبيق الكود
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Checkout Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-[.5rem]"
          >
            الاسم
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full p-2 border rounded-lg"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-[.5rem]"
          >
            البريد الإلكتروني
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full p-2 border rounded-lg"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-[.5rem]"
          >
            رقم الهاتف (واتس آب)
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="w-full p-2 border rounded-lg"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          )}
        </div>
        {/* Country */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-[.5rem]"
          >
            البلد
          </label>
          <select
            id="country"
            name="country"
            onChange={formik.handleChange}
            value={formik.values.country}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">اختر البلد</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.nameAr}
              </option>
            ))}
          </select>
          {formik.errors.country && formik.touched.country && (
            <div className="text-red-500 text-sm">{formik.errors.country}</div>
          )}
        </div>
        {/* Governorate */}
        <div>
          <label
            htmlFor="governorate"
            className="block text-sm font-medium text-gray-700 mb-[.5rem]"
          >
            المحافظة
          </label>
          <select
            id="governorate"
            name="governorate"
            onChange={formik.handleChange}
            value={formik.values.governorate}
            className="w-full p-2 border rounded-lg"
            disabled={isGovernorateDisabled}
          >
            <option value="">اختر المحافظة</option>
            {governorates.map((governorate) => (
              <option
                key={governorate.id}
                value={governorate.id}
                disabled={governorate.disabled}
              >
                {governorate.nameAr}
              </option>
            ))}
          </select>
          {formik.errors.governorate && formik.touched.governorate && (
            <div className="text-red-500 text-sm">
              {formik.errors.governorate}
            </div>
          )}
        </div>
        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-[.5rem]"
          >
            المدينة
          </label>
          <select
            id="city"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            className="w-full p-2 border rounded-lg"
            disabled={isCityDisabled}
          >
            <option value="">اختر المركز (المدينة/القرية)</option>
            {cities
              .filter(
                (city) =>
                  city.governorateId === +formik.values.governorate &&
                  !city.disabled
              )
              .map((city) => (
                <option key={city.id} value={city.id} disabled={city.disabled}>
                  {city.nameAr}
                </option>
              ))}
          </select>
          {formik.errors.city && formik.touched.city && (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          )}
        </div>
        {/* District */}
        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700 mb-[.5rem]"
          >
            الحي
          </label>
          <input
            id="district"
            name="district"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.district}
            className="w-full p-2 border rounded-lg"
            disabled={isDistrictDisabled}
          />
          {formik.errors.district && formik.touched.district && (
            <div className="text-red-500 text-sm">{formik.errors.district}</div>
          )}
        </div>
        {/* Detailed Address */}
        <div>
          <label
            htmlFor="detailedAddress"
            className="block text-sm font-medium text-gray-700 mb-[.5rem]"
          >
            العنوان التفصيلي
          </label>
          <textarea
            id="detailedAddress"
            name="detailedAddress"
            onChange={formik.handleChange}
            value={formik.values.detailedAddress}
            className="w-full p-2 border rounded-lg"
          />
          {formik.errors.detailedAddress && formik.touched.detailedAddress && (
            <div className="text-red-500 text-sm">
              {formik.errors.detailedAddress}
            </div>
          )}
        </div>
        {/* Display applicable offers */}
        {applicableOffers.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">العروض المطبقة 🎉</h2>
            {applicableOffers.map((offer) => (
              <div key={offer.id} className="text-sm text-gray-700">
                - {offer.titleArShort}
              </div>
            ))}
          </div>
        )}
        {/* Display calculations in a readable format */}

        {/* تفاصيل الحساب Section */}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">تفاصيل الحساب 🔢</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>سعر الأوردر</p>
              <p>{total.toFixed(2)} ج.م</p>
            </div>

            {/* Display discount from offers only if it exists */}
            {discount > 0 &&
              applicableOffers.some((offer) => offer.type === "discount") && (
                <div className="flex justify-between">
                  <p>خصم العروض</p>
                  <p>
                    <span className="text-green-500 font-bold">-</span>{" "}
                    {(
                      discount -
                      (promocode
                        ? (total * (parseFloat(promocode.value) || 0)) / 100
                        : 0)
                    ).toFixed(2)}{" "}
                    ج.م
                  </p>
                </div>
              )}

            {/* Display promocode discount only if it exists */}
            {promocode && discount > 0 && (
              <div className="flex justify-between">
                <p>كود الخصم ({promocode.value}%)</p>
                <p>
                  <span className="text-green-500 font-bold">-</span>{" "}
                  {((total * (parseFloat(promocode.value) || 0)) / 100).toFixed(
                    2
                  )}{" "}
                  ج.م
                </p>
              </div>
            )}

            {/* Shipping cost */}
            <div className="flex justify-between">
              <p>رسوم الشحن</p>
              {shippingCost === 50 ? (
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

            {/* Final total */}
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <p>السعر النهائي</p>
                <p>{finalTotal.toFixed(2)} ج.م</p>
              </div>
            </div>
          </div>

          {/* Display promocode message only if the discount was adjusted due to maxDiscountPercentage */}
          {promocode &&
            discount > 0 &&
            discount + (promocode ? (total * promocode.value) / 100 : 0) >
              (total * promocode.maxDiscountPercentage) / 100 && (
              <p className="text-[.7rem] text-gray-600 mt-2">
                ملاحظة: يتم تعديل الخصم الإجمالي ليتناسب مع الحد الأقصى للخصم (
                {promocode.maxDiscountPercentage}%) المحدد لكود الخصم.
              </p>
            )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={formik.isSubmitting}
            className="w-full sm:w-1/2 bg-white text-blue-500 border-2 border-blue-500 p-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            الرجوع
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full sm:w-1/2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {formik.isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
          </button>
        </div>
      </form>
    </div>
  );
}
