import ProductPage from '@/components/Modules/Product/ProductPage/ProductPage';
import React, { Suspense } from 'react';

const ProductPageAll = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Loading products...</p>
            </div>
        </div>}>
            <ProductPage/>
        </Suspense>
    );
};

export default ProductPageAll;