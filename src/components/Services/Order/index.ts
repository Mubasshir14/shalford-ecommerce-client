/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

interface OrderProduct {
  product: string;
  quantity: number;
  unitPrice: number;
  color: string;
  size: string;
}

interface CreateOrderData {
  product: OrderProduct[];
  totalAmount: number;
  deliveryCharge: number;
  district: string;
  upzilla: string;
  shippingAddress: string;
  paymentMethod: "COD" | "Online";
}

interface OrderResponse {
  success: boolean;
  message: string;
  data?: any;
  paymentUrl?: string;
}

export const getUserOrders = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment/my-order`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch orders");
    }

    return result;
  } catch (error: any) {
    console.error("Get user orders error:", error);
    throw new Error(error.message || "Failed to fetch orders");
  }
};

export const getStatusBasedOrders= async (status: string) => {
  try {
    console.log(status);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment/get/${status}`,
      {
        method: "POST",
        // body: JSON.stringify({status}),
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch orders");
    }

    return result;
  } catch (error: any) {
    console.error("Get user orders error:", error);
    throw new Error(error.message || "Failed to fetch orders");
  }
};

export const getPendingOrders = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment/pending`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch orders");
    }

    return result;
  } catch (error: any) {
    console.error("Get user orders error:", error);
    throw new Error(error.message || "Failed to fetch orders");
  }
};

export const getprocessingOrders = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment/processing`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch orders");
    }

    return result;
  } catch (error: any) {
    console.error("Get user orders error:", error);
    throw new Error(error.message || "Failed to fetch orders");
  }
};

export const getcompletedgOrders = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment/completed`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch orders");
    }

    return result;
  } catch (error: any) {
    console.error("Get user orders error:", error);
    throw new Error(error.message || "Failed to fetch orders");
  }
};

export const getCancelledOrders = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment/ccancelled`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch orders");
    }

    return result;
  } catch (error: any) {
    console.error("Get user orders error:", error);
    throw new Error(error.message || "Failed to fetch orders");
  }
};

export const createOrder = async (
  orderData: CreateOrderData
): Promise<OrderResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create order");
    }

    return result;
  } catch (error: any) {
    console.error("Create order error:", error);
    throw new Error(error.message || "Failed to create order");
  }
};

export const getSingleOrder = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch order details");
    }

    return result;
  } catch (error: any) {
    console.error("Get single order error:", error);
    throw new Error(error.message || "Failed to fetch order details");
  }
};

export const updateOrder = async (id: string, status: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment/update-status/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to cancel order");
    }

    return result;
  } catch (error: any) {
    console.error("Cancel order error:", error);
    throw new Error(error.message || "Failed to cancel order");
  }
};

export const trackOrder = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment/track/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to track order");
    }

    return result;
  } catch (error: any) {
    console.error("Track order error:", error);
    throw new Error(error.message || "Failed to track order");
  }
};

export const clearCartAfterOrder = async () => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/cart/clear`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to clear cart");
    }

    return result;
  } catch (error: any) {
    console.error("Clear cart error:", error);
    throw new Error(error.message || "Failed to clear cart");
  }
};
