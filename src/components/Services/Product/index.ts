"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createProduct = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Product");
  }
  revalidateTag("Products");

  return data;
};

export const getAllProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
    method: "GET",
    next: { tags: ["Products"] },
  });

  if (!res.ok) throw new Error("Failed to fetch Products");

  return res.json();
};
export const getOnSaleProduct = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/product/onsale`,
    {
      method: "GET",
      next: { tags: ["Products"] },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Products");

  return res.json();
};
export const getFeaturedProduct = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/product/featured`,
    {
      method: "GET",
      next: { tags: ["Products"] },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Products");

  return res.json();
};
export const getNotOnSaleProduct = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/product/not-onsale`,
    {
      method: "GET",
      next: { tags: ["Products"] },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Products");

  return res.json();
};
export const getNotFeaturedProduct = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/product/not-featured`,
    {
      method: "GET",
      next: { tags: ["Products"] },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Products");

  return res.json();
};
export const getCategoryWisedProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/product/category/${id}`,
    {
      method: "GET",
      next: { tags: ["Products"] },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Products");

  return res.json();
};

export const getSingleProduct = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`, {
    method: "GET",
    next: { tags: [`Product-${id}`] },
  });

  if (!res.ok) throw new Error("Failed to fetch Product");

  return res.json();
};

export const updateProduct = async (id: string, formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Product");
  }
  revalidateTag("Products");

  return data;
};

export const OnSaleProductHandle = async (id: string, onsale: boolean) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/product/onsale/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify({ onsale }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to update Product");
  }
  revalidateTag("Products");

  return data;
};

export const OnFeaturedProductHandle = async (
  id: string,
  featured: boolean
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/product/featured/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify({ featured }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create Product");
  }
  revalidateTag("Products");

  return data;
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete Product");
  }
  revalidateTag("Products");
  revalidateTag(`Product-${id}`);

  return data;
};
