import {readClient} from '@/lib/sanity.client'
import {buildProductsQuery, orderExpr} from '@/lib/groq/queries'

export type Product = {
  _id: string
  title: string
  slug: string | { current: string }
  image?: any
  category?: string
  price?: number
  availability?: boolean
  description?: string
}

export type ProductFilters = {
  q?: string
  categories?: string[]
  minPrice?: number
  maxPrice?: number
  available?: boolean
  sort?: 'new'|'priceAsc'|'priceDesc'
  page?: number
  pageSize?: number
}

export async function fetchProducts(opts: ProductFilters = {}) {
  const { q, categories, minPrice, maxPrice, available, sort = 'new', page = 1, pageSize = 12 } = opts
  const offset = (page - 1) * pageSize
  const query = buildProductsQuery(orderExpr(sort), offset, pageSize)
  const params = {
    q: q ? `*${q}*` : null,
    cats: categories && categories.length ? categories : null,
    min: typeof minPrice === 'number' ? minPrice : null,
    max: typeof maxPrice === 'number' ? maxPrice : null,
    avail: typeof available === 'boolean' ? available : null
  }
  
  const {items, total} = await readClient.fetch<{items: Product[]; total: number}>(query, params, { next: { revalidate: 60 } })
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  return { items, total, page, pageSize, pageCount, hasMore: page < pageCount }
}
