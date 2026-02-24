<template>
  <BehindTheScenesSection />
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://artandabout.vercel.app').replace(/\/+$/, '')

useHead({
  title: 'Ceramics Process — Behind the Scenes | Art & About',
  meta: [
    { name: 'description', content: 'Go behind the scenes with Tea Pupkova and see how Art & About hand-painted ceramics are designed, painted, glazed, and finished.' }
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/behind-the-scenes` }]
})
</script>
