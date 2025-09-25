'use client'

import { useQueryFilters } from '@/hooks/filters/use-query-filters'
import { useEffect, useState } from 'react'
import { fetchAllCategories } from '@/lib/data/products'

export function CategoryFilter() {
    const { setParam, getParam } = useQueryFilters()
    const [options, setOptions] = useState<string[]>([])
    const selected = getParam('category')
    useEffect(() => {
        ;(async () => {
            const categories = await fetchAllCategories()
            setOptions(categories)
        })()
    }, [])
    return (
        <select
            value={selected || ''}
            onChange={(e) => setParam('category', e.target.value)}
            className="p-2 border rounded-md"
        >
            <option value="">All Categories</option>
            {options.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
        </select>
    )
}
