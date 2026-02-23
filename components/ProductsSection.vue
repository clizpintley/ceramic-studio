<template>
  <div class="mb-16">
    <div class="mb-8 md:mb-10">
      <h2 class="section-title text-4xl font-bold text-[#9C4E3A] mb-2 font-display">My Work</h2>
      <span class="inline-block mb-3 text-xs font-semibold tracking-wide uppercase bg-[#FFF1B3] text-[#9C4E3A] px-3 py-1 rounded-full border border-[#FFCB06]">
        Curated Collections
      </span>
      <p class="text-gray-700 leading-relaxed">Browse my complete collection of hand-painted ceramics</p>
    </div>
    <div class="mb-8 flex flex-wrap gap-3">
      <button
        v-for="group in productGroups"
        :key="group.value"
        type="button"
        @click="activeGroup = group.value"
        class="link-fx px-4 py-2 rounded-lg border transition font-medium"
        :class="activeGroup === group.value ? 'text-gray-800 shadow-sm' : 'text-[#9C4E3A] hover:bg-[#FFF1B3]'"
        :style="activeGroup === group.value
          ? { backgroundColor: '#FFCB06', borderColor: '#E6B800' }
          : { backgroundColor: '#FFF8DC', borderColor: '#FFE083' }"
      >
        {{ group.label }}
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProductCard v-for="p in visibleProducts" :key="p.id" :product="p" />
    </div>
    <p v-if="visibleProducts.length === 0" class="text-gray-600 mt-6">
      No products found in this category.
    </p>
    <div v-if="showMoreLink && hasMoreProducts" class="mt-6">
      <nuxt-link to="/gallery" class="link-fx inline-flex items-center gap-2 text-[#9C4E3A] font-semibold hover:text-[#D75641]">
        Show more in gallery
        <span aria-hidden="true">→</span>
      </nuxt-link>
    </div>
    <div class="mt-4 text-sm text-gray-600">
      Showing {{ visibleProducts.length }} of {{ filteredProducts.length }} product<span v-if="filteredProducts.length !== 1">s</span> in {{ activeLabel }}.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProducts } from '../composables/useProducts'

const props = withDefaults(defineProps<{
  maxItems?: number
  showMoreLink?: boolean
}>(), {
  maxItems: 0,
  showMoreLink: false
})

const { products } = await useProducts()

const formatCategoryLabel = (category: string) => {
  return category
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const productGroups = computed(() => {
  const featuredCount = products.filter((product: any) => Boolean(product.featured)).length
  const uniqueCategories = Array.from(
    new Set(
      products
        .map((product: any) => String(product.category || '').trim())
        .filter(Boolean)
    )
  )

  const categoryGroups = uniqueCategories.map((category) => ({
    label: formatCategoryLabel(category),
    value: category
  }))

  if (featuredCount > 0) {
    return [{ label: `Featured (${featuredCount})`, value: 'featured' }, ...categoryGroups]
  }

  return categoryGroups
})

const activeGroup = ref(productGroups.value[0]?.value ?? '')

const filteredProducts = computed(() => {
  if (activeGroup.value === 'featured') {
    return products.filter((product: any) => Boolean(product.featured))
  }

  if (!activeGroup.value) {
    return products
  }
  return products.filter((product: any) => product.category === activeGroup.value)
})

const visibleProducts = computed(() => {
  if (!props.maxItems || props.maxItems <= 0) {
    return filteredProducts.value
  }
  return filteredProducts.value.slice(0, props.maxItems)
})

const hasMoreProducts = computed(() => {
  return Boolean(props.maxItems && filteredProducts.value.length > props.maxItems)
})

const activeLabel = computed(() => {
  const selected = productGroups.value.find((group) => group.value === activeGroup.value)
  return selected?.label ?? 'Products'
})
</script>
