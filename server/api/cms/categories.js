import { join } from 'node:path'
import { createError, defineEventHandler, getHeader, readBody } from 'h3'
import { readJsonData, writeJsonData } from '../../utils/cms-storage'

const categoriesFilePath = join(process.cwd(), 'data', 'product-categories.json')
const productsFilePath = join(process.cwd(), 'data', 'products.json')
const categoriesBlobKey = 'cms/data/product-categories.json'
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

const normalizeCategories = (input) => {
  const rawList = Array.isArray(input) ? input : []
  return Array.from(
    new Set(
      rawList
        .map((value) => String(value ?? '').trim().toLowerCase())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b))
}

const readCategories = async () => {
  const parsed = await readJsonData({
    localPath: categoriesFilePath,
    blobKey: categoriesBlobKey,
    fallback: { categories: [] }
  })

  return normalizeCategories(parsed?.categories)
}

const writeCategories = async (categories) => {
  await writeJsonData({
    localPath: categoriesFilePath,
    blobKey: categoriesBlobKey,
    data: { categories }
  })
}

const getUsedCategories = async () => {
  const parsed = await readJsonData({
    localPath: productsFilePath,
    blobKey: productsBlobKey,
    fallback: { products: [] }
  })

  const products = Array.isArray(parsed?.products) ? parsed.products : []

  return Array.from(
    new Set(
      products
        .map((product) => String(product?.category ?? '').trim().toLowerCase())
        .filter(Boolean)
    )
  )
}

export default defineEventHandler(async (event) => {
  requireCmsAuth(event)

  if (event.method === 'GET') {
    return { categories: await readCategories() }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)

    if (!Array.isArray(body?.categories)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Request must include a categories array.'
      })
    }

    const categories = normalizeCategories(body.categories)

    const usedCategories = await getUsedCategories()
    const removedUsedCategories = usedCategories.filter(
      (category) => !categories.includes(category)
    )

    if (removedUsedCategories.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Cannot delete categories used by products: ${removedUsedCategories.join(', ')}`
      })
    }

    await writeCategories(categories)

    return {
      ok: true,
      count: categories.length
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed.'
  })
})
