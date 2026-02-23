import productsData from '~/data/products.json'

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

export const useProducts = () => {
  const products = ((productsData as { products: Product[] }).products ?? []).map((product) => ({
    ...product,
    price: Number(product.price)
  }))

  return { products }
}
