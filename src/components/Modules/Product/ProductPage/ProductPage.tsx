/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AllProductCard from "./AllProductCard";
import { Button } from "@/components/ui/button";
import {
  getAllProducts,
  getCategoryWisedProduct,
} from "@/components/Services/Product";
import { getAllCategory } from "@/components/Services/Category";
import { Menu, X } from "lucide-react";
import ProductSidebar from "./ProductSidebar";
import { useSearchParams } from "next/navigation";
import { CircleLoader } from "react-spinners";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const genderParam = searchParams.get("gender");
  const categoryParam = searchParams.get("category");

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
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

  const [activeFilter, setActiveFilter] = useState<{
    type: "all" | "gender" | "category" | "price" | null;
    value: string | null;
    displayName: string;
  }>({ type: "all", value: null, displayName: "All Products" });

  useEffect(() => {
    fetchAllProducts();
  }, []);

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

  useEffect(() => {
    if (genderParam && allProducts.length > 0) {
      const filtered = allProducts.filter(
        (p) => p.gender?.toLowerCase() === genderParam.toLowerCase()
      );
      setProducts(filtered);

      let displayName = "Products";
      if (genderParam === "male") displayName = "Men's Products";
      else if (genderParam === "female") displayName = "Women's Products";
      else if (genderParam === "unisex") displayName = "Unisex Products";

      setActiveFilter({ type: "gender", value: genderParam, displayName });
      setCurrentPage(1);
      // Reset price on gender change
      setMinPrice("");
      setMaxPrice("");
    }
  }, [genderParam, allProducts.length]);

  useEffect(() => {
    if (categoryParam && categories.length > 0) {
      handleCategoryClick(categoryParam);
    }
  }, [categoryParam, categories.length]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      const fetchedProducts = data?.data || [];
      setAllProducts(fetchedProducts);
      setProducts(fetchedProducts);

      if (!genderParam && !categoryParam) {
        setActiveFilter({
          type: "all",
          value: null,
          displayName: "All Products",
        });
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch products";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (categoryId: string) => {
    try {
      setLoading(true);
      const data = await getCategoryWisedProduct(categoryId);
      setProducts(data?.data || []);
      setCurrentPage(1);

      const category = categories.find((cat) => cat._id === categoryId);
      const categoryName = category ? category.name : "Category";

      setActiveFilter({
        type: "category",
        value: categoryId,
        displayName: categoryName,
      });
      // Reset price on category change
      setMinPrice("");
      setMaxPrice("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch products by category");
    } finally {
      setLoading(false);
    }
  };

  const handleGenderClick = (gender: string) => {
    if (!gender) {
      setProducts(allProducts);
      setActiveFilter({
        type: "all",
        value: null,
        displayName: "All Products",
      });
      setCurrentPage(1);
      // Reset price
      setMinPrice("");
      setMaxPrice("");
      return;
    }
    const filtered = allProducts.filter(
      (p) => p.gender?.toLowerCase() === gender.toLowerCase()
    );
    setProducts(filtered);

    let displayName = "Products";
    if (gender === "male") displayName = "Men's Products";
    else if (gender === "female") displayName = "Women's Products";
    else if (gender === "unisex") displayName = "Unisex Products";

    setActiveFilter({ type: "gender", value: gender, displayName });
    setCurrentPage(1);
    // Reset price
    setMinPrice("");
    setMaxPrice("");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setProducts(allProducts);
      setActiveFilter({
        type: "all",
        value: null,
        displayName: "All Products",
      });
      // Reset price
      setMinPrice("");
      setMaxPrice("");
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allProducts.filter((p) => {
      const productName = p.name?.toLowerCase() || "";
      const categoryName = p.category?.name?.toLowerCase() || "";
      const gender = p.gender?.toLowerCase() || "";
      const description = p.description?.toLowerCase() || "";

      return (
        productName.includes(query) ||
        categoryName.includes(query) ||
        gender.includes(query) ||
        description.includes(query)
      );
    });

    setProducts(filtered);
    setActiveFilter({
      type: "all",
      value: null,
      displayName: `Search Results for ${
        searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)
      }`,
    });
    setCurrentPage(1);
    // Reset price
    setMinPrice("");
    setMaxPrice("");
  };

  const handlePriceFilter = () => {
    // Skip if no price values set (empty/default)
    if (!minPrice && !maxPrice) return;

    // Filter from CURRENT products (cumulative)
    let filteredProducts = products.filter((p) => {
      const price = p.price;
      return (
        (!minPrice || price >= parseFloat(minPrice)) &&
        (!maxPrice || price <= parseFloat(maxPrice))
      );
    });

    // If no results after filter, show toast and revert
    if (filteredProducts.length === 0) {
      toast.warning("No products found in this price range. Showing all.");
      filteredProducts = products;
    }

    setProducts(filteredProducts);
    setCurrentPage(1);

    // Update title by appending price range
    let priceSuffix = "";
    if (minPrice && maxPrice) {
      priceSuffix = ` ($${minPrice} - $${maxPrice})`;
    } else if (minPrice) {
      priceSuffix = ` ($${minPrice}+)`;
    } else if (maxPrice) {
      priceSuffix = ` (Up to $${maxPrice})`;
    }

    const newDisplayName = activeFilter.displayName + priceSuffix;
    setActiveFilter({
      ...activeFilter,
      type: "price", // Mark as price-active
      value: `${minPrice || 0}-${maxPrice || "∞"}`, // For internal tracking
      displayName: newDisplayName,
    });
  };

  // New: Clear price filter function (passed to sidebar)
  const clearPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    // Revert to pre-price products (but since we don't store it, refetch based on active type)
    if (activeFilter.type === "category") {
      handleCategoryClick(activeFilter.value || "");
    } else if (activeFilter.type === "gender") {
      handleGenderClick(activeFilter.value || "");
    } else {
      fetchAllProducts();
    }
    setActiveFilter((prev) => ({
      ...prev,
      type: prev.type === "price" ? "all" : prev.type,
      value: prev.type === "price" ? null : prev.value,
      displayName: prev.displayName.replace(/\s*\(\$[^\)]+\)/, ""),
    })); // Strip price suffix
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 font-[Sansita]">
      <h1 className="text-3xl mt-10 font-bold mb-6 text-amber-700 text-center tracking-wide">
        {activeFilter.displayName}
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
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <ProductSidebar
            categories={categories}
            loadingCategories={loadingCategories}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleGenderClick={handleGenderClick}
            handleCategoryClick={handleCategoryClick}
            fetchAllProducts={fetchAllProducts}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            handlePriceFilter={handlePriceFilter}
            clearPriceFilter={clearPriceFilter}
            isPriceFilterOpen={isPriceFilterOpen}
            setIsPriceFilterOpen={setIsPriceFilterOpen}
            activeFilter={activeFilter}
          />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 transform transition-transform duration-300 md:hidden overflow-y-auto ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mt-20">
            <ProductSidebar
              categories={categories}
              loadingCategories={loadingCategories}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              handleGenderClick={handleGenderClick}
              handleCategoryClick={handleCategoryClick}
              fetchAllProducts={fetchAllProducts}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              handlePriceFilter={handlePriceFilter}
              clearPriceFilter={clearPriceFilter}
              isPriceFilterOpen={isPriceFilterOpen}
              setIsPriceFilterOpen={setIsPriceFilterOpen}
              activeFilter={activeFilter}
            />
          </div>
        </div>

        {/* Products Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-20">
              <CircleLoader color="#d39e17" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-600">
              No products available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <AllProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {products.length > 0 && (
            <div className="flex flex-wrap justify-center mt-6 gap-2">
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-amber-600 text-white hover:bg-amber-700 rounded-lg disabled:opacity-50"
              >
                Previous
              </Button>
              {Array.from({
                length: Math.ceil(products.length / itemsPerPage),
              }).map((_, index) => (
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
                disabled={
                  currentPage === Math.ceil(products.length / itemsPerPage)
                }
                className="bg-amber-600 text-white hover:bg-amber-700 rounded-lg disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
