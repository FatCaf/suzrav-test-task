import React from 'react'
import Link from 'next/link'
import { routeHelper } from '@/routes/route-helper'
import ProductImage from './product-image'
import { Product } from '@/lib/data/products'

type Props = {
    product: Product
}
export default function ProductCard({ product }: Props) {
    return (
        <Link
            key={product._id}
            href={routeHelper.productDetail(product.slug)}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer"
        >
            <ProductImage product={product} />

            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.title}
                </h2>
                <p className="text-lg font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </Link>
    )
}
