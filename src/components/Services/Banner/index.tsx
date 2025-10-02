"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// const API_URL = "http://localhost:5000/api/v1/banner";

export const createBanner = async (formData: FormData) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/banner`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create banner");
  }
  revalidateTag("banners");

  return data;
};

export const getAllBanners = async () => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/banner`, {
    method: "GET",
    next: { tags: ["banners"] },
  });

  if (!res.ok) throw new Error("Failed to fetch banners");

  return res.json();
};

export const getSingleBanner = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/banner/${id}`, {
    method: "GET",
    next: { tags: [`banner-${id}`] },
  });

  if (!res.ok) throw new Error("Failed to fetch banner");

  return res.json();
};

export const deleteBanner = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/banner/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete banner");
  }
  revalidateTag("banners");
  revalidateTag(`banner-${id}`);

  return data;
};
