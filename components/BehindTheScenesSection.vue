<template>
  <div ref="sectionRef" class="mb-16">
    <h2 class="text-4xl font-bold text-[#9C4E3A] mb-6 font-display">{{ content.behindTheScenes.heading }}</h2>
    <p class="text-lg text-gray-700 mb-8">
      {{ content.behindTheScenes.subtitle }}
    </p>
    <p class="text-lg text-gray-700 mb-8 leading-relaxed">
      {{ content.behindTheScenes.intro }}
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div
        v-for="(card, index) in content.behindTheScenes.cards"
        :key="`${card.title}-${index}`"
        class="bg-[#F8D6B4] p-6 rounded-lg border border-[#F8D6B4] reveal-step transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-[#FFCB06]"
        :class="visible ? 'is-visible' : ''"
        :style="{ '--delay': `${500 + index * 320}ms` }"
      >
        <h3 class="text-2xl font-bold text-[#9C4E3A] mb-3 font-display">{{ card.title }}</h3>
        <p class="text-gray-700 leading-relaxed">
          {{ card.text }}
        </p>
      </div>
    </div>
    <p class="text-gray-700 mb-6 leading-relaxed">
      {{ content.behindTheScenes.footerText }}
    </p>
    <a
      :href="content.behindTheScenes.instagramUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block bg-[#D75641] text-white px-6 py-3 rounded-lg hover:bg-[#C54D39] transition font-medium"
    >
      {{ content.behindTheScenes.instagramLabel }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const content = await useSiteContent()
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sectionRef.value) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        visible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    }
  )

  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>
.reveal-step {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 1250ms ease, transform 1250ms ease;
  transition-delay: var(--delay, 0ms);
}

.reveal-step.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-step,
  .reveal-step.is-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
