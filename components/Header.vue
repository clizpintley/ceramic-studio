<template>
  <header class="bg-[#FFCB06] shadow-sm sticky top-0 z-50 border-b border-[#E6B800]">
    <div class="container px-4 py-3 md:py-5">
      <div class="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-7">
        <nuxt-link to="/" class="link-fx flex items-center space-x-3 hover:opacity-80 transition">
        <img src="/images/logo.png" alt="Art and About logo" class="h-14 w-14 md:h-20 md:w-20 object-contain" />
        <span class="text-2xl font-bold text-gray-800 whitespace-nowrap">
          <span class="hidden xl:inline"></span>
        </span>
      </nuxt-link>
      <nav class="w-full md:w-auto flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-2 text-[15px] md:text-base">
        <template v-for="(link, index) in navLinks" :key="link.to">
          <nuxt-link
            :to="link.to"
            class="link-fx px-1 py-1 rounded text-gray-800 hover:text-[#9C4E3A] font-medium transition"
            :class="isActive(link.to) ? 'text-[#9C4E3A] underline underline-offset-4 decoration-[#9C4E3A]/50' : ''"
          >
            {{ link.label }}
          </nuxt-link>
          <span
            v-if="index < navLinks.length - 1"
            class="hidden md:inline-block h-1.5 w-1.5 rounded-full bg-[#9C4E3A]/30"
            aria-hidden="true"
          ></span>
        </template>
        <div class="flex items-center gap-2 md:gap-3">
          <a
            :href="etsyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="link-fx btn-primary !bg-[#F37F61] !border-[#F37F61] hover:!bg-[#E56F54] hover:!border-[#E56F54] gap-1.5 px-3 md:px-4 text-sm md:text-base"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M6 8.5h12l-1.2 9H7.2L6 8.5z" />
              <path d="M9 8.5V8a3 3 0 0 1 6 0v.5" />
            </svg>
            <span class="hidden sm:inline">Shop on Etsy</span>
            <span class="sm:hidden">Etsy</span>
          </a>
          <button
            type="button"
            disabled
            class="btn-primary !bg-[#F37F61] !border-[#F37F61] inline-flex items-center gap-1.5 px-3 md:px-4 opacity-60 cursor-not-allowed text-sm md:text-base"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="9" cy="19" r="1.5" />
              <circle cx="17" cy="19" r="1.5" />
              <path d="M3 5h2l1.2 9h11.3l1.3-7H6.5" />
            </svg>
            Cart (Soon)
          </button>
        </div>
      </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useMainNavigation } from '../composables/useMainNavigation'
import { useSiteContent } from '../composables/useSiteContent'

const route = useRoute()
const navLinks = useMainNavigation()
const content = await useSiteContent()

const etsyUrl = computed(() => {
  return content.contact.etsyUrl || 'https://www.etsy.com/shop/artandabout'
})

const isActive = (path: string) => {
  const normalizedPath = String(path).split('#')[0]
  return route.path === normalizedPath || route.path.startsWith(`${normalizedPath}/`)
}
</script>
