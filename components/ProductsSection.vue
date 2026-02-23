<template>
  <div ref="sectionRef" class="mb-16">
    <div class="mb-8 md:mb-10">
      <h2 class="section-title text-4xl font-bold text-[#9C4E3A] mb-2 font-display">My Work</h2>
      <span class="inline-block mb-3 text-xs font-semibold tracking-wide uppercase bg-[#FFF1B3] text-[#9C4E3A] px-3 py-1 rounded-full border border-[#FFCB06]">
        Curated Collections
      </span>
      <p class="text-gray-700 leading-relaxed">Browse my complete collection of hand-painted ceramics</p>
    </div>
    <nav class="mb-8 border-b border-[#FFE083]" aria-label="Product categories">
      <ul class="flex flex-wrap justify-center gap-x-6 gap-y-2 -mb-px">
        <li v-for="group in productGroups" :key="group.value">
          <a
            href="#"
            @click.prevent="activeGroup = group.value"
            class="inline-flex items-center px-1 pt-2 pb-3 text-lg transition border-b-2"
            :class="activeGroup === group.value
              ? 'text-[#9C4E3A] border-[#D75641] font-semibold'
              : 'text-[#9C4E3A]/75 border-transparent hover:text-[#9C4E3A] hover:border-[#FFCB06]/70'"
          >
            {{ group.label }}
          </a>
        </li>
      </ul>
    </nav>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(p, index) in visibleProducts"
        :key="p.id"
        class="product-reveal"
        :class="visible ? 'is-visible' : ''"
        :style="{ '--delay': `${120 + index * 110}ms` }"
      >
        <ProductCard :product="p" />
      </div>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

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

onMounted(() => {
  if (!sectionRef.value) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        visible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -8% 0px'
    }
  )

  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>
.product-reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 520ms ease, transform 520ms ease;
  transition-delay: var(--delay, 0ms);
}

.product-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .product-reveal,
  .product-reveal.is-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
