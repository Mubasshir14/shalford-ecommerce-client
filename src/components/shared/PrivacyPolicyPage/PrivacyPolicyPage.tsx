/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Database,
  Cookie,
  Mail,
  Phone,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle2,
  Globe,
  Server,
  Key,
  ShieldCheck,
  Users,
  Settings,
  Info,
  ExternalLink,
  CreditCard,
  MessageSquare,
  TrendingUp,
  XCircle,
  Download,
  Ban,
  Calendar,
  Clock,
} from "lucide-react";

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState("collection");

  const sections = [
    { id: "collection", label: "Information Collection", icon: Database },
    { id: "usage", label: "How We Use Data", icon: Settings },
    { id: "sharing", label: "Data Sharing", icon: Users },
    { id: "security", label: "Data Security", icon: ShieldCheck },
    { id: "rights", label: "Your Rights", icon: UserCheck },
    { id: "cookies", label: "Cookies Policy", icon: Cookie },
  ];

  const dataCollection = [
    {
      icon: UserCheck,
      title: "Personal Information",
      items: [
        "Full name and contact details",
        "Email address and phone number",
        "Shipping and billing address",
        "Date of birth (for age verification)",
      ],
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: CreditCard,
      title: "Payment Information",
      items: [
        "Payment method details (encrypted)",
        "Billing address and transaction history",
        "Order and purchase records",
        "Refund and cancellation data",
      ],
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Globe,
      title: "Technical Data",
      items: [
        "IP address and browser type",
        "Device information and OS",
        "Cookies and tracking technologies",
        "Usage patterns and preferences",
      ],
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Eye,
      title: "Behavioral Data",
      items: [
        "Browsing history on our site",
        "Products viewed and searched",
        "Items added to cart or wishlist",
        "Reviews and ratings submitted",
      ],
      color: "text-amber-700",
      bgColor: "bg-amber-100",
    },
  ];

  const dataUsage = [
    {
      title: "Order Processing",
      description: "To fulfill your orders, process payments, and arrange delivery",
      icon: CheckCircle2,
    },
    {
      title: "Customer Service",
      description: "To provide support, answer queries, and resolve issues",
      icon: MessageSquare,
    },
    {
      title: "Marketing",
      description: "To send promotional offers, newsletters, and personalized recommendations",
      icon: Mail,
    },
    {
      title: "Analytics",
      description: "To improve our services, understand user behavior, and optimize experience",
      icon: TrendingUp,
    },
    {
      title: "Legal Compliance",
      description: "To comply with legal obligations and protect against fraud",
      icon: Shield,
    },
    {
      title: "Account Management",
      description: "To create and maintain your account, preferences, and order history",
      icon: Settings,
    },
  ];

  const securityMeasures = [
    {
      icon: Lock,
      title: "SSL Encryption",
      description: "All data transmitted is encrypted using 256-bit SSL technology",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Server,
      title: "Secure Servers",
      description: "Data stored on secure servers with regular backups and monitoring",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Key,
      title: "Access Control",
      description: "Strict access controls and authentication for authorized personnel only",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: ShieldCheck,
      title: "Regular Audits",
      description: "Periodic security audits and vulnerability assessments conducted",
      color: "from-amber-500 to-amber-600",
    },
  ];

  const userRights = [
    {
      title: "Right to Access",
      description: "Request a copy of all personal data we hold about you",
      icon: Eye,
    },
    {
      title: "Right to Rectification",
      description: "Request correction of inaccurate or incomplete data",
      icon: FileText,
    },
    {
      title: "Right to Erasure",
      description: "Request deletion of your personal data (right to be forgotten)",
      icon: XCircle,
    },
    {
      title: "Right to Portability",
      description: "Receive your data in a structured, machine-readable format",
      icon: Download,
    },
    {
      title: "Right to Object",
      description: "Object to processing of your data for marketing purposes",
      icon: Ban,
    },
    {
      title: "Right to Withdraw Consent",
      description: "Withdraw consent for data processing at any time",
      icon: AlertCircle,
    },
  ];

  const cookieTypes = [
    {
      type: "Essential Cookies",
      description: "Required for basic website functionality and security",
      canDisable: false,
      examples: ["Session management", "Security features", "Shopping cart"],
    },
    {
      type: "Performance Cookies",
      description: "Help us understand how visitors use our website",
      canDisable: true,
      examples: ["Google Analytics", "Page load time", "Error tracking"],
    },
    {
      type: "Functional Cookies",
      description: "Remember your preferences and personalize experience",
      canDisable: true,
      examples: ["Language preference", "Region selection", "Theme settings"],
    },
    {
      type: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track campaigns",
      canDisable: true,
      examples: ["Facebook Pixel", "Google Ads", "Retargeting"],
    },
  ];

  const thirdPartyServices = [
    "Payment processors (SSLCommerz)",
    "Email service providers",
    "Analytics platforms (Google Analytics)",
    "Customer service tools",
    "Marketing automation services",
  ];


  const hotlineNumber = process.env.NEXT_PUBLIC_HOTLINE_NUMBER;
  const email = process.env.NEXT_PUBLIC_EMAI;
  const address = "Dhaka, Bangladesh";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 mt-20 py-12 px-4 sm:px-6 lg:px-8 font-arima">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-amber-600" style={{ animation: 'pulse 2s infinite' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Policy
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Last Updated: January 2025</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-16 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
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

        {/* Information Collection */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-amber-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Database className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
              <p className="text-gray-600">The types of data we gather to provide our services</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataCollection.map((category, index) => (
              <div
                key={index}
                className={`${category.bgColor} rounded-xl p-6 border-2 border-amber-200`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`h-4 w-4 ${category.color} flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* How We Use Data */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-orange-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Settings className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">How We Use Your Data</h2>
              <p className="text-gray-600">Purposes for which we process your information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataUsage.map((usage, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <usage.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{usage.title}</h3>
                <p className="text-gray-600 text-sm">{usage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sharing */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Data Sharing with Third Parties</h2>
              <p className="text-gray-600">When and with whom we share your information</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
            <div className="flex items-start gap-4 mb-6">
              <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  We share data only when necessary
                </h3>
                <p className="text-gray-700 mb-4">
                  We do not sell your personal information. We share data only with trusted partners 
                  who help us provide services to you, and only to the extent necessary.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {thirdPartyServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm"
                >
                  <ExternalLink className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Measures */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-600 rounded-full w-14 h-14 flex items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Data Security Measures</h2>
              <p className="text-gray-600">How we protect your information from unauthorized access</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMeasures.map((measure, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100"
              >
                <div className={`bg-gradient-to-br ${measure.color} rounded-full w-14 h-14 flex items-center justify-center mb-4 shadow-lg`}>
                  <measure.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{measure.title}</h3>
                <p className="text-gray-600 text-sm">{measure.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-600 rounded-full w-14 h-14 flex items-center justify-center">
              <UserCheck className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Your Privacy Rights</h2>
              <p className="text-gray-600">You have control over your personal data</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <right.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{right.title}</h3>
                <p className="text-gray-600 text-sm">{right.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  How to Exercise Your Rights
                </h4>
                <p className="text-gray-700 text-sm">
                  To exercise any of these rights, please contact us at {email} with your request. 
                  We will respond within 30 days and verify your identity before processing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cookies Policy */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-amber-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Cookie className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Cookies Policy</h2>
              <p className="text-gray-600">Understanding how we use cookies and tracking technologies</p>
            </div>
          </div>

          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Cookie className="h-6 w-6 text-amber-600" />
                    <h3 className="text-xl font-bold text-gray-900">{cookie.type}</h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      cookie.canDisable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {cookie.canDisable ? "Optional" : "Required"}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{cookie.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cookie.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-amber-200"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <Settings className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Managing Cookie Preferences
                </h4>
                <p className="text-gray-700 text-sm mb-3">
                  You can control cookies through your browser settings. However, disabling certain 
                  cookies may affect website functionality and your user experience.
                </p>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Cookie Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-indigo-600 rounded-full w-14 h-14 flex items-center justify-center">
              <Clock className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Data Retention</h2>
              <p className="text-gray-600">How long we keep your information</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
            <p className="text-gray-700 mb-4">
              We retain your personal data only for as long as necessary to fulfill the purposes 
              outlined in this privacy policy, unless a longer retention period is required by law.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Account Data:</strong> Retained while your account is active and for 2 years after closure
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Transaction Records:</strong> Kept for 7 years for legal and tax compliance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Marketing Data:</strong> Deleted immediately upon unsubscribe request
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Technical Logs:</strong> Automatically deleted after 90 days
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-pink-600 rounded-full w-14 h-14 flex items-center justify-center">
              <AlertCircle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Children's Privacy</h2>
              <p className="text-gray-600">Protection for users under 18</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 border-2 border-pink-200">
            <p className="text-gray-700 mb-4">
              Our services are not intended for children under 18 years of age. We do not knowingly 
              collect personal information from children. If you are a parent or guardian and believe 
              your child has provided us with personal data, please contact us immediately.
            </p>
            <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
              <Shield className="h-5 w-5 text-pink-600 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">
                We will delete any child's data upon verification
              </span>
            </div>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-teal-600 rounded-full w-14 h-14 flex items-center justify-center">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Changes to This Policy</h2>
              <p className="text-gray-600">How we notify you of updates</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200">
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time to reflect changes in our practices 
              or for legal, regulatory, or operational reasons.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  We will notify you via email of any significant changes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Changes will be posted on this page with updated date
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Continued use after changes constitutes acceptance
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
            <p className="text-amber-100 text-lg">
              Contact our Data Protection Officer for any privacy concerns
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-amber-100">{hotlineNumber}</p>
              <p className="text-sm text-amber-200 mt-1">Mon-Sat, 9 AM - 9 PM</p>
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
              <p className="text-sm text-amber-200 mt-1">Office Hours: 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;