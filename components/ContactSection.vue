<template>
  <div id="contact-section" class="mb-8 scroll-mt-28">
    <h2 class="text-4xl font-bold text-[#9C4E3A] mb-6 font-display">{{ content.contact.heading }}</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div class="w-full bg-[#F8D6B4] p-8 rounded-lg border border-[#F8D6B4]">
        <p class="text-lg text-gray-700 mb-6">
          {{ content.contact.intro }}
        </p>
        <p v-if="content.contact.showEmail" class="text-gray-700 mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#9C4E3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          <span>{{ content.contact.emailLabel }}</span>
          <a :href="`mailto:${content.contact.emailAddress}`" class="link-fx text-[#9C4E3A] font-medium transition">
            {{ content.contact.emailAddress }}
          </a>
        </p>
        <p v-if="content.contact.showInstagram" class="text-gray-700 mb-3 flex items-center gap-2">
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
        <p v-if="content.contact.showEtsy" class="text-gray-700 mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#9C4E3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M6 8.5h12l-1.2 9H7.2L6 8.5z" />
            <path d="M9 8.5V8a3 3 0 0 1 6 0v.5" />
          </svg>
          <span>{{ content.contact.etsyLabel }}</span>
          <a :href="content.contact.etsyUrl" target="_blank" rel="noopener noreferrer" class="link-fx text-[#9C4E3A] font-medium transition">
            {{ content.contact.etsyName }}
          </a>
        </p>
        <p v-if="content.contact.showFacebook" class="text-gray-700 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#9C4E3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M14 8h2V5h-2a4 4 0 0 0-4 4v2H8v3h2v5h3v-5h2.2l.8-3H13V9a1 1 0 0 1 1-1z" />
          </svg>
          <span>{{ content.contact.facebookLabel }}</span>
          <a :href="content.contact.facebookUrl" target="_blank" rel="noopener noreferrer" class="link-fx text-[#9C4E3A] font-medium transition">
            {{ content.contact.facebookHandle }}
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
