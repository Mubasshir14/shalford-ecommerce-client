/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createReview = async (formData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
    method: "POST",
    body: JSON.stringify(formData), 
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Review");
  }
  revalidateTag("Review");

  return data;
};

export const getAllReview = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
    method: "GET",
    next: { tags: ["Review"] },
  });

  if (!res.ok) throw new Error("Failed to fetch Review");

  return res.json();
};

export const getProductReview = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/review/product/${id}`,
    {
      method: "GET",
      next: { tags: ["Review"] },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Review");

  return res.json();
};

export const getSingleReview = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/${id}`, {
    method: "GET",
    next: { tags: [`Review-${id}`] },
  });

  if (!res.ok) throw new Error("Failed to fetch Review");

  return res.json();
};

export const deleteReview = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
console.log(data);
  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete Review");
  }
  revalidateTag("Review");
  revalidateTag(`Review-${id}`);

  return data;
};
