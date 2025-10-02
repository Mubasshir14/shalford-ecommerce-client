/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";
// import {
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { getAllNewsLetters } from "@/components/Services/NewsLetter";
// import Link from "next/link";
// import NewsletterCarouselHelper from "../HeroSection/HeroHelper";
// import { CircleLoader } from "react-spinners";

// export default function AdvertizerNewsLetter() {
//   const [banners, setBanners] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const data = await getAllNewsLetters();
//         console.log(data.data);
//         setBanners(data.data || []);
//       } catch (err) {
//         console.error("Failed to fetch banners", err);
//         setError("Failed to load newsletters");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBanners();
//   }, []);

//   if (loading)
//     return <div className="flex items-center justify-center h-10">
//       <CircleLoader color="#d39e17" />
//     </div>;

//   return (
//     <div id="carousel" className="font-arima">
//       <NewsletterCarouselHelper>
//         <CarouselContent className="max-h-[70vh] max-w-7xl mx-auto ">
//           {banners.map((banner, index) => (
//             <CarouselItem key={index} className="relative overflow-hidden">
//               <Link
//                 href={banner.link?.trim() ? banner.link : "/products"}
//                 className="relative h-[40vh] overflow-hidden rounded-xl shadow-xl hover:scale-105 transition-all transform duration-1000"
//               >
//                 {/* Banner image */}
//                 <Image
//                   className="w-full h-full object-cover  object-center "
//                   src={banner.image}
//                   alt={`Banner ${index + 1}`}
//                   fill
//                   priority={index === 0}
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80"></div>
//                 <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                   {banners.map((_, dot) => (
//                     <div
//                       key={dot}
//                       className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                         index === dot ? "w-6 bg-amber-400" : "bg-white/60"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </Link>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         <CarouselPrevious />
//         <CarouselNext />
//       </NewsletterCarouselHelper>
//     </div>
//   );
// }

"use client";
import { getAllNewsLetters } from "@/components/Services/NewsLetter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";

export default function AdvertizerNewsLetter() {
  const [banner, setBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getAllNewsLetters();
        // First image ta nibo
        if (data.data && data.data.length > 0) {
          setBanner(data.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch banner", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl flex items-center justify-center mx-auto px-4">
        <CircleLoader color="#d39e17" />
      </div>
    );
  }

  if (!banner) return null;

  return (
    <div className="max-w-7xl mx-auto px-2">
      <div className="">
        <Link
          href={banner.link?.trim() ? banner.link : "/products"}
          className="block group"
        >
          <div className="relative h-[60vh] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Banner Image */}
            <Image
              src={banner.image}
              alt={banner.title || "Advertisement"}
              fill
              className=""
              priority
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
