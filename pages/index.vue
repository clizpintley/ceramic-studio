<template>
  <section>
    <!-- Hero Section -->
    <div class="mb-16 py-16 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-3xl px-8">
      <div class="text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold text-amber-900 mb-4">Hand-painted Ceramics</h1>
        <p class="text-xl text-gray-700 mb-8">Unique, functional art for your home.</p>
        <p class="text-gray-600 max-w-2xl mx-auto mb-8">Each piece is lovingly handcrafted and hand-painted with care. Discover our collection of beautiful, one-of-a-kind ceramic pieces.</p>
        <nuxt-link 
          to="/gallery"
          class="inline-block bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition font-semibold"
        >
          Explore Gallery
        </nuxt-link>
      </div>
    </div>

    <!-- Featured Section -->
    <div class="mb-12">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-amber-900">Featured Pieces</h2>
          <p class="text-gray-600 mt-2">Handpicked selections from our collection</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'

const products = [
  {
    id: 'ceramic-blue-mug',
    slug: 'blue-mug',
    title: 'Blue Meadow Mug',
    short: 'Cozy mug with blue meadow motif.',
    description: 'A comfortable 12oz mug hand-painted with a meadow scene. Lead-free glaze.',
    price: 28.00,
    image: '/images/blue-mug.svg'
  },
  {
    id: 'ceramic-rose-bowl',
    slug: 'rose-bowl',
    title: 'Hand-painted Rose Bowl',
    short: 'A delicate bowl hand-painted with roses.',
    description: 'This bowl is thrown and hand-painted with underglaze roses and finished with a glossy clear glaze. Dishwasher safe.',
    price: 45.00,
    image: '/images/rose-bowl.svg'
  }
]
const featured = products
</script>
