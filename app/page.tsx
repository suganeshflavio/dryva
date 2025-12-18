import Header from "@/app/components/common/Header/header";
import Hero from "@/app/components/home/Hero/hero";
import Review from "@/app/components/home/Review/review";
import AppPromo from "@/app/components/home/AppPromo/Promo";
import CourierSection from "@/app/components/home/CourierSection/couriersection";
import FeatureSection from "@/app/components/home/FeatureSection/featureSection";
import AppFooter from "@/app/components/common/Footer/footer";

export default function HomePage() {
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
