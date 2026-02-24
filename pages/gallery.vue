<template>
  <ProductsSection />
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://artandabout.vercel.app').replace(/\/+$/, '')

useHead({
  title: 'Ceramic Gallery — Art & About by Tea Pupkova',
  meta: [
    { name: 'description', content: 'Browse handmade, hand-painted ceramics by Tea Pupkova: mugs, bowls, teapots, tableware, and illustrated ceramic art.' },
    { name: 'keywords', content: 'hand painted ceramics, handmade pottery, ceramic mugs, tea pupkova ceramics, art and about gallery' },
    { property: 'og:title', content: 'Ceramic Gallery — Art & About' },
    { property: 'og:description', content: 'Handmade and hand-painted ceramics gallery by Tea Pupkova.' }
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/gallery` }]
})
</script>
