<template>
  <ContactSection />
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://artandabout.vercel.app').replace(/\/+$/, '')

useHead({
  title: 'Contact Tea Pupkova — Art & About',
  meta: [
    { name: 'description', content: 'Contact Tea (Theodora) Pupkova from Art & About for custom hand-painted ceramics, commissions, collaborations, and inquiries.' }
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/contact` }]
})
</script>
