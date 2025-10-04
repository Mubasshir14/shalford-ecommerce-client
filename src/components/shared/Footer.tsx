/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Logo from "../../assets/company.png";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { createSubscriber } from "../Services/Subscriber";
import { toast } from "sonner";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email) return;

    if (!email.endsWith("@gmail.com") && !email.endsWith("@yahoo.com")) {
      toast.error("Please use a valid Gmail or Yahoo email.");
      return;
    }
    try {
      await createSubscriber(email);
      toast.success("Subscription successful!");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
    }
  };

  return (
    <footer className="mt-20 border-t font-arima bg-[#232536]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Image
              // className="w-36"
              src={Logo}
              alt="Logo"
              width={90}
              height={90}
            />
            <p className="text-gray-100 text-sm">
              Be the first to know when we drop something new! Keep an eye out
              for exclusive deals, surprise merch, fun freebies, and emails
              packed with smiles and laughter—just for our awesome community.
            </p>

            {/* User Authentication Section */}
            <div className="pt-4 border-t border-gray-200"></div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-50 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { text: "Learn", path: "/learn" },
                { text: "Contact us", path: "/contact" },
                { text: "FAQ", path: "/faq" },
                { text: "Our Service", path: "/service" },
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.path}
                    className="text-gray-100 hover:text-blue-600 text-sm transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-gray-50 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-100">
                <MapPin className="text-amber-600 mt-1" />
                <span>123 Luxury Lane, Street Mart, CTG</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-100">
                <Phone className="text-amber-600" />
                <span>+88 01111111111</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-100">
                <Mail className="text-amber-600" />
                <span>shalford&co@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-50 font-semibold mb-4">Stay Updated</h3>
            <form className="space-y-3">
              <p className="text-sm text-gray-100">
                Subscribe to our newsletter for the latest inventory and special
                offers.
              </p>
              <div className="flex flex-col space-y-2">
                <input
                  onClick={() => handleSubmit(email)}
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors cursor-pointer"
                  onClick={handleSubmit}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="mt-8 mx-auto flex py-6 border-t border-gray-200">
          <Image
            src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
            alt="SSLCOMMERZ"
            width={1430}
            height={300}
            className="object-contain rounded-lg flex mx-auto  ml-2"
          />
        </div>

        {/* Social Links */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-gray-400 hover:text-amber-600 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-300">
              <span>© {currentYear} Shalford & Co. All rights reserved.</span>
              <div className="flex gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-amber-600 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-amber-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
