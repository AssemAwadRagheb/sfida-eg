// Products Page
"use client";
import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/cards/productCard";
import ProductsFilters from "@/components/products/ProductsFilters";
import { Perfumes } from "@/data/perfumes";
import SmallBasicLoader from "@/components/common/loaders/smallBasicLoader";
import MainLoader from "@/components/common/loaders/mainLoader";
import { handlePerfumeForCard } from "@/services/handleProductForCard";
import { SocialMedia } from "@/components/footer/socialMedia";

// بيانات العروض الخاصة مع IDs فريدة
const specialProducts = [
  {
    id: 1001,
    titleAr: "3 علب زودياك للتخسيس",
    titleEn: "3 Zodiac Weight Loss Boxes",
    price: 999,
    oldPrice: 1350,
    defaultImage: 2,
    link: "/product/SKU-WL-000001",
    sku: "SKU-WL-000001",
    selectedSize: { price: 999 },
    type: "special",
    gender: "unisex",
    class: "offers"
  },
  {
    id: 1002,
    titleAr: "2 علب زودياك للتخسيس",
    titleEn: "2 Zodiac Weight Loss Boxes",
    price: 800,
    oldPrice: 900,
    defaultImage: 1,
    link: "/product/SKU-SUN-2001",
    sku: "SKU-SUN-2001",
    selectedSize: { price: 800 },
    type: "special",
    gender: "unisex",
    class: "offers"
  },
  {
    id: 1003,
    titleAr: "3 غسول أكوانوفا للوجه",
    titleEn: "3 Aquanova Face Wash - Deep Cleaning",
    price: 500,
    oldPrice: 1050,
    defaultImage: 11,
    link: "/product/SKU-AQUA-001",
    sku: "SKU-AQUA-001",
    selectedSize: { price: 500 },
    type: "special",
    gender: "unisex",
    class: "offers"
  },
  {
    id: 1005,
    titleAr: "3 واقي شمس أكوانوفا",
    titleEn: "3 Aquanova Sunscreen - SPF 50 Protection",
    price: 700,
    oldPrice: 1350,
    defaultImage: 7,
    link: "/product/SKU-WL-000002",
    sku: "SKU-WL-000002",
    selectedSize: { price: 700 },
    type: "special",
    gender: "unisex",
    class: "offers"
  },
  {
    id: 1006,
    titleAr: "(جل + غسول + واقي شمس)",
    titleEn: "Aquanova Set (Gel + Wash + Sunscreen)",
    price: 600,
    oldPrice: 1150,
    defaultImage: 5,
    link: "/product/SKU-AQUA-6001",
    sku: "SKU-AQUA-6001",
    selectedSize: { price: 600 },
    type: "special",
    gender: "unisex",
    class: "offers"
  },
];

const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    gender: searchParams.get("gender") || "",
    perfumeClass: searchParams.get("perfumeClass") || "",
  });
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setVisibleProducts(12);
  }, []);

  // دمج المنتجات مع ضمان عدم وجود تكرار في الـ IDs
  const allProducts = [
    ...specialProducts,
    ...Perfumes.map(p => ({ ...p, id: p.id + 2000 }))
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = searchQuery ? (
      (product.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.titleAr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : true;
    
    const matchesType = filters.type ? product.type === filters.type : true;
    const matchesGender = filters.gender ? product.gender === filters.gender : true;
    const matchesPerfumeClass = filters.perfumeClass ? product.class == filters.perfumeClass : true;
    
    return matchesSearch && matchesType && matchesGender && matchesPerfumeClass;
  }).map(product => handlePerfumeForCard(product));

  const loadMoreProducts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 12);
      setIsLoading(false);
    }, 250);
  };

  useEffect(() => {
    const handleScroll = () => {
      const productsContainer = document.getElementById("products-grid");
      if (!productsContainer) return;
      const { bottom } = productsContainer.getBoundingClientRect();
      if (
        bottom - window.innerHeight < 150 &&
        !isLoading &&
        visibleProducts < filteredProducts.length
      ) {
        loadMoreProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleProducts, filteredProducts, isLoading]);

  return (
    <div className="container mx-auto py-8 min-h-[85vh]">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 lg:pr-8">
          <ProductsFilters onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full lg:w-3/4">
          {filteredProducts.slice(0, visibleProducts)?.length > 0 ? (
            <div
              id="products-grid"
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <ProductCard 
                  key={`${product.id}-${product.sku}`}
                  product={product}
                  hideDetailsButton={product.type === "special"} // إخفاء الزر فقط للعروض الخاصة
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-[calc(100vh-400px)]">
              <h3 className="text-2xl font-bold">لا يوجد نتائج بحث!</h3>
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center my-16">
              <SmallBasicLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => (
  <Suspense fallback={<MainLoader />}>
    <ProductsPageContent />
  </Suspense>
);

export default ProductsPage;