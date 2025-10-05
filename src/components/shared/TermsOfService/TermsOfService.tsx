/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from "react";
import {
  FileText,
  ShoppingCart,
  CreditCard,
  Package,
  RefreshCcw,
  Scale,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  User,
  Lock,
  Gavel,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  TrendingUp,
  Ban,
  Info,
  ExternalLink,
  BookOpen,
  UserCheck,
  MessageSquare,
} from "lucide-react";

const TermsOfServicePage = () => {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    { id: "acceptance", label: "Acceptance of Terms", icon: FileText },
    { id: "account", label: "User Accounts", icon: User },
    { id: "orders", label: "Orders & Payments", icon: ShoppingCart },
    { id: "shipping", label: "Shipping & Delivery", icon: Package },
    { id: "returns", label: "Returns & Refunds", icon: RefreshCcw },
    { id: "prohibited", label: "Prohibited Activities", icon: Ban },
    { id: "liability", label: "Limitation of Liability", icon: Scale },
    { id: "termination", label: "Account Termination", icon: XCircle },
  ];

  const keyTerms = [
    {
      icon: CheckCircle2,
      title: "Agreement to Terms",
      description: "By using our services, you agree to be bound by these terms and conditions",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: UserCheck,
      title: "Age Requirement",
      description: "You must be at least 18 years old to create an account and make purchases",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Shield,
      title: "Account Security",
      description: "You are responsible for maintaining the confidentiality of your account credentials",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Scale,
      title: "Legal Compliance",
      description: "All transactions must comply with applicable laws and regulations of Bangladesh",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const accountRules = [
    {
      title: "Account Registration",
      points: [
        "Provide accurate and complete information during registration",
        "Maintain and update your information to keep it current",
        "One account per person - multiple accounts are not allowed",
        "You must be legally capable of entering into binding contracts",
      ],
    },
    {
      title: "Account Security",
      points: [
        "Keep your password secure and confidential",
        "Notify us immediately of any unauthorized access",
        "You are responsible for all activities under your account",
        "Do not share your account credentials with others",
      ],
    },
    {
      title: "Account Usage",
      points: [
        "Use the platform only for lawful purposes",
        "Do not engage in fraudulent activities",
        "Respect intellectual property rights",
        "Do not attempt to manipulate prices or reviews",
      ],
    },
  ];

  const orderTerms = [
    {
      icon: ShoppingCart,
      title: "Order Placement",
      description: "All orders are subject to acceptance and product availability",
      details: [
        "We reserve the right to refuse any order",
        "Prices are subject to change without notice",
        "Orders confirmed via email are binding",
        "Product images are for reference only",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      description: "Payment must be made at the time of order placement",
      details: [
        "We accept cards, mobile banking, and online payments",
        "All payments are processed securely via SSLCommerz",
        "Payment confirmation required before shipping",
        "Prices include applicable VAT and taxes",
      ],
    },
    {
      icon: Package,
      title: "Product Accuracy",
      description: "We strive to display products as accurately as possible",
      details: [
        "Colors may vary due to screen settings",
        "Weights and dimensions are approximate",
        "Product specifications subject to change",
        "Manufacturing defects covered under warranty",
      ],
    },
  ];

  const shippingPolicies = [
    {
      location: "Inside Dhaka",
      time: "2-3 business days",
      cost: "BDT 150",
      icon: "🏙️",
    },
    {
      location: "Outside Dhaka",
      time: "3-5 business days",
      cost: "BDT 150",
      icon: "🌆",
    },
    {
      location: "Remote Areas",
      time: "7-10 business days",
      cost: "BDT 150-200",
      icon: "🏔️",
    },
  ];

  const prohibitedActivities = [
    "Using the platform for illegal activities",
    "Attempting to hack, disrupt, or damage the website",
    "Creating fake accounts or impersonating others",
    "Scraping content or using automated tools",
    "Posting false reviews or ratings",
    "Reselling products for commercial purposes without authorization",
    "Violating intellectual property rights",
    "Engaging in fraudulent payment activities",
    "Harassing other users or staff members",
    "Uploading malicious software or viruses",
  ];

  const liabilityLimitations = [
    {
      title: "Service Availability",
      description: "We do not guarantee uninterrupted access to our platform",
      icon: Globe,
    },
    {
      title: "Product Quality",
      description: "Warranty claims are subject to manufacturer terms and conditions",
      icon: Package,
    },
    {
      title: "Third-party Services",
      description: "We are not liable for actions of third-party payment or delivery partners",
      icon: ExternalLink,
    },
    {
      title: "Indirect Damages",
      description: "We are not liable for any indirect, incidental, or consequential damages",
      icon: AlertTriangle,
    },
  ];

  const terminationReasons = [
    "Violation of these Terms of Service",
    "Fraudulent activities or payment disputes",
    "Abuse of return/refund policies",
    "Creating multiple accounts to exploit offers",
    "Inappropriate behavior toward staff or customers",
    "Failure to pay for received orders",
  ];

  const disputeResolution = [
    {
      step: "1. Contact Support",
      description: "Reach out to our customer service team first",
      icon: MessageSquare,
    },
    {
      step: "2. Escalation",
      description: "If unresolved, escalate to management within 7 days",
      icon: TrendingUp,
    },
    {
      step: "3. Mediation",
      description: "Attempt to resolve through good faith negotiations",
      icon: Gavel,
    },
    {
      step: "4. Legal Action",
      description: "Subject to jurisdiction of courts in Dhaka, Bangladesh",
      icon: Scale,
    },
  ];

  const hotlineNumber = process.env.NEXT_PUBLIC_HOTLINE_NUMBER;
  const email = process.env.NEXT_PUBLIC_EMAI;
  const address = "Dhaka, Bangladesh";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-16 w-16 text-amber-600" style={{ animation: 'pulse 2s infinite' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Service
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. Your use of our platform constitutes acceptance of these terms.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last Updated: September 2025</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-16 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg scale-105"
                    : "bg-amber-50 text-gray-700 hover:bg-amber-100"
                }`}
              >
                <section.icon className="h-6 w-6" />
                <span className="text-xs font-medium text-center">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Key Terms Overview */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Terms at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyTerms.map((term, index) => (
              <div
                key={index}
                className={`${term.bgColor} rounded-xl p-6 border-2 border-amber-200 hover:shadow-lg transition-all duration-300`}
              >
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center mb-4 shadow-md">
                  <term.icon className={`h-7 w-7 ${term.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{term.title}</h3>
                <p className="text-gray-600 text-sm">{term.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Acceptance of Terms */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-amber-600 rounded-full w-14 h-14 flex items-center justify-center">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Acceptance of Terms</h2>
              <p className="text-gray-600">Understanding your agreement with us</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border-2 border-amber-200">
            <p className="text-gray-700 mb-6 leading-relaxed">
              By accessing or using our website and services, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Service and our Privacy Policy. 
              If you do not agree to these terms, please do not use our services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Binding Agreement</h4>
                  <p className="text-gray-600 text-sm">
                    These terms create a legally binding agreement between you and our company
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Changes to Terms</h4>
                  <p className="text-gray-600 text-sm">
                    We reserve the right to modify these terms at any time with notice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Accounts */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center">
              <User className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">User Account Rules</h2>
              <p className="text-gray-600">Guidelines for creating and maintaining your account</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accountRules.map((rule, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{rule.title}</h3>
                <ul className="space-y-3">
                  {rule.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Orders & Payments */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-600 rounded-full w-14 h-14 flex items-center justify-center">
              <ShoppingCart className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Orders & Payment Terms</h2>
              <p className="text-gray-600">Important information about placing orders and payments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {orderTerms.map((term, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200"
              >
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full w-14 h-14 flex items-center justify-center mb-4 shadow-lg">
                  <term.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{term.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{term.description}</p>
                <ul className="space-y-2">
                  {term.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Delivery */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Package className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Shipping & Delivery Policy</h2>
              <p className="text-gray-600">Delivery timelines and shipping charges</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {shippingPolicies.map((policy, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{policy.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {policy.location}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="text-gray-600 text-sm">Delivery Time:</span>
                    <span className="text-purple-600 font-semibold text-sm">{policy.time}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="text-gray-600 text-sm">Shipping Cost:</span>
                    <span className="text-purple-600 font-semibold text-sm">{policy.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Important Shipping Notes</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      Delivery times are estimates and may vary due to unforeseen circumstances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      We are not responsible for delays caused by incorrect shipping addresses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      Risk of loss transfers to you upon delivery to the carrier
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Returns & Refunds */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-orange-600 rounded-full w-14 h-14 flex items-center justify-center">
              <RefreshCcw className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Returns & Refunds</h2>
              <p className="text-gray-600">Our return and refund policy summary</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border-2 border-orange-200">
            <p className="text-gray-700 mb-6">
              Products can be returned within 7 days of delivery if unused and in original packaging. 
              For complete details, please refer to our dedicated Return & Refund Policy page.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Eligible for Return
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Damaged or defective products</li>
                  <li>• Wrong items delivered</li>
                  <li>• Unused items with original tags</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Not Eligible for Return
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Used or worn products</li>
                  <li>• Intimate apparel items</li>
                  <li>• Items without tags/packaging</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Prohibited Activities */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Ban className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Prohibited Activities</h2>
              <p className="text-gray-600">Activities that are strictly forbidden on our platform</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-200">
            <p className="text-gray-700 mb-6">
              The following activities are strictly prohibited and may result in immediate account 
              termination and legal action:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prohibitedActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm"
                >
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Scale className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Limitation of Liability</h2>
              <p className="text-gray-600">Understanding our liability limitations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liabilityLimitations.map((limitation, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <limitation.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{limitation.title}</h3>
                <p className="text-gray-600 text-sm">{limitation.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Maximum Liability</h4>
                <p className="text-gray-700 text-sm">
                  Our total liability for any claims arising from your use of our services shall not 
                  exceed the amount you paid for the specific product or service in question.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Termination */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center">
              <XCircle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Account Termination</h2>
              <p className="text-gray-600">Conditions under which accounts may be terminated</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-8 border-2 border-red-200 mb-8">
            <p className="text-gray-700 mb-6">
              We reserve the right to suspend or terminate your account at our discretion for any 
              of the following reasons:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {terminationReasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm"
                >
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Voluntary Termination</h4>
                <p className="text-gray-700 text-sm">
                  You may close your account at any time by contacting customer support. Upon 
                  termination, your right to use our services will immediately cease.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-teal-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Gavel className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Dispute Resolution Process</h2>
              <p className="text-gray-600">Steps to resolve any disputes or conflicts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disputeResolution.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200"
              >
                <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.step}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-slate-600 rounded-full w-14 h-14 flex items-center justify-center">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Governing Law & Jurisdiction</h2>
              <p className="text-gray-600">Legal framework governing these terms</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-8 border-2 border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-amber-600" />
                  Applicable Law
                </h3>
                <p className="text-gray-700 text-sm">
                  These Terms of Service shall be governed by and construed in accordance with the 
                  laws of the People's Republic of Bangladesh, without regard to its conflict of law provisions.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  Jurisdiction
                </h3>
                <p className="text-gray-700 text-sm">
                  Any legal action or proceeding arising under these terms shall be brought exclusively 
                  in the courts located in Dhaka, Bangladesh, and you consent to personal jurisdiction therein.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-pink-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Intellectual Property Rights</h2>
              <p className="text-gray-600">Protection of our content and trademarks</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-8 border-2 border-pink-200">
            <p className="text-gray-700 mb-6">
              All content on this website, including but not limited to text, graphics, logos, images, 
              and software, is the property of our company or its content suppliers and is protected by 
              international copyright laws.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  You May
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• View and print content for personal use</li>
                  <li>• Share product links on social media</li>
                  <li>• Reference our content with attribution</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  You May Not
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Reproduce content for commercial use</li>
                  <li>• Modify or create derivative works</li>
                  <li>• Use our trademarks without permission</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Severability & Entire Agreement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-600 rounded-full w-12 h-12 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Severability</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision 
              will be limited or eliminated to the minimum extent necessary so that these Terms will 
              otherwise remain in full force and effect.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-600 rounded-full w-12 h-12 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Entire Agreement</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              These Terms of Service, together with our Privacy Policy and Return Policy, constitute 
              the entire agreement between you and us regarding the use of our services and supersede 
              all prior agreements.
            </p>
          </div>
        </div>

        {/* Force Majeure */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-yellow-600 rounded-full w-14 h-14 flex items-center justify-center">
              <AlertTriangle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Force Majeure</h2>
              <p className="text-gray-600">Events beyond our reasonable control</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200">
            <p className="text-gray-700 mb-4">
              We shall not be liable for any failure to perform our obligations under these terms where 
              such failure results from any cause beyond our reasonable control, including but not limited to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Natural disasters (floods, earthquakes, storms)",
                "Government actions or regulations",
                "War, terrorism, or civil unrest",
                "Labor strikes or disputes",
                "Power failures or internet outages",
                "Pandemics or public health emergencies",
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact for Terms Questions */}
        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Questions About Terms of Service?</h2>
            <p className="text-amber-100 text-lg">
              Our legal team is here to help clarify any terms or conditions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-amber-100">{hotlineNumber}</p>
              <p className="text-sm text-amber-200 mt-1">Mon-Sat, 9 AM - 6 PM</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Email Us</h3>
              <p className="text-amber-100">{email}</p>
              <p className="text-sm text-amber-200 mt-1">Response within 24 hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <MapPin className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-amber-100">{address}</p>
              <p className="text-sm text-amber-200 mt-1">Business Hours: 9 AM - 6 PM</p>
            </div>
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-2">Acknowledgment</h4>
                <p className="text-amber-100 text-sm">
                  By clicking "I Agree" or by using our services, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms of Service. If you do not agree to 
                  these terms, please discontinue use of our platform immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;