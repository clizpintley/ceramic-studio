<template>
  <AboutSection />
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://artandabout.vercel.app').replace(/\/+$/, '')

useHead({
  title: 'About Tea Pupkova — Art & About Ceramics',
  meta: [
    { name: 'description', content: 'Meet Tea (Theodora) Pupkova, the artist behind Art & About. Discover her hand-painted ceramics process, inspirations, and studio practice.' },
    { name: 'keywords', content: 'Tea Pupkova, Theodora Pupkova, Art and About, ceramic artist, hand-painted ceramics' }
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/about` }]
})
</script>
