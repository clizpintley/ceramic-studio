import { $fetch } from 'ofetch'
import { useState } from 'nuxt/app'

export type Product = {
  id: string
  slug: string
  category: string
  title: string
  short: string
  description: string
  price: number
  image: string
  featured: boolean
  availability: 'in-stock' | 'made-to-order' | 'sold' | 'limited-edition'
}

export const useProducts = async () => {
  const productsState = useState<Product[]>('products-data', () => [])
  const fallbackProducts: Product[] = []

  try {
    const response = await $fetch<{ products: Product[] }>('/api/content/products', {
      query: { _ts: Date.now() }
    })
    productsState.value = (response.products ?? []).map((product) => ({
      ...product,
      price: Number(product.price),
      featured: Boolean(product.featured),
      availability: ['in-stock', 'made-to-order', 'sold', 'limited-edition'].includes(String(product.availability))
        ? (product.availability as Product['availability'])
        : 'in-stock'
    })).sort((a, b) => Number(b.featured) - Number(a.featured))
  } catch {
    if (!productsState.value.length) {
      productsState.value = fallbackProducts
    }
  }

  return { products: productsState.value ?? fallbackProducts }
}
