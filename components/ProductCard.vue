<template>
  <div class="group surface-card overflow-hidden transition-all duration-300 hover:border-[#FFCB06] hover:-translate-y-0.5">
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
      <div class="mb-2 flex flex-wrap items-center gap-2">
        <h3 class="section-title font-bold text-xl text-[#9C4E3A] group-hover:text-[#9C4E3A] transition leading-tight">{{ product.title }}</h3>
        <span
          v-if="product.featured"
          class="inline-flex items-center rounded-full border border-[#FFCB06] bg-[#FFF1B3] px-2 py-0.5 text-xs font-semibold text-[#9C4E3A]"
        >
          Featured
        </span>
      </div>
      <p class="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">{{ product.short }}</p>
      <div class="mt-4 pt-4 border-t border-[#FFE083] flex items-center justify-between">
        <div>
          <div class="text-xl font-bold text-[#9C4E3A]">€{{ product.price.toFixed(2) }}</div>
          <span class="mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold" :class="availabilityClass(product.availability)">
            {{ availabilityLabel(product.availability) }}
          </span>
        </div>
        <button
          type="button"
          disabled
          class="btn-primary px-4 text-sm opacity-60 cursor-not-allowed"
        >
          Coming soon
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Availability = 'in-stock' | 'made-to-order' | 'sold' | 'limited-edition'

defineProps<{ product: any }>()

const availabilityLabel = (availability: Availability) => {
  return availability
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const availabilityClass = (availability: Availability) => {
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
</script>
