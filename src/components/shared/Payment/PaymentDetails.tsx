/* eslint-disable react-hooks/exhaustive-deps */
"use client"
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Shield,
  CheckCircle2,
  ArrowRight,
  Clock,
  Lock,
  Users,
  Globe,
  Zap,
  Gift,
  TrendingUp,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const PaymentDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeMethod, setActiveMethod] = useState("card");
  const [isAnimating, setIsAnimating] = useState(false);

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Amex",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: "mobile",
      name: "Mobile Banking",
      icon: Smartphone,
      description: "bKash, Nagad, Rocket",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
    {
      id: "bank",
      name: "Internet Banking",
      icon: Building2,
      description: "All major banks",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: Wallet,
      description: "Upay, OKWallet",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const paymentSteps = [
    {
      title: "Select Payment Method",
      description: "Choose your preferred payment option from available methods",
      icon: CreditCard,
      details: [
        "Browse through all available payment methods",
        "Select the one that suits you best",
        "Check for any ongoing offers or discounts",
      ],
    },
    {
      title: "Enter Payment Details",
      description: "Fill in your payment information securely",
      icon: Lock,
      details: [
        "Enter card number, expiry date, and CVV",
        "For mobile banking, enter your wallet number",
        "All data is encrypted and secure",
      ],
    },
    {
      title: "Verify & Confirm",
      description: "Review your order and payment details",
      icon: Shield,
      details: [
        "Double-check your order summary",
        "Verify the payment amount",
        "Confirm your delivery address",
      ],
    },
    {
      title: "Complete Payment",
      description: "Process your payment through SSLCommerz",
      icon: CheckCircle2,
      details: [
        "You'll be redirected to payment gateway",
        "Complete OTP verification if required",
        "Receive instant payment confirmation",
      ],
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "PCI-DSS certified payment gateway",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Real-time payment confirmation",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      title: "Trusted by Millions",
      description: "Bangladesh's #1 payment gateway",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Globe,
      title: "Multiple Options",
      description: "20+ payment methods available",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const faqs = [
    {
      question: "Is my payment information secure?",
      answer:
        "Yes! SSLCommerz uses bank-level 256-bit SSL encryption to protect your payment data. We never store your card details.",
    },
    {
      question: "How long does payment processing take?",
      answer:
        "Payment confirmation is instant! Once you complete the payment, you'll receive immediate confirmation via SMS and email.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit/debit cards, mobile banking (bKash, Nagad, Rocket), internet banking, and digital wallets.",
    },
    {
      question: "Can I get a refund if I cancel my order?",
      answer:
        "Yes! Refunds are processed within 7-10 business days and will be credited to your original payment method.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % paymentSteps.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-amber-600" style={{ animation: 'pulse 2s infinite' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Secure Payment with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              SSLCommerz
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bangladesh's most trusted payment gateway. Fast, secure, and easy to use.
          </p>

          {/* SSL Logo */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-200">
              <Image
              width={800}
              height={80}
                src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
                alt="SSLCOMMERZ"
                className="h-16 md:h-20 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`${feature.bgColor} rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Available Payment Methods
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method.id)}
                className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                  activeMethod === method.id
                    ? "ring-4 ring-amber-400 shadow-2xl scale-105"
                    : "hover:shadow-lg"
                } ${method.bgColor} border-2 ${
                  activeMethod === method.id ? "border-amber-400" : "border-transparent"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`bg-gradient-to-br ${method.color} rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{method.name}</h3>
                  <p className={`text-sm ${method.textColor}`}>{method.description}</p>
                </div>
                {activeMethod === method.id && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="h-6 w-6 text-amber-600" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Method Details */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="bg-amber-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Special Offers Available!</h4>
                <p className="text-gray-600 text-sm">
                  Get instant discounts and cashback on selected payment methods. Check for ongoing promotions at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Process Steps */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Complete Your Payment
          </h2>

          {/* Step Indicators */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000"
                style={{ width: `${((activeStep + 1) / paymentSteps.length) * 100}%` }}
              />
            </div>
            {paymentSteps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center"
                style={{ width: `${100 / paymentSteps.length}%` }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    index <= activeStep
                      ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg scale-110"
                      : "bg-gray-200"
                  } relative z-10`}
                >
                  {index < activeStep ? (
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  ) : (
                    <step.icon className={`h-6 w-6 ${index === activeStep ? "text-white" : "text-gray-400"}`} />
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium text-center hidden md:block ${
                  index <= activeStep ? "text-amber-600" : "text-gray-400"
                }`}>
                  Step {index + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Active Step Details */}
          <div className={`transition-all duration-500 ${isAnimating ? "opacity-0 transform scale-95" : "opacity-100"}`}>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border-2 border-amber-200">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-lg">
                  {(() => {
                    const StepIcon = paymentSteps[activeStep].icon;
                    return <StepIcon className="h-8 w-8 text-white" />;
                  })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {paymentSteps[activeStep].title}
                    </h3>
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">
                      Step {activeStep + 1}/{paymentSteps.length}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{paymentSteps[activeStep].description}</p>
                  <ul className="space-y-3">
                    {paymentSteps[activeStep].details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Manual Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {paymentSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveStep(index);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeStep ? "w-8 bg-amber-600" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-600 rounded-full w-14 h-14 flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Why Choose SSLCommerz?</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Trusted by 40,000+ merchants across Bangladesh",
                "Process 1M+ transactions monthly",
                "24/7 customer support in Bangla & English",
                "Fastest payment confirmation (within seconds)",
                "No hidden charges or extra fees",
                "EMI options available on cards",
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Transaction Timeline</h3>
            </div>
            <div className="space-y-6">
              {[
                { time: "Instant", text: "Payment gateway redirect" },
                { time: "30 seconds", text: "Payment confirmation" },
                { time: "1 minute", text: "Order confirmation email/SMS" },
                { time: "5 minutes", text: "Seller notification" },
                { time: "24 hours", text: "Order processing begins" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-lg px-3 py-1 text-sm font-bold min-w-[100px] text-center">
                    {item.time}
                  </div>
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center justify-center gap-4 mb-8">
            <HelpCircle className="h-10 w-10 text-amber-600" />
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 hover:shadow-lg transition-all duration-300 group"
              >
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <svg className="h-5 w-5 text-amber-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-amber-100 text-lg">Our support team is here to assist you 24/7</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-amber-100">09610-333-333</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Email Us</h3>
              <p className="text-amber-100">support@sslcommerz.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <MapPin className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-amber-100">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;