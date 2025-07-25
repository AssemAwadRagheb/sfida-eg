import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";

import { BasicOffers } from "@/data/offers/basicOffers";
import Link from "next/link";
import Image from "next/image";

const OffersHome = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2500,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show only one slide at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Randomize the offers and limit to a certain number if needed
    const prepareOffers = BasicOffers?.sort(() => 0.5 - Math.random()).slice(
      0,
      10
    );
    setOffers(prepareOffers);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Final selected Product
  const [finalSelectedProduct, setfinalSelectedProduct] = useState(null);

  // Update columns and mobile/tablet state on window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640); // Mobile breakpoint
      setIsTablet(width >= 640 && width < 1024); // Tablet breakpoint
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-start">
          <h2 className="text-3xl font-bold text-center mb-8">
          استكشف عالمنا   

          </h2>
        </div>
        <div>
          <Slider {...settings}>
            {offers?.map((offer) => (
              <Link key={offer.id} href={`/offers/${offer.id}`} passHref>
                <div className="px-2">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer">
                    <div
                      className={`relative w-full ${
                        isMobile ? "min-h-[22rem]" : "h-[26rem]"
                      } `}
                    >
                      <Image
                        src={offer.image}
                        alt={offer.titleAr}
                        // width={1600}
                        // height={600}
                        layout="fill" // Use layout="fill" to fill the parent container
                        objectFit="cover" // Ensure the image covers the area
                        className={`rounded-t-lg ${
                          offer?.status == "SOON" && "opacity-20 "
                        }`}
                      />
                      {offer?.status == "SOON" && (
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-xl">
                          <h3 className="text-[8rem] text-[#777]">!قريبا</h3>
                        </div>
                      )}{" "}
                    </div>
                    <div className="p-4 text-center">
                      <h3
                        className={`font-semibold mb-2 ${
                          isMobile ? "text-sm" : "text-xl"
                        }`}
                      >
                        {offer.titleAr}
                      </h3>
                      <p
                        className={`text-red-600 ${
                          isMobile ? "text-[.8rem]" : "text-lg"
                        }`}
                      >
                        ..اعرف المزيد
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default OffersHome;
