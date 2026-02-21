<template>
  <div class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div class="relative overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50 h-64">
      <nuxt-link :to="`/product/${product.slug}`" class="block w-full h-full">
        <img 
          :src="product.image" 
          alt="" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </nuxt-link>
    </div>
    <div class="p-6">
      <h3 class="font-bold text-lg text-amber-900 group-hover:text-amber-700 transition">{{ product.title }}</h3>
      <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ product.short }}</p>
      <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div class="text-xl font-bold text-amber-700">${{ product.price.toFixed(2) }}</div>
        <button
          class="snipcart-add-item bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition font-medium text-sm"
          :data-item-id="product.id"
          :data-item-price="product.price"
          :data-item-url="`/product/${product.slug}`"
          :data-item-name="product.title"
          :data-item-description="product.short"
          :data-item-image="product.image"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ product: any }>()
</script>
