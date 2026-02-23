<template>
  <section>
    <HeroSection class="reveal-item" />
    <div class="reveal-item reveal-divider my-10 flex items-center" aria-hidden="true">
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
      <div class="mx-4 h-2 w-2 rounded-full bg-[#D75641]"></div>
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
    </div>
    <ProductsSection class="reveal-item" />
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
    <BehindTheScenesSection class="reveal-item" />
    <div class="reveal-item reveal-divider my-10 flex items-center" aria-hidden="true">
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
      <div class="mx-4 h-2 w-2 rounded-full bg-[#D75641]"></div>
      <div class="h-px flex-1 bg-[#F8D6B4]"></div>
    </div>
    <ContactSection class="reveal-item" />
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

useHead({
  title: 'Art & About - Tea Pupkova',
  meta: [
    { name: 'description', content: 'Tea Pupkova creates hand-painted, functional ceramics—mugs, teapots, bowls, and custom pieces inspired by stories, characters, and everyday home rituals.' },
    { property: 'og:title', content: 'Hand-painted Ceramics — Art and About' },
    { property: 'og:description', content: 'Hand-painted functional ceramics by Tea Pupkova: mugs, teapots, bowls, and custom illustrated pieces made for everyday use.' }
  ]
})

let revealObserver: IntersectionObserver | null = null

onMounted(() => {
  const revealItems = document.querySelectorAll('.reveal-item')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
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
