// "use client";

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { Search, ChevronDown, ChevronUp, Menu, X as Close } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { getAllCategory } from "@/components/Services/Category";
// import Link from "next/link";

// const Sidebar = () => {
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(true);
//   const [maxPrice, setMaxPrice] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllCategory();
//         setCategories(data?.data || []);
//       } catch (err: any) {
//         toast.error(err?.message || "Failed to fetch categories");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//     }
//   };

//   const handlePriceFilter = () => {
//     if (minPrice && maxPrice) {
//       router.push(`/products?minPrice=${minPrice}&maxPrice=${maxPrice}`);
//     }
//   };

//   const isActive = (href: string) => pathname === href;

//   const menuItems = [
//     { label: "Men", href: "/categories/men" },
//     { label: "Women", href: "/categories/women" },
//     { label: "Unisex", href: "/categories/unisex" },
//   ];

//   return (
//     <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-amber-200 shadow-lg p-6 space-y-6 font-[Sansita] transition-all duration-300 md:translate-x-0 -translate-x-full md:relative md:w-64 z-50">
//       {/* Mobile Toggle */}
//       <div className="md:hidden flex justify-between items-center mb-4">
//         <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//           {isMobileMenuOpen ? <Close size={24} /> : <Menu size={24} />}
//         </Button>
//       </div>

//       {/* Sidebar Content */}
//       <div className={`${isMobileMenuOpen ? "block" : "hidden md:block"} space-y-6`}>
//         {/* Search */}
//         <form onSubmit={handleSearch} className="relative">
//           <Input
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10 border-amber-300 focus:ring-amber-500 rounded-lg"
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
//         </form>

//         {/* Static Categories */}
//         <nav className="space-y-2">
//           {menuItems.map((item) => (
//             <Link
//               key={item.label}
//               href={item.href}
//               className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
//                 isActive(item.href) ? "bg-amber-600 text-white" : "text-amber-700 hover:bg-amber-100"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Dynamic Categories */}
//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold text-amber-700">All Categories</h3>
//           {loading ? (
//             <p className="text-sm text-gray-500">Loading categories...</p>
//           ) : categories.length === 0 ? (
//             <p className="text-sm text-gray-500">No categories found.</p>
//           ) : (
//             <nav className="space-y-2">
//               {categories.map((cat) => (
//                 <Link
//                   key={cat._id}
//                   href={`/categories/${cat._id}`}
//                   className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
//                     isActive(`/categories/${cat._id}`) ? "bg-amber-600 text-white" : "text-amber-700 hover:bg-amber-100"
//                   }`}
//                 >
//                   {cat.name}
//                 </Link>
//               ))}
//             </nav>
//           )}
//         </div>

//         {/* Price Filter */}
//         <div className="space-y-2">
//           <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}>
//             <h3 className="text-lg font-semibold text-amber-700">Price Filter</h3>
//             {isPriceFilterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </div>
//           {isPriceFilterOpen && (
//             <div className="space-y-3">
//               <Input
//                 type="number"
//                 placeholder="Min Price"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//                 className="border-amber-300 focus:ring-amber-500 rounded-lg"
//               />
//               <Input
//                 type="number"
//                 placeholder="Max Price"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 className="border-amber-300 focus:ring-amber-500 rounded-lg"
//               />
//               <Button
//                 onClick={handlePriceFilter}
//                 className="w-full bg-amber-600 text-white hover:bg-amber-700 rounded-lg"
//               >
//                 Apply
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronUp, Menu, X as Close } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { getAllCategory } from "@/components/Services/Category";

const Sidebar = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategory();
        setCategories(data?.data || []);
      } catch (err: any) {
        toast.error(err?.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handlePriceFilter = () => {
    if (minPrice && maxPrice) {
      router.push(`/products?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (href: string) => pathname === href;

  const menuItems = [
    { label: "Men", href: "/categories/men" },
    { label: "Women", href: "/categories/women" },
    { label: "Unisex", href: "/categories/unisex" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-amber-200 shadow-lg p-6 space-y-6 font-[Sansita] transition-transform duration-300 z-50
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-64
        `}
      >
        {/* Mobile toggle button */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Close size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Sidebar content */}
        <div className="space-y-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-amber-300 focus:ring-amber-500 rounded-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
          </form>

          {/* Static Categories */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                  isActive(item.href)
                    ? "bg-amber-600 text-white"
                    : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Dynamic Categories */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-amber-700">All Categories</h3>
            {loading ? (
              <p className="text-sm text-gray-500">Loading categories...</p>
            ) : categories.length === 0 ? (
              <p className="text-sm text-gray-500">No categories found.</p>
            ) : (
              <nav className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/categories/${cat._id}`}
                    className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                      isActive(`/categories/${cat._id}`)
                        ? "bg-amber-600 text-white"
                        : "text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* Price Filter */}
          <div className="space-y-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
            >
              <h3 className="text-lg font-semibold text-amber-700">Price Filter</h3>
              {isPriceFilterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {isPriceFilterOpen && (
              <div className="space-y-3">
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
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
