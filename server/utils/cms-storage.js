import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import { list, put } from '@vercel/blob'

const blobToken = process.env.BLOB_READ_WRITE_TOKEN || ''
const isBlobEnabled = () => Boolean(blobToken)
const isServerlessRuntime = () => Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)

const ensurePersistentWriteAvailable = () => {
  if (!isBlobEnabled() && isServerlessRuntime()) {
    throw new Error('CMS persistence is not configured for deployment. Set BLOB_READ_WRITE_TOKEN to enable Vercel Blob writes.')
  }
}

export const allowedImageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'])

const getBlobJson = async (key) => {
  const result = await list({ prefix: key, limit: 100, token: blobToken })
  const latestBlob = result.blobs
    .slice()
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())[0]
  const blob = latestBlob

  if (!blob) {
    return null
  }

  const response = await fetch(blob.url)
  if (!response.ok) {
    throw new Error(`Failed to fetch blob content for ${key}.`)
  }

  return response.json()
}

export const readJsonData = async ({ localPath, blobKey, fallback }) => {
  if (isBlobEnabled()) {
    try {
      const blobData = await getBlobJson(blobKey)
      if (blobData) {
        return blobData
      }
    } catch (error) {
      if (isServerlessRuntime()) {
        throw error
      }
    }

    if (isServerlessRuntime()) {
      return fallback
    }
  }

  try {
    const content = await readFile(localPath, 'utf-8')
    return JSON.parse(content)
  } catch {
    return fallback
  }
}

export const writeJsonData = async ({ localPath, blobKey, data }) => {
  ensurePersistentWriteAvailable()
  const payload = JSON.stringify(data, null, 2)

  if (isBlobEnabled()) {
    await put(blobKey, payload, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      token: blobToken
    })
    return
  }

  await mkdir(dirname(localPath), { recursive: true })
  await writeFile(localPath, payload, 'utf-8')
}

const getImageListFromDir = async (directory, urlPrefix) => {
  try {
    const files = await readdir(directory)
    return files
      .filter((fileName) => allowedImageExtensions.has(extname(fileName).toLowerCase()))
      .map((fileName) => `${urlPrefix}/${fileName}`)
  } catch {
    return []
  }
}

export const listCmsImages = async () => {
  const localImagesDir = join(process.cwd(), 'public', 'images')
  const localUploadsDir = join(process.cwd(), 'public', 'uploads')

  const localImageFiles = await getImageListFromDir(localImagesDir, '/images')
  const localUploadFiles = await getImageListFromDir(localUploadsDir, '/uploads')

  let blobUploadFiles = []
  if (isBlobEnabled()) {
    const result = await list({ prefix: 'cms/uploads/', token: blobToken })
    blobUploadFiles = result.blobs.map((entry) => entry.url)
  }

  return Array.from(new Set([...localImageFiles, ...localUploadFiles, ...blobUploadFiles]))
    .sort((a, b) => a.localeCompare(b))
}

const sanitizeBaseName = (name) => {
  return String(name)
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const uploadCmsImage = async (filePart) => {
  ensurePersistentWriteAvailable()
  const extension = extname(filePart.filename || '').toLowerCase()
  if (!allowedImageExtensions.has(extension)) {
    throw new Error('Unsupported image format.')
  }

  const baseName = sanitizeBaseName(filePart.filename || 'upload') || 'upload'
  const outputFileName = `${baseName}-${Date.now()}${extension}`

  if (isBlobEnabled()) {
    const blob = await put(`cms/uploads/${outputFileName}`, filePart.data, {
      access: 'public',
      addRandomSuffix: false,
      contentType: filePart.type || 'application/octet-stream',
      token: blobToken
    })
    return blob.url
  }

  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadsDir, { recursive: true })
  await writeFile(join(uploadsDir, outputFileName), filePart.data)
  return `/uploads/${outputFileName}`
}
