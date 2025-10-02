import React from "react";
import PageLayout from "@/components/Layout/PageLayout";

const LearnPage = () => {
  return (
    <PageLayout title="Learn">
      <p className="text-gray-700 mb-4">
        At Shalford & Co., we believe in empowering our customers with knowledge about our products, how to use them, and tips for getting the best experience. Explore our guides, tutorials, and tips to make the most of your purchases.
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Product Guides & Tutorials</li>
        <li>Style Tips & Recommendations</li>
        <li>Exclusive Offers & Insights</li>
      </ul>
    </PageLayout>
  );
};

export default LearnPage;
