<template>
  <section>
    <!-- Hero Section -->
    <div class="mb-16 py-16 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 rounded-3xl px-8">
      <div class="text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold text-yellow-700 mb-4 font-display">Hand-painted Ceramics</h1>
        <p class="text-xl text-gray-700 mb-8">Unique, functional art for your home.</p>
        <p class="text-gray-600 max-w-2xl mx-auto mb-8">Each piece is lovingly handcrafted and hand-painted with care. Discover our collection of beautiful, one-of-a-kind ceramic pieces.</p>
        <nuxt-link 
          to="/gallery"
          class="inline-block bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition font-semibold"
        >
          Explore Gallery
        </nuxt-link>
      </div>
    </div>

    <!-- Featured Section -->
    <div class="mb-12">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-yellow-600 font-display">Featured Pieces</h2>
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

const { products } = useProducts()
const featured = products
</script>
