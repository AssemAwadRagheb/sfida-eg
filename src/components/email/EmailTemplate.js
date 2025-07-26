import { cities } from "@/data/geo/geo";
import React from "react";

const EmailTemplate = ({ orderDetails, isAdmin = false }) => {
  // Determine shipping cost based on total
  const isSpecialShippingCost =
    orderDetails.preTotalBeforeDiscount === 250 ||
    orderDetails.preTotalBeforeDiscount === 350 ||
    orderDetails.preTotalBeforeDiscount === 450;

  // Calculate final total for display in email
  const finalTotalForEmail =
    orderDetails.preTotalBeforeDiscount -
    orderDetails.discount +
    (isSpecialShippingCost ? 50 : 0);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "30px",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        maxWidth: "600px",
        margin: "20px auto",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
        direction: "rtl",
        textAlign: "right",
      }}
    >
      <h1
        style={{
          color: "#2D3748",
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "30px",
          textAlign: "center",
          borderBottom: "2px solid #4299E1",
          paddingBottom: "10px",
        }}
      >
        {isAdmin ? "طلب جديد - تفاصيل الطلب" : "تم استلام الطلب، شكرًا لشرائك من سفيدا ❤️"}
      </h1>

      {/* Order ID and Date */}
      <div
        style={{
          marginBottom: "25px",
          backgroundColor: "#F7FAFC",
          padding: "15px 20px",
          borderRadius: "8px",
          borderLeft: "5px solid #4299E1",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px", color: "#2D3748" }}>
          رقم الطلب:{" "}
          <span style={{ fontWeight: "700", color: "#4299E1" }}>{orderDetails.orderId}</span>
        </p>
        <p style={{ fontSize: "16px", color: "#4A5568" }}>
          تاريخ الطلب:{" "}
          <span style={{ fontWeight: "500" }}>
            {new Date(orderDetails.createdAt).toLocaleDateString("ar-EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
      </div>

      {/* Client Info */}
      <div
        style={{
          marginBottom: "25px",
          padding: "20px",
          backgroundColor: "#F7FAFC",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2
          style={{
            color: "#2D3748",
            fontSize: "22px",
            fontWeight: "700",
            marginBottom: "18px",
            borderBottom: "1px dashed #CBD5E0",
            paddingBottom: "10px",
          }}
        >
          معلومات العميل
        </h2>
        <div style={{ display: "grid", gap: "10px" }}>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600", color: "#2D3748" }}>الاسم:</span>{" "}
            {orderDetails.clientInfo.name}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600", color: "#2D3748" }}>البريد الإلكتروني:</span>{" "}
            {orderDetails.clientInfo.email}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600", color: "#2D3748" }}>رقم الهاتف:</span>{" "}
            {orderDetails.clientInfo.phone}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600", color: "#2D3748" }}>البلد:</span>{" "}
            {orderDetails.clientInfo.country.nameAr}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600", color: "#2D3748" }}>المحافظة:</span>{" "}
            {orderDetails.clientInfo.governorate.nameAr}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600", color: "#2D3748" }}>المدينة:</span>{" "}
            {orderDetails.clientInfo.city.nameAr}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600", color: "#2D3748" }}>الحي:</span>{" "}
            {orderDetails.clientInfo.district}
          </p>
          <p style={{ fontSize: "16px", color: "#4A5568" }}>
            <span style={{ fontWeight: "600", color: "#2D3748" }}>العنوان التفصيلي:</span>{" "}
            {orderDetails.clientInfo.detailedAddress}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div
        style={{
          marginBottom: "25px",
          padding: "20px",
          backgroundColor: "#F7FAFC",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2
          style={{
            color: "#2D3748",
            fontSize: "22px",
            fontWeight: "700",
            marginBottom: "18px",
            borderBottom: "1px dashed #CBD5E0",
            paddingBottom: "10px",
          }}
        >
          تفاصيل المنتجات
        </h2>
        <div style={{ display: "grid", gap: "15px" }}>
          {orderDetails.cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #E2E8F0",
                paddingBottom: "15px",
                paddingTop: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    marginBottom: "5px",
                    color: "#2D3748",
                  }}
                >
                  {item.titleAr}
                </p>
              </div>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#4299E1" }}>
                {item.selectedSize.price} ج.م
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total Section */}
      <div
        style={{
          borderTop: "2px solid #4299E1",
          paddingTop: "20px",
          marginBottom: "25px",
          backgroundColor: "#EBF8FF",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
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
              <td style={{ padding: "8px 0" }}>
                <p style={{ fontSize: "17px", fontWeight: "600", margin: 0, color: "#2D3748" }}>
                  سعر الطلب
                </p>
              </td>
              <td style={{ padding: "8px 0", textAlign: "left" }}>
                <p style={{ fontSize: "17px", margin: 0, color: "#2D3748" }}>
                  {orderDetails.preTotalBeforeDiscount.toFixed(2)} ج.م
                </p>
              </td>
            </tr>

            {/* Discount from Offers */}
            {orderDetails.applicableOffers.some(
              (offer) => offer.type === "discount"
            ) && (
              <tr>
                <td style={{ padding: "8px 0" }}>
                  <p style={{ fontSize: "17px", fontWeight: "600", margin: 0, color: "#2D3748" }}>
                    خصم العروض
                  </p>
                </td>
                <td style={{ padding: "8px 0", textAlign: "left" }}>
                  <p style={{ fontSize: "17px", margin: 0, color: "#E53E3E" }}>
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
                <td style={{ padding: "8px 0" }}>
                  <p style={{ fontSize: "17px", fontWeight: "600", margin: 0, color: "#2D3748" }}>
                    كود الخصم ({orderDetails.promocode.value}%)
                  </p>
                </td>
                <td style={{ padding: "8px 0", textAlign: "left" }}>
                  <p style={{ fontSize: "17px", margin: 0, color: "#E53E3E" }}>
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
              <td style={{ padding: "8px 0" }}>
                <p style={{ fontSize: "17px", fontWeight: "600", margin: 0, color: "#2D3748" }}>
                  رسوم الشحن
                </p>
              </td>
              <td style={{ padding: "8px 0", textAlign: "left" }}>
                <p style={{ fontSize: "17px", margin: 0 }}>
                  {isSpecialShippingCost ? (
                    <>
                      <span style={{ color: "#E53E3E", fontWeight: "bold" }}>50.00 ج.م</span>{" "}
                      <span style={{ textDecoration: "line-through", color: "#A0AEC0" }}>100.00 ج.م</span>
                    </>
                  ) : (
                    <>
                      <span style={{ color: "#38A169", fontWeight: "bold" }}>مجاني</span>{" "}
                      <span style={{ textDecoration: "line-through", color: "#A0AEC0" }}>100.00 ج.م</span>
                    </>
                  )}
                </p>
              </td>
            </tr>

            {/* Final Total */}
            <tr>
              <td
                style={{
                  padding: "12px 0",
                  borderTop: "2px solid #A0AEC0",
                }}
              >
                <p style={{ fontSize: "20px", fontWeight: "700", margin: 0, color: "#2D3748" }}>
                  الإجمالي النهائي
                </p>
              </td>
              <td
                style={{
                  padding: "12px 0",
                  borderTop: "2px solid #A0AEC0",
                  textAlign: "left",
                }}
              >
                <p style={{ fontSize: "20px", fontWeight: "700", margin: 0, color: "#4299E1" }}>
                  {finalTotalForEmail.toFixed(2)} ج.م
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Admin Specific Sections */}
      {isAdmin && (
        <>
          {/* Excel File Download */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#F0FDF4",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              border: "1px solid #86EFAC",
            }}
          >
            <h2
              style={{
                color: "#2D3748",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "18px",
                borderBottom: "1px dashed #86EFAC",
                paddingBottom: "10px",
              }}
            >
              ملف Excel لجميع الطلبات
            </h2>
            <p style={{ fontSize: "16px", color: "#4A5568", marginBottom: "15px" }}>
              تم تحديث ملف Excel ببيانات هذا الطلب. يمكنك تنزيل الملف المرفق بهذا البريد.
            </p>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "10px" }}>
              يحتوي الملف المرفق على جميع الطلبات السابقة والحالية، مع تفاصيل كل طلب.
            </p>
          </div>

          {/* WhatsApp Link */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#FEFCE8",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              border: "1px solid #FBD38D",
            }}
          >
            <h2
              style={{
                color: "#2D3748",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "18px",
                borderBottom: "1px dashed #FBD38D",
                paddingBottom: "10px",
              }}
            >
              رابط الواتسآب للتواصل مع العميل
            </h2>
            <a
              href={`https://wa.me/${
                orderDetails.clientInfo.phone.startsWith("+20")
                  ? orderDetails.clientInfo.phone
                  : "+20" + orderDetails.clientInfo.phone
              }`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                padding: "12px 25px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
                boxShadow: "0 4px 10px rgba(37, 211, 102, 0.3)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1DA851")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
            >
              تواصل مع العميل مباشرة عبر الواتساب
            </a>
          </div>
        </>
      )}

      {/* Footer */}
      {!isAdmin && (
        <footer
          style={{
            marginTop: "20px",
            fontSize: "16px",
            color: "#718096",
            textAlign: "center",
            paddingTop: "15px",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <p style={{ margin: "0", fontWeight: "600", color: "#2D3748" }}>
            شكراً لثقتكم بنا! سوف يتم التواصل معكم في أسرع وقت ممكن.
          </p>
          <p style={{ margin: "10px 0 0", fontSize: "14px", color: "#A0AEC0" }}>
            فريق سفيدا
          </p>
        </footer>
      )}
    </div>
  );
};

export default EmailTemplate;
