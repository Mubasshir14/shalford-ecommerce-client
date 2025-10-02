/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllProducts } from "@/components/Services/Product";
import { CircleLoader } from "react-spinners";
import OtherProductCard from "./OtherProductCard";

const OtherProduct = () => {
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
            product?.category?.name === "Key Ring" ||
            product?.category?.name === "Mugs"
        );

        setProducts(filteredProducts);
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
    <div className="max-w-7xl mx-auto p-6 mt-14  font-[Sansita]">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-700 tracking-wide">
        Discover More
      </h1>
      {loading ? (
        <div className="flex items-center justify-center h-20">
          <CircleLoader color="#d39e17" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-600">No products </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0.8).map((product) => (
            <OtherProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherProduct;
