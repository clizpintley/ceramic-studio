import { join } from 'node:path'
import { defineEventHandler, setHeader } from 'h3'
import { readJsonData } from '../../utils/cms-storage'

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
    etsyUrl: 'https://www.etsy.com/shop/artandaboutpupkova',
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

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  setHeader(event, 'Pragma', 'no-cache')
  setHeader(event, 'Expires', '0')

  const localPath = join(process.cwd(), 'data', 'site-content.json')
  const parsed = await readJsonData({
    localPath,
    blobKey: 'cms/data/site-content.json',
    fallback: defaultContent
  })

  return {
    content: {
      ...defaultContent,
      ...(parsed || {}),
      contact: {
        ...defaultContent.contact,
        ...(parsed?.contact || {})
      },
      testimonials: {
        ...defaultContent.testimonials,
        ...(parsed?.testimonials || {}),
        items: Array.isArray(parsed?.testimonials?.items) ? parsed.testimonials.items : []
      },
      instagram: {
        ...defaultContent.instagram,
        ...(parsed?.instagram || {}),
        posts: Array.isArray(parsed?.instagram?.posts) ? parsed.instagram.posts : []
      }
    }
  }
})
