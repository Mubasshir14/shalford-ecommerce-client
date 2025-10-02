"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// const API_URL = "http://localhost:5000/api/v1/cart";

export const createCart = async (cartData: {
  product: string;
  size: string;
  color: string;
  price: string;
  quantity: string;
  totalPrice: string;
}) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/cart`, {
    method: "POST",
    body: JSON.stringify(cartData),
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Cart");
  }
  revalidateTag("Cart");

  return data;
};

export const getUserCart = async () => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/cart`, {
    method: "GET",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
    next: { tags: ["Cart"] },
  });

  if (!res.ok) throw new Error("Failed to fetch Carts");

  return res.json();
};

export const updateCart = async (id: string, formData: FormData) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/cart/${id}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Cart");
  }
  revalidateTag("Cart");

  return data;
};

export const deleteCart = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/cart/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete Cart");
  }
  revalidateTag("Cart");
  revalidateTag(`Cart-${id}`);

  return data;
};

export const deleteUserCart = async () => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/cart`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete Cart");
  }
  revalidateTag("Cart");

  return data;
};
