import { join } from 'node:path'
import { defineEventHandler, setHeader } from 'h3'
import { readJsonData } from '../../utils/cms-storage'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  setHeader(event, 'Pragma', 'no-cache')
  setHeader(event, 'Expires', '0')

  const localPath = join(process.cwd(), 'data', 'products.json')
  const parsed = await readJsonData({
    localPath,
    blobKey: 'cms/data/products.json',
    fallback: { products: [] }
  })

  const allowedAvailability = ['in-stock', 'made-to-order', 'sold', 'limited-edition']
  const products = Array.isArray(parsed?.products) ? parsed.products : []

  return {
    products: products.map((product) => ({
      ...product,
      featured: Boolean(product?.featured),
      availability: allowedAvailability.includes(String(product?.availability ?? '').trim())
        ? String(product?.availability ?? '').trim()
        : 'in-stock'
    }))
  }
})
