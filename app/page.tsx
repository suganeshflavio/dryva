'use client';

import Header from "@/app/components/common/Header/header";
import Hero from "@/app/components/home/Hero/hero";
import Review from "@/app/components/home/Review/review";
import AppPromo from "@/app/components/home/AppPromo/Promo";
import CourierSection from "@/app/components/home/CourierSection/couriersection";
import FeatureSection from "@/app/components/home/FeatureSection/featureSection";
import AppFooter from "@/app/components/common/Footer/footer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

  useEffect(() => {
    router.prefetch("/abiut");
    router.prefetch("/history");
    router.prefetch("/addride");
    router.prefetch("/");
    router.prefetch("/login");
    router.prefetch("/signup");
    router.prefetch("/faq");
    router.prefetch("/SellerForm");
    router.prefetch("/ShopList");
    router.prefetch("/ShopDetails");
    router.prefetch("/Profile");
    router.prefetch("/TermsandCondition");
    router.prefetch("/About");
    router.prefetch("/PrivacyPolicy");
  }, []);
  return (
    <>
      <Header />
      <Hero />
      {/* <section
  style={{
    height: "260px",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('/images/reviews-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
/> */}

<Review />
<AppPromo />
<CourierSection />
<FeatureSection />
<AppFooter />
    </>
  );
}
