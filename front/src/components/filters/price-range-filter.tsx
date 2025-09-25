'use client'
import { useQueryFilters } from '@/hooks/filters/use-query-filters'

export function PriceRangeFilter() {
    const { setParam, getParam } = useQueryFilters()

    return (
        <div className="flex gap-2">
            <input
                type="number"
                placeholder="Min"
                defaultValue={getParam('minPrice') || ''}
                onChange={(e) => setParam('minPrice', e.target.value)}
                className="w-20 p-2 border rounded-md"
                max={10000}
                min={0}
            />
            <input
                type="number"
                placeholder="Max"
                defaultValue={getParam('maxPrice') || ''}
                onChange={(e) => setParam('maxPrice', e.target.value)}
                className="w-20 p-2 border rounded-md"
                min={0}
                max={10000}
            />
        </div>
    )
}
