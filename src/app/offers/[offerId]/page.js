// صفحات العروض/[offerId].js
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useRouter } from "next/navigation";
import { BasicOffers } from "@/data/offers/basicOffers";
import Image from "next/image";
import Link from "next/link";

// استيراد Slider بشكل ديناميكي للتحميل البطيء
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function OfferPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // تحديث حالة الهاتف المحمول والتابلت عند تغيير حجم النافذة
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640); // نقطة التوقف للهاتف المحمول
      setIsTablet(width >= 640 && width < 1024); // نقطة التوقف للتابلت
    };

    handleResize(); // الإعداد الأولي
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // العثور على العرض بواسطة المعرف
  useEffect(() => {
    const foundOffer = BasicOffers.find(
      (offer) => offer.id === parseInt(params.offerId)
    );
    if (foundOffer) {
      setOffer(foundOffer);
    } else {
      setOffer(null);
    }
    setLoading(false);
  }, [params.offerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!offer) {
    return <div>Offer not found</div>;
  }

  // تصفية العرض الحالي من القائمة
  const otherOffers = BasicOffers.filter(
    (o) => o.id !== parseInt(params.offerId)
  );

  // إعدادات Slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // دالة للانتقال إلى صفحة المنتج
  const handleGoToProducts = () => {
    if (offer.productLink) {
      router.push(offer.productLink);
    } else {
      router.push("/products");
    }
  };

  return (
    <section className="px-4 py-[2rem]">
      {/* تفاصيل العرض */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-[2rem]">
          {offer.titleAr}
        </h1>
        <img
          src={offer.image}
          alt={offer.titleAr}
          className={`w-full my-4 ${isMobile ? "h-[50vh]" : "h-[90vh]"}`}
        />
        <h6 className="text-xl font-semibold mb-4">التفاصيل:</h6>
        <p className={`${isMobile ? "text-sm" : "text-lg"}`}>
          {offer.longDescriptionAr}
        </p>

        {/* زر عرض المنتجات */}
        <div className="mt-8 text-center">
          <button
            onClick={handleGoToProducts}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-700 transition"
          >
            عرض المنتجات
          </button>
        </div>
      </div>

      {/* عروض أخرى Slider */}
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">عروض أخرى</h2>
        {otherOffers.length > 0 ? (
          <Slider {...sliderSettings}>
            {otherOffers.map((otherOffer) => (
              <div key={otherOffer.id} className="px-2 outline-none">
                <Link href={`/offers/${otherOffer.id}`} className="outline-none">
                  <Image
                    width={1000}
                    height={1000}
                    src={otherOffer.image}
                    alt={otherOffer.titleAr}
                    className="w-full h-72"
                  />
                  <h3 className="text-lg mt-2 text-center">
                    {otherOffer.titleAr}
                  </h3>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No other offers available.</p>
        )}
      </div>
    </section>
  );
}