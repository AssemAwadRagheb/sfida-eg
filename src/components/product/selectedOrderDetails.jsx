"use client";

import BottleSelector from "../images/BottleSelector";

const SelectedOrderDetails = ({
  selectedBottleData,
  selectedSizeData,
  isTablet,
}) => {
  // return (
    // <div className={`${isTablet && "w-full "}`}>
    //   <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-[.9rem] min-h-[225px]">
    //     <h5 className="text-xl font-semibold text-gray-800 mb-[1.5rem]">
    //       تفاصيل المنتج
    //     </h5>
    //     {selectedBottleData ? (
    //       <div className="flex justify-start items-center gap-4 mt-2">
    //         <div className="left flex justify-center items-center">
    //           <BottleSelector
    //             key={selectedBottleData.bottleId}
    //             imageDefaultSelector={selectedBottleData?.bottleImage}
    //             width={100}
    //             height={100}
    //             alt={`Bottle ${selectedBottleData.bottleId}`}
    //             zoomOnHover={true}
    //           />
    //         </div>
    //         <div className=" flex flex-col items-start">
    //           {/* <h3 className="text-[1rem] font-semibold text-gray-800 mb-[1rem]">
    //             الزجاجة
    //           </h3> */}
    //           <div className="flex flex-row items-start ">
              
              
    //           </div>
    //           <div className="flex flex-row items-start">
    //             <span>النوع:</span>

    //             <span className="text-[.95rem] text-green-600 mx-[1rem] ">
    //               {selectedBottleData?.typeAr}
    //             </span>
    //           </div>

    //           <div>
    //             <div className="flex  flex-row items-start">
    //               <span>السعر:</span>
    //               <span className="text-[.95rem] text-green-600 mx-[1rem] ">
    //                 {selectedSizeData?.price}
    //               </span>
    //               <span className="text-[.95rem] text-green-600 ">ج.م.</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <p className="mt-4">برجاء اختيار المنتج من اليمين أولًا!</p>
    //     )}
    //   </div>
    // </div>
  // );
};

export default SelectedOrderDetails;
