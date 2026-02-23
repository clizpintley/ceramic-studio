import { $fetch } from 'ofetch'
import { useState } from 'nuxt/app'

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
  const siteContentState = useState<SiteContent | null>('site-content-data', () => null)
  const siteContentLoadedState = useState<boolean>('site-content-loaded', () => false)
  const fallbackContent = defaultFallbackContent

  if (!siteContentLoadedState.value) {
    try {
      const response = await $fetch<{ content: SiteContent }>('/api/content/site-content')
      if (response?.content) {
        siteContentState.value = response.content
      }
    } catch {
      siteContentState.value = fallbackContent
    } finally {
      siteContentLoadedState.value = true
    }
  }

  return siteContentState.value ?? fallbackContent
}
