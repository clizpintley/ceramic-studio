<template>
  <div class="mb-16">
    <h2 class="section-title text-4xl font-bold text-[#9C4E3A] mb-3 font-display">{{ content.testimonials.heading }}</h2>
    <p class="text-gray-700 leading-relaxed mb-8">{{ content.testimonials.intro }}</p>

    <div v-if="approvedTestimonials.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="(item, index) in approvedTestimonials"
        :key="`testimonial-${index}`"
        class="surface-card p-5"
      >
        <div class="mb-2 text-[#D75641] text-lg tracking-wide" aria-label="rating">
          {{ '★'.repeat(item.rating) }}{{ '☆'.repeat(5 - item.rating) }}
        </div>
        <p class="text-gray-700 leading-relaxed">“{{ item.text }}”</p>
        <p class="mt-3 text-sm font-semibold text-[#9C4E3A]">— {{ item.name || 'Anonymous' }}</p>
      </article>
    </div>

    <p v-else class="text-gray-600">Testimonials will appear here soon.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const content = await useSiteContent()

const approvedTestimonials = computed(() => {
  return (content.testimonials?.items || []).filter((item) => Boolean(item.approved && item.text))
})
</script>
