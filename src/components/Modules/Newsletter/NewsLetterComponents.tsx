/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { Mail, Send, Gift, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createSubscriber } from "@/components/Services/Subscriber";

export default function NewsletterComponents() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email) return;

    if (!email.endsWith("@gmail.com") && !email.endsWith("@yahoo.com")) {
      toast.error("Please use a valid Gmail or Yahoo email.");
      return;
    }

    setIsLoading(true);

    try {
      await createSubscriber(email);
      setIsSubscribed(true);
      toast.success("Subscription successful!");
      setEmail("");

      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sansita">
      <div className="absolute top-0 left-0 w-96 h-96  blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-lg blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded- blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="backdrop-blur-lg rounded-lg shadow-lg border border-amber-200/50 overflow-hidden hover:shadow-amber-200/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.01]">
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Gift size={18} className="animate-pulse" />
                <span>Exclusive Offers Inside</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-extrabold text-amber-900 leading-tight">
                  Never Miss a
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 animate-pulse">
                    Great Deal!
                  </span>
                </h2>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                  Subscribe to our newsletter and get exclusive discounts, early
                  access to new products, and special promotions delivered
                  straight to your inbox.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                {!isSubscribed ? (
                  <div className="space-y-4">
                    {/* Email Input */}
                    <div className="relative group">
                      <div className="absolute inset-0  rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-white rounded-lg shadow-lg border-2 border-amber-200 p-1">
                        <div className="flex items-center gap-3 px-5 py-4 h-10">
                          <Mail size={24} className="text-amber-600" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="flex-1 outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !email}
                      className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:via-amber-700 hover:to-orange-600 text-white font-bold  rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 h-10"
                    >
                      <div className="flex items-center justify-center gap-3">
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-lg">Subscribing...</span>
                          </>
                        ) : (
                          <>
                            <Send size={22} />
                            <span className="text-lg">Subscribe Now</span>
                          </>
                        )}
                      </div>
                    </button>

                    {/* Privacy Note */}
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      By subscribing, you agree to our Privacy Policy and
                      consent to receive updates from our company. Unsubscribe
                      anytime.
                    </p>
                  </div>
                ) : (
                  // Success State
                  <div className="text-center space-y-6 py-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <CheckCircle2
                          size={48}
                          className="text-white animate-bounce"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold text-amber-900">
                        You're All Set! 🎉
                      </h3>
                      <p className="text-gray-600 text-lg">
                        Welcome to our exclusive community! Check your inbox for
                        a special welcome offer.
                      </p>
                    </div>
                    {/* <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-full font-semibold">
                      <Gift size={20} />
                      <span>10% discount code sent to your email</span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Decorative Bar */}
          <div className="h-3 bg-gradient-to-r from-amber-400  via-amber-500 to-orange-400 animate-pulse rounded-b-[2.5rem]"></div>
        </div>
      </div>
    </section>
  );
}
