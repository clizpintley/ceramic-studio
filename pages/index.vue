<template>
  <section>
    <HeroSection class="reveal-item" />
    <div class="reveal-item reveal-divider my-10 flex items-center" aria-hidden="true">
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
      <div class="mx-4 h-2 w-2 rounded-full bg-[#D75641]"></div>
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
    </div>
    <AboutSection class="reveal-item" />
    <div class="reveal-item reveal-divider my-10 flex items-center" aria-hidden="true">
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
      <div class="mx-4 h-2 w-2 rounded-full bg-[#D75641]"></div>
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
    </div>
    <ProductsSection :max-items="6" show-more-link />
    <div class="reveal-item reveal-divider my-10 flex items-center" aria-hidden="true">
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
      <div class="mx-4 h-2 w-2 rounded-full bg-[#D75641]"></div>
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
    </div>
    <BehindTheScenesSection class="reveal-item" />
    <div class="reveal-item reveal-divider my-10 flex items-center" aria-hidden="true">
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
      <div class="mx-4 h-2 w-2 rounded-full bg-[#D75641]"></div>
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
    </div>
    <TestimonialsSection class="reveal-item" />
    <div class="reveal-item reveal-divider my-10 flex items-center" aria-hidden="true">
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
      <div class="mx-4 h-2 w-2 rounded-full bg-[#D75641]"></div>
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
    </div>
    <InstagramLatestSection class="reveal-item" />
    <div class="reveal-item reveal-divider my-10 flex items-center" aria-hidden="true">
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
      <div class="mx-4 h-2 w-2 rounded-full bg-[#D75641]"></div>
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
    </div>
    <ContactSection class="reveal-item" />
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted } from 'vue'

const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://artandabout.vercel.app').replace(/\/+$/, '')

useHead({
  title: 'Art & About | Tea Pupkova Ceramics',
  meta: [
    { name: 'description', content: 'Art & About by Tea (Theodora) Pupkova — hand-painted, handmade ceramics including mugs, teapots, bowls, and unique functional ceramic art.' },
    { name: 'keywords', content: 'Art and About, Tea Pupkova, Theodora Pupkova, Pupkova, handmade ceramics, hand painted ceramics, ceramic art, pottery artist' },
    { property: 'og:title', content: 'Art & About | Hand-painted Ceramics by Tea Pupkova' },
    { property: 'og:description', content: 'Hand-painted functional ceramics by Tea Pupkova: mugs, teapots, bowls, and custom illustrated pieces made for everyday use.' },
    { property: 'og:url', content: `${siteUrl}/` },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/` }]
})

let revealObserver: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  const revealItems = document.querySelectorAll('.reveal-item')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 767px)').matches

  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: isMobile ? 0.01 : 0.12,
      rootMargin: isMobile ? '0px 0px 0px 0px' : '0px 0px -10% 0px'
    }
  )

  revealItems.forEach((item) => revealObserver?.observe(item))
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  revealObserver = null
})
</script>

<style scoped>
.reveal-item {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 600ms ease, transform 600ms ease;
  will-change: opacity, transform;
}

.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-divider {
  transition-duration: 700ms;
}
</style>
