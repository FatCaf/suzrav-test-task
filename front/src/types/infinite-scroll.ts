export type FetchOptions<T extends object> = {
    page: number
} & T

export interface FetchResult<T> {
    items: T[]
    total: number
    page: number
    pageSize: number
    pageCount: number
    hasMore: boolean
}

export interface UseInfiniteScrollOptions<T extends object, I> {
    fetchFunction: (opt: FetchOptions<T>) => Promise<FetchResult<I>>
    initialItems: I[]
    search: T
    dependencies?: React.DependencyList
}
