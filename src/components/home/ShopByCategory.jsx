import { motion } from "framer-motion";
import categoryMImage from "../../../public/imgs/home/category-M.webp";
import categoryFImage from "../../../public/imgs/home/category-F.webp";
import categoryBImage from "../../../public/imgs/home/category-B.webp";
import categoryAllImage from "../../../public/imgs/home/Bottles-with-Background.webp";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  {
    id: 2,
    name: "منتجات عناية بالبشرة",
    image: categoryMImage,
    link: "/products?gender=F",
  },
  {
    id: 3,
    name: "منتجات تخسيس",
    image: categoryFImage,
    link: "/products?gender=B",
  },
];

const ShopByCategory = () => {
  const router = useRouter();
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">تسوق حسب الفئة</h2>
        
        {/* التعديل الرئيسي هنا */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => router.push(category.link)}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                  <p className="mt-2 text-blue-600 hover:text-blue-800 transition-colors">
                    اكتشف المنتجات
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;