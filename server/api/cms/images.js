import { createError, defineEventHandler, getHeader, readMultipartFormData } from 'h3'
import { allowedImageExtensions, listCmsImages, uploadCmsImage } from '../../utils/cms-storage'

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

export default defineEventHandler(async (event) => {
  requireCmsAuth(event)

  if (event.method === 'GET') {
    const images = await listCmsImages()
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

    const extension = filePart.filename.split('.').pop()?.toLowerCase() || ''
    if (!allowedImageExtensions.has(`.${extension}`)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unsupported image format.'
      })
    }

    const image = await uploadCmsImage(filePart)

    return {
      ok: true,
      image
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed.'
  })
})
