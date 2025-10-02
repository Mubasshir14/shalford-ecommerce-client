import React from "react";
import PageLayout from "@/components/Layout/PageLayout";

const FAQPage = () => {
  return (
    <PageLayout title="Frequently Asked Questions">
      <div className="space-y-6 text-gray-700">
        <div>
          <h3 className="text-lg font-semibold text-amber-500 mb-1">How do I place an order?</h3>
          <p>Simply browse our collection, add items to your cart, and checkout securely using your preferred payment method.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-500 mb-1">What payment methods do you accept?</h3>
          <p>We accept Visa, Mastercard, American Express, bKash, and SSLCOMMERZ payments.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-500 mb-1">Can I return or exchange items?</h3>
          <p>Yes! Please refer to our Return & Exchange Policy for details on how to process a return.</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQPage;
