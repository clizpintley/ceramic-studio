<template>
  <section>
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-amber-900 mb-2">Our Gallery</h1>
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
</script>
