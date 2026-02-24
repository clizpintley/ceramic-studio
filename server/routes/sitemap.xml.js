import { join } from 'path'
import { defineEventHandler, setHeader } from 'h3'
import { readJsonData } from '../utils/cms-storage'

const staticRoutes = ['/', '/about', '/gallery', '/behind-the-scenes', '/contact']

const escapeXml = (value) => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public?.siteUrl || 'https://artandabout.vercel.app').replace(/\/+$/, '')

  const localPath = join(process.cwd(), 'data', 'products.json')
  const parsed = await readJsonData({
    localPath,
    blobKey: 'cms/data/products.json',
    fallback: { products: [] }
  })

  const products = Array.isArray(parsed?.products) ? parsed.products : []
  const productRoutes = Array.from(
    new Set(
      products
        .map((product) => String(product?.slug || '').trim())
        .filter(Boolean)
        .map((slug) => `/product/${slug}`)
    )
  )

  const routes = [...staticRoutes, ...productRoutes]
  const now = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url>\n    <loc>${escapeXml(`${siteUrl}${route}`)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>`)
    .join('\n')}\n</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=600, s-maxage=600')
  return xml
})
