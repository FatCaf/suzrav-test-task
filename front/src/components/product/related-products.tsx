import React from 'react'
import { Product } from '@/lib/data/products'
import ProductCard from '@/components/product/product-card'
type Props = {
    relatedProducts: Product[]
}

export default function RelatedProducts({ relatedProducts }: Props) {
    if (!relatedProducts || relatedProducts.length === 0) {
        return (
            <div className="mt-16 text-center text-gray-500 italic">
                There are no related products in this category.
            </div>
        )
    }

    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((related) => (
                    <ProductCard key={related._id} product={related} />
                ))}
            </div>
        </div>
    )
}
