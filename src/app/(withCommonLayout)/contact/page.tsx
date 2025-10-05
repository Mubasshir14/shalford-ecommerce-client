"use client";
import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <section className="min-h-screen mt-14  text-gray-100 font-arima">
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-amber-500 mb-4">Contact Us</h1>
      </div>

      {/* Main Contact Info */}
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div className="bg-[#2f3147] rounded-2xl p-8 shadow-md text-center">
          <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Our Location</h3>
          <p className="text-gray-300">Dhaka, Bangladesh</p>
        </div>

        <div className="bg-[#2f3147] rounded-2xl p-8 shadow-md text-center">
          <Phone className="w-8 h-8 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Phone Number</h3>
          <p className="text-gray-300">{process.env.NEXT_PUBLIC_HOTLINE_NUMBER || "+880 1XXXXXXXXX"}</p>
        </div>

        <div className="bg-[#2f3147] rounded-2xl p-8 shadow-md text-center">
          <Mail className="w-8 h-8 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email Address</h3>
          <p className="text-gray-300">{process.env.NEXT_PUBLIC_EMAI || "info@shalfordbd.com"}</p>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <iframe
          title="Shalford BD Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.8849067077644!2d90.41251837479687!3d23.86014087860706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4f5e3c86ad9%3A0xd6ef6b8b5f8f1811!2sDhaka!5e0!3m2!1sen!2sbd!4v1690808271379!5m2!1sen!2sbd"
          width="100%"
          height="400"
          allowFullScreen
          loading="lazy"
          className="rounded-2xl border-0 shadow-md"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactPage;
