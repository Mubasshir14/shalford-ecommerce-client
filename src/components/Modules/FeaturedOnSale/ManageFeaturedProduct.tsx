/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookCheck, CircleX, Edit, Eye, Search } from "lucide-react";
import {
  getFeaturedProduct,
  getNotFeaturedProduct,
  OnFeaturedProductHandle,
} from "@/components/Services/Product";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function ManageFeaturedProduct() {
  const [products, setProducts] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const toastId = "fetching-products";
      try {
        setLoading(true);
        const data = await getFeaturedProduct();
        setProducts(data?.data || []);
        toast.success("Products fetched successfully", { id: toastId });
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

  // Search logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchNotFeatured = async () => {
      const toastId = "fetching-products";
      try {
        setLoading(true);
        const data = await getNotFeaturedProduct();
        setFeatured(data?.data || []);
        toast.success("Products fetched successfully", { id: toastId });
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

    fetchNotFeatured();
  }, []);

  // Search logic
  const filteredNotFeaturedProducts = featured.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 font-[Sansita]">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-amber-600">
              Manage Featured Products
            </h2>
            <p className="text-sm text-gray-500">
              View, edit, or delete products in the system
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-8 pr-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="border-2 border-amber-300 rounded-xl shadow-md bg-amber-50/30 p-6">
          {loading ? (
            <p className="text-sm text-gray-500">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No products found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Image
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Stock
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Featured
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      On Sale
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Gender
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Remove Featured
                    </th>
                    <th className="px-4 text-center py-2  text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-amber-50 transition"
                    >
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="object-cover rounded-md"
                          />
                        ) : (
                          "No image"
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        Tk.{product.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.stock}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.category.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.isFeatured ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.isOnSale ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 text-sm capitalize text-gray-700 border-b border-amber-200">
                        {product.gender}
                      </td>
                      <td className="px-4 py-2 text-sm capitalize text-gray-700 border-b border-amber-200">
                        <td className="px-4 py-2 text-sm capitalize text-gray-700 border-b border-amber-200">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                          onClick={async () => {
                            try {
                              const res = await OnFeaturedProductHandle(
                                product._id,
                                false
                              );
                              toast.success("Remove from featured!");
                            } catch (error: any) {
                              toast.error(
                                error.message || "Failed to update product"
                              );
                            }
                          }}
                          title="View Product"
                        >
                          <CircleX size={16} />
                        </Button>
                      </td>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                            onClick={() =>
                              router.push(
                                `/admin/dashboard/product-details/${product._id}`
                              )
                            }
                            title="View Product"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() =>
                              router.push(
                                `/admin/dashboard/update-product/${product._id}`
                              )
                            }
                            title="Edit Product"
                          >
                            <Edit size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Not Featured */}
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-amber-600">
              Make Featured Products
            </h2>
            <p className="text-sm text-gray-500">
              View, edit, or delete products in the system
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-8 pr-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="border-2 border-amber-300 rounded-xl shadow-md bg-amber-50/30 p-6">
          {loading ? (
            <p className="text-sm text-gray-500">Loading products...</p>
          ) : filteredNotFeaturedProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No products found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Image
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Stock
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Featured
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      On Sale
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Gender
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Make Featured
                    </th>
                    <th className="px-4 text-center py-2  text-sm font-semibold text-amber-600 border-b border-amber-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotFeaturedProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-amber-50 transition"
                    >
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="object-cover rounded-md"
                          />
                        ) : (
                          "No image"
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        Tk.{product.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.stock}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.category.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.isFeatured ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        {product.isOnSale ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 text-sm capitalize text-gray-700 border-b border-amber-200">
                        {product.gender}
                      </td>
                      <td className="px-4 py-2 text-sm capitalize text-gray-700 border-b border-amber-200">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                          onClick={async () => {
                            try {
                              const res = await OnFeaturedProductHandle(
                                product._id,
                                true
                              );
                              toast.success("Product marked as on featured!");
                            } catch (error: any) {
                              toast.error(
                                error.message || "Failed to update product"
                              );
                            }
                          }}
                          title="View Product"
                        >
                          <BookCheck size={16} />
                        </Button>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                            onClick={() =>
                              router.push(
                                `/admin/dashboard/product-details/${product._id}`
                              )
                            }
                            title="View Product"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() =>
                              router.push(
                                `/admin/dashboard/update-product/${product._id}`
                              )
                            }
                            title="Edit Product"
                          >
                            <Edit size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
