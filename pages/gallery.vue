<template>
  <section>
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-yellow-700 mb-2 font-display">My Products</h1>
      <p class="text-gray-700">Browse our complete collection of hand-painted ceramics</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProductCard 
        v-for="p in products" 
        :key="p.id" 
        :product="p" 
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'

const { products } = useProducts()

useHead({
  title: 'My Products — Art and About',
  meta: [
    { name: 'description', content: 'Browse the collection of handmade, hand-painted ceramics by Tea Pupkova. Unique mugs, bowls, and more.' },
    { property: 'og:title', content: 'My Products — Art and About' },
    { property: 'og:description', content: 'Handmade ceramics gallery and shop.' }
  ]
})
</script>
