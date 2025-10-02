// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Minus, Plus, Trash2, ShoppingCart, Heart, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import {
//   getUserCart,
//   updateCart,
//   deleteCart,
// } from "@/components/Services/Cart";

// interface CartItem {
//   _id: string;
//   product: {
//     _id: string;
//     name: string;
//     images: string[];
//     price: number;
//   };
//   quantity: number;
//   size: string;
//   color: string;
//   totalPrice: number;
// }

// const Cart = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const data = await getUserCart();
//       setCartItems(data.data || []);
//     } catch (err: any) {
//       toast.error(err?.message || "Failed to fetch cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleQuantityChange = async (item: CartItem, delta: number) => {
//     const newQuantity = item.quantity + delta;
//     if (newQuantity < 1) return;

//     setCartItems((prev) =>
//       prev.map((c) =>
//         c._id === item._id
//           ? {
//               ...c,
//               quantity: newQuantity,
//               totalPrice: newQuantity * c.product.price,
//             }
//           : c
//       )
//     );

//     try {
//       const formData = new FormData();
//       formData.append("quantity", newQuantity.toString());
//       formData.append(
//         "totalPrice",
//         (item.product.price * newQuantity).toString()
//       );
//       await updateCart(item._id, formData);
//     } catch (err: any) {
//       toast.error(err?.message || "Failed to update cart");
//       setCartItems((prev) =>
//         prev.map((c) =>
//           c._id === item._id
//             ? { ...c, quantity: item.quantity, totalPrice: item.totalPrice }
//             : c
//         )
//       );
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteCart(id);
//       toast.success("Item removed from cart");
//       fetchCart();
//     } catch (err: any) {
//       toast.error(err?.message || "Failed to remove item");
//     }
//   };

//   const handlePlaceOrder = () => {
//     if (cartItems.length === 0) {
//       toast.warning("Cart is empty");
//       return;
//     }
//     toast.success("Order placed successfully!");
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-[Sansita]">
//         <div className="flex flex-col justify-center items-center pt-32 space-y-6">
//           <div className="relative">
//             <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin"></div>
//             <ShoppingCart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-600" size={24} />
//           </div>
//           <p className="text-2xl font-bold text-amber-700 animate-pulse">Loading your cart...</p>
//         </div>
//       </div>
//     );

//   if (!cartItems || cartItems.length === 0)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-[Sansita]">
//         <div className="flex flex-col justify-center items-center pt-32 space-y-8">
//           <div className="relative">
//             <div className="w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
//               <ShoppingCart size={60} className="text-white" />
//             </div>
//             <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
//               <span className="text-white text-sm font-bold">0</span>
//             </div>
//           </div>
//           <div className="text-center space-y-4">
//             <h2 className="text-4xl font-bold text-amber-700 mb-4">Your Cart is Empty</h2>
//             <p className="text-gray-600 text-xl max-w-md mx-auto leading-relaxed">
//               Discover amazing products and add them to your cart to get started!
//             </p>
//             <Button className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
//               Start Shopping
//             </Button>
//           </div>
//         </div>
//       </div>
//     );

//   const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-[Sansita]">
//       <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4">
//             Shopping Cart
//           </h1>
//           <p className="text-gray-600 text-xl">
//             You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
//           </p>
//           <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-4 rounded-full"></div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Cart Items Section */}
//           <div className="lg:col-span-2 space-y-6">
//             {cartItems.map((item, index) => (
//               <div
//                 key={item._id}
//                 className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-6 border border-amber-200/50 transform hover:-translate-y-1 transition-all duration-500"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="flex flex-col md:flex-row gap-6">
//                   {/* Product Image */}
//                   <div className="relative">
//                     <div className="w-40 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
//                       <Image
//                         src={item.product.images[0] || "https://via.placeholder.com/160"}
//                         alt={item.product.name}
//                         width={160}
//                         height={160}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                       />
//                     </div>
//                     <Button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors duration-300">
//                       <Heart size={16} className="text-gray-400 hover:text-red-500" />
//                     </Button>
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1 space-y-4">
//                     <div>
//                       <h3 className="text-2xl font-bold text-amber-700 mb-2 group-hover:text-amber-800 transition-colors duration-300">
//                         {item.product.name}
//                       </h3>
//                       {/* <div className="flex items-center gap-2 mb-3">
//                         <div className="flex text-yellow-400">
//                           {[...Array(5)].map((_, i) => (
//                             <Star key={i} size={16} fill="currentColor" />
//                           ))}
//                         </div>
//                         <span className="text-gray-500 text-sm">(4.8)</span>
//                       </div> */}
//                     </div>

//                     <div className="flex flex-wrap gap-4 text-sm">
//                       <div className="flex items-center gap-2">
//                         <span className="text-gray-600">Size:</span>
//                         <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
//                           {item.size}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-gray-600">Color:</span>
//                         <span className="bg-amber-100 capitalize text-amber-800 px-3 py-1 rounded-full font-semibold">
//                           {item.color}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                       <div className="space-y-1">
//                         <p className="text-lg font-semibold text-gray-700">
//                           Tk.{item.product.price.toFixed(2)} <span className="text-sm text-gray-500">per item</span>
//                         </p>
//                         <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
//                           Tk.{item.totalPrice.toFixed(2)}
//                         </p>
//                       </div>

//                       {/* Quantity Controls */}
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center bg-amber-50 rounded-2xl p-2 shadow-inner">
//                           <Button
//                             onClick={() => handleQuantityChange(item, -1)}
//                             className="w-10 h-10 rounded-xl bg-white hover:bg-amber-100 text-amber-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
//                           >
//                             <Minus size={18} />
//                           </Button>
//                           <span className="px-6 py-2 text-xl font-bold text-amber-700 min-w-[60px] text-center">
//                             {item.quantity}
//                           </span>
//                           <Button
//                             onClick={() => handleQuantityChange(item, 1)}
//                             className="w-10 h-10 rounded-xl bg-white hover:bg-amber-100 text-amber-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
//                           >
//                             <Plus size={18} />
//                           </Button>
//                         </div>

//                         <Button
//                           onClick={() => handleDelete(item._id)}
//                           className="w-12 h-12 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-12"
//                         >
//                           <Trash2 size={20} />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-amber-200/50 sticky top-8">
//               <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">Cart Summary</h2>

//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                   <span className="text-gray-600">Price</span>
//                   <span className="font-semibold">Tk.{totalAmount.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-semibold ">Tk.150</span>
//                 </div>
//                 {/* <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="font-semibold">৳{(totalAmount * 0.05).toFixed(2)}</span>
//                 </div> */}
//               </div>

//               <div className="bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl p-4 mb-6">
//                 <div className="flex justify-between items-center">
//                   <span className="text-xl font-bold text-gray-800">Total Amount</span>
//                   <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
//                     ৳{(totalAmount + totalAmount * 0.05).toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               <Button
//                 onClick={handlePlaceOrder}
//                 className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-4"
//               >
//                 <ShoppingCart className="mr-2" size={20} />
//                 Place Order
//               </Button>

//               {/* <p className="text-center text-sm text-gray-500 leading-relaxed">
//                 🚚 Free shipping on orders over ৳500<br/>
//                 💳 Secure payment guaranteed<br/>
//                 🔄 30-day return policy
//               </p> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  getUserCart,
  updateCart,
  deleteCart,
} from "@/components/Services/Cart";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
  size: string;
  color: string;
  totalPrice: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getUserCart();
      setCartItems(data.data || []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (item: CartItem, delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((c) =>
        c._id === item._id
          ? {
              ...c,
              quantity: newQuantity,
              totalPrice: newQuantity * c.product.price,
            }
          : c
      )
    );

    try {
      const formData = new FormData();
      formData.append("quantity", newQuantity.toString());
      formData.append(
        "totalPrice",
        (item.product.price * newQuantity).toString()
      );
      await updateCart(item._id, formData);
    } catch (err: any) {
      toast.error(err?.message || "Failed to update cart");
      setCartItems((prev) =>
        prev.map((c) =>
          c._id === item._id
            ? { ...c, quantity: item.quantity, totalPrice: item.totalPrice }
            : c
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCart(id);
      toast.success("Item removed from cart");
      fetchCart();
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove item");
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.warning("Cart is empty");
      return;
    }
    router.push("/order");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-[Sansita]">
        <div className="flex flex-col justify-center items-center pt-32 space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin"></div>
            <ShoppingCart
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-600"
              size={24}
            />
          </div>
          <p className="text-2xl font-bold text-amber-700 animate-pulse">
            Loading your cart...
          </p>
        </div>
      </div>
    );

  if (!cartItems || cartItems.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-[Sansita]">
        <div className="flex flex-col justify-center items-center pt-32 space-y-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <ShoppingCart size={60} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">0</span>
            </div>
          </div>
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-amber-700 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 text-xl max-w-md mx-auto leading-relaxed">
              Discover amazing products and add them to your cart to get
              started!
            </p>
            <Link
              href={"/products"}
              className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-[Sansita]">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-xl">
            You have {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={item._id}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-6 border border-amber-200/50 transform hover:-translate-y-1 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="relative">
                    <div className="w-40 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
                      <Image
                        src={
                          item.product.images[0] ||
                          "https://via.placeholder.com/160"
                        }
                        alt={item.product.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <Button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors duration-300">
                      <Heart
                        size={16}
                        className="text-gray-400 hover:text-red-500"
                      />
                    </Button>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-amber-700 mb-2 group-hover:text-amber-800 transition-colors duration-300">
                        {item.product.name}
                      </h3>
                      {/* <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm">(4.8)</span>
                      </div> */}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Size:</span>
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
                          {item.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Color:</span>
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
                          {item.color}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-gray-700">
                          ৳{item.product.price.toFixed(2)}{" "}
                          <span className="text-sm text-gray-500">
                            per item
                          </span>
                        </p>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                          ৳{item.totalPrice.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-amber-50 rounded-2xl p-2 shadow-inner">
                          <Button
                            onClick={() => handleQuantityChange(item, -1)}
                            className="w-10 h-10 rounded-xl bg-white hover:bg-amber-100 text-amber-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                          >
                            <Minus size={18} />
                          </Button>
                          <span className="px-6 py-2 text-xl font-bold text-amber-700 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() => handleQuantityChange(item, 1)}
                            className="w-10 h-10 rounded-xl bg-white hover:bg-amber-100 text-amber-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                          >
                            <Plus size={18} />
                          </Button>
                        </div>

                        <Button
                          onClick={() => handleDelete(item._id)}
                          className="w-12 h-12 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                        >
                          <Trash2 size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-amber-200/50 sticky top-8">
              <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Items ({totalItems})</span>
                  <span className="font-semibold">
                    ৳{totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold ">Tk.150</span>
                </div>
                {/* <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">৳{(totalAmount * 0.05).toFixed(2)}</span>
                </div> */}
              </div>

              <div className="bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    ৳{(totalAmount + totalAmount * 0.05).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-4"
              >
                <ShoppingCart className="mr-2" size={20} />
                Place Order
              </Button>

              {/* <p className="text-center text-sm text-gray-500 leading-relaxed">
                🚚 Free shipping on orders over ৳500<br/>
                💳 Secure payment guaranteed<br/>
                🔄 30-day return policy
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
