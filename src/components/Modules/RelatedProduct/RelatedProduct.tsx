/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/components/Services/Product";
import { toast } from "sonner";
import RelatedProductSubCard from "./RelatedProductCard";

const RelatedProduct = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const toastId = "fetching-products";
      try {
        setLoading(true);
        const data = await getAllProducts();
        const filteredProducts = (data?.data || []).filter(
          (product: any) => product?.category?.name === category
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
  }, [category]);

  return (
    <div className=" font-[Sansita]">
      {/* Section Title */}
      <h2 className="text-xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center text-amber-700 tracking-wide">
        Related Products
      </h2>

      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
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
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-2 lg:gap-3 justify-items-center">
              {products.slice(0, 5).map((product) => (
                <RelatedProductSubCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
