'use client'

import { useState, useEffect, useRef } from 'react'
import { Product } from '@/lib/data/products'
import { UseInfiniteScrollOptions } from '@/types/infinite-scroll'

export const useInfiniteScroll = <T extends object>(
    options: UseInfiniteScrollOptions<T, Product>
) => {
    const { fetchFunction, initialItems, search, dependencies = [] } = options
    const [items, setItems] = useState(initialItems)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const lastElementRef = useRef(null)

    useEffect(() => {
        if (page === 1 && initialItems.length > 0) {
            return
        }

        const fetchMoreItems = async () => {
            if (loading || !hasMore) return

            setLoading(true)
            const { items: newItems, hasMore: newHasMore } =
                await fetchFunction({ page, ...search })

            if (newItems.length > 0) {
                setItems((prevItems) => [...prevItems, ...newItems])
            }

            setHasMore(newHasMore)
            setLoading(false)
        }

        void fetchMoreItems()
    }, [page, ...dependencies])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1)
                }
            },
            { threshold: 1.0 }
        )

        const currentRef = lastElementRef.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [lastElementRef, loading, hasMore])

    useEffect(() => {
        setItems(initialItems)
        setPage(1)
        setHasMore(true)
    }, [initialItems, ...dependencies])

    return { items, loading, hasMore, lastElementRef }
}
