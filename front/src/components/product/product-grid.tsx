'use client'

import React from 'react'
import ProductCard from './product-card'
import { fetchProducts, Product, ProductFilters } from '@/lib/data/products'
import { useInfiniteScroll } from '@/hooks/infinite-scroll/infinite-scroll'

type Props = {
    initialProducts: Product[]
    searchParams: ProductFilters
}
export default function ProductGrid({ initialProducts, searchParams }: Props) {
    const { items, loading, hasMore, lastElementRef } =
        useInfiniteScroll<ProductFilters>({
            fetchFunction: fetchProducts,
            initialItems: initialProducts,
            search: searchParams,
        })
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {hasMore && (
                <div
                    ref={lastElementRef}
                    className="flex justify-center items-center py-6"
                >
                    {loading && (
                        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
                    )}
                </div>
            )}
            {!hasMore && (
                <div className="text-center py-6 text-gray-500">
                    You&apos;ve reached the end of the product list.
                </div>
            )}
        </>
    )
}
