/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import OrderDetails from "./OrderDetails"; 
import { trackOrder } from "@/components/Services/Order";

const TrackOrder = () => {
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!transactionId) {
      setError("⚠️ Please enter a transaction ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await trackOrder(transactionId);
      setOrder(res.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to track order");
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryDate = (updatedAt: string | undefined) => {
    if (!updatedAt) return "N/A";
    const date = new Date(updatedAt);
    date.setDate(date.getDate() + 7); 
    return date.toDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-10 px-4 font-sansita">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8"
        >
          🔍 Track Your Order
        </motion.h1>

        {/* Input Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3 bg-white shadow-lg rounded-2xl p-4 border border-amber-100"
        >
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter your Transaction ID"
            className="flex-1 w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={handleTrack}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 disabled:opacity-60"
          >
            <Search className="w-5 h-5" />
            {loading ? "Tracking..." : "Track"}
          </button>
        </motion.div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 mt-4 font-medium">{error}</p>
        )}

        {/* Delivery Date */}
        {order?.[0]?.updatedAt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center bg-green-50 border border-green-200 text-green-700 py-3 rounded-xl shadow-sm font-semibold"
          >
            📦 Estimated Delivery Date:{" "}
            {getDeliveryDate(order?.[0]?.updatedAt)}
          </motion.div>
        )}

        {/* Order Details */}
        {order.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <OrderDetails order={order} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
