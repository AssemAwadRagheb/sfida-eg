"use client";

import { perfumeCategories } from "@/data/perfumeCategories/perfumeCatigories";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoryDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  // Find the selected category
  const category = perfumeCategories?.find((cat) => cat.id === parseInt(id));

  if (!category) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        Category not found
      </div>
    );
  }

  // Function to highlight "مسكي" or "Miski" in the text
  const highlightBrand = (text) => {
    return text.replace(
      /(مسكي|Miski)/g,
      `<span class="text-[1.05rem] text-[#FDD017] font-bold">$1</span>`
    );
  };

  // Slider settings for the "Other Categories" section
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default for desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          {category.titleAr}
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image on the right */}
          <div className="md:w-1/2">
            <img
              src={category.image}
              alt={category.titleAr}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Text on the left */}
          <div className="md:w-1/2">
            <div
              className="text-lg text-gray-700"
              dangerouslySetInnerHTML={{
                __html: highlightBrand(category.longDescriptionAr),
              }}
            />
          </div>
        </div>
        {/* Display other categories at the bottom */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            فئات عطور أخرى
          </h2>
          <Slider {...sliderSettings}>
            {perfumeCategories
              .filter((cat) => cat.id !== parseInt(id))
              .map((cat) => (
                <div
                  key={cat.id}
                  className="px-2 cursor-pointer py-1"
                  onClick={() => router.push(`/categories/${cat.id}`)}
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:translate-y-[-2px] transition duration-300">
                    <img
                      src={cat.image}
                      alt={cat.titleAr}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-center">
                        {cat.titleAr}
                      </h3>
                      <p className="text-sm text-gray-600 text-center mt-2">
                        {cat.smallDescriptionAr}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default CategoryDetails;
