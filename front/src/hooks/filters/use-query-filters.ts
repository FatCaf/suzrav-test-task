'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function useQueryFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const setParam = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (!value) {
            params.delete(key)
        } else {
            params.set(key, value)
        }
        router.push(`?${params.toString()}`)
    }

    const getParam = (key: string) => searchParams.get(key)

    const clearAll = () => router.push('?')

    return { setParam, getParam, all: searchParams, clearAll }
}
