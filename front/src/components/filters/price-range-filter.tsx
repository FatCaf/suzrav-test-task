'use client'

import { useEffect, useState } from 'react'
import { ReadonlyURLSearchParams } from 'next/navigation'

type Props = {
    setParam: (key: string, value: string | null) => void
    getParam: (key: string) => string | null
    searchParams: ReadonlyURLSearchParams
}

export function PriceRangeFilter({ setParam, getParam, searchParams }: Props) {
    const [minPrice, setMinPrice] = useState(getParam('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(getParam('maxPrice') || '')

    useEffect(() => {
        setMinPrice(getParam('minPrice') || '')
        setMaxPrice(getParam('maxPrice') || '')
    }, [searchParams.toString()])

    const handleChange = (key: string, value: string) => {
        key === 'maxPrice' ? setMaxPrice(value) : setMinPrice(value)
        setParam(key, value || null)
    }

    return (
        <div className="flex gap-2">
            <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                className="w-20 p-2 border rounded-md"
                max={10000}
                min={0}
            />
            <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                className="w-20 p-2 border rounded-md"
                min={0}
                max={10000}
            />
        </div>
    )
}
