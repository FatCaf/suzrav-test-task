'use client'
import { CustomDropdown } from '@/components/dropdown/dropdown'

const sortOptions = [
    { value: 'priceAsc', label: 'Price: Low to High' },
    { value: 'priceDesc', label: 'Price: High to Low' },
]

type Props = {
    setParam: (key: string, value: string | null) => void
    getParam: (key: string) => string | null
}

export function SortByPrice({ setParam, getParam }: Props) {
    const selected = getParam('sort')
    return (
        <CustomDropdown
            options={sortOptions}
            value={selected}
            placeholder={'Sort by'}
            onChange={(value) => setParam('sort', value)}
        />
    )
}
