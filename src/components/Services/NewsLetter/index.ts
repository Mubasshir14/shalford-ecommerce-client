"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createNewsLetter = async (formData: FormData) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/newsletter`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create NewsLetter");
  }
  revalidateTag("NewsLetters");

  return data;
};

export const getAllNewsLetters = async () => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/newsletter`, {
    method: "GET",
    next: { tags: ["NewsLetters"] },
  });

  if (!res.ok) throw new Error("Failed to fetch NewsLetters");

  return res.json();
};

export const getSingleNewsLetter = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/newsletter/${id}`, {
    method: "GET",
    next: { tags: [`NewsLetter-${id}`] },
  });

  if (!res.ok) throw new Error("Failed to fetch NewsLetter");

  return res.json();
};

export const deleteNewsLetter = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/newsletter/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete NewsLetter");
  }
  revalidateTag("NewsLetters");
  revalidateTag(`NewsLetter-${id}`);

  return data;
};
