<template>
  <div class="relative mb-10 md:mb-16 rounded-3xl overflow-hidden">
    <div v-if="slides.length" class="relative min-h-[500px] md:min-h-[560px]">
      <img
        :src="activeSlide.image"
        :alt="activeSlide.title"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"></div>

      <div class="absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-4 md:px-6 pointer-events-none">
        <button
          type="button"
          @click="prevSlide"
          class="pointer-events-auto link-fx h-10 w-10 md:h-11 md:w-11 rounded-full border border-[#FFCB06] bg-[#FFF8EE]/90 text-[#9C4E3A] text-sm font-semibold hover:bg-[#FFF1B3] transition"
          aria-label="Previous slide"
        >
          ‹
        </button>

        <button
          type="button"
          @click="nextSlide"
          class="pointer-events-auto link-fx h-10 w-10 md:h-11 md:w-11 rounded-full border border-[#FFCB06] bg-[#FFF8EE]/90 text-[#9C4E3A] text-sm font-semibold hover:bg-[#FFF1B3] transition"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div class="relative z-10 h-full px-5 md:px-8 py-6 md:py-8 flex flex-col justify-end">
        <div class="w-full rounded-2xl border border-[#FFCB06]/65 bg-[#FFF8EE]/82 backdrop-blur-sm p-3 md:p-4 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 md:gap-4 min-w-0">
            <button
              type="button"
              @click="goToGallery"
              class="link-fx bg-[#FFF8EE] text-[#9C4E3A] border border-[#FFCB06] rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap"
            >
              Browse Gallery
            </button>

            <div class="text-sm font-semibold text-[#9C4E3A] whitespace-nowrap">
              {{ activeIndex + 1 }} / {{ slides.length }}
            </div>
          </div>

          <div class="flex items-center gap-2">
            <nuxt-link
              :to="`/product/${activeSlide.slug}`"
              class="inline-flex items-center rounded-full bg-[#D75641] text-white px-4 py-2 text-sm font-semibold hover:bg-[#C54D39] transition whitespace-nowrap"
            >
              View Piece
            </nuxt-link>
          </div>
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

const { products } = await useProducts()
const featuredProducts = products.filter((product: any) => Boolean(product.featured) && Boolean(product.image))
const fallbackProducts = products.filter((product: any) => Boolean(product.image))
const slides = (featuredProducts.length ? featuredProducts : fallbackProducts).map((product: any) => ({
  id: product.id,
  slug: product.slug,
  title: product.title,
  image: product.image
}))

const activeIndex = ref(0)
const history = ref<number[]>([])
const randomTimer = ref<ReturnType<typeof setInterval> | null>(null)
const randomIntervalMs = 4200

const activeSlide = computed(() => slides[activeIndex.value])

const pickRandomIndex = () => {
  if (slides.length <= 1) return activeIndex.value
  let nextIndex = activeIndex.value
  while (nextIndex === activeIndex.value) {
    nextIndex = Math.floor(Math.random() * slides.length)
  }
  return nextIndex
}

const nextSlide = () => {
  if (!slides.length) return
  history.value.push(activeIndex.value)
  activeIndex.value = pickRandomIndex()
}

const prevSlide = () => {
  if (!slides.length) return
  const previousIndex = history.value.pop()
  if (previousIndex === undefined) return
  activeIndex.value = previousIndex
}

const goToGallery = () => {
  return navigateTo('/gallery')
}

onMounted(() => {
  if (slides.length <= 1) return
  randomTimer.value = setInterval(() => {
    nextSlide()
  }, randomIntervalMs)
})

onBeforeUnmount(() => {
  if (!randomTimer.value) return
  clearInterval(randomTimer.value)
  randomTimer.value = null
})
</script>
