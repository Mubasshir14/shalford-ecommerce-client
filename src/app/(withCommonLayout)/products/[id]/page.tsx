import ProductDetails from "@/components/Modules/Product/ProductDetails";
import { getSingleProduct } from "@/components/Services/Product";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product } = await getSingleProduct(id);

  const plainDescription = product?.description
    ? product.description.replace(/<[^>]+>/g, "").slice(0, 160)
    : "Best product details";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_FRONTEND_API;

  return {
    title: `${product?.name} | My E-Shop`,
    description: plainDescription,
    openGraph: {
      title: product?.name,
      description: plainDescription,
      url: `${baseUrl}/products/${id}`,
      type: "website",
      images:
        product?.images?.length > 0 ? product.images : ["/default-og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: product?.name,
      description: plainDescription,
      images:
        product?.images?.length > 0 ? product.images : ["/default-og.png"],
    },
  };
}

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: product } = await getSingleProduct(id);
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
