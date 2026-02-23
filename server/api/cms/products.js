import { join } from 'node:path'
import { createError, defineEventHandler, getHeader, readBody } from 'h3'
import { readJsonData, writeJsonData } from '../../utils/cms-storage'

const productsFilePath = join(process.cwd(), 'data', 'products.json')
const productsBlobKey = 'cms/data/products.json'

const requireCmsAuth = (event) => {
  const config = useRuntimeConfig(event)
  const requestPassword = getHeader(event, 'x-cms-password') || ''

  if (!config.cmsPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: 'CMS password is not configured on the server.'
    })
  }

  if (requestPassword !== config.cmsPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid CMS credentials.'
    })
  }
}

const normalizeProduct = (product) => ({
  id: String(product?.id ?? '').trim(),
  slug: String(product?.slug ?? '').trim(),
  category: String(product?.category ?? '').trim(),
  title: String(product?.title ?? '').trim(),
  short: String(product?.short ?? '').trim(),
  description: String(product?.description ?? '').trim(),
  price: Number(product?.price ?? 0),
  image: String(product?.image ?? '').trim()
})

const validateProduct = (product, index) => {
  const errors = []

  if (!product.id) {
    errors.push('id is required')
  }

  if (!product.slug) {
    errors.push('slug is required')
  }

  if (!product.title) {
    errors.push('title is required')
  }

  if (!Number.isFinite(product.price) || product.price < 0) {
    errors.push('price must be a valid non-negative number')
  }

  if (errors.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Product #${index + 1} validation failed: ${errors.join(', ')}`
    })
  }
}

const readProducts = async () => {
  const parsed = await readJsonData({
    localPath: productsFilePath,
    blobKey: productsBlobKey,
    fallback: { products: [] }
  })

  const list = Array.isArray(parsed?.products) ? parsed.products : []
  return list.map(normalizeProduct)
}

const writeProducts = async (products) => {
  await writeJsonData({
    localPath: productsFilePath,
    blobKey: productsBlobKey,
    data: { products }
  })
}

export default defineEventHandler(async (event) => {
  requireCmsAuth(event)

  if (event.method === 'GET') {
    return { products: await readProducts() }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    if (!Array.isArray(body?.products)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Request must include a products array.'
      })
    }

    const normalizedProducts = body.products.map(normalizeProduct)
    normalizedProducts.forEach((product, index) => validateProduct(product, index))
    await writeProducts(normalizedProducts)

    return {
      ok: true,
      count: normalizedProducts.length
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed.'
  })
})
