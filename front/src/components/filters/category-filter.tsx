'use client'

import { fetchAllCategories } from '@/lib/data/products'
import { CustomDropdown } from '@/components/dropdown/dropdown'
import { useEffect, useState } from 'react'

type Props = {
    setParam: (key: string, value: string | null) => void
    getParam: (key: string) => string | null
}

export function CategoryFilter({ setParam, getParam }: Props) {
    const [options, setOptions] = useState<string[]>([])
    const selected = getParam('category')
    useEffect(() => {
        ;(async () => {
            const categories = await fetchAllCategories()
            setOptions(categories)
        })()
    }, [])
    return (
        <CustomDropdown
            options={options.map((o) => ({ value: o, label: o }))}
            value={selected}
            onChange={(value) => setParam('category', value)}
            placeholder="All categories"
        />
    )
}
