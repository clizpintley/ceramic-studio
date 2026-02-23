import { join } from 'node:path'
import { defineEventHandler } from 'h3'
import { readJsonData } from '../../utils/cms-storage'

export default defineEventHandler(async () => {
  const localPath = join(process.cwd(), 'data', 'site-content.json')
  const parsed = await readJsonData({
    localPath,
    blobKey: 'cms/data/site-content.json',
    fallback: {}
  })

  return {
    content: parsed || {}
  }
})
