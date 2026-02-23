import { $fetch } from 'ofetch'

export type SiteContent = {
  about: {
    heading: string
    paragraphs: string[]
    image: string
    imageAlt: string
  }
  behindTheScenes: {
    heading: string
    subtitle: string
    intro: string
    cards: Array<{
      title: string
      text: string
    }>
    footerText: string
    instagramUrl: string
    instagramLabel: string
  }
  contact: {
    heading: string
    intro: string
    emailLabel: string
    emailAddress: string
    instagramLabel: string
    instagramHandle: string
    instagramUrl: string
    image: string
    imageAlt: string
  }
}

let cachedSiteContent: SiteContent | null = null
let siteContentLoaded = false

const defaultFallbackContent: SiteContent = {
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

export const useSiteContent = async () => {
  const fallbackContent = defaultFallbackContent

  if (!siteContentLoaded) {
    try {
      const response = await $fetch<{ content: SiteContent }>('/api/content/site-content')
      if (response?.content) {
        cachedSiteContent = response.content
      }
    } catch {
      cachedSiteContent = fallbackContent
    } finally {
      siteContentLoaded = true
    }
  }

  return cachedSiteContent ?? fallbackContent
}
