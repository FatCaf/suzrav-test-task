import ProductListPage from '@/app/product/page'
import { ProductFilters } from '@/lib/data/products'

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<ProductFilters>
}) {
    const params = await searchParams
    return (
        <ProductListPage
            searchParams={{
                ...params,
                minPrice: Number(params.minPrice),
                maxPrice: Number(params.maxPrice),
            }}
        />
    )
}
