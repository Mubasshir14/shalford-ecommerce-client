/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

export const createSubscriber = async (formData: any) => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/subscriber`, {
    method: "POST",
    body: formData,
    // headers: {
    //   Authorization: (await cookies()).get("accessToken")!.value,
    // },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Subscriber");
  }
  revalidateTag("Subscribers");

  return data;
};

export const getAllSubscribers = async () => {
  const res = await fetch(`${process.env. NEXT_PUBLIC_BASE_API}/subscriber`, {
    method: "GET",
    next: { tags: ["Subscribers"] },
  });

  if (!res.ok) throw new Error("Failed to fetch Subscribers");

  return res.json();
};


