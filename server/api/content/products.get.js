import { join } from 'node:path'
import { defineEventHandler } from 'h3'
import { readJsonData } from '../../utils/cms-storage'

export default defineEventHandler(async () => {
  const localPath = join(process.cwd(), 'data', 'products.json')
  const parsed = await readJsonData({
    localPath,
    blobKey: 'cms/data/products.json',
    fallback: { products: [] }
  })

  return {
    products: Array.isArray(parsed?.products) ? parsed.products : []
  }
})
