<template>
  <div class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FFCB06] hover:-translate-y-0.5">
    <div class="relative overflow-hidden bg-[#F8D6B4] h-64">
      <div class="pointer-events-none absolute inset-0 bg-[#FFCB06]/0 group-hover:bg-[#FFCB06]/10 transition-colors duration-300"></div>
      <nuxt-link :to="`/product/${product.slug}`" class="block w-full h-full">
        <img 
          :src="product.image" 
          :alt="product.title" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </nuxt-link>
    </div>
    <div class="p-6">
      <h3 class="font-bold text-lg text-[#9C4E3A] group-hover:text-[#9C4E3A] transition">{{ product.title }}</h3>
      <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ product.short }}</p>
      <div class="mt-4 pt-4 border-t border-[#FFE083] flex items-center justify-between">
        <div class="text-xl font-bold text-[#9C4E3A]">€{{ product.price.toFixed(2) }}</div>
        <button
          class="snipcart-add-item bg-[#D75641] text-white px-4 py-2 rounded-lg hover:bg-[#C54D39] transition font-medium text-sm"
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
