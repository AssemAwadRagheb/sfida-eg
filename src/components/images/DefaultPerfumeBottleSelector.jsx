import Image from "next/image";
import Image0 from "../../../public/imgs/bottels/dummy/perfume-b-0.png";
import Image1 from "../../../public/imgs/bottels/dummy/perfume-b-1.png";
import Image2 from "../../../public/imgs/bottels/dummy/perfume-b-2.png";
import Image3 from "../../../public/imgs/bottels/dummy/perfume-b-3.png";
import Image4 from "../../../public/imgs/bottels/dummy/perfume-b-4.png";
import Image5 from "../../../public/imgs/bottels/dummy/perfume-b-5.png";
import Image6 from "../../../public/imgs/bottels/dummy/perfume-b-6.png";
import Image7 from "../../../public/imgs/bottels/dummy/perfume-b-7.png";
import Image8 from "../../../public/imgs/bottels/dummy/perfume-b-8.png";
import Image9 from "../../../public/imgs/bottels/dummy/perfume-b-9.png";
import Image10 from "../../../public/imgs/bottels/dummy/perfume-b-10.png";
import Image11 from "../../../public/imgs/bottels/dummy/perfume-b-11.png";
import Image12 from "../../../public/imgs/bottels/dummy/perfume-b-12.png";
import Image13 from "../../../public/imgs/bottels/dummy/perfume-b-13.png";
import Image14 from "../../../public/imgs/bottels/dummy/perfume-b-14.png";

const imagesLoader = {
  0: Image0,
  1: Image1,
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
  13: Image13,
  14: Image14,
};

const DefaultPerfumeBottleSelector = ({
  imageDefaultSelector,
  width,
  height,
  alt,
  ...props
}) => {
  return (
    <div>
      <Image
        src={
          imagesLoader[
            imageDefaultSelector &&
            imageDefaultSelector < Object.keys(imagesLoader).length
              ? imageDefaultSelector
              : 0
          ]
        }
        width={width || 1000}
        height={height || 1000}
        alt={alt || "perfume bottle"}
        {...props}
      />
    </div>
  );
};

export default DefaultPerfumeBottleSelector;
