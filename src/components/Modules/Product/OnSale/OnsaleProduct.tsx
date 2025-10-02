/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getOnSaleProduct } from "@/components/Services/Product";
import OnSaleProductCard from "./OnSaleProductCard";
import { CircleLoader } from "react-spinners";

const OnsaleProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const toastId = "fetching-products";
      try {
        setLoading(true);
        const data = await getOnSaleProduct();
        setProducts(data?.data || []);
        // toast.success("Products fetched successfully", { id: toastId });
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
    <div className="max-w-7xl mx-auto p-6 my-10 font-[Sansita]">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-700 tracking-wide">
        On Sale Products
      </h1>
      {loading ? (
        <div className="flex items-center justify-center h-20">
          <CircleLoader color="#d39e17" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-600">No products on sale.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <OnSaleProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OnsaleProduct;
