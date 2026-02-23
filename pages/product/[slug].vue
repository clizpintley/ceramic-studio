<template>
  <div v-if="product">
    <div class="grid md:grid-cols-2 gap-8">
      <div id="product-gallery">
        <a :href="product.image" :data-pswp-width="1200" :data-pswp-height="900">
          <img :src="product.image" :alt="product.title" class="w-full h-96 object-cover rounded cursor-zoom-in" />
        </a>
      </div>
      <div>
        <h1 class="text-2xl font-bold text-[#9C4E3A] font-display">{{ product.title }}</h1>
        <p class="text-gray-600 mt-2">{{ product.description }}</p>
        <div class="mt-6 flex items-center justify-between">
          <div class="text-2xl font-extrabold text-[#9C4E3A]">€{{ product.price }}</div>
          <button
            class="snipcart-add-item bg-[#D75641] text-white px-4 py-2 rounded hover:bg-[#C54D39] transition font-medium"
            :data-item-id="product.id"
            :data-item-price="product.price"
            :data-item-url="`/product/${product.slug}`"
            :data-item-name="product.title"
            :data-item-description="product.short"
            :data-item-image="product.image"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import 'photoswipe/style.css'
import { useProducts } from '../../composables/useProducts'

const { products } = await useProducts()
const route = useRoute()
const slug = route.params.slug as string
const product = products.find((p: any) => p.slug === slug)

onMounted(async () => {
  if (!product) return
  try {
    const PhotoSwipeLightbox = (await import('photoswipe/lightbox')).default
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#product-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe')
    })
    lightbox.init()
  } catch (e) {
    // fallback: do nothing
    console.warn('PhotoSwipe failed to load', e)
  }
})
</script>
