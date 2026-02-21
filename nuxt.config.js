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
        { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
        { rel: 'stylesheet', href: 'https://cdn.snipcart.com/themes/v3.0.30/default/snipcart.css' }
      ],
      script: [
        { src: 'https://cdn.snipcart.com/themes/v3.0.30/default/snipcart.js', defer: true }
      ]
    }
  },
  runtimeConfig: {
    public: {
      snipcartApiKey: process.env.SNIPCART_API_KEY || ''
    }
  }
})
