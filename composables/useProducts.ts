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
}

export const useProducts = async () => {
  const productsState = useState<Product[]>('products-data', () => [])
  const productsLoadedState = useState<boolean>('products-loaded', () => false)
  const fallbackProducts: Product[] = []

  const shouldFetch = !productsLoadedState.value || productsState.value.length === 0

  if (shouldFetch) {
    try {
      const response = await $fetch<{ products: Product[] }>('/api/content/products')
      productsState.value = (response.products ?? []).map((product) => ({
        ...product,
        price: Number(product.price)
      }))
    } catch {
      if (!productsState.value.length) {
        productsState.value = fallbackProducts
      }
    } finally {
      productsLoadedState.value = true
    }
  }

  return { products: productsState.value ?? fallbackProducts }
}
