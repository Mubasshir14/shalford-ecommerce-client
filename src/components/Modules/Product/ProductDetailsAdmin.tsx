"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Color, Gender, Size } from "@/components/Types/Product";

interface ProductDetailsAdminProps {
  product: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    category: {
      name: string;
    };
    gender: Gender;
    size: Size[];
    color: Color[];
    price: number;
    delPrice: number;
    stock: number;
    isFeatured: boolean;
    isOnSale: boolean;
    isActive: boolean;
  };
}

export default function ProductDetailsAdmin({ product }: ProductDetailsAdminProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<boolean[]>([]);
  const images = product.images && product.images.length > 0 ? product.images : ["https://via.placeholder.com/600x400"];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    console.log("Product images:", product.images); // Debug image URLs
    setImageError(new Array(images.length).fill(false));

    let interval: NodeJS.Timeout;
    if (hasMultipleImages) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [images.length, hasMultipleImages, product.images]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleImageError = (index: number) => {
    setImageError((prev) => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 my-10 font-[Sansita] bg-white rounded-xl shadow-xl border border-amber-200">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-700 tracking-wide">{product.name}</h1>
      <div className="flex flex-col gap-8">
        {/* Image Slider */}
        <div className="relative rounded-xl overflow-hidden shadow-md border border-amber-300 max-w-2xl mx-auto">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={imageError[currentImageIndex] ? "https://via.placeholder.com/600x400" : images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              width={600}
              height={400}
              className="rounded-xl object-cover w-full h-full"
              onError={() => handleImageError(currentImageIndex)}
            />
            {hasMultipleImages && (
              <>
                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-amber-600 bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-100 transition-all duration-300"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-amber-600 bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-100 transition-all duration-300"
                  aria-label="Next Image"
                >
                  <ChevronRight size={28} />
                </button>
                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleIndicatorClick(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? "bg-amber-600 scale-110" : "bg-amber-300"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6 bg-amber-50/50 p-6 rounded-xl border border-amber-200 shadow-inner">
          <h2 className="text-2xl font-semibold text-amber-700 border-b border-amber-300 pb-2">Product Details</h2>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-amber-600 text-lg">Description</span>
              <div
                className="prose prose-sm max-w-none text-gray-700 bg-white p-4 rounded-md shadow-sm border border-amber-100"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">Category</span>
                <span className="text-gray-700">{product.category.name}</span>
              </div>
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">Gender</span>
                <span className="text-gray-700">{product.gender}</span>
              </div>
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">Sizes</span>
                <span className="text-gray-700">
                  {product.size.length > 0 ? product.size.join(", ") : "None"}
                </span>
              </div>
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">Colors</span>
                <span className="text-gray-700">
                  {product.color.length > 0 ? product.color.join(", ") : "None"}
                </span>
              </div>
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">Price</span>
                <span className="text-gray-700">Tk.{product.price.toFixed(2)}</span>
              </div>
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">Discounted Price</span>
                <span className="text-gray-700">${product.delPrice.toFixed(2)}</span>
              </div>
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">Stock</span>
                <span className="text-gray-700">{product.stock}</span>
              </div>
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">Featured</span>
                <span className="text-gray-700">{product.isFeatured ? "Yes" : "No"}</span>
              </div>
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">On Sale</span>
                <span className="text-gray-700">{product.isOnSale ? "Yes" : "No"}</span>
              </div>
              <div className="flex flex-col space-y-1 bg-white p-3 rounded-md shadow-sm border border-amber-100">
                <span className="font-medium text-amber-600">Active</span>
                <span className="text-gray-700">{product.isActive ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}