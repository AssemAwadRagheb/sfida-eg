// import { Perfumes } from "@/data/perfumes";
// import { useRouter } from "next/navigation";
// import DefaultPerfumeBottleSelector from "../images/DefaultPerfumeBottleSelector";
// import { useEffect, useState } from "react";
// import ProductCard from "../cards/productCard";
// import { handlePerfumeForCard } from "@/services/handleProductForCard";

// const CustomerFavorites = () => {
//   const [favorites, setFavorites] = useState([]);

//   const favoritesListing = () => {
//     const favoritesPreparing = Perfumes?.map((product) => {
//       return handlePerfumeForCard(product);
//     }).slice(0, 4);
//     setFavorites(favoritesPreparing);
//   };

//   useEffect(() => {
//     favoritesListing();
//   }, []);

//   return (
//     <section className="py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8">
//           المفضلة لدى العملاء
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {favorites.map((favorite) => (
//             <ProductCard key={favorite.id} product={favorite} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CustomerFavorites;
