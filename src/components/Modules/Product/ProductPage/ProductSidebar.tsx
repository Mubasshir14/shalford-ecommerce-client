/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductSidebarProps {
  categories: any[];
  loadingCategories: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleGenderClick: (gender: string) => void;
  handleCategoryClick: (categoryId: string) => void;
  fetchAllProducts: () => void;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  handlePriceFilter: () => void;
  isPriceFilterOpen: boolean;
  setIsPriceFilterOpen: (value: boolean) => void;
  activeFilter: {
    type: "all" | "gender" | "category" | null;
    value: string | null;
    displayName: string;
  };
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  categories,
  loadingCategories,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleGenderClick,
  handleCategoryClick,
  fetchAllProducts,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  handlePriceFilter,
  isPriceFilterOpen,
  setIsPriceFilterOpen,
  activeFilter,
}) => {
  return (
    <aside className="w-64 bg-white border border-amber-200 p-4 rounded-lg shadow-md flex-shrink-0">
      <form onSubmit={handleSearch} className="mb-4 relative">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-amber-300 focus:ring-amber-500 rounded-lg capitalize"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
          🔍
        </span>
      </form>

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

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-amber-700 mb-2">Gender</h3>
        <nav className="space-y-1">
          <button
            onClick={() => handleGenderClick("male")}
            className={`block w-full text-left px-3 py-1 rounded transition-colors ${
              activeFilter.type === "gender" && activeFilter.value === "male"
                ? "bg-amber-600 text-white font-semibold"
                : "hover:bg-amber-100"
            }`}
          >
            Men
          </button>
          <button
            onClick={() => handleGenderClick("female")}
            className={`block w-full text-left px-3 py-1 rounded transition-colors ${
              activeFilter.type === "gender" && activeFilter.value === "female"
                ? "bg-amber-600 text-white font-semibold"
                : "hover:bg-amber-100"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => handleGenderClick("unisex")}
            className={`block w-full text-left px-3 py-1 rounded transition-colors ${
              activeFilter.type === "gender" && activeFilter.value === "unisex"
                ? "bg-amber-600 text-white font-semibold"
                : "hover:bg-amber-100"
            }`}
          >
            Unisex
          </button>
          <button
            onClick={() => handleGenderClick("")}
            className={`block w-full text-left px-3 py-1 rounded transition-colors ${
              activeFilter.type === "all"
                ? "bg-amber-200 text-amber-700 font-semibold"
                : "hover:bg-amber-200 text-amber-700 font-semibold"
            }`}
          >
            Show All
          </button>
        </nav>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-amber-700 mb-2">
          All Categories
        </h3>
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
                className={`block w-full text-left px-3 py-1 rounded transition-colors ${
                  activeFilter.type === "category" &&
                  activeFilter.value === cat._id
                    ? "bg-amber-600 text-white font-semibold"
                    : "hover:bg-amber-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={fetchAllProducts}
              className={`block w-full text-left px-3 py-1 rounded transition-colors ${
                activeFilter.type === "all"
                  ? "bg-amber-200 text-amber-700 font-semibold"
                  : "hover:bg-amber-200 text-amber-700 font-semibold"
              }`}
            >
              Show All Products
            </button>
          </nav>
        )}
      </div>
    </aside>
  );
};

export default ProductSidebar;
