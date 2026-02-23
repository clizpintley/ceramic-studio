<template>
  <div class="mb-8">
    <h2 class="text-4xl font-bold text-[#9C4E3A] mb-6 font-display">{{ content.contact.heading }}</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div class="w-full bg-[#F8D6B4] p-8 rounded-lg border border-[#F8D6B4]">
        <p class="text-lg text-gray-700 mb-6">
          {{ content.contact.intro }}
        </p>
        <p class="text-gray-700 mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#9C4E3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          <span>{{ content.contact.emailLabel }}</span>
          <a :href="`mailto:${content.contact.emailAddress}`" class="link-fx text-[#9C4E3A] font-medium transition">
            {{ content.contact.emailAddress }}
          </a>
        </p>
        <p class="text-gray-700 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#9C4E3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <circle cx="12" cy="12" r="3.5" />
            <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span>{{ content.contact.instagramLabel }}</span>
          <a :href="content.contact.instagramUrl" target="_blank" rel="noopener noreferrer" class="link-fx text-[#9C4E3A] font-medium transition">
            {{ content.contact.instagramHandle }}
          </a>
        </p>
      </div>

      <div class="w-full">
        <img
          :src="content.contact.image"
          :alt="content.contact.imageAlt"
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
