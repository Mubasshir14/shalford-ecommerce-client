/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const getTotalPaymentOrder = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orderpayment/payment`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
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
