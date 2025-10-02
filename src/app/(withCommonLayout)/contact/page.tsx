import React from "react";
import PageLayout from "@/components/Layout/PageLayout";

const ContactPage = () => {
  return (
    <PageLayout title="Contact Us">
      <p className="text-gray-700 mb-4">
        We’re here to help! Reach out to us with questions about orders, products, or services.
      </p>
      <ul className="space-y-2 text-gray-700">
        <li>📍 Address: 123 Luxury Lane, Street Mart, CTG</li>
        <li>📞 Phone: +88 01111111111</li>
        <li>✉️ Email: shalford&co@gmail.com</li>
      </ul>
    </PageLayout>
  );
};

export default ContactPage;
