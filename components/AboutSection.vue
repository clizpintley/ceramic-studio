<template>
  <div ref="sectionRef" class="mb-16">
    <h2 class="text-4xl font-bold text-[#9C4E3A] mb-6 font-display">{{ content.about.heading }}</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div class="about-letter rounded-2xl px-6 py-7 md:px-8 md:py-9">
        <div class="about-letter-body">
          <div class="about-pen" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20l-8 2 2-8L16.8 3.2a2 2 0 0 1 2.8 0l1.2 1.2a2 2 0 0 1 0 2.8z" />
              <path d="M14.5 5.5 18.5 9.5" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p
              v-for="(paragraph, index) in content.about.paragraphs"
              :key="`${index}-${paragraph.slice(0, 12)}`"
              class="text-xl md:text-2xl text-gray-700 about-typing"
              :class="index !== content.about.paragraphs.length - 1 ? 'mb-5' : ''"
            >
              {{ displayedParagraphs[index] }}
            </p>
          </div>
        </div>
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
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const content = await useSiteContent()
const displayedParagraphs = ref(content.about.paragraphs.map(() => ''))
const sectionRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null
let typingTimeout: ReturnType<typeof setTimeout> | null = null
const reduceMotion = ref(false)
const hasTyped = ref(false)
const typingIntervalMs = 4
const paragraphPauseMs = 30

const clearTypingTimeout = () => {
  if (!typingTimeout) return
  clearTimeout(typingTimeout)
  typingTimeout = null
}

const showAllParagraphs = () => {
  displayedParagraphs.value = [...content.about.paragraphs]
}

const typeParagraph = (paragraphIndex: number, charIndex: number) => {
  if (paragraphIndex >= content.about.paragraphs.length) return

  const fullParagraph = content.about.paragraphs[paragraphIndex]
  displayedParagraphs.value[paragraphIndex] = fullParagraph.slice(0, charIndex)

  if (charIndex <= fullParagraph.length) {
    typingTimeout = setTimeout(() => {
      typeParagraph(paragraphIndex, charIndex + 1)
    }, typingIntervalMs)
    return
  }

  if (paragraphIndex < content.about.paragraphs.length - 1) {
    typingTimeout = setTimeout(() => {
      typeParagraph(paragraphIndex + 1, 1)
    }, paragraphPauseMs)
  }
}

const startTyping = () => {
  if (hasTyped.value) return
  hasTyped.value = true
  typeParagraph(0, 1)
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion.value) {
    showAllParagraphs()
    return
  }

  if (!sectionRef.value) {
    startTyping()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startTyping()
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
  clearTypingTimeout()
})
</script>

<style scoped>
.about-letter {
  background: linear-gradient(180deg, #FFF8EE 0%, #FFF3DC 100%);
  border: 1px solid rgba(255, 224, 131, 0.9);
  box-shadow: 0 10px 22px rgba(156, 78, 58, 0.08);
}

.about-letter-body {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.about-pen {
  width: 24px;
  height: 24px;
  margin-top: 8px;
  flex: 0 0 auto;
  color: rgba(156, 78, 58, 0.7);
  transform: rotate(-10deg);
  pointer-events: none;
}

.about-typing {
  min-height: 1.7em;
  font-family: 'Caveat', cursive;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.01em;
}
</style>
