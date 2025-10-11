// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// interface FeaturedProductCardProps {
//   product: {
//     _id: string;
//     name: string;
//     description: string;
//     images: string[];
//     price: number;
//     delPrice: number;
//     isOnSale: boolean;
//     stock: number;
//     isFeatured: boolean;
//   };
// }

// export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
//   const router = useRouter();
//   const [imageError, setImageError] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const imageSrc =
//     product.images && product.images.length > 0 && !imageError
//       ? product.images[0]
//       : "https://via.placeholder.com/300x200";

//   const stripHtml = (html: string) => {
//     return html
//       .replace(/<[^>]+>/g, "")
//       .replace(/\s+/g, " ")
//       .trim();
//   };

//   // Determine stock status
//   const getStockStatus = () => {
//     if (product.stock === 0)
//       return { text: "Out of Stock", className: "text-red-600" };
//     if (product.stock <= 5)
//       return {
//         text: `Low Stock (${product.stock})`,
//         className: "text-yellow-600",
//       };
//     return { text: `In Stock (${product.stock})`, className: "text-amber-600" };
//   };
//   const stockStatus = getStockStatus();

//   const discountPercentage = Math.round(
//     ((product.delPrice - product.price) / product.delPrice) * 100
//   );

//   return (
//     <div className="group bg-gradient-to-b from-amber-50/30 to-white rounded-xl shadow-lg border border-amber-200 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
//       {/* Image Section */}
//       <div className="relative w-full h-56 overflow-hidden">
//         {!imageLoaded && (
//           <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl"></div>
//         )}
//         <Image
//           src={imageSrc}
//           alt={product.name}
//           width={300}
//           height={200}
//           className={`object-cover w-full h-full transition-opacity duration-300 ${
//             imageLoaded ? "opacity-100" : "opacity-0"
//           }`}
//           onError={() => setImageError(true)}
//           onLoad={() => setImageLoaded(true)}
//           priority
//         />
//         <div className="absolute inset-0 bg-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         {product.isFeatured && (
//           <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
//             {/* {discountPercentage}% Off */}
//             FEATURED
//           </span>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="p-5 space-y-3 bg-amber-50/50">
//         <h3
//           className="text-lg font-bold text-amber-800 truncate"
//           title={product.name}
//         >
//           {product.name}
//         </h3>
//         <p
//           className="text-sm text-gray-600 line-clamp-2"
//           title={stripHtml(product.description)}
//           aria-label={`Description: ${stripHtml(product.description)}`}
//         >
//           {stripHtml(product.description)}
//         </p>
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <span className="text-sm font-extrabold text-amber-600">
//               Tk.{product.price.toFixed(2)}
//             </span>
//             {product.price !== product.delPrice && (
//               <span className="text-xs text-gray-400 line-through">
//                 Tk.{product.delPrice.toFixed(2)}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <span
//               className={`text-sm font-medium ${stockStatus.className}`}
//               aria-label={`Stock status: ${stockStatus.text}`}
//             >
//               {stockStatus.text}
//             </span>
//           </div>
//         </div>
//         <Button
//           onClick={() => router.push(`/products/${product._id}`)}
//           className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 rounded-lg flex items-center justify-center gap-2 py-2.5 transition-all duration-300 group/button"
//           aria-label={`View details for ${product.name}`}
//         >
//           View Details
//           <ArrowRight
//             size={16}
//             className="transition-transform duration-300 group-hover/button:translate-x-1"
//           />
//         </Button>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

interface FeaturedProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    delPrice: number;
    isOnSale: boolean;
    stock: number;
    isFeatured: boolean;
  };
}

export default function FeaturedProductCard({
  product,
}: FeaturedProductCardProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc =
    product.images && product.images.length > 0 && !imageError
      ? product.images[0]
      : "https://via.placeholder.com/300x200";

  const stripHtml = (html: string) => {
    return html
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const getStockStatus = () => {
    if (product.stock === 0)
      return {
        text: "Out of Stock",
        className: "text-red-500",
        dotColor: "bg-red-500",
      };
    if (product.stock <= 5)
      return {
        text: `Only ${product.stock} left`,
        className: "text-orange-500",
        dotColor: "bg-orange-500",
      };
    return {
      text: "In Stock",
      className: "text-amber-600",
      dotColor: "bg-amber-600",
    };
  };

  const stockStatus = getStockStatus();
  const discountPercentage = Math.round(
    ((product.delPrice - product.price) / product.delPrice) * 100
  );

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-amber-200 hover:border-amber-200 shadow-sm hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        )}
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } ${isHovered ? "scale-110" : ""}`}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          priority
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              ⭐ FEATURED
            </span>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <Link
            href={`/products/${product._id}`}
            className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-amber-500 text-amber-600 hover:text-white transition-all duration-300 shadow-lg"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </Link>
        </div>

        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
            <span
              className={`w-2 h-2 rounded-full ${stockStatus.dotColor} animate-pulse`}
            ></span>
            <span className={`text-xs font-semibold ${stockStatus.className}`}>
              {stockStatus.text}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-3 pb-2 space-y-1">
        {/* Product Name */}
        <h3
          className="text-lg font-bold text-amber-600 line-clamp-1 group-hover:text-amber-600 transition-colors duration-300"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-gray-500 line-clamp-2 leading-relaxed"
          title={stripHtml(product.description)}
        >
          {stripHtml(product.description)}
        </p>

        {/* Price Section */}
        <div className="flex  justify-between items-center gap-3 pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-amber-600">
              ৳{product.price}
            </span>
            {product.price !== product.delPrice && (
              <span className="text-xs text-gray-400 line-through">
                ৳{product.delPrice}
              </span>
            )}
          </div>
          <div>
            {product.price !== product.delPrice && (
              <span className="text-sm font-semibold text-amber-600 px-2 py-1 rounded-md mb-1">
                Save ৳{(product.delPrice - product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => router.push(`/products/${product._id}`)}
          disabled={product.stock === 0}
          className={`w-full mt-1 rounded-lg font-semibold transition-all duration-300 h-8 ${
            product.stock === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:via-amber-700 hover:to-orange-600 text-white shadow-md hover:shadow-xl"
          }`}
          aria-label={`View details for ${product.name}`}
        >
          <div className="flex items-center justify-center gap-2">
            {product.stock === 0 ? (
              <>Out of Stock</>
            ) : (
              <>
                <ShoppingCart size={18} />
                <span>View Details</span>
                <ArrowRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </>
            )}
          </div>
        </Button>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
}
