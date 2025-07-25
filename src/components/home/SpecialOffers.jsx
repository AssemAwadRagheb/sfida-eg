import { useState } from "react";
import ProductCard from "../cards/productCard";
import Link from "next/link";

const SpecialOffers = () => {
  // قائمة المنتجات المميزة
  const [specialProducts] = useState([
    {
      id: 1,
      titleAr: "3 علب زودياك للتخسيس",
      price: 999,
      oldPrice: 1350,
      defaultImage: 2,
      link: "/product/SKU-WL-000001",
      sku: "SKU-WL-000001",
      selectedSize: { price: 999 },
    },
    {
      id: 2,
      titleAr: "2 علب زودياك للتخسيس",
      price: 800,
      oldPrice: 900,
      defaultImage: 1,
      link: "/product/SKU-SUN-2001",
      sku: "SKU-SUN-2001",
      selectedSize: { price: 800 },
    },
    {
      id: 3,
      titleAr: "3 أكوانوفا غسول للوجه",
      price: 500,
      oldPrice: 1050,
      defaultImage: 11,
      link: "/product/SKU-AQUA-001",
      sku: "SKU-AQUA-001",
      selectedSize: { price: 500 },
    },
    {
      id: 5,
      titleAr: "3 أكوانوفا واقي شمس",
      price: 700,
      oldPrice: 1350,
      defaultImage: 7,
      link: "/product/SKU-WL-000002",
      sku: "SKU-WL-000002",
      selectedSize: { price: 700 },
    },
    {
      id: 6,
      titleAr: "جل + غسول + واقي شمس",
      price: 600,
      oldPrice: 1150,
      defaultImage: 5,
      link: "/product/SKU-AQUA-6001",
      sku: "SKU-AQUA-6001",
      selectedSize: { price: 600 },
    },
  ]);

  return (
    <section className="py-4 md:py-12 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-8 gap-2">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">العروض الخاصة</h2>
          {/* <Link href="/offers" className="text-sm md:text-base text-blue-600 hover:text-blue-800">
            عرض الكل
          </Link> */}
        </div>
        
        {specialProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
            {specialProducts.map((product) => (
              <div key={product.id} className="flex justify-center h-full">
                <ProductCard 
                  product={{
                    ...product,
                    price: product.price,
                    originalPrice: product.oldPrice,
                    showPrice: true,
                    showOriginalPrice: true,
                  }}
                  preventImageLink={true}
                  className="w-full h-full flex flex-col"
                  hideDetailsButton={true}
                  imageClassName="object-contain h-32 md:h-56 w-full p-2"
                  cardClassName="bg-white rounded-lg shadow-sm md:shadow-md overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
                  bodyClassName="p-2 md:p-3 flex-grow flex flex-col"
                  titleClassName="text-xs md:text-base font-medium text-gray-900 mb-1 md:mb-2 line-clamp-2"
                  priceContainerClassName="mt-auto flex flex-col md:flex-row items-start md:items-center"
                  priceClassName="text-sm md:text-lg font-bold text-red-600"
                  oldPriceClassName="text-xs md:text-sm line-through text-gray-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">لا توجد منتجات متاحة حالياً</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecialOffers;