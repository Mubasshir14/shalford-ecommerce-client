"use client";
import { motion } from "framer-motion";
import { BanIcon } from "lucide-react";
import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center"
      >
        <BanIcon className="w-24 h-24 text-yellow-500 mb-6 animate-ping" />
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">
          Payment Cancelled!
        </h1>
        <p className="text-center text-gray-700 mb-6">
          You have cancelled your payment. You can retry anytime.
        </p>
        <Link
          href="/cart"
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Retry Payment
        </Link>
      </motion.div>
    </div>
  );
};

export default CancelPage;
