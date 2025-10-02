// "use client";

// import {
//   LayoutDashboardIcon,
//   LogIn,
//   LogOutIcon,
//   Mars,
//   Menu,
//   SearchIcon,
//   Shirt,
//   ShoppingCart,
//   UserCircle2Icon,
//   Venus,
//   X,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { useUser } from "../context/UserContext";
// import { logout } from "../Services";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import Logo from "../../assets/logi.png";
// import { getUserCart } from "../Services/Cart";

// // Navigation item type
// interface NavItem {
//   name: string;
//   path: string;
//   icon: React.ElementType;
// }

// export default function NavbarClient() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [cartLength, setCartLength] = useState(0);
//   const { user, setUser, setIsLoading } = useUser();
//   const router = useRouter();

//   const navItems: NavItem[] = [
//     { name: "Products", path: "/products", icon: Shirt },
//     { name: "Men", path: "/men", icon: Mars },
//     { name: "Female", path: "/female", icon: Venus },
//   ];

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

//   const toggleProfile = () => setIsProfileOpen((prev) => !prev);

//   const handleSignOut = async () => {
//     try {
//       await logout();
//       setUser(null);
//       setIsLoading(true);
//       toast.success("Signed out successfully");
//       router.push("/");
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to sign out";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 bg-[#232536] font-arima transition-shadow duration-300 ${
//           isScrolled ? "shadow-lg" : "shadow-sm"
//         }`}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <Link href="/" className="flex items-center space-x-2">
//               <Image src={Logo} alt="Brand Logo" className="w-28" priority />
//             </Link>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center space-x-6">
//               <div className="flex items-center space-x-8">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.path}
//                     className="flex items-center space-x-1 text-gray-100 hover:text-amber-600 transition-colors duration-200"
//                   >
//                     <span>{item.name}</span>
//                   </Link>
//                 ))}
//               </div>
//               <Button
//                 variant="ghost"
//                 className="text-gray-100 hover:text-amber-600 transition-colors duration-200"
//                 aria-label="Search"
//               >
//                 <SearchIcon className="h-5 w-5" />
//               </Button>

//               {/* User/Profile Section */}
//               {user ? (
//                 <div className="relative flex items-center gap-4">
//                   {/* Cart icon only for normal users */}
//                   {user.role === "user" && (
//                     <Link href="/cart">
//                       <div className="relative rounded-full flex items-center justify-center gap-1 text-sm text-gray-200 hover:bg-amber-50 hover:text-amber-600 transition-colors p-3">
//                         <ShoppingCart className="w-6 h-6" />
//                         <span className="absolute text-xs font-semibold text-white top-[-5px] right-[-5px] flex items-center justify-center w-6 h-6 border-2 text-center rounded-full">
//                           <span>{cartLength}</span>
//                         </span>
//                       </div>
//                     </Link>
//                   )}

//                   {/* Profile button */}
//                   <Button
//                     onClick={toggleProfile}
//                     className="flex items-center space-x-2 focus:outline-none"
//                     aria-label="Profile menu"
//                     aria-expanded={isProfileOpen}
//                   >
//                     {user?.image ? (
//                       <Image
//                         src={user.image}
//                         alt={`${user.name}'s profile`}
//                         className="h-10 w-10 rounded-full object-cover border border-gray-300"
//                         width={40}
//                         height={40}
//                       />
//                     ) : (
//                       <UserCircle2Icon className="h-10 w-10 text-gray-100" />
//                     )}
//                     <span className="text-gray-50">{user?.name}</span>
//                   </Button>

//                   {/* Profile dropdown */}
//                   {isProfileOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 animate-slideIn">
//                       <Link
//                         href={`${user.role}/dashboard`}
//                         className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
//                       >
//                         <LayoutDashboardIcon className="h-5 w-5" />
//                         <span>Dashboard</span>
//                       </Link>
//                       <button
//                         onClick={handleSignOut}
//                         className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors gap-2"
//                       >
//                         <LogOutIcon className="h-5 w-5" />
//                         <span>Sign out</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-4">
//                   <Link
//                     href="/login"
//                     className="flex items-center space-x-1 text-gray-100 hover:text-amber-600 transition-colors"
//                   >
//                     <LogIn className="h-5 w-5" />
//                     <span>Login</span>
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden">
//               <Button
//                 onClick={() => setIsOpen((prev) => !prev)}
//                 className="text-gray-100 hover:text-amber-600 transition-colors duration-200"
//                 aria-label={isOpen ? "Close menu" : "Open menu"}
//                 aria-expanded={isOpen}
//               >
//                 {isOpen ? (
//                   <X className="h-6 w-6" />
//                 ) : (
//                   <Menu className="h-6 w-6" />
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`lg:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out z-40 ${
//             isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
//           }`}
//         >
//           <div className="p-4 space-y-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.path}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50/80 px-4 py-2 rounded-md transition-all duration-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <item.icon className="h-5 w-5" />
//                 <span>{item.name}</span>
//               </Link>
//             ))}

//             {/* Cart only for normal users */}
//             {user && user.role === "user" && (
//               <Link
//                 href="/cart"
//                 className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50/80 px-4 py-2 rounded-md transition-all duration-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <ShoppingCart className="h-5 w-5" />
//                 <span>{cartLength}</span>
//               </Link>
//             )}

//             {/* Dashboard */}
//             {user && (
//               <Link
//                 href={
//                   user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
//                 }
//                 className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50/80 px-4 py-2 rounded-md transition-all duration-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <LayoutDashboardIcon className="h-5 w-5" />
//                 <span>Dashboard</span>
//               </Link>
//             )}

//             <hr className="border-gray-200" />

//             {user ? (
//               <Button
//                 onClick={() => {
//                   handleSignOut();
//                   setIsOpen(false);
//                 }}
//                 className="flex items-center space-x-2 text-white hover:text-amber-600 bg-amber-600 px-4 py-2 rounded-md transition-all duration-200 w-full text-left"
//               >
//                 <LogOutIcon className="h-5 w-5" />
//                 <span>Sign out</span>
//               </Button>
//             ) : (
//               <Link
//                 href="/login"
//                 className="flex items-center space-x-2 text-white hover:text-amber-600 bg-amber-600 px-4 py-2 rounded-md transition-all duration-200 w-full text-left"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <LogIn className="h-5 w-5" />
//                 <span>Login</span>
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>

//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             transform: translateX(-100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-in-out;
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
  Mars,
  Menu,
  SearchIcon,
  Shirt,
  ShoppingCart,
  UserCircle2Icon,
  Venus,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import { useUser } from "../context/UserContext";
import { logout } from "../Services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Logo from "../../assets/company.png";
import { getUserCart } from "../Services/Cart";

// Navigation item type
interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const { user, setUser, setIsLoading } = useUser();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { name: "Products", path: "/products", icon: Shirt },
    { name: "Men", path: "/men", icon: Mars },
    { name: "Female", path: "/female", icon: Venus },
  ];

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#232536] font-arima transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src={Logo} alt="Brand Logo" className="w-12" priority />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="flex items-center space-x-1 text-gray-100 hover:text-amber-600 transition-colors duration-200"
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              <Link
              href={'/products'}
                // variant="ghost"
                className="text-gray-100 hover:text-amber-600 transition-colors duration-200"
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5" />
              </Link>

              {/* User/Profile Section */}
              {user ? (
                <div
                  className="relative flex items-center gap-4"
                  ref={dropdownRef}
                >
                  {/* Cart icon only for normal users */}
                  {user.role === "user" && (
                    <Link href="/cart">
                      <div className="relative rounded-full flex items-center justify-center gap-1 text-sm text-gray-200 hover:bg-amber-600/20 hover:text-amber-400 transition-all duration-200 p-2.5">
                        <ShoppingCart className="w-5 h-5" />
                        {cartLength > 0 && (
                          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold  bg-amber-600 rounded-full border-2 border-[#232536]">
                            {cartLength}
                          </span>
                        )}
                      </div>
                    </Link>
                  )}

                  {/* Profile button */}
                  <Button
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-amber-600/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#232536]"
                    aria-label="Profile menu"
                    aria-expanded={isProfileOpen}
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={`${user.name}'s profile`}
                        className="h-9 w-9 rounded-full object-cover border-2 border-amber-500"
                        width={36}
                        height={36}
                      />
                    ) : (
                      <UserCircle2Icon className="h-9 w-9 text-amber-500" />
                    )}
                    <span className="text-gray-100 font-medium max-w-[100px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                  {/* Profile dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn overflow-hidden">
                      {/* User info section */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-white">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        <Link
                          href={`${user.role}/dashboard`}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-150"
                        >
                          <LayoutDashboardIcon className="h-5 w-5" />
                          <span className="font-medium">Dashboard</span>
                        </Link>

                        <hr className="my-1 border-gray-100" />

                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full text-left px-4 py-2.5 text-sm text-amber-600 hover:bg-red-50 transition-colors duration-150 gap-3"
                        >
                          <LogOutIcon className="h-5 w-5" />
                          <span className="font-medium">Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-100 hover:text-amber-600 hover:bg-amber-600/20 transition-all duration-200"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="font-medium">Login</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-gray-100 hover:text-amber-600 transition-colors duration-200"
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
          className={`lg:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out z-40 ${
            isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50/80 px-4 py-2 rounded-md transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Cart only for normal users */}
            {user && user.role === "user" && (
              <Link
                href="/cart"
                className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50/80 px-4 py-2 rounded-md transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cartLength})</span>
              </Link>
            )}

            {/* Dashboard */}
            {user && (
              <Link
                href={
                  user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
                }
                className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50/80 px-4 py-2 rounded-md transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboardIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            )}

            <hr className="border-gray-200" />

            {user ? (
              <Button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 text-white hover:text-amber-600 bg-amber-600 px-4 py-2 rounded-md transition-all duration-200 w-full text-left"
              >
                <LogOutIcon className="h-5 w-5" />
                <span>Sign out</span>
              </Button>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 text-white  bg-amber-600 px-4 py-2 rounded-md transition-all duration-200 w-full text-left"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
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
