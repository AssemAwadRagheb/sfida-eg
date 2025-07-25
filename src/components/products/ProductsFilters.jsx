import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ProductsFilters = ({ onFilterChange }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  // Initialize filters from URL or default values
  const initialType = searchParams.get("type") || "";
  const initialGender = searchParams.get("gender") || "";
  const initialPerfumeClass = searchParams.get("perfumeClass") || "";

  const [type, setType] = useState(initialType);
  const [gender, setGender] = useState(initialGender);
  const [perfumeClass, setPerfumeClass] = useState(initialPerfumeClass);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Only update URL if the filter values have changed
    if (
      type !== initialType ||
      gender !== initialGender ||
      perfumeClass !== initialPerfumeClass
    ) {
      if (type) params.set("type", type);
      else params.delete("type");

      if (gender) params.set("gender", gender);
      else params.delete("gender");

      if (perfumeClass) params.set("perfumeClass", perfumeClass);
      else params.delete("perfumeClass");

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [
    type,
    gender,
    perfumeClass,
    searchParams,
    router,
    initialType,
    initialGender,
    initialPerfumeClass,
  ]);

  // Notify parent component of filter changes
  useEffect(() => {
    onFilterChange({ type, gender, perfumeClass });
  }, [type, gender, perfumeClass, onFilterChange]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">الفلاتر</h2>
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="text-gray-600 hover:text-gray-800"
        >
          {isAccordionOpen ? "إغلاق" : "فتح"}
        </button>
      </div>
      {isAccordionOpen && (
        <div className="space-y-4">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              النوع
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value=""> جميع المنتجات</option>
              
              {/* <option value="MUSK">مسك</option> */}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-700">
              الجنس
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">الكل</option>
              <option value="F">بشره</option>
              <option value="B">تخسيس</option>
            </select> */}
          </div>

          {/* Perfume Class Filter */}
          {/*  <div>
            <label className="block text-sm font-medium text-gray-700">
              فئة العطر
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={perfumeClass}
              onChange={(e) => setPerfumeClass(e.target.value)}
            >
              <option value="">الكل</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </select>
          </div>*/}
        </div>
      )}
    </div>
  );
};

export default ProductsFilters;
