import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-02-20',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  app: {
    head: {
      title: 'Ceramic Artist Portfolio',
      meta: [
        { name: 'description', content: 'Hand-painted ceramic artist portfolio and shop' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo.png' },
        { rel: 'apple-touch-icon', href: '/images/logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poiret+One&family=Playfair+Display:wght@700;900&family=Lora:wght@400;600&display=swap' }
      ]
    }
  },
  runtimeConfig: {
    cmsPassword: process.env.CMS_PASSWORD || 'vasko',
    chatbotMailHost: process.env.CHATBOT_MAIL_HOST || '',
    chatbotMailPort: process.env.CHATBOT_MAIL_PORT || '587',
    chatbotMailUser: process.env.CHATBOT_MAIL_USER || 'pupkovateodora@gmail.com',
    chatbotMailPass: process.env.CHATBOT_MAIL_PASS || '',
    chatbotMailFrom: process.env.CHATBOT_MAIL_FROM || 'Art & About <pupkovateodora@gmail.com>',
    chatbotMailTo: process.env.CHATBOT_MAIL_TO || 'pupkovateodora@gmail.com'
  }
})
