/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface ProductSidebarProps {
//   categories: any[];
//   loadingCategories: boolean;
//   searchQuery: string;
//   setSearchQuery: (value: string) => void;
//   handleSearch: (e: React.FormEvent) => void;
//   handleGenderClick: (gender: string) => void;
//   handleCategoryClick: (categoryId: string) => void;
//   fetchAllProducts: () => void;
//   minPrice: string;
//   maxPrice: string;
//   setMinPrice: (value: string) => void;
//   setMaxPrice: (value: string) => void;
//   handlePriceFilter: () => void;
//   isPriceFilterOpen: boolean;
//   setIsPriceFilterOpen: (value: boolean) => void;
//   activeFilter: {
//     type: "all" | "gender" | "category" | null;
//     value: string | null;
//     displayName: string;
//   };
// }

// const ProductSidebar: React.FC<ProductSidebarProps> = ({
//   categories,
//   loadingCategories,
//   searchQuery,
//   setSearchQuery,
//   handleSearch,
//   handleGenderClick,
//   handleCategoryClick,
//   fetchAllProducts,
//   minPrice,
//   maxPrice,
//   setMinPrice,
//   setMaxPrice,
//   handlePriceFilter,
//   isPriceFilterOpen,
//   setIsPriceFilterOpen,
//   activeFilter,
// }) => {
//   return (
//     <aside className="w-64 bg-white border border-amber-200 p-4 rounded-lg shadow-md flex-shrink-0">
//       <form onSubmit={handleSearch} className="mb-4 relative">
//         <Input
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="pl-10 border-amber-300 focus:ring-amber-500 rounded-lg capitalize"
//         />
//         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
//           🔍
//         </span>
//       </form>

//       <div className="mb-4">
//         <h3
//           className="text-lg font-semibold text-amber-700 mb-2 cursor-pointer"
//           onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
//         >
//           Price Filter
//         </h3>
//         {isPriceFilterOpen && (
//           <div className="space-y-2">
//             <Input
//               type="number"
//               placeholder="Min Price"
//               value={minPrice}
//               onChange={(e) => setMinPrice(e.target.value)}
//               className="border-amber-300 focus:ring-amber-500 rounded-lg"
//             />
//             <Input
//               type="number"
//               placeholder="Max Price"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//               className="border-amber-300 focus:ring-amber-500 rounded-lg"
//             />
//             <Button
//               onClick={handlePriceFilter}
//               className="w-full bg-amber-600 text-white hover:bg-amber-700 rounded-lg"
//             >
//               Apply
//             </Button>
//           </div>
//         )}
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold text-amber-700 mb-2">Gender</h3>
//         <nav className="space-y-1">
//           <button
//             onClick={() => handleGenderClick("male")}
//             className={`block w-full text-left px-3 py-1 rounded transition-colors ${
//               activeFilter.type === "gender" && activeFilter.value === "male"
//                 ? "bg-amber-600 text-white font-semibold"
//                 : "hover:bg-amber-100"
//             }`}
//           >
//             Men
//           </button>
//           <button
//             onClick={() => handleGenderClick("female")}
//             className={`block w-full text-left px-3 py-1 rounded transition-colors ${
//               activeFilter.type === "gender" && activeFilter.value === "female"
//                 ? "bg-amber-600 text-white font-semibold"
//                 : "hover:bg-amber-100"
//             }`}
//           >
//             Women
//           </button>
//           <button
//             onClick={() => handleGenderClick("unisex")}
//             className={`block w-full text-left px-3 py-1 rounded transition-colors ${
//               activeFilter.type === "gender" && activeFilter.value === "unisex"
//                 ? "bg-amber-600 text-white font-semibold"
//                 : "hover:bg-amber-100"
//             }`}
//           >
//             Unisex
//           </button>
//           <button
//             onClick={() => handleGenderClick("")}
//             className={`block w-full text-left px-3 py-1 rounded transition-colors ${
//               activeFilter.type === "all"
//                 ? "bg-amber-200 text-amber-700 font-semibold"
//                 : "hover:bg-amber-200 text-amber-700 font-semibold"
//             }`}
//           >
//             Show All
//           </button>
//         </nav>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold text-amber-700 mb-2">
//           All Categories
//         </h3>
//         {loadingCategories ? (
//           <p className="text-sm text-gray-500">Loading...</p>
//         ) : categories.length === 0 ? (
//           <p className="text-sm text-gray-500">No categories found.</p>
//         ) : (
//           <nav className="space-y-1">
//             {categories.map((cat) => (
//               <button
//                 key={cat._id}
//                 onClick={() => handleCategoryClick(cat._id)}
//                 className={`block w-full text-left px-3 py-1 rounded transition-colors ${
//                   activeFilter.type === "category" &&
//                   activeFilter.value === cat._id
//                     ? "bg-amber-600 text-white font-semibold"
//                     : "hover:bg-amber-100"
//                 }`}
//               >
//                 {cat.name}
//               </button>
//             ))}
//             <button
//               onClick={fetchAllProducts}
//               className={`block w-full text-left px-3 py-1 rounded transition-colors ${
//                 activeFilter.type === "all"
//                   ? "bg-amber-200 text-amber-700 font-semibold"
//                   : "hover:bg-amber-200 text-amber-700 font-semibold"
//               }`}
//             >
//               Show All Products
//             </button>
//           </nav>
//         )}
//       </div>
//     </aside>
//   );
// };


import React, { useState, useEffect } from "react";
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
  clearPriceFilter: () => void; 
  isPriceFilterOpen: boolean;
  setIsPriceFilterOpen: (value: boolean) => void;
  activeFilter: {
    type: "all" | "gender" | "category" | "price" | null;
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
  clearPriceFilter,
  isPriceFilterOpen,
  setIsPriceFilterOpen,
  activeFilter,
}) => {
  const [localMinPrice, setLocalMinPrice] = useState(0);
  const [localMaxPrice, setLocalMaxPrice] = useState(10000);
  const MIN_PRICE = 0;
  const MAX_PRICE = 10000;

  useEffect(() => {
    if (minPrice && minPrice !== "") {
      setLocalMinPrice(parseInt(minPrice));
    } else {
      setLocalMinPrice(MIN_PRICE);
    }
    if (maxPrice && maxPrice !== "") {
      setLocalMaxPrice(parseInt(maxPrice));
    } else {
      setLocalMaxPrice(MAX_PRICE);
    }
  }, [minPrice, maxPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || MIN_PRICE;
    if (value <= localMaxPrice && value >= MIN_PRICE && value <= MAX_PRICE) {
      setLocalMinPrice(value);
      setMinPrice(value.toString());
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || MAX_PRICE;
    if (value >= localMinPrice && value >= MIN_PRICE && value <= MAX_PRICE) {
      setLocalMaxPrice(value);
      setMaxPrice(value.toString());
    }
  };

  const minPercent = ((localMinPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPercent = ((localMaxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <aside className="w-64 bg-white border border-amber-200 p-4 rounded-lg shadow-md flex-shrink-0">
      {/* Search */}
      <div className="mb-4 relative">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(e as any);
            }
          }}
          className="pl-10 border-amber-300 focus:ring-amber-500 rounded-lg capitalize"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
          🔍
        </span>
        <button
          onClick={(e) => handleSearch(e as any)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-700 text-xs font-medium"
        >
          Search
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h3
          className="text-lg font-semibold text-amber-700 mb-4 cursor-pointer flex items-center justify-between"
          onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
        >
          Price Range
          <span className={`text-sm transition-transform duration-200 ${isPriceFilterOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </h3>
        {isPriceFilterOpen && (
          <div className="space-y-4">
            <div className="relative pt-2 pb-6">
              <div className="relative h-1.5 bg-gray-200 rounded-full">
                <div
                  className="absolute h-full bg-amber-600 rounded-full"
                  style={{
                    left: `${minPercent}%`,
                    right: `${100 - maxPercent}%`,
                  }}
                />
                
                {/* Min Thumb */}
                <div
                  className="absolute w-5 h-5 bg-amber-600 rounded-full -top-1.5 cursor-pointer shadow-lg border-2 border-white hover:scale-110 transition-transform"
                  style={{ left: `calc(${minPercent}% - 10px)` }}
                />
                
                {/* Max Thumb */}
                <div
                  className="absolute w-5 h-5 bg-amber-600 rounded-full -top-1.5 cursor-pointer shadow-lg border-2 border-white hover:scale-110 transition-transform"
                  style={{ left: `calc(${maxPercent}% - 10px)` }}
                />
              </div>

              {/* Hidden Range Inputs */}
              <Input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={localMinPrice}
                onChange={handleMinChange}
                className="absolute w-full h-1.5 top-2 opacity-0 cursor-pointer z-10"
                style={{ pointerEvents: 'all' }}
              />
              <Input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={localMaxPrice}
                onChange={handleMaxChange}
                className="absolute w-full h-1.5 top-2 opacity-0 cursor-pointer z-10"
                style={{ pointerEvents: 'all' }}
              />
            </div>

            {/* Price Display */}
            <div className="flex items-center justify-center gap-3 text-lg font-semibold text-gray-700">
              <span className="text-amber-600">${localMinPrice}</span>
              <span className="text-gray-400">—</span>
              <span className="text-amber-600">${localMaxPrice}</span>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Min</label>
                <Input
                  type="number"
                  placeholder="Min"
                  value={localMinPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (value <= localMaxPrice && value >= MIN_PRICE) {
                      setLocalMinPrice(value);
                      setMinPrice(value.toString());
                    }
                  }}
                  className="border-amber-300 focus:ring-amber-500 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Max</label>
                <Input
                  type="number"
                  placeholder="Max"
                  value={localMaxPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || MAX_PRICE;
                    if (value >= localMinPrice && value <= MAX_PRICE) {
                      setLocalMaxPrice(value);
                      setMaxPrice(value.toString());
                    }
                  }}
                  className="border-amber-300 focus:ring-amber-500 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handlePriceFilter}
                className="flex-1 bg-amber-600 text-white hover:bg-amber-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Apply Filter
              </Button>
              {(minPrice || maxPrice) && (
                <Button
                  onClick={clearPriceFilter}
                  variant="outline"
                  className="flex-1 border-amber-300 text-amber-600 hover:bg-amber-50 rounded-lg"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gender Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-amber-700 mb-2">Gender</h3>
        <nav className="space-y-1">
          <button
            onClick={() => handleGenderClick("male")}
            className={`block w-full text-left px-3 py-2 rounded transition-colors ${
              activeFilter.type === "gender" && activeFilter.value === "male"
                ? "bg-amber-600 text-white font-semibold"
                : "hover:bg-amber-100 text-gray-700"
            }`}
          >
            Men
          </button>
          <button
            onClick={() => handleGenderClick("female")}
            className={`block w-full text-left px-3 py-2 rounded transition-colors ${
              activeFilter.type === "gender" && activeFilter.value === "female"
                ? "bg-amber-600 text-white font-semibold"
                : "hover:bg-amber-100 text-gray-700"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => handleGenderClick("unisex")}
            className={`block w-full text-left px-3 py-2 rounded transition-colors ${
              activeFilter.type === "gender" && activeFilter.value === "unisex"
                ? "bg-amber-600 text-white font-semibold"
                : "hover:bg-amber-100 text-gray-700"
            }`}
          >
            Unisex
          </button>
          <button
            onClick={() => handleGenderClick("")}
            className={`block w-full text-left px-3 py-2 rounded transition-colors ${
              activeFilter.type === "all"
                ? "bg-amber-200 text-amber-700 font-semibold"
                : "hover:bg-amber-200 text-amber-700 font-semibold"
            }`}
          >
            Show All
          </button>
        </nav>
      </div>

      {/* Categories */}
      <div className="mb-4 ">
        <h3 className="text-lg font-semibold text-amber-700 mb-2 ">
          All Categories
        </h3>
        {loadingCategories ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
          </div>
        ) : categories.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No categories found.</p>
        ) : (
          <nav className="space-y-1  overflow-y-auto">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryClick(cat._id)}
                className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                  activeFilter.type === "category" &&
                  activeFilter.value === cat._id
                    ? "bg-amber-600 text-white font-semibold"
                    : "hover:bg-amber-100 text-gray-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={fetchAllProducts}
              className={`block w-full text-left px-3 py-2 rounded transition-colors ${
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
