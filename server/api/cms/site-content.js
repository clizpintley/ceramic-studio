import { join } from 'node:path'
import { createError, defineEventHandler, getHeader, readBody } from 'h3'
import { readJsonData, writeJsonData } from '../../utils/cms-storage'

const siteContentFilePath = join(process.cwd(), 'data', 'site-content.json')
const siteContentBlobKey = 'cms/data/site-content.json'

const defaultContent = {
  about: {
    heading: "I'm Tea Pupkova",
    paragraphs: [],
    image: '/images/tea.png',
    imageAlt: 'Tea Pupkova in the studio'
  },
  behindTheScenes: {
    heading: 'Behind the Scenes',
    subtitle: '',
    intro: '',
    cards: [],
    footerText: '',
    instagramUrl: 'https://www.instagram.com/artandaboutpupkova',
    instagramLabel: 'Follow @artandaboutpupkova'
  },
  contact: {
    heading: "Let's Connect",
    intro: '',
    emailLabel: 'Email:',
    emailAddress: '',
    instagramLabel: 'Instagram:',
    instagramHandle: '@artandaboutpupkova',
    instagramUrl: 'https://www.instagram.com/artandaboutpupkova',
    image: '/images/tea3.jpeg',
    imageAlt: 'Tea Pupkova contact portrait'
  }
}

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

const normalize = (content) => {
  const cards = Array.isArray(content?.behindTheScenes?.cards)
    ? content.behindTheScenes.cards.map((card) => ({
        title: String(card?.title ?? '').trim(),
        text: String(card?.text ?? '').trim()
      }))
    : []

  const paragraphs = Array.isArray(content?.about?.paragraphs)
    ? content.about.paragraphs.map((paragraph) => String(paragraph ?? '').trim())
    : []

  return {
    about: {
      heading: String(content?.about?.heading ?? defaultContent.about.heading).trim(),
      paragraphs,
      image: String(content?.about?.image ?? defaultContent.about.image).trim(),
      imageAlt: String(content?.about?.imageAlt ?? defaultContent.about.imageAlt).trim()
    },
    behindTheScenes: {
      heading: String(content?.behindTheScenes?.heading ?? defaultContent.behindTheScenes.heading).trim(),
      subtitle: String(content?.behindTheScenes?.subtitle ?? '').trim(),
      intro: String(content?.behindTheScenes?.intro ?? '').trim(),
      cards,
      footerText: String(content?.behindTheScenes?.footerText ?? '').trim(),
      instagramUrl: String(content?.behindTheScenes?.instagramUrl ?? defaultContent.behindTheScenes.instagramUrl).trim(),
      instagramLabel: String(content?.behindTheScenes?.instagramLabel ?? defaultContent.behindTheScenes.instagramLabel).trim()
    },
    contact: {
      heading: String(content?.contact?.heading ?? defaultContent.contact.heading).trim(),
      intro: String(content?.contact?.intro ?? '').trim(),
      emailLabel: String(content?.contact?.emailLabel ?? defaultContent.contact.emailLabel).trim(),
      emailAddress: String(content?.contact?.emailAddress ?? '').trim(),
      instagramLabel: String(content?.contact?.instagramLabel ?? defaultContent.contact.instagramLabel).trim(),
      instagramHandle: String(content?.contact?.instagramHandle ?? defaultContent.contact.instagramHandle).trim(),
      instagramUrl: String(content?.contact?.instagramUrl ?? defaultContent.contact.instagramUrl).trim(),
      image: String(content?.contact?.image ?? defaultContent.contact.image).trim(),
      imageAlt: String(content?.contact?.imageAlt ?? defaultContent.contact.imageAlt).trim()
    }
  }
}

const readSiteContent = async () => {
  const parsed = await readJsonData({
    localPath: siteContentFilePath,
    blobKey: siteContentBlobKey,
    fallback: defaultContent
  })
  return normalize(parsed)
}

const writeSiteContent = async (content) => {
  await writeJsonData({
    localPath: siteContentFilePath,
    blobKey: siteContentBlobKey,
    data: content
  })
}

export default defineEventHandler(async (event) => {
  requireCmsAuth(event)

  if (event.method === 'GET') {
    return { content: await readSiteContent() }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const normalizedContent = normalize(body?.content)
    await writeSiteContent(normalizedContent)

    return {
      ok: true
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed.'
  })
})
