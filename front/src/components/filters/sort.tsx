'use client'
import { useQueryFilters } from '@/hooks/filters/use-query-filters'

export function SortByPrice() {
    const { setParam, getParam } = useQueryFilters()

    return (
        <select
            value={getParam('sort') || ''}
            onChange={(e) => setParam('sort', e.target.value)}
            className="p-2 border rounded-md"
        >
            <option value="">Sort by</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
        </select>
    )
}
