<template>
  <div class="mb-16">
    <h2 class="text-4xl font-bold text-[#9C4E3A] mb-6 font-display">{{ content.about.heading }}</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div>
        <p
          v-for="(paragraph, index) in content.about.paragraphs"
          :key="`${index}-${paragraph.slice(0, 12)}`"
          class="text-lg text-gray-700"
          :class="index !== content.about.paragraphs.length - 1 ? 'mb-4' : ''"
        >
          {{ paragraph }}
        </p>
      </div>

      <div class="w-full">
        <img
          :src="content.about.image"
          :alt="content.about.imageAlt"
          class="w-full h-[520px] object-cover rounded-2xl border border-[#F8D6B4]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteContent } from '../composables/useSiteContent'

const content = await useSiteContent()
</script>
