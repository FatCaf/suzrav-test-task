import React from 'react'
import {
    fetchProductBySlug,
    fetchProductsByCategory,
} from '@/lib/data/products'
import RelatedProducts from '@/components/product/related-products'
import ProductImage from '@/components/product/product-image'
import { notFound } from 'next/navigation'
type Props = {
    params: {
        slug: string
    }
}

export default async function Page({ params }: Props) {
    const { slug } = await params
    const product = await fetchProductBySlug(slug)
    const relatedProducts = await fetchProductsByCategory(
        product?.category ?? ''
    )
    if (!product) {
        notFound()
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <ProductImage product={product} />

                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            {product.title}
                        </h1>
                        <p className="text-2xl font-bold text-blue-600 mb-4">
                            ${product.price.toFixed(2)}
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {product.description}
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {product.availability ? 'In Stock' : 'Out of Stock'}
                        </p>

                        <button
                            disabled={!product.availability}
                            className={`w-full font-semibold py-3 px-6 rounded-lg text-lg shadow-md transition-colors duration-200
    ${
        product.availability
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-400 text-white cursor-not-allowed'
    }`}
                        >
                            {product.availability
                                ? 'Add to Cart'
                                : 'Out of Stock'}
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-500">
                            Free shipping on all orders over $50.
                        </p>
                    </div>
                </div>

                <RelatedProducts relatedProducts={relatedProducts.items} />
            </div>
        </div>
    )
}
