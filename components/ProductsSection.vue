<template>
  <div class="mb-16">
    <div class="mb-8">
      <h2 class="text-4xl font-bold text-[#9C4E3A] mb-2 font-display">My Work</h2>
      <span class="inline-block mb-3 text-xs font-semibold tracking-wide uppercase bg-[#FFF1B3] text-[#9C4E3A] px-3 py-1 rounded-full border border-[#FFCB06]">
        Curated Collections
      </span>
      <p class="text-gray-700">Browse my complete collection of hand-painted ceramics</p>
    </div>
    <div class="mb-8 flex flex-wrap gap-3">
      <button
        v-for="group in productGroups"
        :key="group.value"
        type="button"
        @click="activeGroup = group.value"
        class="link-fx px-4 py-2 rounded-lg border transition font-medium"
        :class="activeGroup === group.value ? 'text-gray-800' : 'text-[#9C4E3A] hover:bg-[#FFF1B3]'"
        :style="activeGroup === group.value
          ? { backgroundColor: '#FFCB06', borderColor: '#E6B800' }
          : { backgroundColor: '#FFF8DC', borderColor: '#FFE083' }"
      >
        {{ group.label }}
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
    </div>
    <p v-if="filteredProducts.length === 0" class="text-gray-600 mt-6">
      No products found in this category.
    </p>
    <div class="mt-4 text-sm text-gray-600">
      Showing {{ filteredProducts.length }} product<span v-if="filteredProducts.length !== 1">s</span> in {{ activeLabel }}.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProducts } from '../composables/useProducts'

const { products } = useProducts()

const productGroups = [
  { label: 'Drinkware', value: 'drinkware' },
  { label: 'Tableware', value: 'tableware' },
  { label: 'Decor', value: 'decor' },
  { label: 'Tote Bags', value: 'tote-bags' }
]

const activeGroup = ref('drinkware')

const filteredProducts = computed(() => {
  return products.filter((product: any) => product.category === activeGroup.value)
})

const activeLabel = computed(() => {
  const selected = productGroups.find((group) => group.value === activeGroup.value)
  return selected?.label ?? 'Products'
})
</script>
