import React from "react";
import PageLayout from "@/components/Layout/PageLayout";

const OurServicePage = () => {
  return (
    <PageLayout title="Our Service">
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Fast & Reliable Shipping</li>
        <li>Secure Payments via SSLCOMMERZ & bKash</li>
        <li>Exclusive Offers & Loyalty Rewards</li>
        <li>Responsive Customer Support</li>
      </ul>
    </PageLayout>
  );
};

export default OurServicePage;
