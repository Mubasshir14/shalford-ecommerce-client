
// "use client";

// import { Button } from "@/components/ui/button";
// import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// interface ProductCardProps {
//   product: {
//     _id: string;
//     name: string;
//     description: string;
//     images: string[];
//     price: number;
//     delPrice: number;
//     isOnSale: boolean;
//     stock: number;
//   };
// }

// export default function AllProductSubCard({ product }: ProductCardProps) {
//   const router = useRouter();
//   const [imageError, setImageError] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const imageSrc =
//     product.images && product.images.length > 0 && !imageError
//       ? product.images[0]
//       : "https://via.placeholder.com/300x200";

//   const stripHtml = (html: string) =>
//     html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

//   const getStockStatus = () => {
//     if (product.stock === 0)
//       return { text: "Out of Stock", className: "text-red-500", dotColor: "bg-red-500" };
//     if (product.stock <= 5)
//       return { text: `Only ${product.stock} left`, className: "text-orange-500", dotColor: "bg-orange-500" };
//     return { text: "In Stock", className: "text-amber-600", dotColor: "bg-amber-600" };
//   };

//   const stockStatus = getStockStatus();
//   const discountPercentage = product.price !== product.delPrice
//     ? Math.round(((product.delPrice - product.price) / product.delPrice) * 100)
//     : 0;

//   return (
//     <div
//       className="group relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-amber-200 hover:border-amber-200 shadow-sm hover:shadow-xl h-[350px] sm:w-[235px] lg:w-[245px]"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image Section */}
//       <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
//         {!imageLoaded && (
//           <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
//         )}
//         <Image
//           src={imageSrc}
//           alt={product.name}
//           fill
//           className={`object-cover transition-all duration-700 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} ${isHovered ? "scale-110" : ""}`}
//           onError={() => setImageError(true)}
//           onLoad={() => setImageLoaded(true)}
//           priority
//         />

//         {/* Gradient Overlay */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
//             isHovered ? "opacity-100" : "opacity-0"
//           }`}
//         />

//         {/* Quick Action Button */}
//         <div
//           className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
//             isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
//           }`}
//         >
//           <Link
//             href={`/products/${product._id}`}
//             className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg"
//             aria-label="Quick view"
//           >
//             <Eye size={18} />
//           </Link>
//         </div>

//         {/* Stock Badge */}
//         <div className="absolute bottom-3 left-3">
//           <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
//             <span className={`w-2 h-2 rounded-full ${stockStatus.dotColor} animate-pulse`} />
//             <span className={`text-xs font-semibold ${stockStatus.className}`}>{stockStatus.text}</span>
//           </div>
//         </div>

//         {/* Discount Badge */}
//         {product.price !== product.delPrice && (
//           <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
//             {discountPercentage}% Off
//           </span>
//         )}
//       </div>

//       {/* Content */}
//       <div className="px-3 pb-2 space-y-1 bg-amber-50/50">
//         <h3
//           className="text-md font-semibold text-amber-800 line-clamp-1 group-hover:text-amber-600 transition-colors duration-300"
//           title={product.name}
//         >
//           {product.name}
//         </h3>
//         <p
//           className="text-xs text-gray-600 line-clamp-2"
//           title={stripHtml(product.description)}
//         >
//           {stripHtml(product.description)}
//         </p>

//         {/* Price Section */}
//         <div className="flex justify-between items-center pt-2">
//           <div className="flex flex-col">
//             <span className="text-sm font-bold text-amber-600">৳{product.price.toFixed(2)}</span>
//             {product.price !== product.delPrice && (
//               <span className="text-xs text-gray-400 line-through">৳{product.delPrice.toFixed(2)}</span>
//             )}
//           </div>
//         </div>

//         {/* Action Button */}
//         <Button
//           onClick={() => router.push(`/products/${product._id}`)}
//           disabled={product.stock === 0}
//           className={`w-full mt-1 rounded-lg font-semibold transition-all duration-300 h-8 ${
//             product.stock === 0
//               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//               : "bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:via-amber-700 hover:to-orange-600 text-white shadow-md hover:shadow-xl"
//           }`}
//         >
//           <div className="flex items-center justify-center gap-2">
//             {product.stock === 0 ? (
//               <>Out of Stock</>
//             ) : (
//               <>
//                 <ShoppingCart size={18} />
//                 <span>View Details</span>
//                 <ArrowRight
//                   size={18}
//                   className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
//                 />
//               </>
//             )}
//           </div>
//         </Button>
//       </div>

//       <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    delPrice: number;
    isOnSale: boolean;
    stock: number;
  };
}

export default function AllProductSubCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc =
    product.images && product.images.length > 0 && !imageError
      ? product.images[0]
      : "https://via.placeholder.com/300x200";

  const stripHtml = (html: string) =>
    html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

  const getStockStatus = () => {
    if (product.stock === 0)
      return { text: "Out of Stock", className: "text-red-500", dotColor: "bg-red-500" };
    if (product.stock <= 5)
      return { text: `Only ${product.stock} left`, className: "text-orange-500", dotColor: "bg-orange-500" };
    return { text: "In Stock", className: "text-amber-600", dotColor: "bg-amber-600" };
  };

  const stockStatus = getStockStatus();
  const discountPercentage = product.price !== product.delPrice
    ? Math.round(((product.delPrice - product.price) / product.delPrice) * 100)
    : 0;

  return (
    <div
      className="group relative rounded-lg transition-all duration-500 hover:-translate-y-2 border border-amber-200 hover:border-amber-300 shadow-sm hover:shadow-xl h-[350px] sm:w-[235px] lg:w-[245px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative w-full h-44 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        )}
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} ${isHovered ? "scale-110" : ""}`}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          priority
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Quick Action Button */}
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

        {/* Stock Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
            <span className={`w-2 h-2 rounded-full ${stockStatus.dotColor} animate-pulse`} />
            <span className={`text-xs font-semibold ${stockStatus.className}`}>{stockStatus.text}</span>
          </div>
        </div>

        {/* Discount Badge */}
        {product.price !== product.delPrice && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {discountPercentage}% Off
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-3 pb-2 space-y-1 bg-amber-50/50 rounded-b-xl">
        <h3
          className="text-md font-semibold text-amber-800 line-clamp-1 group-hover:text-amber-600 transition-colors duration-300 pt-2"
          title={product.name}
        >
          {product.name}
        </h3>
        <p
          className="text-xs text-gray-600 line-clamp-2"
          title={stripHtml(product.description)}
        >
          {stripHtml(product.description)}
        </p>

        {/* Price Section */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-amber-600">৳{product.price}</span>
            {product.price !== product.delPrice && (
              <span className="text-xs text-gray-400 line-through">৳{product.delPrice}</span>
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
                  className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                />
              </>
            )}
          </div>
        </Button>
      </div>

      {/* Bottom Gradient Border - Now Visible */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl" />
    </div>
  );
}