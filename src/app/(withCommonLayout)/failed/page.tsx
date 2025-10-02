"use client"
import { motion } from 'framer-motion';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';


const FailedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center"
      >
        <XCircleIcon className="w-24 h-24 text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed!</h1>
        <p className="text-center text-gray-700 mb-6">
          Something went wrong. Please try again.
        </p>
        <Link
          href='/cart'
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Retry Payment
        </Link>
      </motion.div>
    </div>
  );
};

export default FailedPage;
