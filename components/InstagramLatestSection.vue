<template>
  <div class="mb-16">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
      <h2 class="section-title text-4xl font-bold text-[#9C4E3A] font-display">{{ content.instagram.heading }}</h2>
      <a
        :href="content.instagram.profileUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-secondary inline-flex items-center gap-2"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
        </svg>
        <span>Visit Instagram</span>
      </a>
    </div>

    <p class="text-gray-700 leading-relaxed mb-8">{{ content.instagram.intro }}</p>

    <div v-if="enabledPosts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="(post, index) in enabledPosts"
        :key="`ig-post-${index}`"
        class="surface-card p-3"
      >
        <iframe
          :src="post.embedUrl"
          class="w-full h-[430px] rounded-xl border border-[#FFE083]"
          loading="lazy"
          allowtransparency="true"
          title="Instagram post"
        ></iframe>
        <p v-if="post.caption" class="mt-2 text-sm text-gray-700">{{ post.caption }}</p>
      </article>
    </div>

    <p v-else class="text-gray-600">Latest posts will appear here soon.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const content = await useSiteContent()

const toEmbedUrl = (url: string) => {
  const raw = String(url || '').trim()
  if (!raw) {
    return ''
  }

  if (raw.includes('/embed')) {
    return raw
  }

  try {
    const parsed = new URL(raw)
    const host = parsed.hostname.replace(/^www\./, '')
    if (host !== 'instagram.com') {
      return raw
    }

    const path = parsed.pathname.endsWith('/') ? parsed.pathname : `${parsed.pathname}/`
    if (path.startsWith('/p/') || path.startsWith('/reel/') || path.startsWith('/tv/')) {
      return `https://www.instagram.com${path}embed`
    }

    return raw
  } catch {
    return raw
  }
}

const enabledPosts = computed(() => {
  return (content.instagram?.posts || [])
    .filter((post) => post.enabled !== false && post.url)
    .map((post) => ({
      ...post,
      embedUrl: toEmbedUrl(post.url)
    }))
    .filter((post) => post.embedUrl)
})
</script>
