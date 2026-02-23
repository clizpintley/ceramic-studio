<template>
  <div class="mb-10 md:mb-16">
    <div v-if="slides.length">
      <div class="relative min-h-[500px] md:min-h-[560px] rounded-3xl overflow-hidden">
        <img
          :src="activeSlide.image"
          :alt="activeSlide.title"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-[#F8D6B4]/16"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#9C4E3A]/12 via-transparent to-[#F8D6B4]/10"></div>
      </div>

      <div class="mt-3 rounded-xl border border-[#FFE083] bg-[#FFF8EE]/92 px-2.5 py-2.5 md:px-3 md:py-3">
        <div class="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            @click="prevSlide"
            class="link-fx h-9 w-9 rounded-full border border-[#FFCB06] bg-[#FFF8EE] text-[#9C4E3A] text-sm font-semibold hover:bg-[#FFF1B3] transition"
            aria-label="Previous slide"
          >
            ‹
          </button>

          <div class="min-w-0 flex-1 px-1">
            <p class="truncate text-center text-[#9C4E3A] text-sm md:text-base font-semibold">{{ activeSlide.title }}</p>
            <div class="mt-1 flex items-center justify-center gap-2">
              <p class="text-[11px] text-[#9C4E3A]/70">{{ activeIndex + 1 }} / {{ slides.length }}</p>
              <div class="flex items-center gap-1.5">
                <button
                  v-for="(slide, index) in slides"
                  :key="slide.id"
                  type="button"
                  @click="goToSlide(index)"
                  class="h-2 w-2 rounded-full transition"
                  :class="index === activeIndex ? 'bg-[#D75641] scale-110' : 'bg-[#9C4E3A]/30 hover:bg-[#9C4E3A]/55'"
                  :aria-label="`Go to slide ${index + 1}`"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="nextSlide"
            class="link-fx h-9 w-9 rounded-full border border-[#FFCB06] bg-[#FFF8EE] text-[#9C4E3A] text-sm font-semibold hover:bg-[#FFF1B3] transition"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        <div class="mt-2 flex items-center justify-center gap-2 text-sm">
          <nuxt-link
            to="/gallery"
            class="link-fx inline-flex items-center rounded-full border border-[#FFCB06] bg-[#FFF8EE] text-[#9C4E3A] px-3.5 py-1.5 font-semibold hover:bg-[#FFF1B3] transition"
          >
            Browse Gallery
          </nuxt-link>
          <nuxt-link
            :to="`/product/${activeSlide.slug}`"
            class="link-fx inline-flex items-center rounded-full bg-[#D75641] text-white px-3.5 py-1.5 font-semibold hover:bg-[#C54D39] transition"
          >
            View Piece
          </nuxt-link>
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
const randomTimer = ref<ReturnType<typeof setInterval> | null>(null)
const randomIntervalMs = 4200

const activeSlide = computed(() => slides[activeIndex.value])

const nextSlide = () => {
  if (!slides.length) return
  activeIndex.value = (activeIndex.value + 1) % slides.length
}

const prevSlide = () => {
  if (!slides.length) return
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
  if (!slides.length || index < 0 || index >= slides.length || index === activeIndex.value) return
  activeIndex.value = index
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
