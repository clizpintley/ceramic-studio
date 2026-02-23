import { join } from 'node:path'
import { defineEventHandler } from 'h3'
import { readJsonData } from '../../utils/cms-storage'

export default defineEventHandler(async () => {
  const localPath = join(process.cwd(), 'data', 'product-categories.json')
  const parsed = await readJsonData({
    localPath,
    blobKey: 'cms/data/product-categories.json',
    fallback: { categories: [] }
  })

  return {
    categories: Array.isArray(parsed?.categories) ? parsed.categories : []
  }
})
