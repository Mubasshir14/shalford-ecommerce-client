import UpdateProduct from "@/components/Modules/Product/UpdateProduct";
import { getSingleProduct } from "@/components/Services/Product";
import React from "react";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: product } = await getSingleProduct(id);

  return (
    <div>
      <UpdateProduct product={product} />
    </div>
  );
};

export default UpdateProductPage;
