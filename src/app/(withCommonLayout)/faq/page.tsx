"use client";

const FAQPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-20 mb-16 font-arima">
      <h1 className="text-3xl font-bold text-center text-amber-500 mb-10">
        Frequently Asked Questions
      </h1>

      <div className="space-y-8 text-gray-200 shadow-md">
        {/* Question 1 */}
        <div className="bg-[#232536] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-amber-500 mb-1">
            How do I place an order?
          </h3>
          <p>
            Simply browse our collection, add items to your cart, and checkout
            securely using your preferred payment method. Once your payment is
            confirmed, you’ll receive an order confirmation email.
          </p>
        </div>

        {/* Question 2 */}
        <div className="bg-[#232536] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-amber-500 mb-1">
            What payment methods do you accept?
          </h3>
          <p>
            We accept all major payment methods including Visa, Mastercard,
            American Express, bKash, Nagad, Rocket through{" "}
            <a href="/payment-details" className="text-amber-500 hover:underline">
              SSLCOMMERZ{" "}
            </a>{" "}
            payments.
          </p>
        </div>

        {/* Question 3 */}
        <div className="bg-[#232536] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-amber-500 mb-1">
            Can I return or exchange items?
          </h3>
          <p>
            Yes! Please refer to our{" "}
            <a href="/return-refund" className="text-amber-500 hover:underline">
              Return & Refund Policy
            </a>{" "}
            for full details. Generally, returns are accepted within 7 days of
            receiving your order if items are unused and in original condition.
          </p>
        </div>

        {/* Question 4 */}
        <div className="bg-[#232536] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-amber-500 mb-1">
            How long does delivery take?
          </h3>
          <p>
            Standard delivery usually takes 3–7 business days within Bangladesh.
            Delivery time may vary based on your location and courier service.
          </p>
        </div>

        {/* Question 5 */}
        <div className="bg-[#232536] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-amber-500 mb-1">
            Do you offer international shipping?
          </h3>
          <p>
            Currently, we only deliver within Bangladesh. However, we plan to
            launch international shipping soon!
          </p>
        </div>

        {/* Question 6 */}
        <div className="bg-[#232536] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-amber-500 mb-1">
            What if I receive a damaged or wrong product?
          </h3>
          <p>
            We’re so sorry for the inconvenience! Please contact our support
            team within 48 hours of receiving your package. We’ll replace the
            item or provide a refund as soon as possible.
          </p>
        </div>

        {/* Question 7 */}
        <div className="bg-[#232536] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-amber-500 mb-1">
            How can I contact customer support?
          </h3>
          <p>
            You can reach our support team via email at{" "}
            <span className="text-amber-500">
              {process.env.NEXT_PUBLIC_EMAI}
            </span>{" "}
            or call us at{" "}
            <span className="text-amber-500">
              {process.env.NEXT_PUBLIC_HOTLINE_NUMBER}
            </span>
            .
          </p>
        </div>

        {/* Question 8 */}
        <div className="bg-[#232536] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-amber-500 mb-1">
            How can I track my order?
          </h3>
          <p>
            Once your order is shipped, you’ll receive an email or SMS with a
            tracking link so you can monitor your delivery status in real time.
          </p>
        </div>

        {/* Question 9 */}
        <div className="bg-[#232536] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold text-amber-500 mb-1">
            Do you offer discounts or promo codes?
          </h3>
          <p>
            Yes! Follow us on social media or subscribe to our newsletter to get
            exclusive offers, promo codes, and early access to special deals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
