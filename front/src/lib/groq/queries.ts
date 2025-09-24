export const PRODUCT_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  image,
  category,
  price,
  availability
`

export const PRODUCTS_BASE = `
*[_type == "product"
  && (!defined($q) || title match $q)
  && (!defined($cats) || category in $cats)
  && (!defined($min) || price >= $min)
  && (!defined($max) || price <= $max)
  && (!defined($avail) || availability == $avail)
]
`

export const PRODUCT_BY_SLUG = `
*[_type=="product" && slug.current==$slug][0]{
  _id, title, description, image, category, price, availability, "slug": slug.current
}
`

export const RELATED_BY_CATEGORY = `
*[_type=="product" && category==$category && slug.current!=$slug][0...4]{
  _id, title, "slug": slug.current, image, price, availability
}
`

export const PRODUCT_BY_ID = `
*[_type=="product" && _id==$id][0]{
  _id, title, description, image, category, price, availability, "slug": slug.current
}
`

export function orderExpr(sort: 'new'|'priceAsc'|'priceDesc' = 'new') {
  switch (sort) {
    case 'priceAsc':  return 'price asc'
    case 'priceDesc': return 'price desc'
    default:          return '_createdAt desc'
  }
}

export function buildProductsQuery(order: string, offset: number, limit: number) {
  return `
  {
    "items": (${PRODUCTS_BASE} | order(${order})){
      ${PRODUCT_LIST_FIELDS}
    }[${offset}...${offset + limit}],
    "total": count(${PRODUCTS_BASE})
  }`
}
