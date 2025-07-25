// pages/index.js
"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { savePromocodeData } from "@/utils/storage";
import HeroHome from "@/components/home/hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ShopByCategory from "@/components/home/ShopByCategory";
import SpecialOffers from "@/components/home/SpecialOffers";
import CustomerFavorites from "@/components/home/CustomerFavorites";
import PerfumeQuiz from "@/components/home/PerfumeQuiz";
import BrandStory from "@/components/home/BrandStory";
import Testimonials from "@/components/home/Testimonials";
import CategoriesHome from "@/components/home/CategoriesHome";
import OffersHome from "@/components/home/OffersHome";
import { Promocodes } from "@/data/promocodes/promocedes";
import MainLoader from "@/components/common/loaders/mainLoader";
import WhatsAppSubscriptionSection from "@/components/home/WhatsAppSubscriptionSection";
import { Posts } from "@/data/posts/posts";
import PostOfTheDay from "@/components/home/PostOfTheDay";

const HomeContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const pm = searchParams.get("pm");
    const provider = searchParams.get("provider");

    if (pm) {
      const promocodeDetails = Promocodes?.find((pc) => pc.code === pm);
      if (promocodeDetails && promocodeDetails.isActive) {
        savePromocodeData(pm, provider);
      }
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div>
      {/* <section>
        <HeroHome />
      </section> */}

      <section>
        <OffersHome />
      </section>

    
  

      {/* <section>
        <CustomerFavorites />
      </section> */}

      {/* <section>
        <PostOfTheDay />
      </section> */}

      <section>
        <BrandStory />
      </section>

      <section>
        <FeaturedProducts />
      </section>

      {/* <section>
        <Testimonials />
      </section> */}

      <section>
        <PerfumeQuiz />
      </section>
          <section>
        <SpecialOffers />
      </section>
  {/* <section>
        <ShopByCategory />
      </section> */}
      
      <section>
        <WhatsAppSubscriptionSection />
      </section>

      <section>
        <CategoriesHome />
      </section>
    </div>
  );
};

export default function Home() {
  return (
    <Suspense
      fallback={
        <div>
          <MainLoader />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}