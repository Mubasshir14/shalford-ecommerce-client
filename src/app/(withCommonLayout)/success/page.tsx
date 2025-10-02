"use client"
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';


const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4 font-arima">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center"
      >
        <CheckCircleIcon className="w-24 h-24 text-amber-500 mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold text-amber-600 mb-4">Payment Successful!</h1>
        <p className="text-center text-gray-700 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <Link
          href={'/user/dashboard/manage-order'}
          className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
        >
          View Orders
        </Link>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
