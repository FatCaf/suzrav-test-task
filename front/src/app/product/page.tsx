import React from 'react'
import { fetchProducts, ProductFilters } from '@/lib/data/products'
import Header from '@/components/header/header'
import { FiltersPanel } from '@/components/filters/filters-panel'
import ProductGrid from '@/components/product/product-grid'

export default async function ProductListPage({
    searchParams,
}: {
    searchParams: ProductFilters
}) {
    const param = await searchParams
    const products = await fetchProducts(param)

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <Header />

                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <FiltersPanel />
                </div>

                <ProductGrid
                    initialProducts={products.items}
                    searchParams={param}
                />
            </div>
        </div>
    )
}
