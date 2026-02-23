import { join } from 'node:path'
import { defineEventHandler, getQuery } from 'h3'
import { readJsonData } from '../../utils/cms-storage'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const expectedPassword = useRuntimeConfig(event).cmsPassword || ''
  const providedPassword = String(query.password || '')

  const authOk = Boolean(expectedPassword) && providedPassword === expectedPassword

  if (!authOk) {
    return {
      ok: false,
      auth: false,
      message: 'Invalid or missing password query param.'
    }
  }

  const blobEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)
  const persistenceConfigured = blobEnabled || !isServerless

  const productsData = await readJsonData({
    localPath: join(process.cwd(), 'data', 'products.json'),
    blobKey: 'cms/data/products.json',
    fallback: { products: [] }
  })

  const contentData = await readJsonData({
    localPath: join(process.cwd(), 'data', 'site-content.json'),
    blobKey: 'cms/data/site-content.json',
    fallback: {}
  })

  return {
    ok: true,
    auth: true,
    storage: blobEnabled ? 'vercel-blob' : 'local-filesystem',
    blobTokenConfigured: blobEnabled,
    persistenceConfigured,
    warning: persistenceConfigured
      ? undefined
      : 'Deployment is running in serverless mode without BLOB_READ_WRITE_TOKEN. CMS writes will not persist.',
    checks: {
      productsReadable: Array.isArray(productsData?.products),
      siteContentReadable: Boolean(contentData && typeof contentData === 'object')
    }
  }
})
