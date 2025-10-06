/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";
// import OrderDetails from "./OrderDetails";
// import { trackOrder } from "@/components/Services/Order";

// const TrackOrder = () => {
//   const [transactionId, setTransactionId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [order, setOrder] = useState<any[]>([]);
//   const [error, setError] = useState("");

//   const handleTrack = async () => {
//     if (!transactionId) {
//       setError("⚠️ Please enter a transaction ID.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const res = await trackOrder(transactionId);
//       setOrder(res.data || []);
//     } catch (err: any) {
//       setError(err.message || "Failed to track order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDeliveryDate = (updatedAt: string | undefined) => {
//     if (!updatedAt) return "N/A";
//     const date = new Date(updatedAt);
//     date.setDate(date.getDate() + 7);
//     return date.toDateString();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-10 px-4 font-sansita">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8"
//         >
//           🔍 Track Your Order
//         </motion.h1>

//         {/* Input Field */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="flex flex-col sm:flex-row items-center gap-3 bg-white shadow-lg rounded-2xl p-4 border border-amber-100"
//         >
//           <input
//             type="text"
//             value={transactionId}
//             onChange={(e) => setTransactionId(e.target.value)}
//             placeholder="Enter your Transaction ID"
//             className="flex-1 w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
//           />
//           <button
//             onClick={handleTrack}
//             disabled={loading}
//             className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 disabled:opacity-60"
//           >
//             <Search className="w-5 h-5" />
//             {loading ? "Tracking..." : "Track"}
//           </button>
//         </motion.div>

//         {/* Error */}
//         {error && (
//           <p className="text-center text-red-600 mt-4 font-medium">{error}</p>
//         )}

//         {/* Delivery Date */}
//         {order?.[0]?.updatedAt && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="mt-6 text-center bg-green-50 border border-green-200 text-green-700 py-3 rounded-xl shadow-sm font-semibold"
//           >
//             📦 Estimated Delivery Date:{" "}
//             {getDeliveryDate(order?.[0]?.updatedAt)}
//           </motion.div>
//         )}

//         {/* Order Details */}
//         {order.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="mt-10"
//           >
//             <OrderDetails order={order} />
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrackOrder;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  AlertCircle,
} from "lucide-react";
import OrderDetails from "./OrderDetails";
import { trackOrder } from "@/components/Services/Order";
import { useUser } from "@/components/context/UserContext";

const TrackOrder = () => {
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const { user } = useUser();

  const handleTrack = async () => {
    if (!transactionId.trim()) {
      setError("Please enter a transaction ID");
      return;
    }

    if (!user) {
      setError("Please login to track your order");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);
      const res = await trackOrder(transactionId);
      setOrder(res.data || []);

      if (!res.data || res.data.length === 0) {
        setError("No order found with this transaction ID");
      }
    } catch (err: any) {
      setError(err.message || "Failed to track order. Please try again.");
      setOrder([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrack();
    }
  };

  // const getDeliveryDate = (updatedAt: string | undefined) => {
  //   if (!updatedAt) return "N/A";
  //   const date = new Date(updatedAt);
  //   date.setDate(date.getDate() + 7);
  //   return date.toLocaleDateString("en-US", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  // const getOrderStatus = (status: string) => {
  //   const statusMap: any = {
  //     pending: {
  //       icon: Clock,
  //       color: "text-yellow-600",
  //       bg: "bg-yellow-50",
  //       border: "border-yellow-200",
  //       label: "Order Pending",
  //     },
  //     processing: {
  //       icon: Package,
  //       color: "text-blue-600",
  //       bg: "bg-blue-50",
  //       border: "border-blue-200",
  //       label: "Processing",
  //     },
  //     shipped: {
  //       icon: Truck,
  //       color: "text-purple-600",
  //       bg: "bg-purple-50",
  //       border: "border-purple-200",
  //       label: "Shipped",
  //     },
  //     delivered: {
  //       icon: CheckCircle,
  //       color: "text-green-600",
  //       bg: "bg-green-50",
  //       border: "border-green-200",
  //       label: "Delivered",
  //     },
  //   };
  //   return statusMap[status?.toLowerCase()] || statusMap.pending;
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4 mt-10 font-sansita">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4 shadow-lg">
            <Package className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-3">
            Track Your Order
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your transaction ID to track your package in real-time
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-amber-100"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter Transaction ID (e.g., Order-123456)"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all text-gray-700 font-medium"
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={loading || !transactionId.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Track Order
                </>
              )}
            </button>
          </div>

          {/* How to find Transaction ID */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 font-medium">
                  Where to find your Transaction ID?
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Check your order confirmation email or SMS for the Transaction
                  ID
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results Found */}
        <AnimatePresence>
          {searched && !loading && order.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No Order Found
              </h3>
              <p className="text-gray-500">
                We couldn't find an order with this transaction ID.
                <br />
                Please check and try again.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Status Card */}
        <AnimatePresence>
          {order.length > 0 && order[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              {/* Status Banner */}
              {/* {order[0].status && (
                <div
                  className={`${getOrderStatus(order[0].status).bg} ${
                    getOrderStatus(order[0].status).border
                  } border-2 rounded-2xl p-6 shadow-lg mb-6`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      {React.createElement(
                        getOrderStatus(order[0].status).icon,
                        {
                          className: `w-12 h-12 ${
                            getOrderStatus(order[0].status).color
                          }`,
                        }
                      )}
                      <div>
                        <p className="text-sm text-gray-600 font-medium">
                          Order Status
                        </p>
                        <h3
                          className={`text-2xl font-bold ${
                            getOrderStatus(order[0].status).color
                          }`}
                        >
                          {getOrderStatus(order[0].status).label}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 font-medium">
                        Transaction ID
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {transactionId}
                      </p>
                    </div>
                  </div>
                </div>
              )} */}

              {/* Delivery Info */}
              {/* {order[0].updatedAt && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg mb-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full">
                      <Truck className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-green-700 font-medium mb-1">
                        Estimated Delivery Date
                      </p>
                      <p className="text-xl font-bold text-green-800">
                        {getDeliveryDate(order[0].updatedAt)}
                      </p>
                    </div>
                    <MapPin className="w-8 h-8 text-green-500" />
                  </div>
                </motion.div>
              )} */}

              {/* Order Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    Order Details
                  </h2>
                </div>
                <div className="p-6">
                  <OrderDetails order={order} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 text-sm text-center">
            Need help? Contact our{" "}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 font-semibold underline"
            >
              Customer Support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackOrder;
