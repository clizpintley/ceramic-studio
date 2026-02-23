<template>
  <div class="mb-16">
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
        class="bg-[#F8D6B4] p-6 rounded-lg border border-[#F8D6B4]"
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
import { useSiteContent } from '../composables/useSiteContent'

const content = await useSiteContent()
</script>
