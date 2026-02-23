import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { createError, defineEventHandler, getHeader, readMultipartFormData } from 'h3'

const imagesDir = join(process.cwd(), 'public', 'images')
const uploadsDir = join(process.cwd(), 'public', 'uploads')
const allowedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'])

const requireCmsAuth = (event: any) => {
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

const getImageListFromDir = async (directory: string, urlPrefix: string) => {
  try {
    const files = await readdir(directory)
    return files
      .filter((fileName) => allowedExtensions.has(extname(fileName).toLowerCase()))
      .map((fileName) => `${urlPrefix}/${fileName}`)
  } catch {
    return []
  }
}

const sanitizeBaseName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default defineEventHandler(async (event) => {
  requireCmsAuth(event)

  if (event.method === 'GET') {
    const imageFiles = await getImageListFromDir(imagesDir, '/images')
    const uploadFiles = await getImageListFromDir(uploadsDir, '/uploads')
    const images = [...imageFiles, ...uploadFiles].sort((a, b) => a.localeCompare(b))
    return { images }
  }

  if (event.method === 'POST') {
    const parts = await readMultipartFormData(event)
    const filePart = parts?.find((part) => part.name === 'file')

    if (!filePart || !filePart.data || !filePart.filename) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No image file provided.'
      })
    }

    const extension = extname(filePart.filename).toLowerCase()
    if (!allowedExtensions.has(extension)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unsupported image format.'
      })
    }

    await mkdir(uploadsDir, { recursive: true })

    const baseName = sanitizeBaseName(filePart.filename) || 'upload'
    const outputFileName = `${baseName}-${Date.now()}${extension}`
    const outputPath = join(uploadsDir, outputFileName)

    await writeFile(outputPath, filePart.data)

    return {
      ok: true,
      image: `/uploads/${outputFileName}`
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed.'
  })
})
