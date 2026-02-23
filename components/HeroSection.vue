<template>
  <div class="relative mb-10 md:mb-16 rounded-3xl overflow-hidden">
    <div v-if="slides.length" class="relative min-h-[500px] md:min-h-[560px]">
      <img
        :src="activeSlide.image"
        :alt="activeSlide.title"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-[#F8D6B4]/75"></div>

      <div class="relative z-10 h-full px-5 md:px-8 py-10 md:py-14 flex flex-col justify-between">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#9C4E3A] mb-4 font-display">
            {{ activeSlide.isIntro ? "Hello, I'm Tea Pupkova" : 'Product Gallery' }}
          </h1>
          <p class="text-lg md:text-xl text-gray-700">
            {{ activeSlide.isIntro ? 'I create hand-painted ceramics that turn everyday moments into art.' : 'Browse featured pieces from my hand-painted collection.' }}
          </p>
        </div>

        <div class="mx-auto w-full max-w-2xl text-center rounded-2xl bg-[#FFF8EE]/85 p-5 md:p-7">
          <h2 v-if="!activeSlide.isIntro" class="text-2xl md:text-3xl font-bold text-[#9C4E3A] font-display mb-2">{{ activeSlide.title }}</h2>
          <p class="text-gray-700 mb-5">{{ activeSlide.short }}</p>
          <p v-if="activeSlide.description" class="text-gray-600 text-base md:text-lg mb-5">{{ activeSlide.description }}</p>

          <div v-if="activeSlide.isIntro" class="flex items-center justify-center gap-3">
            <nuxt-link
              to="/gallery"
              class="inline-block bg-[#D75641] text-white px-6 py-2.5 rounded-lg hover:bg-[#C54D39] transition font-semibold"
            >
              Explore My Work
            </nuxt-link>
          </div>

          <div v-else class="flex items-center justify-center gap-3">
            <nuxt-link
              :to="`/product/${activeSlide.slug}`"
              class="inline-block bg-[#D75641] text-white px-6 py-2.5 rounded-lg hover:bg-[#C54D39] transition font-semibold"
            >
              View Product
            </nuxt-link>
            <nuxt-link
              to="/gallery"
              class="inline-block bg-[#FFF1B3] text-[#9C4E3A] border border-[#FFCB06] px-6 py-2.5 rounded-lg hover:bg-[#FFE487] transition font-semibold"
            >
              Browse All
            </nuxt-link>
          </div>
        </div>

        <div class="flex items-center justify-between mt-6">
          <button
            type="button"
            @click="prevSlide"
            class="link-fx bg-[#FFF8EE]/90 text-[#9C4E3A] border border-[#FFCB06] rounded-full px-4 py-2 font-semibold"
            aria-label="Previous slide"
          >
            Prev
          </button>

          <div class="text-sm md:text-base font-semibold text-[#9C4E3A] bg-[#FFF8EE]/90 border border-[#FFCB06] rounded-full px-4 py-2">
            {{ activeIndex + 1 }} / {{ slides.length }}
          </div>

          <button
            type="button"
            @click="nextSlide"
            class="link-fx bg-[#FFF8EE]/90 text-[#9C4E3A] border border-[#FFCB06] rounded-full px-4 py-2 font-semibold"
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <div v-else class="py-12 px-5 md:px-8 text-center bg-[#F8D6B4]/75">
      <h1 class="text-3xl md:text-4xl font-extrabold text-[#9C4E3A] mb-3 font-display">Product Gallery</h1>
      <p class="text-gray-700">Products will appear here soon.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useProducts } from '../composables/useProducts'

const { products } = useProducts()
const introSlide = {
  id: 'intro-slide',
  image: '/images/tea2.jpeg',
  title: "Hello, I'm Tea Pupkova",
  short: 'From mugs and teapots to bowls and custom pieces, I shape functional pottery and illustrate each surface by hand—often inspired by stories, characters, and warm home rituals.',
  description: 'Every piece is made to be used, loved, and to add personality to daily life.',
  isIntro: true
}

const slides = [introSlide, ...products.map((product: any) => ({ ...product, isIntro: false }))]
const activeIndex = ref(0)
const slideIntervalMs = 4500
let timer: ReturnType<typeof setInterval> | null = null

const activeSlide = computed(() => slides[activeIndex.value])

const nextSlide = () => {
  if (!slides.length) return
  activeIndex.value = (activeIndex.value + 1) % slides.length
}

const prevSlide = () => {
  if (!slides.length) return
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length
}

onMounted(() => {
  if (!slides.length) return
  timer = setInterval(() => {
    nextSlide()
  }, slideIntervalMs)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>
