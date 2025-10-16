"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img from "../../../../src/assets/help-desk.png";
import { generateBotReply } from "@/Utils/generateBotReply";

interface Message {
  sender: "user" | "bot";
  text: string;
}

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

const WebSupport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input;
    setInput("");

    setTimeout(() => {
      const replyText = generateBotReply(userInput);
      setMessages((prev) => [...prev, { sender: "bot", text: replyText }]);
    }, 700);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-25 right-6 z-50 font-arima">
        <button
          className="relative p-4 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300 group"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
            <span
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "200ms" }}
            />
            <span
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "400ms" }}
            />
          </div>
          <Image
            src={img}
            className="group-hover:scale-110 transition-transform duration-300"
            width={38}
            height={38}
            alt="Icon"
          />
        </button>
      </div>

      {/* Chat Modal */}
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
              <div className="absolute -top-2 right-6 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-transparent border-b-white dark:border-b-gray-800 transform translate-y-1/2" />

              {/* Close */}
              <Button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 bg-amber-500 p-1 rounded-full shadow hover:bg-amber-800"
              >
                <X size={20} />
              </Button>

              {/* Header */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Chat with us
                </h2>
              </div>

              {/* Messages */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-1">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "items-start gap-2"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        CS
                      </div>
                    )}
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                        msg.sender === "user"
                          ? "bg-amber-600 text-white rounded-tr-sm"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
                <Button
                  onClick={handleSend}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-full transition-colors duration-300 text-sm"
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

export default WebSupport;
