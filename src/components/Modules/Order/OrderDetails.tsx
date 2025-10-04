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
  // Extract the first order from the array
  const orderData = order?.[0] || null;

  // Status color mapping
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

  const getStatusIcon = (status: string = "") => {
    switch (status.toLowerCase()) {
      case "paid":
      case "delivered":
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "failed":
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "shipped":
      case "in transit":
        return <Truck className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Map order.order.product to Product interface
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

  // Calculate total products
  const totalProducts = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  // Loading state if orderData is null
  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-amber-600 text-lg">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white p-4 sm:p-6 font-sansita">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-2">
                Order Details
              </h1>
              <p className="text-amber-600/80">
                Order ID:{" "}
                <span className="font-mono text-amber-700 font-semibold">
                  #{orderData._id || "N/A"}
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:items-end mt-4 sm:mt-0">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                  orderData.status
                )}`}
              >
                {getStatusIcon(orderData.status)}
                Payment: {orderData.status || "N/A"}
              </div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border mt-2 ${getStatusColor(
                  orderData.order?.status
                )}`}
              >
                <Package className="w-4 h-4" />
                Order: {orderData.order?.status || "N/A"}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Summary & Products */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-amber-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <Receipt className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-amber-800">
                  Order Summary
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                  <div className="text-3xl font-bold text-amber-700">
                    ৳{orderData.amount || 0}
                  </div>
                  <div className="text-sm text-amber-600 font-medium">
                    Total Amount
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-700">
                    {totalProducts}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    Total Items
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                  <div className="text-lg font-bold text-emerald-700">
                    {orderData.method || "N/A"}
                  </div>
                  <div className="text-sm text-emerald-600 font-medium">
                    Payment Method
                  </div>
                </div>
              </div>

              {/* {orderData.transactionId && (
                <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-800">
                      Transaction ID
                    </span>
                  </div>
                  <span className="font-mono text-sm bg-white px-3 py-2 rounded-lg border text-amber-700">
                    {orderData.transactionId}
                  </span>
                </div>
              )} */}

              {orderData.transactionId && (
                <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-800">
                      Transaction ID
                    </span>
                  </div>

                  {/* Clickable Copy Section */}
                  <button
                    onClick={() => {
                      if (orderData.transactionId) {
                        navigator.clipboard.writeText(orderData.transactionId);
                        toast.success("Transaction ID copied to clipboard!");
                      } else {
                        toast.error("Transaction ID not found!");
                      }
                    }}
                    className="flex items-center gap-2 font-mono text-sm bg-white px-3 py-2 rounded-lg border text-amber-700 hover:bg-amber-100 transition-all duration-200"
                  >
                    <span>{orderData.transactionId}</span>
                    <Copy className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Products List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-amber-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <ShoppingBag className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-amber-800">
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

                      <div className="flex-1">
                        <h3 className="font-bold text-amber-800 text-lg">
                          {product.name}
                        </h3>
                        {product.price && (
                          <p className="text-amber-600 font-semibold">
                            ৳{product.price} each
                          </p>
                        )}
                        {product.color && (
                          <p className="text-amber-600 text-sm">
                            Color: {product.color}
                          </p>
                        )}
                        {product.size && (
                          <p className="text-amber-600 text-sm">
                            Size: {product.size}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Qty: {product.quantity}
                        </div>
                        {product.price && (
                          <div className="text-amber-700 font-bold mt-2">
                            ৳{(product.price * product.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-amber-600 text-center">
                    No products available
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Customer Info & Timeline */}
          <div className="space-y-6">
            {/* Customer Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-amber-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <User className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-amber-800">
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
                  <Mail className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <div className="text-sm text-amber-600 font-medium">
                      Email Address
                    </div>
                    <div className="text-amber-800 font-semibold break-all">
                      {orderData.user?.email || "N/A"}
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
                      {orderData.order?.contact || orderData.user?.phone}
                    </div>
                  </div>
                </div>

                {(orderData.user?.address ||
                  orderData.order?.shippingAddress) && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                    <div>
                      <div className="text-sm text-amber-600 font-medium">
                        Delivery Address
                      </div>
                      <div className="text-amber-800 font-semibold">
                        {orderData.order?.district ||
                          orderData.user?.address ||
                          "N/A"}
                        ,{" "}
                        {orderData.order?.upzilla ||
                          orderData.user?.address ||
                          "N/A"}
                        ,{" "}
                        {orderData.order?.shippingAddress ||
                          orderData.user?.address ||
                          "N/A"}
                      </div>
                    </div>
                  </div>
                )}

                {orderData.order?.specification && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 text-xl font-bold text-amber-800 mb-2">
                      <FileText className="w-5 h-5 text-amber-700" />
                      <span>Customer Order Specification</span>
                    </div>
                    <div className="text-amber-800 whitespace-pre-line">
                      {orderData.order.specification}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Order Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-amber-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-amber-800">
                  Order Timeline
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-emerald-800">
                      Order Placed
                    </div>
                    <div className="text-sm text-emerald-600">
                      {orderData.createdAt
                        ? new Date(orderData.createdAt).toLocaleString()
                        : "N/A"}
                    </div>
                  </div>
                </div>

                {orderData.updatedAt &&
                  orderData.updatedAt !== orderData.createdAt && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl border border-blue-200">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="font-semibold text-blue-800">
                          Last Updated
                        </div>
                        <div className="text-sm text-blue-600">
                          {new Date(orderData.updatedAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}

                <div
                  className={`flex items-center gap-3 p-3 rounded-2xl border ${
                    orderData.status === "Paid"
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-amber-50 border-amber-200"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      orderData.status === "Paid"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  ></div>
                  <div>
                    <div
                      className={`font-semibold ${
                        orderData.status === "Paid"
                          ? "text-emerald-800"
                          : "text-amber-800"
                      }`}
                    >
                      Payment Status: {orderData.status || "N/A"}
                    </div>
                    <div
                      className={`text-sm ${
                        orderData.status === "Paid"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      Current payment status
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
