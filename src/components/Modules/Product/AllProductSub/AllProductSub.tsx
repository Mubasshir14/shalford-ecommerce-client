/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import men from "../../../../assets/men.png";
import women from "../../../../assets/womenr.png";
import unisex from "../../../../assets/unisex.png";
import { getAllProducts } from "@/components/Services/Product";
import { toast } from "sonner";
import AllProductSubCard from "./AllProductSubCard";

const AllProductSub = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const toastId = "fetching-products";
      try {
        setLoading(true);
        const data = await getAllProducts();
        const filteredProducts = (data?.data || []).filter(
          (product: any) =>
            product?.category?.name !== "Key Ring" &&
            product?.category?.name !== "Mugs"
        );

        setProducts(filteredProducts || []);
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch products";
        toast.error(message, { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mb-4 font-[Sansita]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl  font-bold mb-6 sm:mb-8 lg:mb-12 text-center text-amber-700 tracking-wide">
          All Products
        </h2>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Category Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {/* Men's Collection */}
            <Link
              href="/products?gender=male"
              className="w-full h-48 sm:h-56 lg:h-64 relative rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-amber-50/50 to-white"
            >
              <Image
                src={men}
                fill
                alt="Men's Collection"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Link>

            {/* Women's Collection */}
            <Link
              href="/products?gender=female"
              className="w-full h-48 sm:h-56 lg:h-64 relative rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-amber-50/50 to-white"
            >
              <Image
                src={women}
                fill
                alt="Women's Collection"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Link>

            {/* Unisex Collection */}
            <Link
              href="/products?gender=unisex"
              className="w-full h-48 sm:h-56 lg:h-64 relative rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-amber-50/50 to-white sm:col-span-2 lg:col-span-1"
            >
              <Image
                src={unisex}
                fill
                alt="Unisex Collection"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
              />
            </Link>
          </div>

          <div>
            {loading ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Loading products...
                  </p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <p className="text-gray-600 text-sm sm:text-base">
                  No products available.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-2 lg:gap-6 justify-items-center">
                {products.slice(0, 5).map((product) => (
                  <AllProductSubCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>

          {/* See More Button */}
          {products.length > 0 && (
            <div className="flex items-center justify-center ">
              <Link
                href="/products"
                className="bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 rounded-lg h-8 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                All Products
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductSub;
