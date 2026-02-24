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
        <span class="mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold" :class="availabilityClass(product.availability)">
          {{ availabilityLabel(product.availability) }}
        </span>
        <p class="text-gray-600 mt-2">{{ product.description }}</p>
        <div class="mt-6 flex items-center justify-between">
          <div class="text-2xl font-extrabold text-[#9C4E3A]">€{{ product.price }}</div>
          <button
            type="button"
            disabled
            class="bg-[#D75641] text-white px-4 py-2 rounded opacity-60 cursor-not-allowed font-medium"
          >
            Purchase coming soon
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
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://artandabout.vercel.app').replace(/\/+$/, '')

useHead({
  title: product ? `${product.title} | Art & About` : 'Product | Art & About',
  meta: [
    {
      name: 'description',
      content: product
        ? `${product.title} — ${product.short || product.description || 'Hand-painted ceramic piece by Tea Pupkova.'}`
        : 'Hand-painted ceramic piece by Tea Pupkova from Art & About.'
    },
    {
      property: 'og:title',
      content: product ? `${product.title} | Art & About` : 'Art & About Product'
    },
    {
      property: 'og:description',
      content: product
        ? `${product.short || product.description || 'Hand-painted ceramic piece by Tea Pupkova.'}`
        : 'Hand-painted ceramic piece by Tea Pupkova.'
    },
    {
      property: 'og:image',
      content: product ? `${siteUrl}${product.image}` : `${siteUrl}/images/logo.png`
    },
    {
      property: 'og:url',
      content: `${siteUrl}/product/${slug}`
    }
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/product/${slug}` }]
})

const availabilityLabel = (availability: string) => {
  return String(availability || 'in-stock')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const availabilityClass = (availability: string) => {
  if (availability === 'sold') {
    return 'bg-[#F3E9DD] text-[#9C4E3A] border border-[#FFE083]'
  }

  if (availability === 'made-to-order') {
    return 'bg-[#F8D6B4] text-[#9C4E3A] border border-[#FFE083]'
  }

  if (availability === 'limited-edition') {
    return 'bg-[#FFF1B3] text-[#9C4E3A] border border-[#FFCB06]'
  }

  return 'bg-[#FFF8DC] text-[#9C4E3A] border border-[#FFE083]'
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
