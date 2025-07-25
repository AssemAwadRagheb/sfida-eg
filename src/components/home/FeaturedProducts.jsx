// FeaturedProducts.jsx
import { useState, useEffect } from "react";
import { Perfumes } from "../../data/perfumes"; // نستخدم ملف العطور العام فقط
import ProductCard from "../cards/productCard";
import { handlePerfumeForCard } from "../../services/handleProductForCard";
import Link from "next/link";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const getFeaturedProducts = () => {
      // نجيب المنتجات المميزة من ملف العطور العام حسب الـ class
      const zodiacProduct = Perfumes.find(product => product.class === 300);
      const sunscreenProduct = Perfumes.find(product => product.class === 200 && product.id === 2001);
      const cleanserProduct = Perfumes.find(product => product.class === 400 && product.id === 401);
      const waterGelProduct = Perfumes.find(product => product.class === 500 && product.id === 5001);

      const productsToShow = [
        // Zodiac Product
        zodiacProduct && {
          ...zodiacProduct,
          price: 450,
          showDiscount: true
        },
        // Aquanova Sunscreen (class 200)
        sunscreenProduct && {
          ...sunscreenProduct,
          oldPrice: 450,
          price: 350,
          showDiscount: true
        },
        // Aquanova Cleanser (class 400)
        cleanserProduct && {
          ...cleanserProduct,
          oldPrice: 350,
          price:250,
          showDiscount: true
        },
        // Aquanova Water Gel (class 500)
        waterGelProduct && {
          ...waterGelProduct,
          oldPrice: 350,
          price: 250,
          showDiscount: true
        }
      ].filter(Boolean);

      return productsToShow.map(product => ({
        ...handlePerfumeForCard(product),
        oldPrice: product.oldPrice,
        price: product.price,
        showDiscount: product.showDiscount
      }));
    };

    setFeaturedProducts(getFeaturedProducts());
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">المنتجات المميزة</h2>
          <Link 
            href="/products" 
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            عرض الكل ←
          </Link>
        </div>
        
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                preventImageLink={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">جاري تحميل المنتجات...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;