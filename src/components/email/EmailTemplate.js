import { cities } from "@/data/geo/geo";
import React from "react";

const EmailTemplate = ({ orderDetails, isAdmin = false }) => {
  const imageUrl = "https://ibb.co/mr8KKcnX";

  // Get the default delivery cost for the selected city
  const selectedCity = cities.find(
    (c) => +c.id === +orderDetails.clientInfo.city.id
  );

  // Determine shipping cost based on total
  const isSpecialShippingCost =
    orderDetails.preTotalBeforeDiscount === 250 ||
    orderDetails.preTotalBeforeDiscount === 350 ||
    orderDetails.preTotalBeforeDiscount === 450;

  // Calculate shipping cost display
  const shippingCostDisplay = isSpecialShippingCost ? (
    <>
      <span>50.00 ج.م</span>{" "}
      <span style={{ textDecoration: "line-through" }}>100.00 ج.م</span>
    </>
  ) : (
    <>
      <span style={{ color: "green" }}>مجاني</span>{" "}
      <span style={{ textDecoration: "line-through" }}>100.00 ج.م</span>
    </>
  );

  // Calculate final total for display in email
  const finalTotalForEmail =
    orderDetails.preTotalBeforeDiscount -
    orderDetails.discount +
    (isSpecialShippingCost ? 50 : 0);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#f9fafb",
      }}
      dir="rtl"
    >
      <h1
        style={{
          color: "#4A5568",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "24px",
        }}
      >
        تفاصيل الطلب
      </h1>
      {/* Image for the order */}
      <img
        src="https://ibb.co/mr8KKcnX"
        alt="Sfida Logo"
        style={{
          width: "10rem",
          height: "10rem",
          marginBottom: "1rem",
          borderRadius: "50%",
        }}
      />
      {/* Order ID and Date */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
          رقم الطلب: <br />
          <span style={{ fontWeight: "400" }}>{orderDetails.orderId}</span>
        </p>
        <p style={{ fontSize: "16px", color: "#4A5568" }}>
          تاريخ الطلب:{" "}
          {new Date(orderDetails.createdAt).toLocaleDateString("ar-EG")}
        </p>
      </div>

      {/* Client Info */}
      <div style={{ marginBottom: "24px" }}>
        <h2
          style={{
            color: "#2D3748",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          معلومات العميل
        </h2>
        <div style={{ display: "grid", gap: "8px" }}>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600" }}>الاسم:</span>{" "}
            {orderDetails.clientInfo.name}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600" }}>البريد الإلكتروني:</span>{" "}
            {orderDetails.clientInfo.email}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600" }}>رقم الهاتف:</span>{" "}
            {orderDetails.clientInfo.phone}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600" }}>البلد:</span>{" "}
            {orderDetails.clientInfo.country.nameAr}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600" }}>المحافظة:</span>{" "}
            {orderDetails.clientInfo.governorate.nameAr}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600" }}>المدينة:</span>{" "}
            {orderDetails.clientInfo.city.nameAr}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600" }}>الحي:</span>{" "}
            {orderDetails.clientInfo.district}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600" }}>العنوان التفصيلي:</span>{" "}
            {orderDetails.clientInfo.detailedAddress}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div style={{ marginBottom: "24px" }}>
        <h2
          style={{
            color: "#2D3748",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          تفاصيل المنتجات
        </h2>
        <div style={{ display: "grid", gap: "16px" }}>
          {orderDetails.cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                borderTop: "1px solid #e2e8f0",
                paddingBottom: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                {item.titleAr}
              </p>
              <p style={{ fontSize: "14px", color: "#718096" }}>
                السعر: {item.selectedSize.price} ج.م
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Promocode Details */}
      {orderDetails.promocode && (
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              color: "#2D3748",
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            تفاصيل كود الخصم
          </h2>
          <div style={{ display: "grid", gap: "8px" }}>
            <p style={{ fontSize: "16px", color: "#4A5568" }}>
              <span style={{ fontWeight: "600" }}>الكود:</span>{" "}
              {orderDetails.promocode.code}
            </p>
            <p style={{ fontSize: "16px", color: "#4A5568" }}>
              <span style={{ fontWeight: "600" }}>نسبة الخصم:</span>{" "}
              {orderDetails.promocode.value}%
            </p>
            {isAdmin && (
              <>
                <p style={{ fontSize: "16px", color: "#4A5568" }}>
                  <span style={{ fontWeight: "600" }}>الحد الأقصى للخصم:</span>{" "}
                  {orderDetails.promocode.maxDiscountPercentage}%
                </p>
                <p style={{ fontSize: "16px", color: "#4A5568" }}>
                  <span style={{ fontWeight: "600" }}>الحد الأدنى للطلب:</span>{" "}
                  {orderDetails.promocode.minOrderAmount} ج.م
                </p>
                <p style={{ fontSize: "16px", color: "#4A5568" }}>
                  <span style={{ fontWeight: "600" }}>المقدم:</span>{" "}
                  {orderDetails.promocode.provider}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Total */}
      <div
        style={{
          borderTop: "1px solid #e2e8f0",
          paddingTop: "16px",
          marginBottom: "24px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            {/* Order Total */}
            <tr>
              <td style={{ padding: "4px 0" }}>
                <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
                  سعر الطلب
                </p>
              </td>
              <td style={{ padding: "4px 0", textAlign: "right" }}>
                <p style={{ fontSize: "16px", margin: 0 }}>
                  {orderDetails.preTotalBeforeDiscount.toFixed(2)} ج.م
                </p>
              </td>
            </tr>

            {/* Discount from Offers */}
            {orderDetails.applicableOffers.some(
              (offer) => offer.type === "discount"
            ) && (
              <tr>
                <td style={{ padding: "4px 0" }}>
                  <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
                    خصم العروض
                  </p>
                </td>
                <td style={{ padding: "4px 0", textAlign: "right" }}>
                  <p style={{ fontSize: "16px", margin: 0 }}>
                    -{" "}
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
                </td>
              </tr>
            )}

            {/* Discount from Promocode */}
            {orderDetails.promocode && (
              <tr>
                <td style={{ padding: "4px 0" }}>
                  <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
                    كود الخصم ({orderDetails.promocode.value}%)
                  </p>
                </td>
                <td style={{ padding: "4px 0", textAlign: "right" }}>
                  <p style={{ fontSize: "16px", margin: 0 }}>
                    -{" "}
                    {(
                      (orderDetails.preTotalBeforeDiscount *
                        orderDetails.promocode.value) /
                      100
                    ).toFixed(2)}{" "}
                    ج.م
                  </p>
                </td>
              </tr>
            )}

            {/* Shipping Cost */}
            <tr>
              <td style={{ padding: "4px 0" }}>
                <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
                  رسوم الشحن
                </p>
              </td>
              <td style={{ padding: "4px 0", textAlign: "right" }}>
                <p style={{ fontSize: "16px", margin: 0 }}>
                  {shippingCostDisplay}
                </p>
              </td>
            </tr>

            {/* Final Total */}
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <p style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
                  الإجمالي
                </p>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  borderTop: "1px solid #e2e8f0",
                  textAlign: "right",
                }}
              >
                <p style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
                  {finalTotalForEmail.toFixed(2)} ج.م
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Display Lucky Draw Message */}
      {orderDetails.luckyDraw && (
        <div
          style={{
            backgroundColor: "#f0fdf4",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}
          >
            مبروك! لقد تأهلت للسحب!
          </h2>
          <p style={{ fontSize: "14px", color: "#4A5568" }}>
            {orderDetails.luckyDraw === "Entered Lucky Draw (500+ L.E.)"
              ? "لقد تأهلت لسحب الجوائز الخاصة للطلبات فوق 500 جنيه. تواصل مع خدمة العملاء لمعرفة الجوائز."
              : "لقد تأهلت لسحب الجوائز المميزة للطلبات فوق 800 جنيه. تواصل مع خدمة العملاء لمعرفة الجوائز."}
          </p>
        </div>
      )}

      {/* Admin Notes */}
      {isAdmin && (
        <div style={{ marginTop: "24px" }}>
          <h2
            style={{
              color: "#2D3748",
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            معلومات إضافية للإدارة
          </h2>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            ملاحظات: {orderDetails.notes || "لا توجد ملاحظات"}
          </p>
          <br />
          <h2
            style={{
              color: "#2D3748",
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            رابط الواتسآب
          </h2>
          <a
            href={`https://wa.me/${
              orderDetails.clientInfo.phone.startsWith("+20")
                ? orderDetails.clientInfo.phone
                : "+20" + orderDetails.clientInfo.phone
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 block py-2"
          >
            تواصل مع العميل مباشرة
          </a>
        </div>
      )}

      {/* Total Cost for Admin */}
      {isAdmin && (
        <>
          {orderDetails.cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                borderTop: "1px solid #e2e8f0",
                paddingBottom: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                {item.titleAr}
              </p>
              {isAdmin && (
                <p style={{ fontSize: "14px", color: "#718096" }}>
                  التكلفة: {item.selectedSize.cost} ج.م
                </p>
              )}
            </div>
          ))}
          <span>--------</span>
          <p style={{ fontSize: "14px", color: "#718096" }}>
            التكلفة:{" "}
            {orderDetails.cartItems.reduce(
              (total, item) => total + item.selectedSize.cost,
              0
            )}{" "}
            ج.م
          </p>
        </>
      )}

      {/* Delivery Information */}
      <p
        style={{
          fontSize: "14px",
          color: "#718096",
          marginBottom: "24px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "16px",
        }}
      >
        يتم توضيح توقيت وطريقة استلام الطلب من خلال خدمة العملاء، لا يزيد وقت
        استلام الطلب عن 1-2 يوم عمل من وقت تأكيد الطلب.
      </p>

      {/* Footer */}
      <footer style={{ marginTop: "20px", fontSize: "16px", color: "#718096" }}>
        <p>سوف يتم التواصل معكم في أسرع وقت ممكن!</p>
      </footer>
    </div>
  );
};

export default EmailTemplate;
