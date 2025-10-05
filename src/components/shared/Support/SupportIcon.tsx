"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img from "../../../../src/assets/support.png";
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { scale: 0.7, opacity: 0, y: 100, x: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    } as Transition,
  },
};

const SupportIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = encodeURIComponent(
      "Hello! I would like some assistance regarding your products and services. Could you please help me?"
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Fixed Support Icon */}
      <div className="fixed bottom-6 right-6 z-50 font-arima">
        <button
          className="relative p-4 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300 group"
          onClick={() => setIsModalOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsModalOpen(true);
            }
          }}
          aria-label="Open support chat"
        >
          {/* Typing indicator dots */}
          <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
            <span
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "1s" }}
            ></span>
            <span
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "200ms", animationDuration: "1s" }}
            ></span>
            <span
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "400ms", animationDuration: "1s" }}
            ></span>
          </div>

          {/* <MessageCircle
            size={28}
            className="group-hover:scale-110 transition-transform duration-300"
          /> */}
          <Image
            src={img}
            className="group-hover:scale-110 transition-transform duration-300"
            width={38}
            height={38}
            alt="Icon"
          />
        </button>
      </div>

      {/* Messenger-Style Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed bottom-20 right-6 z-50 font-sansita"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="relative w-80 p-4 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl"
              variants={modalVariants}
            >
              {/* Chat Pointer (Triangle) */}
              <div className="absolute -top-2 right-6 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-transparent border-b-white dark:border-b-gray-800 transform translate-y-1/2" />

              {/* Close Button */}
              <Button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 bg-amber-500 p-1 rounded-full shadow hover:bg-amber-800"
                aria-label="Close support modal"
              >
                <X size={20} />
              </Button>

              {/* Chat Header */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Chat with us
                </h2>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {/* Received Message */}
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    CS
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                    <p className="text-sm">Hello there!</p>
                  </div>
                </div>

                {/* Received Message */}
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    CS
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                    <p className="text-sm">Hi! How can I help you today?</p>
                  </div>
                </div>

                {/* Sent Message */}
                <div className="flex justify-end">
                  <div className="bg-amber-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[70%]">
                    <p className="text-sm">
                      I have a question about your products.
                    </p>
                  </div>
                </div>

                {/* Received Message */}
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    CS
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                    <p className="text-sm">Sure, feel free to ask!</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
                <Button
                  onClick={handleWhatsAppRedirect}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-full transition-colors duration-300 text-sm"
                  aria-label="Send message"
                >
                  Send
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportIcon;
