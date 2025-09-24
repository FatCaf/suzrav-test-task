import Link from 'next/link'
import {fetchProducts} from '@/lib/data/products'
import {urlFor} from '@/lib/image'

type SP = {
  q?: string
  cat?: string | string[]
  min?: string
  max?: string
  available?: '1'|'0'
  sort?: 'new'|'priceAsc'|'priceDesc'
  page?: string
  pageSize?: string
}

function toArray(x?: string | string[]) {
  return Array.isArray(x) ? x : x ? [x] : undefined
}

function qp(obj: Record<string, any>) {
  const p = new URLSearchParams()
  Object.entries(obj).forEach(([k,v]) => {
    if (v === undefined || v === null || v === '') return
    if (Array.isArray(v)) v.forEach(i => p.append(k, String(i)))
    else p.set(k, String(v))
  })
  return `?${p.toString()}`
}

export default async function Page({searchParams}: {searchParams: SP}) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10))
  const pageSize = Math.max(1, parseInt(searchParams.pageSize || '12', 10))

  const data = await fetchProducts({
    q: searchParams.q,
    categories: toArray(searchParams.cat),
    minPrice: searchParams.min ? Number(searchParams.min) : undefined,
    maxPrice: searchParams.max ? Number(searchParams.max) : undefined,
    available: searchParams.available === '1' ? true : searchParams.available === '0' ? false : undefined,
    sort: (searchParams.sort as any) || 'new',
    page,
    pageSize
  })

  const baseParams = {
    q: searchParams.q,
    cat: toArray(searchParams.cat),
    min: searchParams.min,
    max: searchParams.max,
    available: searchParams.available,
    sort: searchParams.sort,
    pageSize
  }

  const prevHref = page > 1 ? qp({...baseParams, page: page - 1}) : null
  const nextHref = data.hasMore ? qp({...baseParams, page: page + 1}) : null

  return (
    <main style={{maxWidth: 1200, margin: '0 auto', padding: 24}}>
      <h1 style={{fontSize: 24, marginBottom: 12}}>Products</h1>
      <div style={{opacity: .7, marginBottom: 16}}>total: {data.total} · page {data.page} / {data.pageCount}</div>

      <div style={{display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))'}}>
        {data.items.map((p:any)=>(
          <Link key={p._id} href={`/product/${typeof p.slug === 'string' ? p.slug : p.slug.current}`} style={{border:'1px solid #333', borderRadius:12, padding:12, textDecoration:'none', color:'inherit'}}>
            {p.image && (
              <img
                src={urlFor(p.image).width(600).height(400).fit('crop').url()}
                alt={p.title}
                style={{width:'100%', height:160, objectFit:'cover', borderRadius:8}}
              />
            )}
            <div style={{marginTop:8, fontWeight:600}}>{p.title}</div>
            {p.category && <div style={{opacity:.7, fontSize:12}}>{p.category}</div>}
            {typeof p.price==='number' && <div style={{marginTop:4}}>{p.price.toFixed(2)} $</div>}
          </Link>
        ))}
      </div>

      <div style={{display:'flex', gap:12, justifyContent:'center', marginTop:24}}>
        {prevHref ? <Link href={prevHref} style={{border:'1px solid #333', padding:'8px 12px', borderRadius:8, textDecoration:'none', color:'inherit'}}>Prev</Link> : null}
        {nextHref ? <Link href={nextHref} style={{border:'1px solid #333', padding:'8px 12px', borderRadius:8, textDecoration:'none', color:'inherit'}}>Next</Link> : null}
      </div>
    </main>
  )
}
