"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// const API_URL = "http://localhost:5000/api/v1/category";

export const createCategory = async (formData: FormData) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/category`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Category");
  }
  revalidateTag("Category");

  return data;
};

export const getAllCategory = async () => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/category`, {
    method: "GET",
    next: { tags: ["Category"] },
  });

  if (!res.ok) throw new Error("Failed to fetch Categorys");

  return res.json();
};

export const getSingleCategory = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/category/${id}`, {
    method: "GET",
    next: { tags: [`Category-${id}`] },
  });

  if (!res.ok) throw new Error("Failed to fetch Category");

  return res.json();
};

export const deleteCategory = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/category/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete Category");
  }
  revalidateTag("Category");
  revalidateTag(`Category-${id}`);

  return data;
};
