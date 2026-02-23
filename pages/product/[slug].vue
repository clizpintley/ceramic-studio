<template>
  <div v-if="product">
    <div class="grid md:grid-cols-2 gap-8">
      <div id="product-gallery">
        <a :href="product.image" :data-pswp-width="1200" :data-pswp-height="900">
          <img :src="product.image" :alt="product.title" class="w-full h-96 object-cover rounded cursor-zoom-in" />
        </a>
      </div>
      <div>
        <h1 class="text-2xl font-bold text-yellow-700 font-display">{{ product.title }}</h1>
        <p class="text-gray-600 mt-2">{{ product.description }}</p>
        <div class="mt-6 flex items-center justify-between">
          <div class="text-2xl font-extrabold text-yellow-600">€{{ product.price }}</div>
          <button
            class="snipcart-add-item bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition font-medium"
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

const { products } = useProducts()
const route = useRoute()
const slug = route.params.slug as string
const product = products.find((p: any) => p.slug === slug)

if (product) {
  useHead({
    title: `${product.title} — Art and About`,
    meta: [
      { name: 'description', content: product.short },
      { property: 'og:title', content: product.title },
      { property: 'og:description', content: product.short },
      { property: 'og:image', content: product.image }
    ]
  })
}

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
