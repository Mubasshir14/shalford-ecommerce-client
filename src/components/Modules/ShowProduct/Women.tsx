
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getAllProducts, getCategoryWisedProduct } from "@/components/Services/Product";
import { getAllCategory } from "@/components/Services/Category";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";
import AllProductCard from "../Product/ProductPage/AllProductCard";

const Women = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]); // master list
  const [products, setProducts] = useState<any[]>([]); // filtered list
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      const maleProducts = (data?.data || []).filter(
      (p: any) => p.gender?.toLowerCase() === "female"
    );
      setAllProducts(maleProducts || []);
      setProducts(maleProducts || []); 
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to fetch products";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getAllCategory();
        setCategories(data?.data || []);
      } catch (err: any) {
        toast.error(err?.message || "Failed to fetch categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId: string) => {
    try {
      setLoading(true);
      const data = await getCategoryWisedProduct(categoryId);
      setProducts(data?.data || []);
      setCurrentPage(1);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch products by category");
    } finally {
      setLoading(false);
    }
  };

  const handleGenderClick = (gender: string) => {
    if (!gender) {
      setProducts(allProducts); // reset to all
      return;
    }
    const filtered = allProducts.filter(
      (p) => p.gender?.toLowerCase() === gender.toLowerCase()
    );
    setProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      setProducts(allProducts);
      return;
    }
    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filtered);
  };

  const handlePriceFilter = () => {
    if (!minPrice && !maxPrice) return;
    const filtered = allProducts.filter((p) => {
      const price = p.price;
      return (
        (!minPrice || price >= parseFloat(minPrice)) &&
        (!maxPrice || price <= parseFloat(maxPrice))
      );
    });
    setProducts(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 font-[Sansita]">
      <h1 className="text-3xl mt-10 font-bold mb-6 text-amber-700 text-center tracking-wide">
       Women Products
      </h1>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-end mb-4">
        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="border border-amber-400 rounded-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white border border-amber-200 p-4 rounded-lg shadow-md flex-shrink-0 md:mt-0 mt-20 z-50 md:z-0 transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
        >
          <form onSubmit={handleSearch} className="mb-4 relative">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-amber-300 focus:ring-amber-500 rounded-lg"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
              🔍
            </span>
          </form>

          {/* Gender Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-amber-700 mb-2">Gender</h3>
            <nav className="space-y-1">
              <button
                onClick={() => handleGenderClick("male")}
                className="block w-full text-left px-3 py-1 rounded hover:bg-amber-100"
              >
                Men
              </button>
              <button
                onClick={() => handleGenderClick("female")}
                className="block w-full text-left px-3 py-1 rounded hover:bg-amber-100"
              >
                Women
              </button>
              <button
                onClick={() => handleGenderClick("unisex")}
                className="block w-full text-left px-3 py-1 rounded hover:bg-amber-100"
              >
                Unisex
              </button>
              <button
                onClick={() => handleGenderClick("")}
                className="block w-full text-left px-3 py-1 rounded hover:bg-amber-200 font-semibold text-amber-700"
              >
                Show All
              </button>
            </nav>
          </div>

          {/* Categories */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-amber-700 mb-2">All Categories</h3>
            {loadingCategories ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : categories.length === 0 ? (
              <p className="text-sm text-gray-500">No categories found.</p>
            ) : (
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => handleCategoryClick(cat._id)}
                    className="block w-full text-left px-3 py-1 rounded hover:bg-amber-100"
                  >
                    {cat.name}
                  </button>
                ))}
                <button
                  onClick={fetchAllProducts}
                  className="block w-full text-left px-3 py-1 rounded hover:bg-amber-200 font-semibold text-amber-700"
                >
                  Show All Products
                </button>
              </nav>
            )}
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h3
              className="text-lg font-semibold text-amber-700 mb-2 cursor-pointer"
              onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
            >
              Price Filter
            </h3>
            {isPriceFilterOpen && (
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border-amber-300 focus:ring-amber-500 rounded-lg"
                />
                <Input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border-amber-300 focus:ring-amber-500 rounded-lg"
                />
                <Button
                  onClick={handlePriceFilter}
                  className="w-full bg-amber-600 text-white hover:bg-amber-700 rounded-lg"
                >
                  Apply
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Products */}
        <main className="flex-1 md:ml-0">
          {loading ? (
            <div className="text-center text-gray-600">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-600">No products available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <AllProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-wrap justify-center mt-6 gap-2">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-amber-600 text-white hover:bg-amber-700 rounded-lg"
            >
              Previous
            </Button>
            {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-amber-600 text-white"
                    : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-700 hover:text-white"
                }`}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
              className="bg-amber-600 text-white hover:bg-amber-700 rounded-lg"
            >
              Next
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Women;



