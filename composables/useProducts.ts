import { $fetch } from 'ofetch'

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

let cachedProducts: Product[] | null = null
let productsLoaded = false

export const useProducts = async () => {
  const fallbackProducts: Product[] = []

  if (!productsLoaded) {
    try {
      const response = await $fetch<{ products: Product[] }>('/api/content/products')
      cachedProducts = (response.products ?? []).map((product) => ({
        ...product,
        price: Number(product.price)
      }))
    } catch {
      cachedProducts = fallbackProducts
    } finally {
      productsLoaded = true
    }
  }

  return { products: cachedProducts ?? fallbackProducts }
}
