"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Truck,
  Receipt,
  ShoppingBag,
  FileText,
  Copy,
  Box,
  PackageCheck,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Product {
  _id?: string;
  name: string;
  price?: number;
  quantity: number;
  image?: string;
  color?: string;
  size?: string;
}

interface OrderData {
  _id: string;
  transactionId?: string;
  method: string;
  amount: number;
  user: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  order: {
    product: {
      product: {
        _id?: string;
        name: string;
        images?: string[];
      };
      quantity: number;
      unitPrice?: number;
      color?: string;
      size?: string;
    }[];
    status: string;
    contact?: string;
    district: string;
    upzilla: string;
    shippingAddress?: string;
    specification?: string;
  };
  contact?: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

const OrderDetails = ({ order }: { order: OrderData[] }) => {
  const orderData = order?.[0] || null;

  const getStatusColor = (status: string = "") => {
    switch (status.toLowerCase()) {
      case "paid":
      case "delivered":
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
      case "processing":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "shipped":
      case "in transit":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const products: Product[] =
    orderData?.order?.product?.map((item) => ({
      _id: item.product?._id,
      name: item.product?.name || "Unknown Product",
      price: item.unitPrice || 0,
      quantity: item.quantity || 0,
      image: item.product?.images?.[0],
      color: item.color,
      size: item.size,
    })) || [];

  const totalProducts = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  // Get tracking status step
  const getTrackingStep = (status: string = "") => {
    const statusLower = status.toLowerCase();
    if (statusLower === "cancelled") return -1;
    if (statusLower === "pending") return 0;
    if (statusLower === "processing") return 1;
    if (statusLower === "shipped" || statusLower === "in transit") return 2;
    if (statusLower === "delivered" || statusLower === "completed") return 3;
    return 0;
  };

  const currentStep = getTrackingStep(orderData?.order?.status);
  const isCancelled = currentStep === -1;

  // Tracking steps
  const trackingSteps = [
    {
      icon: <Receipt className="w-6 h-6" />,
      title: "Order Placed",
      description: "We have received your order",
      step: 0,
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: "Processing",
      description: "Your order is being prepared",
      step: 1,
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Shipped",
      description: "Your order is on the way",
      step: 2,
    },
    {
      icon: <PackageCheck className="w-6 h-6" />,
      title: "Delivered",
      description: "Order delivered successfully",
      step: 3,
    },
  ];

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-600 text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white p-4 sm:p-6 lg:p-8 font-sansita">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl border border-amber-100 p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-amber-800 mb-2">
                Order Tracking
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-amber-600">
                <span>
                  Order ID:{" "}
                  <span className="font-mono font-semibold text-amber-700">
                    #{orderData._id?.slice(-8).toUpperCase() || "N/A"}
                  </span>
                </span>
                <span className="text-amber-400">•</span>
                <span>
                  Placed on{" "}
                  {orderData.createdAt
                    ? new Date(orderData.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                  orderData.status
                )}`}
              >
                {orderData.status === "Paid" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                Payment: {orderData.status || "N/A"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Tracking Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl border border-amber-100 p-6 lg:p-8 mb-6"
        >
          <h2 className="text-xl font-bold text-amber-800 mb-8">
            Order Status
          </h2>

          {isCancelled ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">
                Order Cancelled
              </h3>
              <p className="text-amber-600 text-center max-w-md">
                This order has been cancelled. You will receive your refund
                within 7-10 working days.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Timeline */}
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-12 left-0 right-0 h-1 bg-amber-200">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                      style={{
                        width: `${(currentStep / 3) * 100}%`,
                      }}
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="relative grid grid-cols-4 gap-4">
                    {trackingSteps.map((step, index) => {
                      const isCompleted = currentStep >= step.step;
                      const isActive = currentStep === step.step;

                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 border-4 transition-all duration-300 ${
                              isCompleted
                                ? "bg-gradient-to-br from-amber-500 to-orange-500 border-amber-500 text-white shadow-lg"
                                : isActive
                                ? "bg-white border-amber-500 text-amber-500 shadow-lg"
                                : "bg-white border-amber-200 text-amber-300"
                            }`}
                          >
                            {step.icon}
                          </motion.div>

                          <h3
                            className={`font-bold text-center mb-1 ${
                              isCompleted || isActive
                                ? "text-amber-800"
                                : "text-amber-400"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-sm text-center ${
                              isCompleted || isActive
                                ? "text-amber-600"
                                : "text-amber-400"
                            }`}
                          >
                            {step.description}
                          </p>

                          {isCompleted && step.step === 0 && (
                            <p className="text-xs text-amber-500 mt-2">
                              {orderData.createdAt
                                ? new Date(
                                    orderData.createdAt
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                : ""}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile Timeline */}
              <div className="lg:hidden space-y-4">
                {trackingSteps.map((step, index) => {
                  const isCompleted = currentStep >= step.step;
                  const isActive = currentStep === step.step;

                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                            isCompleted
                              ? "bg-gradient-to-br from-amber-500 to-orange-500 border-amber-500 text-white"
                              : isActive
                              ? "bg-white border-amber-500 text-amber-500"
                              : "bg-white border-amber-200 text-amber-300"
                          }`}
                        >
                          {step.icon}
                        </motion.div>
                        {index < trackingSteps.length - 1 && (
                          <div
                            className={`w-1 flex-1 min-h-[40px] ${
                              isCompleted ? "bg-gradient-to-b from-amber-500 to-orange-500" : "bg-amber-200"
                            }`}
                          ></div>
                        )}
                      </div>

                      <div className="flex-1 pb-8">
                        <h3
                          className={`font-bold mb-1 ${
                            isCompleted || isActive
                              ? "text-amber-800"
                              : "text-amber-400"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            isCompleted || isActive
                              ? "text-amber-600"
                              : "text-amber-400"
                          }`}
                        >
                          {step.description}
                        </p>
                        {isCompleted && step.step === 0 && (
                          <p className="text-xs text-amber-500 mt-1">
                            {orderData.createdAt
                              ? new Date(orderData.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )
                              : ""}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Estimated Delivery */}
              {currentStep < 3 && (
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">
                        Estimated Delivery
                      </h4>
                      <p className="text-sm text-blue-700">
                        {(() => {
                          const orderDate = new Date(orderData.createdAt);
                          const minDelivery = new Date(orderDate);
                          const maxDelivery = new Date(orderDate);
                          minDelivery.setDate(orderDate.getDate() + 7);
                          maxDelivery.setDate(orderDate.getDate() + 10);

                          return `${minDelivery.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })} - ${maxDelivery.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}`;
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl border border-amber-100 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <Receipt className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-amber-800">
                  Order Summary
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                  <div className="text-sm text-amber-600 mb-1 font-medium">Total Amount</div>
                  <div className="text-2xl font-bold text-amber-700">
                    ৳{orderData.amount || 0}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="text-sm text-blue-600 mb-1 font-medium">Total Items</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {totalProducts}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                  <div className="text-sm text-emerald-600 mb-1 font-medium">
                    Payment Method
                  </div>
                  <div className="text-lg font-bold text-emerald-700">
                    {orderData.method || "N/A"}
                  </div>
                </div>
              </div>

              {orderData.transactionId && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-800">
                      Transaction ID
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (orderData.transactionId) {
                        navigator.clipboard.writeText(orderData.transactionId);
                        toast.success("Transaction ID copied!");
                      }
                    }}
                    className="flex items-center gap-2 font-mono text-sm bg-white px-3 py-2 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-100 transition-all duration-200 w-full"
                  >
                    <span className="truncate">{orderData.transactionId}</span>
                    <Copy className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl border border-amber-100 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <ShoppingBag className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-amber-800">
                  Ordered Products
                </h2>
              </div>

              <div className="space-y-4">
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <motion.div
                      key={product._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 hover:shadow-lg transition-all duration-300"
                    >
                      {product.image ? (
                        <Image
                          width={64}
                          height={64}
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-amber-200 rounded-xl flex items-center justify-center">
                          <Package className="w-8 h-8 text-amber-600" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-amber-800 text-lg truncate">
                          {product.name}
                        </h3>
                        {product.price && (
                          <p className="text-amber-600 font-semibold">
                            ৳{product.price} each
                          </p>
                        )}
                        <div className="flex gap-3 mt-1">
                          {product.color && (
                            <span className="text-sm text-amber-600">
                              Color: {product.color}
                            </span>
                          )}
                          {product.size && (
                            <span className="text-sm text-amber-600">
                              Size: {product.size}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
                          Qty: {product.quantity}
                        </div>
                        {product.price && (
                          <div className="font-bold text-amber-700">
                            ৳{(product.price * product.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-amber-600 text-center py-4">
                    No products available
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl border border-amber-100 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <User className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-lg font-bold text-amber-800">
                  Customer Details
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <div className="text-sm text-amber-600 font-medium">
                      Full Name
                    </div>
                    <div className="text-amber-800 font-semibold">
                      {orderData.user?.name || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <div className="text-sm text-amber-600 font-medium">
                      Phone Number
                    </div>
                    <div className="text-amber-800 font-semibold">
                      {orderData.order?.contact || orderData.user?.phone || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <div className="text-sm text-amber-600 font-medium">
                      Delivery Address
                    </div>
                    <div className="text-amber-800 font-semibold">
                      {orderData.order?.shippingAddress || "N/A"}
                      <br />
                      {orderData.order?.upzilla}, {orderData.order?.district}
                    </div>
                  </div>
                </div>

                {orderData.user?.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-600 mt-1" />
                    <div>
                      <div className="text-sm text-amber-600 font-medium">
                        Email Address
                      </div>
                      <div className="text-amber-800 font-semibold break-all">
                        {orderData.user.email}
                      </div>
                    </div>
                  </div>
                )}

                {orderData.order?.specification && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-amber-700" />
                      <span className="font-bold text-amber-800">Order Notes</span>
                    </div>
                    <div className="text-sm text-amber-800 whitespace-pre-line">
                      {orderData.order.specification}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Need Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-6"
            >
              <h3 className="font-bold text-amber-800 mb-3">Need Help?</h3>
              <p className="text-sm text-amber-600 mb-4">
                If you have any questions about your order, feel free to contact
                our support team.
              </p>
              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-2xl transition-all duration-200 shadow-lg">
                Contact Support
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;