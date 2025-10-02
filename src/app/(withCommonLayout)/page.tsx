import NewsletterComponents from "@/components/Modules/Newsletter/NewsLetterComponents";
import OtherProduct from "@/components/Modules/Others/OtherProduct";
import AllProductSub from "@/components/Modules/Product/AllProductSub/AllProductSub";
import FeaturedProductCarousel from "@/components/Modules/Product/Featured/FeaturedProductCarousel";
import OnsaleProduct from "@/components/Modules/Product/OnSale/OnsaleProduct";
import Gallery from "@/components/shared/Gallery/Gallery";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import AdvertizerNewsLetter from "@/components/shared/NewsLetter/AdvertizerNewsLetter";
import Popup from "@/components/shared/Popup/Popup";
import SupportIcon from "@/components/shared/Support/SupportIcon";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <OnsaleProduct />
      <SupportIcon />
      <Popup />
      <AllProductSub />
      <FeaturedProductCarousel />
      <AdvertizerNewsLetter />
      <OtherProduct />
      <NewsletterComponents />
      <Gallery />
    </div>
  );
};

export default HomePage;
