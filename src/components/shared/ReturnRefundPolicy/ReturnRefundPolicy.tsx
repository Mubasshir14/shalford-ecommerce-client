"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  Package,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  TrendingUp,
  AlertCircle,
  FileText,
  Truck,
  CreditCard,
  MessageSquare,
  Phone,
  Mail,
  HelpCircle,
  Ban,
} from "lucide-react";

const ReturnRefundPolicy = () => {
  const [activeTab, setActiveTab] = useState("return");
  const [activeProcess, setActiveProcess] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const eligibilityCriteria = [
    {
      icon: Clock,
      title: "7 Days Return Window",
      description: "Products can be returned within 7 days of delivery",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Package,
      title: "Original Packaging",
      description: "Items must be in original, unused condition with tags",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: FileText,
      title: "Invoice Required",
      description: "Original invoice or order confirmation needed",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Damaged or defective items accepted anytime",
      color: "text-amber-700",
      bgColor: "bg-amber-100",
    },
  ];

  const returnProcess = [
    {
      title: "Initiate Return Request",
      description: "Submit your return request through our portal",
      icon: MessageSquare,
      details: [
        "Log in to your account and go to 'My Orders'",
        "Select the order and click 'Return Item'",
        "Choose reason for return from dropdown",
        "Upload photos of the product (if damaged)",
      ],
    },
    {
      title: "Request Approval",
      description: "Our team reviews your request within 24 hours",
      icon: CheckCircle2,
      details: [
        "Automated verification of eligibility criteria",
        "Manual review for special cases",
        "Approval notification via SMS & email",
        "Return tracking ID generated",
      ],
    },
    {
      title: "Ship the Product",
      description: "Pack and ship the item to our return center",
      icon: Truck,
      details: [
        "Use original packaging if available",
        "Our courier will pickup from your address (free)",
        "Or drop at nearest partner location",
        "Keep return tracking number safe",
      ],
    },
    {
      title: "Inspection & Refund",
      description: "We inspect and process your refund",
      icon: CreditCard,
      details: [
        "Quality check upon receiving the item",
        "Refund initiated within 2-3 business days",
        "Money credited to original payment method",
        "Confirmation email sent with details",
      ],
    },
  ];

  const refundTimeline = [
    { method: "bKash/Nagad/Rocket", time: "2-3 business days", icon: "📱" },
    { method: "Bank Transfer", time: "5-7 business days", icon: "🏦" },
    { method: "Credit/Debit Card", time: "7-10 business days", icon: "💳" },
    { method: "Store Credit", time: "Instant", icon: "🎁" },
  ];

  const nonReturnableItems = [
    "Intimate apparel and personal care items",
    "Customized or personalized products",
    "Digital products and gift cards",
    "Perishable goods (food items)",
    "Products without original tags or packaging",
    "Items marked as 'Non-returnable' on product page",
  ];

  const faqs = [
    {
      question: "How many days do I have to return a product?",
      answer:
        "You can return products within 7 days of delivery. However, the product must be unused and in its original packaging with all tags intact.",
    },
    {
      question: "How long does the refund take?",
      answer:
        "Refund processing time varies by payment method: Mobile banking (2-3 days), Bank transfer (5-7 days), Cards (7-10 days). Store credit is instant.",
    },
    {
      question: "Is there any charge for refunds?",
      answer:
        "No, refund processing is completely free. Our courier service for returning products is also free of charge.",
    },
    {
      question: "Can I exchange instead of return?",
      answer:
        "Yes! You can exchange for a different size, color, or variant of the same product. Exchange requests follow the same 7-day policy.",
    },
    {
      question: "What should I do if I receive a damaged product?",
      answer:
        "Contact our support team immediately with photos of the product upon delivery. We will provide an immediate replacement or full refund.",
    },
    {
      question: "What if I received the wrong item?",
      answer:
        "Contact us immediately with order details and photos. We'll arrange free pickup and send the correct item or provide a full refund.",
    },
  ];

  const scenarios = [
    {
      title: "Damaged Product",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      action: "Immediate replacement or full refund",
      timeline: "Within 24 hours",
    },
    {
      title: "Wrong Item Delivered",
      icon: XCircle,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      action: "Free return & correct item shipped",
      timeline: "2-3 business days",
    },
    {
      title: "Size/Color Issue",
      icon: RefreshCcw,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      action: "Easy exchange within 7 days",
      timeline: "3-5 business days",
    },
    {
      title: "Changed Mind",
      icon: Package,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      action: "Return & refund (if unused)",
      timeline: "Within 7 days",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % returnProcess.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const hotlineNumber = process.env.NEXT_PUBLIC_HOTLINE_NUMBER;
  const email =
    process.env.NEXT_PUBLIC_EMAI;
  const address = "Dhaka, Bangladesh";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <RefreshCcw
              className="h-16 w-16 text-amber-600"
              style={{ animation: "spin 3s linear infinite" }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Return & Refund{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Policy
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your satisfaction is our goal. Easy returns and fast refund
            processing.
          </p>

          {/* Tabs */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setActiveTab("return")}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "return"
                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 border-2 border-gray-200 hover:border-amber-300"
              }`}
            >
              Return Policy
            </button>
            <button
              onClick={() => setActiveTab("refund")}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "refund"
                  ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300"
              }`}
            >
              Refund Policy
            </button>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Return Eligibility Criteria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligibilityCriteria.map((criteria, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100"
              >
                <div
                  className={`${criteria.bgColor} rounded-full w-14 h-14 flex items-center justify-center mb-4`}
                >
                  <criteria.icon className={`h-7 w-7 ${criteria.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {criteria.title}
                </h3>
                <p className="text-gray-600 text-sm">{criteria.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Scenarios */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Return Scenarios & Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((scenario, index) => (
              <div
                key={index}
                className={`${scenario.bgColor} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2`}
              >
                <div
                  className={`bg-gradient-to-br ${scenario.color} rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg`}
                >
                  <scenario.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {scenario.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${scenario.textColor}`} />
                    <span className="text-sm text-gray-700">
                      {scenario.action}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${scenario.textColor}`} />
                    <span className="text-sm text-gray-700">
                      {scenario.timeline}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Return Process - Step by Step
          </h2>

          {/* Process Timeline */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000"
                style={{
                  width: `${
                    ((activeProcess + 1) / returnProcess.length) * 100
                  }%`,
                }}
              />
            </div>
            {returnProcess.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center"
                style={{ width: `${100 / returnProcess.length}%` }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    index <= activeProcess
                      ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg scale-110"
                      : "bg-gray-200"
                  } relative z-10`}
                >
                  <step.icon
                    className={`h-6 w-6 ${
                      index <= activeProcess ? "text-white" : "text-gray-400"
                    }`}
                  />
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center hidden md:block ${
                    index <= activeProcess ? "text-amber-600" : "text-gray-400"
                  }`}
                >
                  Step {index + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Active Step Details */}
          <div
            className={`transition-all duration-500 ${
              isAnimating ? "opacity-0 transform scale-95" : "opacity-100"
            }`}
          >
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border-2 border-amber-200">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-lg">
                  {(() => {
                    const StepIcon = returnProcess[activeProcess].icon;
                    return <StepIcon className="h-8 w-8 text-white" />;
                  })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {returnProcess[activeProcess].title}
                    </h3>
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">
                      Step {activeProcess + 1}/{returnProcess.length}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {returnProcess[activeProcess].description}
                  </p>
                  <ul className="space-y-3">
                    {returnProcess[activeProcess].details.map(
                      (detail, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Manual Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {returnProcess.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveProcess(index);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeProcess
                    ? "w-8 bg-amber-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Refund Timeline */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Refund Processing Timeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refundTimeline.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200"
              >
                <div className="text-4xl mb-4 text-center">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {item.method}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-amber-600 font-semibold">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Pro Tip: Choose Store Credit for Instant Refund!
                </h4>
                <p className="text-gray-600 text-sm">
                  Get your refund instantly as store credit with 5% bonus. Use
                  it for your next purchase with no waiting time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Returnable Items */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Ban className="h-10 w-10 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Non-Returnable Items
            </h2>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-200">
            <p className="text-gray-700 mb-6 text-center">
              The following items cannot be returned due to hygiene, safety, or
              quality reasons:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nonReturnableItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm"
                >
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center justify-center gap-4 mb-8">
            <HelpCircle className="h-10 w-10 text-amber-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 hover:shadow-lg transition-all duration-300 group"
              >
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <svg
                    className="h-5 w-5 text-amber-600 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Need Help with Returns?</h2>
            <p className="text-amber-100 text-lg">
              Our support team is always ready to serve you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Hotline</h3>
              <p className="text-amber-100">{hotlineNumber}</p>
              <p className="text-sm text-amber-200 mt-1">24/7 Available</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Email Support</h3>
              <p className="text-amber-100">{email}</p>
              <p className="text-sm text-amber-200 mt-1">
                Reply within 2 hours
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <MessageSquare className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-amber-100">{address}</p>
              <p className="text-sm text-amber-200 mt-1">9 AM - 11 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
