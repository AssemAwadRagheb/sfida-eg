"use client";
import { containsBadWords } from "@/data/words/badWords";
import { useState } from "react";

const WhatsAppSubscriptionSection = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEgyptianPhoneNumber = (phone) => {
    const regex = /^01[0125][0-9]{8}$/;
    return regex.test(phone);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      selectedOption === "subscribe" &&
      !validateEgyptianPhoneNumber(phoneNumber)
    ) {
      setError("رقم الهاتف غير صحيح. يرجى إدخال رقم هاتف مصري صالح.");
      return;
    }

    if (selectedOption === "enhancement" && !validateEmail(email)) {
      setError("البريد الإلكتروني غير صحيح.");
      return;
    }

    if (selectedOption === "enhancement" && containsBadWords(message)) {
      localStorage.setItem("badWordFlag", "true");
      setError("تم اكتشاف كلمات غير لائقة. يرجى تعديل الرسالة.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          option: selectedOption,
          phoneNumber,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("تم إرسال البيانات بنجاح!");
      } else {
        setError(result.message || "حدث خطأ أثناء الإرسال.");
      }
    } catch (err) {
      setError("حدث خطأ أثناء الإرسال.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 my-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">تواصل معنا</h2>
        <p className="text-lg text-gray-200 mb-8">
          نحن هنا لمساعدتك! اختر الخيار المناسب واترك لنا رسالتك.
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <select
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setError();
            }}
            className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="" disabled>
              اختر خيارًا
            </option>
            <option value="subscribe">الاشتراك لرؤية العروض الجديدة</option>
            <option value="enhancement">اقتراحات أو ملاحظات</option>
          </select>

          {selectedOption === "subscribe" && (
            <input
              type="text"
              placeholder="رقم الهاتف"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          )}

          {selectedOption === "enhancement" && (
            <>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                placeholder="رسالتك"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
                required
              />
            </>
          )}

          {error && <p className="text-red-500 mb-6 text-sm">{error}</p>}
          {success && <p className="text-green-500 mb-6 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-4">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {/* جاري الإرسال... */}
              </div>
            ) : (
              "إرسال"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default WhatsAppSubscriptionSection;
