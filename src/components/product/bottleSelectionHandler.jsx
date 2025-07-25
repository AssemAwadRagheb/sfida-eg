"use client";

import { useState } from "react";
import BottleSelector from "../images/BottleSelector";
import { SocialMedia } from "../footer/socialMedia";

const BottleSelectionHandler = ({
  availableSizes,
  PerfumeBottles,
  setSelectedBottleData,
  setSelectedSizeeData,
  isMobile,
}) => {
  const [selectedBottleId, setSelectedBottleId] = useState(null);

  // Handle bottle selection
  const handleBottleSelect = (sizeInfo, theBottle) => {
    setSelectedBottleId(sizeInfo.bottleId);
    setSelectedBottleData(theBottle);
    setSelectedSizeeData(sizeInfo);
  };

  // Get the selected bottle details
  const selectedBottleDetails = availableSizes.find(
    (size) => size.bottleId === selectedBottleId
  );

  // // Get the bottle image from PerfumeBottles
  // const selectedBottleImage = PerfumeBottles.find(
  //   (bottle) => bottle.id === selectedBottleId
  // )?.bottleImage;

  return (
    <div>
      {/* Bottle Selector */}
      <div
        className={`flex flex-col items-center float-start p-[1rem] ${
          isMobile ? "gap-[.5rem]" : "gap-[1rem]"
        }`}
      >
        {availableSizes
          .sort((a, b) => a.price - b.price)
          .map((size) => {
            const theBottle = PerfumeBottles.find(
              (bottle) => bottle.id === size.bottleId
            );
            const bottleSizeAndType = `${theBottle?.weight} - ${theBottle?.type}`;
            const bottlePrice = `${size.price} جنيه`; // سعر واحد فقط
            
            return theBottle?.visible ? (
              <div
                className={`cursor-pointer flex flex-col items-center justify-between border-solid border-[1px] border-gray-200 rounded-lg p-2 w-full max-w-[150px] ${
                  selectedBottleId === size.bottleId
                    ? "border-[#FBE2A0] bg-[#FBE2A010]"
                    : ""
                } ${
                  theBottle.disabled
                    ? "bg-gray-100 opacity-70 cursor-not-allowed"
                    : "hover:shadow-md"
                }`}
                onClick={
                  !theBottle.disabled
                    ? () => handleBottleSelect(size, theBottle)
                    : undefined
                }
                key={size.bottleId}
              >
                <BottleSelector
                  imageDefaultSelector={theBottle.bottleImage}
                  width={isMobile ? 50 : 70}
                  height={isMobile ? 50 : 70}
                  alt={`Bottle ${size.bottleId}`}
                />
                <p className="text-xs text-center font-medium mt-1">
                  {bottleSizeAndType}
                </p>
                <p className="text-sm font-bold text-[#111827] mt-1">
                  {bottlePrice}
                </p>
              </div>
            ) : null;
          })}
  
        {/* <a
          href={SocialMedia.whatsapp.id}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 text-center w-full mt-2"
        >
          لدينا العديد من الزجاجات الخاصة،{" "}
          <span className="text-blue-600 underline">
            اضغط هنا
          </span>{" "}
          وتواصل مع خدمة العملاء لرؤيتها..
        </a> */}
      </div>

      {/* Selected Bottle Details */}
      {/* {selectedBottleId && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "16px" }}>
            السعر: {selectedBottleDetails.price} L.E.
          </p>
          <p style={{ fontSize: "14px", color: "#555" }}>
            {
              PerfumeBottles.find((bottle) => bottle.id === selectedBottleId)
                ?.descriptionArShort
            }
          </p>
        </div>
      )} */}
    </div>
  );
};

export default BottleSelectionHandler;
