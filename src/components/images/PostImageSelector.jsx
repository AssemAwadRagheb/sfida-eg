// components/common/PostImageSelector.js
import Image from "next/image";

// Import all 42 images
import PostImage1 from "../../../public/imgs/posts/post-1.webp";
import PostImage2 from "../../../public/imgs/posts/post-2.webp";
import PostImage3 from "../../../public/imgs/posts/post-3.webp";
import PostImage4 from "../../../public/imgs/posts/post-4.webp";
import PostImage5 from "../../../public/imgs/posts/post-5.webp";
import PostImage6 from "../../../public/imgs/posts/post-6.webp";
import PostImage7 from "../../../public/imgs/posts/post-7.webp";
import PostImage8 from "../../../public/imgs/posts/post-8.webp";
import PostImage9 from "../../../public/imgs/posts/post-9.webp";
import PostImage10 from "../../../public/imgs/posts/post-10.webp";
import PostImage11 from "../../../public/imgs/posts/post-11.webp";
import PostImage12 from "../../../public/imgs/posts/post-12.webp";
import PostImage13 from "../../../public/imgs/posts/post-13.webp";
import PostImage14 from "../../../public/imgs/posts/post-14.webp";
import PostImage15 from "../../../public/imgs/posts/post-15.webp";
import PostImage16 from "../../../public/imgs/posts/post-16.webp";
import PostImage17 from "../../../public/imgs/posts/post-17.webp";
import PostImage18 from "../../../public/imgs/posts/post-18.webp";
import PostImage19 from "../../../public/imgs/posts/post-19.webp";
import PostImage20 from "../../../public/imgs/posts/post-20.webp";
import PostImage21 from "../../../public/imgs/posts/post-21.webp";
import PostImage22 from "../../../public/imgs/posts/post-22.webp";
import PostImage23 from "../../../public/imgs/posts/post-23.webp";
import PostImage24 from "../../../public/imgs/posts/post-24.webp";
import PostImage25 from "../../../public/imgs/posts/post-25.webp";
import PostImage26 from "../../../public/imgs/posts/post-26.webp";
import PostImage27 from "../../../public/imgs/posts/post-27.webp";
import PostImage28 from "../../../public/imgs/posts/post-28.webp";
import PostImage29 from "../../../public/imgs/posts/post-29.webp";
import PostImage30 from "../../../public/imgs/posts/post-30.webp";
import PostImage31 from "../../../public/imgs/posts/post-31.webp";
import PostImage32 from "../../../public/imgs/posts/post-32.webp";
import PostImage33 from "../../../public/imgs/posts/post-33.webp";
import PostImage34 from "../../../public/imgs/posts/post-34.webp";
import PostImage35 from "../../../public/imgs/posts/post-35.webp";
import PostImage36 from "../../../public/imgs/posts/post-36.webp";
import PostImage37 from "../../../public/imgs/posts/post-37.webp";
import PostImage38 from "../../../public/imgs/posts/post-38.webp";
import PostImage39 from "../../../public/imgs/posts/post-39.webp";
import PostImage40 from "../../../public/imgs/posts/post-40.webp";
import PostImage41 from "../../../public/imgs/posts/post-41.webp";
import PostImage42 from "../../../public/imgs/posts/post-42.webp";

// Map all 42 images to their respective keys
const postImages = {
  1: PostImage1,
  2: PostImage2,
  3: PostImage3,
  4: PostImage4,
  5: PostImage5,
  6: PostImage6,
  7: PostImage7,
  8: PostImage8,
  9: PostImage9,
  10: PostImage10,
  11: PostImage11,
  12: PostImage12,
  13: PostImage13,
  14: PostImage14,
  15: PostImage15,
  16: PostImage16,
  17: PostImage17,
  18: PostImage18,
  19: PostImage19,
  20: PostImage20,
  21: PostImage21,
  22: PostImage22,
  23: PostImage23,
  24: PostImage24,
  25: PostImage25,
  26: PostImage26,
  27: PostImage27,
  28: PostImage28,
  29: PostImage29,
  30: PostImage30,
  31: PostImage31,
  32: PostImage32,
  33: PostImage33,
  34: PostImage34,
  35: PostImage35,
  36: PostImage36,
  37: PostImage37,
  38: PostImage38,
  39: PostImage39,
  40: PostImage40,
  41: PostImage41,
  42: PostImage42,
};

const PostImageSelector = ({ imageId, alt = "Post Image", className = "" }) => {
  // Fallback to the first image if the imageId is not found
  const imageSrc = postImages[imageId] || postImages[1];

  return (
    <div className={`relative w-full aspect-video ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, 1200px" // Optimize for different screen sizes
      />
    </div>
  );
};

export default PostImageSelector;
