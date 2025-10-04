
"use client";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@/components/ui/carousel";

export default function NewsletterCarouselHelper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        loop: true,
      }}
    >
      {children}
    </Carousel>
  );
}