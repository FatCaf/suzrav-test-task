import {fetchAllCategories} from '@/lib/data/products'
import Link from 'next/link'

export default async function Page() {
  const cats = await fetchAllCategories()
  return (
    <main style={{maxWidth: 800, margin: '0 auto', padding: 24}}>
      <h1 style={{fontSize: 24, marginBottom: 12}}>Categories</h1>
      {!cats?.length && <div>Нет категорий</div>}
      <ul style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', listStyle:'none', padding:0}}>
        {cats.map((c)=>(
          <li key={c} style={{border:'1px solid #333', borderRadius:10, padding:'12px 14px'}}>
            <div style={{fontWeight:600, marginBottom:6}}>{c}</div>
            <Link href={`/?cat=${encodeURIComponent(c)}`} style={{textDecoration:'none', color:'inherit', opacity:.8}}>Открыть каталог</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
