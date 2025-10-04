/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import HeroHelper from "./HeroHelper";
import { useEffect, useState } from "react";
import { getAllBanners } from "@/components/Services/Banner";

export default function HeroSection() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const data = await getAllBanners();
        setBanners(data.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch banners", err);
        setError("Failed to load banners");
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="font-arima">
        <div className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-white/60 text-sm">Loading experiences...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || banners.length === 0) {
    return (
      <div className="font-arima">
        <div className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center space-y-3">
              <div className="text-4xl mb-4">🍽️</div>
              <p className="text-white/80 text-lg">No banners available</p>
              <p className="text-white/50 text-sm">Check back soon for exciting updates!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="carousel" className="font-arima">
      <HeroHelper>
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id || index} className="relative">
              <div className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] mt-10 overflow-hidden group">
                <div className="absolute inset-0">
                  <Image
                    className="w-full h-full md:object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    src={banner.image}
                    alt={banner.title || `Banner ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    quality={90}
                  />
                </div>

                {/* Enhanced gradient overlay with vignette effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

                {/* Animated content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center">
                  {/* Decorative top line */}
                  {/* <div className="flex items-center justify-center mb-4 sm:mb-6 animate-fadeIn">
                    <div className="h-px w-6 sm:w-8 bg-amber-400"></div>
                    <span className="mx-2 sm:mx-3 text-amber-400 text-[10px] sm:text-xs tracking-widest uppercase font-light">
                      Exclusive Taste
                    </span>
                    <div className="h-px w-6 sm:w-8 bg-amber-400"></div>
                  </div> */}

                  {/* Main heading with better mobile sizing */}
                  {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-tight max-w-4xl px-2 animate-slideUp">
                    {banner.title || (
                      <>
                        Discover the{" "}
                        <span className="text-amber-400 inline-block">
                          Exceptional
                        </span>{" "}
                        Tastes of Your City!
                      </>
                    )}
                  </h1> */}

                  {/* Subtitle with responsive sizing */}
                  {/* <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-xl px-4 animate-slideUp animation-delay-200">
                    {banner.subtitle ||
                      "Embark on a culinary journey with our expert-led food experiences"}
                  </h2> */}

                  {/* CTA Button with mobile-friendly sizing */}
                  {banner.ctaText && banner.ctaLink && (
                    <a
                      href={banner.ctaLink}
                      className="px-6 sm:px-8 py-2.5 sm:py-3 bg-amber-500 hover:bg-amber-400 text-white text-sm sm:text-base font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 font-sansita animate-slideUp animation-delay-400 inline-block"
                    >
                      {banner.ctaText}
                    </a>
                  )}
                </div>

                {/* Modern slide indicators */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {banners.map((_, dot) => (
                    <button
                      key={dot}
                      aria-label={`Go to slide ${dot + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        index === dot
                          ? "w-8 sm:w-10 h-2 bg-amber-400 shadow-lg shadow-amber-400/50"
                          : "w-2 h-2 bg-white/60 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-t-2 border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-t-2 border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-b-2 border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 right-4 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-b-2 border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Styled navigation buttons */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-4 lg:left-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-amber-500 hover:border-amber-500 transition-all duration-300" />
          <CarouselNext className="right-4 lg:right-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-amber-500 hover:border-amber-500 transition-all duration-300" />
        </div>
      </HeroHelper>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: backwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: backwards;
        }
      `}</style>
    </div>
  );
}