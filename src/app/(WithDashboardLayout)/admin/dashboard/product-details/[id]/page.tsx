import ProductDetailsAdmin from "@/components/Modules/Product/ProductDetailsAdmin";
import { getSingleProduct } from "@/components/Services/Product";
import React from "react";

const ProductDetailsAdminPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: product } = await getSingleProduct(id);
  return (
    <div>
      <ProductDetailsAdmin product={product} />
    </div>
  );
};

export default ProductDetailsAdminPage;
