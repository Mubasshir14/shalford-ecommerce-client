/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getStatusBasedOrders } from "@/components/Services/Order";
import { useRouter } from "next/navigation"; // For navigation to order details
import { ManageCancelledOrderAdminProps } from "@/app/(WithDashboardLayout)/admin/dashboard/cancelled-order/page";
import { toast } from "sonner";

// Define TypeScript interfaces for better type safety
interface Product {
  name: string;
  quantity: number;
}

interface Order {
  _id: string;
  transactionId?: string;
  method: string;
  amount: number;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  order: {
    _id: string;
    products: Product[];
    status: string;
    contact?: string;
  };
  contact?: string;
  status: string;
  createdAt: string;
}

const ManageCancelledOrderAdmin: React.FC<ManageCancelledOrderAdminProps> = ({
  Cancelled,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //   useEffect(() => {
  //     const fetchOrders = async () => {
  //       setLoading(true);
  //       try {
  //         const res = await getCancelledOrders();
  //         const data: Order[] = res.data.map((order: any) => ({
  //           ...order,
  //           order: {
  //             ...order.order,
  //             products: order.order.products || [],
  //           },
  //         }));
  //         setOrders(data);
  //       } catch (error) {
  //         console.error("Failed to fetch orders:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchOrders();
  //   }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!Cancelled) {
        console.error("Cancelled status is undefined or empty");
        toast.error("Invalid order status");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await getStatusBasedOrders(Cancelled);
        const data: Order[] = res.data.map((order: any) => ({
          ...order,
          order: {
            ...order.order,
            products: order.order.products || [],
          },
        }));
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [Cancelled]);

  // const filteredOrders = orders.filter((order) =>
  //   order.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredOrders = orders.filter((order) => 
  order.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  order.user?.phone?.toLowerCase().includes(searchTerm.toLowerCase())
);

  const handleViewOrder = (orderId: string) => {
    router.push(`/admin/dashboard/order-details/${orderId}`);
  };

  return (
    <div className="max-w-7xl p-4 sm:p-6 font-sansita bg-gradient-to-br from-amber-50 via-orange-50 to-white min-h-screen">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-2 drop-shadow-lg">
            Cancelled Orders
          </h2>
          <p className="text-amber-600/80 text-sm sm:text-base">
            Track and manage all your orders in one place
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
            <input
              type="text"
              placeholder="Search by Transaction ID/Email/Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-2xl focus:ring-4 focus:ring-amber-300/30 focus:border-amber-400 focus:outline-none shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            />
          </div>
        </motion.div>

        {loading ? (
          <motion.div
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-300 border-t-amber-600 mx-auto mb-4"></div>
              <p className="text-amber-700 font-medium">
                Loading your orders...
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Fixed width container with horizontal scroll */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-amber-50">
              <div className="min-w-[1000px] ">
                {" "}
                {/* Fixed minimum width */}
                <table className="w-full border-collapse ">
                  <thead>
                    <tr className="bg-gradient-to-r from-amber-200 via-amber-150 to-orange-200 text-amber-900 sticky top-0 z-10 shadow-md">
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-16">
                        #
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-40">
                        Transaction ID
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-24">
                        Method
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-24">
                        Amount
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-32">
                        Name
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-32">
                        Email
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-32">
                        Phone
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-48">
                        Products
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-32">
                        Order Status
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-32">
                        Payment Status
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm border-r border-amber-300/30 w-40">
                        Date
                      </th>
                      <th className="px-4 py-4 text-left font-bold text-sm w-24">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order, index) => (
                        <motion.tr
                          key={order._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="border-b border-amber-100 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 group"
                        >
                          <td className="px-4 py-4 text-amber-700 font-semibold border-r border-amber-100/50">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4 border-r border-amber-100/50">
                            <span className="font-mono text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-lg">
                              {order.transactionId || "—"}
                            </span>
                          </td>
                          <td className="px-4 py-4 border-r border-amber-100/50">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {order.method}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs font-bold text-amber-700 border-r border-amber-100/50">
                            ৳ {order.amount}
                          </td>
                          <td
                            className="px-4 py-4 text-gray-800 border-r border-amber-100/50 truncate"
                            title={order.user.name}
                          >
                            {order.user.name}
                          </td>
                          <td className="px-4 py-4 text-xs text-gray-700 border-r border-amber-100/50">
                            {order.user.email}
                          </td>
                          <td className="px-4 py-4 text-gray-700 border-r border-amber-100/50">
                            {order.order.contact || order.user.phone}
                          </td>
                          <td className="px-4 py-4 border-r border-amber-100/50">
                            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                              {order.order.products?.map((p, i) => (
                                <span
                                  key={i}
                                  className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs px-2 py-1 rounded-lg shadow-sm border border-amber-200"
                                  title={`${p.name} ${
                                    p.quantity ? `x${p.quantity}` : ""
                                  }`}
                                >
                                  {p.name.length > 15
                                    ? `${p.name.substring(0, 15)}...`
                                    : p.name}{" "}
                                  {p.quantity ? `x${p.quantity}` : ""}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4 border-r border-amber-100/50">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                                order.order.status === "Delivered"
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : order.order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {order.order.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 border-r border-amber-100/50">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm border ${
                                order.status === "Paid"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : order.status === "Failed"
                                  ? "bg-red-100 text-red-700 border-red-200"
                                  : "bg-amber-100 text-amber-700 border-amber-200"
                              }`}
                            >
                              {order.status}
                            </motion.span>
                          </td>
                          <td className="px-4 py-4 text-xs text-gray-500 border-r border-amber-100/50">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-700">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(order.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          </td>
                          <div className="flex flex-col items-center">
                            <td className="px-4 py-4">
                              <motion.button
                                whileHover={{
                                  scale: 1.08,
                                  boxShadow:
                                    "0 8px 25px -5px rgba(217, 119, 6, 0.3)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleViewOrder(order.order._id)}
                                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all duration-300 border border-amber-400 group-hover:shadow-xl"
                              >
                                View
                              </motion.button>
                            </td>
                          </div>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={12} className="text-center py-16">
                          <div className="flex flex-col items-center justify-center text-gray-400">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                              <Search className="w-8 h-8 text-amber-400" />
                            </div>
                            <p className="text-lg font-medium mb-2">
                              No orders found
                            </p>
                            <p className="text-sm">
                              Try adjusting your search criteria
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageCancelledOrderAdmin;
