import React from "react";
import Slider from "react-slick";
import { Posts } from "@/data/posts/posts";
import Link from "next/link";
import PostImageSelector from "../images/PostImageSelector";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components using inline SVGs
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-[-20px] md:right-[-30px] transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-[-20px] md:left-[-30px] transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const PostOfTheDay = () => {
  const currentDay = new Date().getDate();
  const yesterday = currentDay - 1;
  const tomorrow = currentDay + 1;

  // Find posts for yesterday, today, and tomorrow
  const postOfTheDay = Posts.find((post) => post.date === currentDay);
  const postYesterday = Posts.find((post) => post.date === yesterday);
  const postTomorrow = Posts.find((post) => post.date === tomorrow);

  // Filter out undefined posts
  const postsToShow = [postYesterday, postOfTheDay, postTomorrow].filter(
    Boolean
  );

  if (postsToShow.length === 0) {
    return (
      <div className="text-center text-red-500 text-2xl mt-12">
        No posts found for this timeframe.
      </div>
    );
  }

  // Slider settings
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1.0125, // Adjust to show partial slides
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1.2, // Show one full and a partial next
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section className="post-of-the-day bg-gray-50 py-4 relative">
      <h2 className="text-2xl font-bold mb-4 text-center">المنشورات</h2>
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {postsToShow.map((post) => {
            const truncatedDescription =
              post.descriptionAr.split(" ").slice(0, 30).join(" ") +
              "... انقر لمعرفة المزيد";

            return (
              <div key={post.id} className="px-2">
                <Link
                  href={`/posts/${post.id}`}
                  className="w-full relative block"
                >
                  <div className="relative rounded-lg overflow-hidden shadow-lg">
                    <PostImageSelector
                      imageId={post.imageId}
                      alt={post.titleAr}
                      className="rounded-lg w-full"
                    />
                    <div className="absolute inset-0 bg-blue opacity-20"></div>
                    <div className="absolute py-[5%] h-[100%]  top-[0%] left-0 right-0 p-4 text-white text-center bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-between">
                      <h2 className="text-sm md:text-xl font-bold">
                        {post.titleAr}
                      </h2>
                      <p className="text-[.6rem] md:text-base font-medium w-[70%]">
                        {truncatedDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default PostOfTheDay;
