"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createGallery = async (formData: FormData) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/gallery`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Gallery");
  }
  revalidateTag("Gallerys");

  return data;
};

export const getAllGallerys = async () => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/gallery`, {
    method: "GET",
    next: { tags: ["Gallerys"] },
  });

  if (!res.ok) throw new Error("Failed to fetch Gallerys");

  return res.json();
};

export const getSingleGallery = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/gallery/${id}`, {
    method: "GET",
    next: { tags: [`Gallery-${id}`] },
  });

  if (!res.ok) throw new Error("Failed to fetch Gallery");

  return res.json();
};

export const deleteGallery = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/gallery/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete Gallery");
  }
  revalidateTag("Gallerys");
  revalidateTag(`Gallery-${id}`);

  return data;
};
