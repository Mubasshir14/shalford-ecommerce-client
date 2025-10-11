/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import {
//   LayoutDashboardIcon,
//   LogIn,
//   LogOutIcon,
//   Menu,
//   SearchIcon,
//   Shirt,
//   ShoppingCart,
//   UserCircle2Icon,
//   X,
//   ChevronDown,
//   Package,
//   Loader2,
//   CircleDollarSign,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState, useRef } from "react";
// import { Button } from "../ui/button";
// import { useUser } from "../context/UserContext";
// import { logout } from "../Services";
// import { toast } from "sonner";
// import { useRouter, usePathname } from "next/navigation";
// import Logo from "../../assets/company.png";
// import { getUserCart } from "../Services/Cart";
// import { getAllProducts } from "../Services/Product";

// interface NavItem {
//   name: string;
//   path: string;
//   icon: React.ElementType;
//   param?: string;
// }

// export default function NavbarClient() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [cartLength, setCartLength] = useState(0);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Search states
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [allProducts, setAllProducts] = useState<any[]>([]);

//   const { user, setUser, setIsLoading } = useUser();
//   const router = useRouter();
//   const pathname = usePathname();
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLDivElement>(null);

//   const navItems: NavItem[] = [
//     { name: "Products", path: "/products", icon: Shirt },
//     { name: "Men", path: "/products?gender=male", icon: Package, param: "male" },
//     { name: "Women", path: "/products?gender=female", icon: Package, param: "female" },
//     { name: "Unisex", path: "/products?gender=unisex", icon: Package, param: "unisex" },
//     { name: "Payment", path: "/payment-details", icon: CircleDollarSign, param: "" },
//   ];

//   // Fetch all products for search
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getAllProducts();
//         setAllProducts(data?.data || []);
//       } catch (error) {
//         console.error("Failed to fetch products for search");
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Search functionality
//   useEffect(() => {
//     if (searchQuery.trim().length > 0) {
//       setIsSearching(true);
//       const timer = setTimeout(() => {
//         const filtered = allProducts.filter((product) => {
//           const query = searchQuery.toLowerCase();
//           return (
//             product.name?.toLowerCase().includes(query) ||
//             product.description?.toLowerCase().includes(query) ||
//             product.category?.name?.toLowerCase().includes(query) ||
//             product.gender?.toLowerCase().includes(query)
//           );
//         }).slice(0, 5);

//         setSearchResults(filtered);
//         setIsSearching(false);
//       }, 300);

//       return () => clearTimeout(timer);
//     } else {
//       setSearchResults([]);
//       setIsSearching(false);
//     }
//   }, [searchQuery, allProducts]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (user && user.role === "user") {
//         try {
//           const cartData = await getUserCart();
//           setCartLength(cartData?.data?.length || 0);
//         } catch (err: unknown) {
//           const errorMessage =
//             err instanceof Error ? err.message : "Failed to fetch cart";
//           console.error(errorMessage);
//           setCartLength(0);
//         }
//       } else {
//         setCartLength(0);
//       }
//     };

//     fetchCart();
//   }, [user]);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsProfileOpen(false);
//       }
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setIsSearchOpen(false);
//       }
//     };

//     if (isProfileOpen || isSearchOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isProfileOpen, isSearchOpen]);

//   const toggleProfile = () => setIsProfileOpen((prev) => !prev);
//   const toggleTheme = () => setIsDarkMode((prev) => !prev);

//   const handleSignOut = async () => {
//     try {
//       await logout();
//       setUser(null);
//       setIsLoading(true);
//       toast.success("Signed out successfully");
//       router.push("/");
//       setIsProfileOpen(false);
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to sign out";
//       toast.error(errorMessage);
//     }
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
//       setIsSearchOpen(false);
//       setSearchQuery("");
//     }
//   };

//   const isActiveLink = (path: string) => {
//     if (path === "/products" && pathname === "/products") {
//       return true;
//     }
//     return pathname === path;
//   };

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#232536] to-[#2d2f42] font-arima transition-all duration-300 ${
//           isScrolled ? "shadow-2xl" : "shadow-md"
//         }`}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <Link href="/" className="flex items-center space-x-2 group">
//               <Image
//                 src={Logo}
//                 alt="Brand Logo"
//                 className="w-12 transition-transform duration-300 group-hover:scale-110"
//                 priority
//               />
//               <span className="hidden sm:block text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
//                 ShopName
//               </span>
//             </Link>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.path}
//                   className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white hover:text-amber-400 ${
//                     isActiveLink(item.path) ? "text-amber-400" : ""
//                   }`}
//                 >
//                   {item.name}
//                   {isActiveLink(item.path) && (
//                     <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-amber-400 rounded-full" />
//                   )}
//                 </Link>
//               ))}
//             </div>

//             {/* Right Section */}
//             <div className="hidden lg:flex items-center space-x-2">
//               {/* Search Button */}
//               <div className="relative" ref={searchRef}>
//                 <button
//                   onClick={() => setIsSearchOpen(!isSearchOpen)}
//                   className="p-2.5 rounded-lg text-gray-100 hover:text-amber-400 hover:bg-white/5 transition-all duration-200"
//                   aria-label="Search"
//                 >
//                   <SearchIcon className="h-5 w-5" />
//                 </button>

//                 {/* Search Dropdown */}
//                 {isSearchOpen && (
//                   <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fadeIn">
//                     <form onSubmit={handleSearchSubmit} className="p-4">
//                       <div className="relative">
//                         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                         <input
//                           type="text"
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           placeholder="Search products..."
//                           className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-900"
//                           autoFocus
//                         />
//                       </div>
//                     </form>

//                     {/* Search Results */}
//                     {searchQuery.trim() && (
//                       <div className="max-h-96 overflow-y-auto border-t border-gray-100">
//                         {isSearching ? (
//                           <div className="flex items-center justify-center py-8">
//                             <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
//                             <span className="ml-2 text-gray-600">Searching...</span>
//                           </div>
//                         ) : searchResults.length > 0 ? (
//                           <div className="py-2">
//                             {searchResults.map((product) => (
//                               <Link
//                                 key={product._id}
//                                 href={`/products/${product._id}`}
//                                 onClick={() => {
//                                   setIsSearchOpen(false);
//                                   setSearchQuery("");
//                                 }}
//                                 className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors"
//                               >
//                                 <Image
//                                   src={product.images?.[0] || "/placeholder.png"}
//                                   alt={product.name}
//                                   width={48}
//                                   height={48}
//                                   className="rounded-lg object-cover"
//                                 />
//                                 <div className="flex-1 min-w-0">
//                                   <p className="font-medium text-gray-900 truncate">
//                                     {product.name}
//                                   </p>
//                                   <p className="text-sm text-gray-500 truncate">
//                                     {product.category?.name} • ${product.price}
//                                   </p>
//                                 </div>
//                               </Link>
//                             ))}
//                             <Link
//                               href={`/products?search=${encodeURIComponent(searchQuery)}`}
//                               onClick={() => {
//                                 setIsSearchOpen(false);
//                                 setSearchQuery("");
//                               }}
//                               className="block px-4 py-3 text-center text-amber-600 hover:bg-amber-50 font-medium border-t border-gray-100"
//                             >
//                               View all results
//                             </Link>
//                           </div>
//                         ) : (
//                           <div className="py-8 text-center text-gray-500">
//                             No products found
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               {/* User Section */}
//               {user ? (
//                 <>
//                   {/* Cart - only for users */}
//                   {user.role === "user" && (
//                     <Link href="/cart">
//                       <div className="relative p-2.5 rounded-lg text-gray-100 hover:text-amber-400 hover:bg-white/5 transition-all duration-200">
//                         <ShoppingCart className="h-5 w-5" />
//                         {cartLength > 0 && (
//                           <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-amber-600 rounded-full border-2 border-[#232536]">
//                             {cartLength > 99 ? "99+" : cartLength}
//                           </span>
//                         )}
//                       </div>
//                     </Link>
//                   )}

//                   {/* Profile Dropdown */}
//                   <div className="relative" ref={dropdownRef}>
//                     <Button
//                       onClick={toggleProfile}
//                       className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#232536]"
//                       aria-label="Profile menu"
//                       aria-expanded={isProfileOpen}
//                     >
//                       {user?.image ? (
//                         <Image
//                           src={user.image}
//                           alt={`${user.name}'s profile`}
//                           className="h-8 w-8 rounded-full object-cover border-2 border-amber-400"
//                           width={32}
//                           height={32}
//                         />
//                       ) : (
//                         <UserCircle2Icon className="h-8 w-8 text-amber-400" />
//                       )}
//                       <span className="text-gray-100 font-medium max-w-[100px] truncate hidden xl:block">
//                         {user?.name}
//                       </span>
//                       <ChevronDown
//                         className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${
//                           isProfileOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     </Button>

//                     {/* Dropdown Menu */}
//                     {isProfileOpen && (
//                       <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn overflow-hidden">
//                         {/* User Info */}
//                         <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-white">
//                           <div className="flex items-center gap-3">
//                             {user?.image ? (
//                               <Image
//                                 src={user.image}
//                                 alt="Profile"
//                                 width={40}
//                                 height={40}
//                                 className="rounded-full object-cover border-2 border-amber-400"
//                               />
//                             ) : (
//                               <UserCircle2Icon className="h-10 w-10 text-amber-500" />
//                             )}
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-semibold text-gray-900 truncate">
//                                 {user?.name}
//                               </p>
//                               <p className="text-xs text-gray-500 truncate">
//                                 {user?.email}
//                               </p>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Menu Items */}
//                         <div className="py-1">
//                           <Link
//                             href={`/${user.role}/dashboard`}
//                             onClick={() => setIsProfileOpen(false)}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-150"
//                           >
//                             <LayoutDashboardIcon className="h-5 w-5" />
//                             <span className="font-medium">Dashboard</span>
//                           </Link>

//                           {user.role === "user" && (
//                             <>
//                               <Link
//                                 href={`/${user.role}/dashboard/manage-order`}
//                                 onClick={() => setIsProfileOpen(false)}
//                                 className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-150"
//                               >
//                                 <Package className="h-5 w-5" />
//                                 <span className="font-medium">My Orders</span>
//                               </Link>
//                               <Link
//                                 href={`/${user.role}/dashboard/cart`}
//                                 onClick={() => setIsProfileOpen(false)}
//                                 className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-150"
//                               >
//                                 <ShoppingCart className="h-5 w-5" />
//                                 <span className="font-medium">Cart</span>
//                               </Link>
//                             </>
//                           )}

//                           <hr className="my-1 border-gray-100" />

//                           <button
//                             onClick={handleSignOut}
//                             className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 gap-3"
//                           >
//                             <LogOutIcon className="h-5 w-5" />
//                             <span className="font-medium">Sign out</span>
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex items-center space-x-2">
//                   <Link
//                     href="/login"
//                     className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-100 hover:text-amber-400 hover:bg-white/5 transition-all duration-200"
//                   >
//                     <LogIn className="h-5 w-5" />
//                     <span className="font-medium">Login</span>
//                   </Link>
//                   <Link
//                     href="/register"
//                     className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden flex items-center gap-2">
//               {user && user.role === "user" && (
//                 <>
//                   <Link href="/cart" className="relative">
//                     <ShoppingCart className="h-6 w-6 text-gray-100" />
//                     {cartLength > 0 && (
//                       <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-amber-600 rounded-full">
//                         {cartLength > 9 ? "9+" : cartLength}
//                       </span>
//                     )}
//                   </Link>

//                 </>
//               )}
//               <Button
//                 onClick={() => setIsOpen((prev) => !prev)}
//                 className="text-gray-100 hover:text-amber-400 transition-colors duration-200"
//                 aria-label={isOpen ? "Close menu" : "Open menu"}
//                 aria-expanded={isOpen}
//               >
//                 {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`lg:hidden fixed top-16 left-0 right-0 bg-white shadow-2xl transition-all duration-300 ease-in-out z-40 max-h-[calc(100vh-4rem)] overflow-y-auto ${
//             isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
//           }`}
//         >
//           <div className="p-4 space-y-2">
//             {/* Mobile Search */}
//             <form onSubmit={handleSearchSubmit} className="mb-4">
//               <div className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search products..."
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
//                 />
//               </div>
//             </form>

//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.path}
//                 className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//                   isActiveLink(item.path)
//                     ? "bg-amber-50 text-amber-600 font-semibold"
//                     : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"
//                 }`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 <item.icon className="h-5 w-5" />
//                 <span>{item.name}</span>
//               </Link>
//             ))}

//             {user && user.role === "user" && (
//               <>

//                 <Link
//                   href={`/${user.role}/dashboard/cart`}
//                   className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 px-4 py-3 rounded-lg transition-all duration-200"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <ShoppingCart className="h-5 w-5" />
//                   <span>Cart</span>
//                 </Link>
//                 <Link
//                   href={`/${user.role}/dashboard/manage-order`}
//                   className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 px-4 py-3 rounded-lg transition-all duration-200"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <Package className="h-5 w-5" />
//                   <span>My Orders</span>
//                 </Link>
//               </>
//             )}

//             {user && (
//               <Link
//                 href={`/${user.role}/dashboard`}
//                 className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 px-4 py-3 rounded-lg transition-all duration-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <LayoutDashboardIcon className="h-5 w-5" />
//                 <span>Dashboard</span>
//               </Link>
//             )}

//             <hr className="border-gray-200 my-2" />

//             {user ? (
//               <Button
//                 onClick={() => {
//                   handleSignOut();
//                   setIsOpen(false);
//                 }}
//                 className="flex items-center space-x-3 text-white bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left"
//               >
//                 <LogOutIcon className="h-5 w-5" />
//                 <span>Sign out</span>
//               </Button>
//             ) : (
//               <div className="space-y-2">
//                 <Link
//                   href="/login"
//                   className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 px-4 py-3 rounded-lg transition-all duration-200 w-full"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <LogIn className="h-5 w-5" />
//                   <span>Login</span>
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="flex items-center justify-center text-white bg-amber-600 hover:bg-amber-700 px-4 py-3 rounded-lg transition-all duration-200 w-full font-medium"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </>
//   );
// }

"use client";

import {
  LayoutDashboardIcon,
  LogIn,
  LogOutIcon,
  Menu,
  SearchIcon,
  Shirt,
  ShoppingCart,
  UserCircle2Icon,
  X,
  ChevronDown,
  Package,
  Loader2,
  CircleDollarSign,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import { useUser } from "../context/UserContext";
import { logout } from "../Services";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import Logo from "../../assets/sk2.png";
import { getUserCart } from "../Services/Cart";
import { getAllProducts } from "../Services/Product";
import { getAllCategory } from "../Services/Category";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  param?: string;
  hasDropdown?: boolean;
}

interface Category {
  _id: string;
  name: string;
  icon: string;
}

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const { user, setUser, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const productsDropdownRef = useRef<HTMLDivElement>(null);

  // Language
  const [currentLang, setCurrentLang] = useState("en");

  const navItems: NavItem[] = [
    { name: "Products", path: "/products", icon: Shirt, hasDropdown: true },
    {
      name: "Men",
      path: "/products?gender=male",
      icon: Package,
      param: "male",
    },
    {
      name: "Women",
      path: "/products?gender=female",
      icon: Package,
      param: "female",
    },
    {
      name: "Unisex",
      path: "/products?gender=unisex",
      icon: Package,
      param: "unisex",
    },
    {
      name: "Payment",
      path: "/payment-details",
      icon: CircleDollarSign,
      param: "",
    },
  ];

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await getAllCategory();
        if (res.success) {
          setCategories(res.data || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch all products for search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setAllProducts(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch products for search");
      }
    };
    fetchProducts();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = allProducts
          .filter((product) => {
            const query = searchQuery.toLowerCase();
            return (
              product.name?.toLowerCase().includes(query) ||
              product.description?.toLowerCase().includes(query) ||
              product.category?.name?.toLowerCase().includes(query) ||
              product.gender?.toLowerCase().includes(query)
            );
          })
          .slice(0, 5);

        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user && user.role === "user") {
        try {
          const cartData = await getUserCart();
          setCartLength(cartData?.data?.length || 0);
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to fetch cart";
          console.error(errorMessage);
          setCartLength(0);
        }
      } else {
        setCartLength(0);
      }
    };

    fetchCart();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      setIsLoading(true);
      toast.success("Signed out successfully");
      router.push("/");
      setIsProfileOpen(false);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign out";
      toast.error(errorMessage);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActiveLink = (path: string) => {
    if (path === "/products" && pathname === "/products") {
      return true;
    }
    return pathname === path;
  };

  // Cookie-based Language Switcher (Working Method)
  const changeLanguage = (lang: string) => {
    console.log("🔄 Changing language to:", lang);
    if (lang === "bn") {
      document.cookie = "googtrans=/en/bn; path=/; max-age=31536000";
      window.location.hash = "#googtrans(en|bn)";
      setCurrentLang("bn");
      localStorage.setItem("selectedLanguage", "bn");
      console.log("✅ Cookie set, reloading...");
      window.location.reload();
    } else {
      document.cookie = "googtrans=/en/en; path=/; max-age=31536000";
      document.cookie = "googtrans=; path=/; max-age=0"; 
      window.location.hash = "";

      setCurrentLang("en");
      localStorage.setItem("selectedLanguage", "en");

      console.log("✅ Resetting to English, reloading...");
      window.location.reload();
    }
  };

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const googtrans = getCookie("googtrans");
    if (googtrans) {
      if (googtrans.includes("/bn")) {
        setCurrentLang("bn");
      } else {
        setCurrentLang("en");
      }
    }

    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang && savedLang !== currentLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#232536] to-[#2d2f42] font-arima transition-all duration-300 ${
          isScrolled ? "shadow-2xl" : "shadow-md"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="">
              <Image
                width={120}
                height={80}
                src={Logo}
                alt="Brand Logo"
                className=" transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  ref={item.hasDropdown ? productsDropdownRef : null}
                >
                  {item.hasDropdown ? (
                    <div
                      onMouseEnter={() => setIsProductsDropdownOpen(true)}
                      // onMouseLeave={() => setIsProductsDropdownOpen(false)}
                    >
                      <Link
                        href={item.path}
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white hover:text-amber-400 flex items-center gap-1 ${
                          isActiveLink(item.path) ? "text-amber-400" : ""
                        }`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isProductsDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                        {isActiveLink(item.path) && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-amber-400 rounded-full" />
                        )}
                      </Link>

                      {/* Products Dropdown */}
                      {isProductsDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-amber-100 z-50 animate-fadeIn">
                          <div className="p-4">
                            {loadingCategories ? (
                              <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
                                <span className="ml-2 text-gray-600 text-sm">
                                  Loading...
                                </span>
                              </div>
                            ) : categories.length > 0 ? (
                              <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                                {categories.map((category) => (
                                  <Link
                                    key={category._id}
                                    href={`/products?category=${encodeURIComponent(
                                      category._id
                                    )}`}
                                    onClick={() =>
                                      setIsProductsDropdownOpen(false)
                                    }
                                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200 group"
                                  >
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-100 flex flex-col items-center justify-center group-hover:bg-amber-200 transition-colors">
                                      <Image
                                        src={category.icon}
                                        alt={category.name}
                                        width={14}
                                        height={14}
                                        className="rounded-full object-contain group-hover:scale-110 transition-transform"
                                      />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-amber-700 text-center">
                                      {category.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <p className="text-center text-gray-500 py-8 text-sm">
                                No categories found
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white hover:text-amber-400 ${
                        isActiveLink(item.path) ? "text-amber-400" : ""
                      }`}
                    >
                      {item.name}
                      {/* {isActiveLink(item.path) && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-amber-400 rounded-full" />
                      )} */}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Search Button */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2.5 rounded-lg text-gray-100 hover:text-amber-400 hover:bg-white/5 transition-all duration-200"
                  aria-label="Search"
                >
                  <SearchIcon className="h-5 w-5" />
                </button>

                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fadeIn">
                    <form onSubmit={handleSearchSubmit} className="p-4">
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-900"
                          autoFocus
                        />
                      </div>
                    </form>

                    {/* Search Results */}
                    {searchQuery.trim() && (
                      <div className="max-h-96 overflow-y-auto border-t border-gray-100">
                        {isSearching ? (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
                            <span className="ml-2 text-gray-600">
                              Searching...
                            </span>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="py-2">
                            {searchResults.map((product) => (
                              <Link
                                key={product._id}
                                href={`/products/${product._id}`}
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors"
                              >
                                <Image
                                  src={
                                    product.images?.[0] || "/placeholder.png"
                                  }
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900 truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {product.category?.name} • ${product.price}
                                  </p>
                                </div>
                              </Link>
                            ))}
                            <Link
                              href={`/products?search=${encodeURIComponent(
                                searchQuery
                              )}`}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="block px-4 py-3 text-center text-amber-600 hover:bg-amber-50 font-medium border-t border-gray-100"
                            >
                              View all results
                            </Link>
                          </div>
                        ) : (
                          <div className="py-8 text-center text-gray-500">
                            No products found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                {/* Language Toggle Switch */}
                <button
                  onClick={() =>
                    changeLanguage(currentLang === "en" ? "bn" : "en")
                  }
                  className="relative flex items-center space-x-2 bg-neutral-800/40 backdrop-blur-sm rounded-full px-4 py-2 border border-neutral-700/50 hover:border-amber-600/50 transition-all group"
                  title={
                    currentLang === "en"
                      ? "Switch to Bangla"
                      : "Switch to English"
                  }
                >
                  <Globe className="w-4 h-4 text-amber-500 group-hover:text-amber-400 transition-colors" />

                  {/* Toggle Indicator */}
                  <div className="relative w-12 h-6 bg-neutral-700/50 rounded-full transition-all">
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-lg transition-all duration-300 ${
                        currentLang === "bn" ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>

                  <span className="text-xs font-medium text-neutral-300 group-hover:text-amber-500 transition-colors">
                    Bangla
                  </span>
                </button>
              </div>

              {/* User Section */}
              {user ? (
                <>
                  {/* Cart - only for users */}
                  {user.role === "user" && (
                    <Link href="/cart">
                      <div className="relative p-2.5 rounded-lg text-gray-100 hover:text-amber-400 hover:bg-white/5 transition-all duration-200">
                        <ShoppingCart className="h-5 w-5" />
                        {cartLength > 0 && (
                          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-amber-600 rounded-full border-2 border-[#232536]">
                            {cartLength > 99 ? "99+" : cartLength}
                          </span>
                        )}
                      </div>
                    </Link>
                  )}

                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <Button
                      onClick={toggleProfile}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#232536]"
                      aria-label="Profile menu"
                      aria-expanded={isProfileOpen}
                    >
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt={`${user.name}'s profile`}
                          className="h-8 w-8 rounded-full object-cover border-2 border-amber-400"
                          width={32}
                          height={32}
                        />
                      ) : (
                        <UserCircle2Icon className="h-8 w-8 text-amber-400" />
                      )}
                      <span className="text-gray-100 font-medium max-w-[100px] truncate hidden xl:block">
                        {user?.name}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn overflow-hidden">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-white">
                          <div className="flex items-center gap-3">
                            {user?.image ? (
                              <Image
                                src={user.image}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-full object-cover border-2 border-amber-400"
                              />
                            ) : (
                              <UserCircle2Icon className="h-10 w-10 text-amber-500" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {user?.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                          <Link
                            href={`/${user.role}/dashboard`}
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-150"
                          >
                            <LayoutDashboardIcon className="h-5 w-5" />
                            <span className="font-medium">Dashboard</span>
                          </Link>

                          {user.role === "user" && (
                            <>
                              <Link
                                href={`/${user.role}/dashboard/manage-order`}
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-150"
                              >
                                <Package className="h-5 w-5" />
                                <span className="font-medium">My Orders</span>
                              </Link>
                              <Link
                                href={`/${user.role}/dashboard/cart`}
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-150"
                              >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="font-medium">Cart</span>
                              </Link>
                            </>
                          )}

                          <hr className="my-1 border-gray-100" />

                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 gap-3"
                          >
                            <LogOutIcon className="h-5 w-5" />
                            <span className="font-medium">Sign out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-100 hover:text-amber-400 hover:bg-white/5 transition-all duration-200"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {user && user.role === "user" && (
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-100" />
                  {cartLength > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-amber-600 rounded-full">
                      {cartLength > 9 ? "9+" : cartLength}
                    </span>
                  )}
                </Link>
              )}
              <Button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-gray-100 hover:text-amber-400 transition-colors duration-200"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-16 left-0 right-0 bg-white shadow-2xl transition-all duration-300 ease-in-out z-40 max-h-[calc(100vh-4rem)] overflow-y-auto ${
            isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="p-4 space-y-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </form>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActiveLink(item.path)
                    ? "bg-amber-50 text-amber-600 font-semibold"
                    : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}

            {user && user.role === "user" && (
              <>
                <Link
                  href={`/${user.role}/dashboard/cart`}
                  className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                </Link>
                <Link
                  href={`/${user.role}/dashboard/manage-order`}
                  className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 px-4 py-3 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Package className="h-5 w-5" />
                  <span>My Orders</span>
                </Link>
              </>
            )}
                          <div>
                {/* Language Toggle Switch */}
                <button
                  onClick={() =>
                    changeLanguage(currentLang === "en" ? "bn" : "en")
                  }
                  className="relative flex items-center space-x-2 bg-neutral-800/40 backdrop-blur-sm rounded-full px-4 py-2 border border-neutral-700/50 hover:border-amber-600/50 transition-all group"
                  title={
                    currentLang === "en"
                      ? "Switch to Bangla"
                      : "Switch to English"
                  }
                >
                  <Globe className="w-4 h-4 text-amber-500 group-hover:text-amber-400 transition-colors" />

                  {/* Toggle Indicator */}
                  <div className="relative w-12 h-6 bg-neutral-700/50 rounded-full transition-all">
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-lg transition-all duration-300 ${
                        currentLang === "bn" ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>

                  
                  <span className="text-xs font-medium text-neutral-300 group-hover:text-amber-500 transition-colors">
                    Bangla
                  </span>
                </button>
              </div>

            {user && (
              <Link
                href={`/${user.role}/dashboard`}
                className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 px-4 py-3 rounded-lg transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboardIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            )}

            <hr className="border-gray-200 my-2" />

            {user ? (
              <Button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 text-white bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left"
              >
                <LogOutIcon className="h-5 w-5" />
                <span>Sign out</span>
              </Button>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50 px-4 py-3 rounded-lg transition-all duration-200 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center text-white bg-amber-600 hover:bg-amber-700 px-4 py-3 rounded-lg transition-all duration-200 w-full font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
