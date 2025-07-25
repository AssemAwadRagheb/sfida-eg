import Magnifier from "react-magnifier";
import Image from "next/image";
import Image2 from "../../../public/imgs/bottels/standard/standard-2-1.5-roll.png";
import Image3 from "../../../public/imgs/bottels/standard/standard-3-2.5-roll.png";
import Image4 from "../../../public/imgs/bottels/standard/standard-4-4.5-roll.png";
import Image5 from "../../../public/imgs/bottels/standard/standard-5-6-roll.png";
import Image6 from "../../../public/imgs/bottels/standard/standard-7-30-spray.png";
import Image7 from "../../../public/imgs/bottels/standard/standard-8-50-spray-plastic.png";
import Image8 from "../../../public/imgs/bottels/standard/standard-9-3.5-roll.png";
import Image9 from "../../../public/imgs/bottels/standard/standard-10-100-spray-plastic.png";
import Image10 from "../../../public/imgs/bottels/standard/standard-10-12-roll.png";
import Image11 from "../../../public/imgs/bottels/standard/standard-11-50-spray-glass.png";
import Image12 from "../../../public/imgs/bottels/standard/standard-12-100-spray-glass.png";

const imagesLoader = {
  2: Image2,
  3: Image3,
  4: Image4,
  5: Image5,
  6: Image6,
  7: Image7,
  8: Image8,
  9: Image9,
  10: Image10,
  11: Image11,
  12: Image12,
};

const BottleSelector = ({
  imageDefaultSelector,
  width,
  height,
  alt,
  zoomOnHover = false,
  ...props
}) => {
  const selectedImage = imagesLoader[imageDefaultSelector];

  if (!selectedImage) {
    return null; // or return a placeholder image or component
  }

  return (
    <div>
      {zoomOnHover ? (
        <div>
          <Magnifier
            src={selectedImage.src}
            width={width || 500}
            height={height || 500}
            mgWidth={300}
            mgHeight={300}
            zoomFactor={1.5}
            alt={alt || "perfume bottle"}
            {...props}
          />
          <p className="text-[.55rem] text-[#aaa] text-center">Hover to zoom</p>
          <p className="text-[.45rem] text-[#aaa] text-center">المس للتكبير </p>
        </div>
      ) : (
        <Image
          src={selectedImage}
          width={width || 1000}
          height={height || 1000}
          alt={alt || "perfume bottle"}
          {...props}
        />
      )}
    </div>
  );
};

export default BottleSelector;
