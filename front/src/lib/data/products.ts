import { readClient } from '@/lib/sanity.client'
import {
    ALL_CATEGORIES,
    CATEGORY_BY_SLUG,
    PRODUCT_BY_SLUG,
    buildProductsByCategoryQuery,
    buildProductsQuery,
    orderExpr,
} from '@/lib/groq/queries'

export type Product = {
    _id: string
    title: string
    slug: string
    image: any
    category: string
    price: number
    availability: boolean
    description: string
}

export type ProductFilters = {
    q?: string
    title?: string
    category?: string[]
    minPrice?: number
    maxPrice?: number
    available?: boolean
    sort?: 'new' | 'priceAsc' | 'priceDesc'
    page?: number
    pageSize?: number
}


export async function fetchProducts(opts: ProductFilters = {}) {
  const {
    q,
    category,
    minPrice,
    maxPrice,
    available,
    sort = 'new',
    page = 1,
    pageSize = 12,
  } = opts

  const offset = (page - 1) * pageSize
  const query = buildProductsQuery(orderExpr(sort), offset, pageSize)

  const cats =
    Array.isArray(category) ? (category.length ? category : null)
    : category ? [category]
    : null

  const params = {
    q: q ? `*${q}*` : null,
    cats,
    min: typeof minPrice === 'number' ? minPrice : null,
    max: typeof maxPrice === 'number' ? maxPrice : null,
    avail: typeof available === 'boolean' ? available : null,
  }

  const { items, total } = await readClient.fetch<{items: Product[]; total: number}>(
    query,
    params,
    { next: { revalidate: 60 } }
  )

  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  return { items, total, page, pageSize, pageCount, hasMore: page < pageCount }
}

export async function fetchProductBySlug(slug: string) {
    return readClient.fetch<Product | null>(
        PRODUCT_BY_SLUG,
        { slug },
        { next: { revalidate: 60 } }
    )
}

export type CategoryFilters = {
    excludeSlug?: string
    title?: string
    minPrice?: number
    maxPrice?: number
    available?: boolean
    sort?: 'new' | 'priceAsc' | 'priceDesc'
    page?: number
    pageSize?: number
}

export async function fetchProductsByCategory(
    category: string,
    opts: CategoryFilters = {}
) {
    const {
        excludeSlug,
        minPrice,
        maxPrice,
        available,
        sort = 'new',
        page = 1,
        pageSize = 12,
    } = opts
    const offset = (page - 1) * pageSize
    const query = buildProductsByCategoryQuery(
        orderExpr(sort),
        offset,
        pageSize
    )
    const params = {
        category,
        excludeSlug: excludeSlug ?? null,
        min: typeof minPrice === 'number' ? minPrice : null,
        max: typeof maxPrice === 'number' ? maxPrice : null,
        avail: typeof available === 'boolean' ? available : null,
    }
    const { items, total } = await readClient.fetch<{
        items: Product[]
        total: number
    }>(query, params, { next: { revalidate: 60 } })
    const pageCount = Math.max(1, Math.ceil(total / pageSize))
    return {
        items,
        total,
        page,
        pageSize,
        pageCount,
        hasMore: page < pageCount,
    }
}

export async function fetchAllCategories() {
    return readClient.fetch<string[]>(
        ALL_CATEGORIES,
        {},
        { next: { revalidate: 60 } }
    )
}

export async function fetchSimilarBySlug(
    slug: string,
    opts: Omit<CategoryFilters, 'excludeSlug'> = {}
) {
    const doc = await readClient.fetch<{ category?: string } | null>(
        CATEGORY_BY_SLUG,
        { slug },
        { next: { revalidate: 60 } }
    )
    if (!doc?.category)
        return {
            items: [],
            total: 0,
            page: 1,
            pageSize: opts.pageSize ?? 12,
            pageCount: 1,
            hasMore: false,
        }
    return fetchProductsByCategory(doc.category, { ...opts, excludeSlug: slug })
}
