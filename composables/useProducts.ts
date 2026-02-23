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
  const fallbackProducts: Product[] = []

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
  }

  return { products: productsState.value ?? fallbackProducts }
}
