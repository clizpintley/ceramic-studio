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
    showEmail: boolean
    emailLabel: string
    emailAddress: string
    showInstagram: boolean
    instagramLabel: string
    instagramHandle: string
    instagramUrl: string
    showEtsy: boolean
    etsyLabel: string
    etsyName: string
    etsyUrl: string
    showFacebook: boolean
    facebookLabel: string
    facebookHandle: string
    facebookUrl: string
    image: string
    imageAlt: string
  }
  testimonials: {
    heading: string
    intro: string
    items: Array<{
      name: string
      rating: number
      text: string
      approved: boolean
    }>
  }
  instagram: {
    heading: string
    intro: string
    profileUrl: string
    posts: Array<{
      url: string
      caption: string
      enabled: boolean
    }>
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
    showEmail: true,
    emailLabel: 'Email:',
    emailAddress: '',
    showInstagram: true,
    instagramLabel: 'Instagram:',
    instagramHandle: '@artandaboutpupkova',
    instagramUrl: 'https://www.instagram.com/artandaboutpupkova',
    showEtsy: true,
    etsyLabel: 'Etsy shop:',
    etsyName: 'Art & About',
    etsyUrl: 'https://www.etsy.com/shop/artandabout',
    showFacebook: false,
    facebookLabel: 'Facebook:',
    facebookHandle: 'Art & About',
    facebookUrl: '',
    image: '/images/tea3.jpeg',
    imageAlt: 'Tea Pupkova contact portrait'
  },
  testimonials: {
    heading: 'Kind Words',
    intro: 'What collectors and customers are saying.',
    items: []
  },
  instagram: {
    heading: 'Latest from Instagram',
    intro: 'Recent studio updates and finished pieces.',
    profileUrl: 'https://www.instagram.com/artandaboutpupkova',
    posts: []
  }
}

export const useSiteContent = async () => {
  const siteContentState = useState<SiteContent | null>('site-content-data', () => null)
  const fallbackContent = defaultFallbackContent

  try {
    const response = await $fetch<{ content: SiteContent }>('/api/content/site-content', {
      query: { _ts: Date.now() }
    })
    if (response?.content) {
      siteContentState.value = response.content
    }
  } catch {
    if (!siteContentState.value) {
      siteContentState.value = fallbackContent
    }
  }

  return siteContentState.value ?? fallbackContent
}
