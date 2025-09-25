'use client'
import { useQueryFilters } from '@/hooks/filters/use-query-filters'

export function SearchBar() {
    const { setParam, getParam } = useQueryFilters()

    return (
        <input
            type="text"
            placeholder="Search products..."
            defaultValue={getParam('search') || ''}
            onChange={(e) => setParam('title', e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
    )
}
