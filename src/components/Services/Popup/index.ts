"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createPopup = async (formData: FormData) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/popup`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Popup");
  }
  revalidateTag("Popups");

  return data;
};

export const getAllPopups = async () => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/popup`, {
    method: "GET",
    next: { tags: ["Popups"] },
  });

  if (!res.ok) throw new Error("Failed to fetch Popups");

  return res.json();
};

export const getSinglePopup = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/popup/${id}`, {
    method: "GET",
    next: { tags: [`Popup-${id}`] },
  });

  if (!res.ok) throw new Error("Failed to fetch Popup");

  return res.json();
};

export const deletePopup = async (id: string) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/popup/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete Popup");
  }
  revalidateTag("Popups");
  revalidateTag(`Popup-${id}`);

  return data;
};
