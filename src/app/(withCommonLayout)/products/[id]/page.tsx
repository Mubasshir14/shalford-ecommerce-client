import ProductDetails from '@/components/Modules/Product/ProductDetails';
import { getSingleProduct } from '@/components/Services/Product';
import React from 'react';

const ProductDetailsPage =
async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: product } = await getSingleProduct(id);
    return (
        <div>
            <ProductDetails product={product}/>
        </div>
    );
};

export default ProductDetailsPage;