<template>
  <footer class="bg-[#F8D6B4] border-t-2 border-[#FFCB06] mt-12">
    <div class="container px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 class="font-bold text-[#9C4E3A] mb-3">Art & About</h3>
          <p class="text-sm text-gray-700">Handmade, hand-painted ceramics created with love and care.</p>
        </div>
        <div>
          <h3 class="font-bold text-[#9C4E3A] mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="link in navLinks" :key="link.to">
              <nuxt-link :to="link.to" class="link-fx text-gray-700 hover:text-[#9C4E3A]">{{ link.label }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-[#9C4E3A] mb-3">Contact</h3>
          <p v-if="content.contact.showEmail" class="text-sm text-gray-700 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#C4674A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M4 6h16v12H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            <span>{{ content.contact.emailLabel }}</span>
            <a :href="`mailto:${content.contact.emailAddress}`" class="link-fx text-[#C4674A] hover:text-[#9C4E3A] font-medium transition">{{ content.contact.emailAddress }}</a>
          </p>
          <p v-if="content.contact.showEtsy" class="text-sm text-gray-700 mt-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#C4674A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M6 8.5h12l-1.2 9H7.2L6 8.5z" />
              <path d="M9 8.5V8a3 3 0 0 1 6 0v.5" />
            </svg>
            <span>{{ content.contact.etsyLabel }}</span>
            <a
              :href="content.contact.etsyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="link-fx text-[#C4674A] hover:text-[#9C4E3A] font-medium transition"
            >
              {{ content.contact.etsyName }}
            </a>
          </p>
          <p v-if="content.contact.showInstagram" class="text-sm text-gray-700 mt-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#C4674A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>{{ content.contact.instagramLabel }}</span>
            <a 
              :href="content.contact.instagramUrl" 
              target="_blank"
              rel="noopener noreferrer"
              class="link-fx text-[#C4674A] hover:text-[#9C4E3A] font-medium transition"
            >
              {{ content.contact.instagramHandle }}
            </a>
          </p>
          <p v-if="content.contact.showFacebook" class="text-sm text-gray-700 mt-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#C4674A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M14 8h2V5h-2a4 4 0 0 0-4 4v2H8v3h2v5h3v-5h2.2l.8-3H13V9a1 1 0 0 1 1-1z" />
            </svg>
            <span>{{ content.contact.facebookLabel }}</span>
            <a
              :href="content.contact.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="link-fx text-[#C4674A] hover:text-[#9C4E3A] font-medium transition"
            >
              {{ content.contact.facebookHandle }}
            </a>
          </p>
        </div>
      </div>
      <div class="pt-6 flex items-center gap-4 text-sm text-gray-600">
        <div class="h-px flex-1 bg-gradient-to-r from-transparent to-[#C4674A]/45" aria-hidden="true"></div>
        <span class="whitespace-nowrap">© {{ currentYear }} Art & About — Tea Pupkova</span>
        <div class="h-px flex-1 bg-gradient-to-l from-transparent to-[#C4674A]/45" aria-hidden="true"></div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useState } from 'nuxt/app'
import { useMainNavigation } from '../composables/useMainNavigation'
import { useSiteContent } from '../composables/useSiteContent'

const currentYear = useState('footer-year', () => new Date().getFullYear())
const navLinks = useMainNavigation()
const content = await useSiteContent()
</script>
