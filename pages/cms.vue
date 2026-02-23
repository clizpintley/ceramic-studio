<template>
  <section class="max-w-6xl mx-auto">
    <div class="mb-6">
      <h1 class="text-3xl md:text-4xl font-bold text-[#9C4E3A] font-display">Product CMS</h1>
      <p class="text-gray-700 mt-2">Create, edit, and remove products directly from this admin page.</p>
    </div>

    <div v-if="!isAuthenticated" class="max-w-md rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-6">
      <label class="block text-sm font-semibold text-[#9C4E3A] mb-2">CMS Password</label>
      <input
        v-model="passwordInput"
        type="password"
        class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"
        placeholder="Enter CMS password"
        @keyup.enter="login"
      />
      <button
        type="button"
        class="mt-4 bg-[#D75641] text-white px-4 py-2 rounded-lg hover:bg-[#C54D39] transition font-medium"
        :disabled="isLoading"
        @click="login"
      >
        {{ isLoading ? 'Signing in...' : 'Sign in' }}
      </button>
      <p v-if="errorMessage" class="text-red-600 mt-3 text-sm">{{ errorMessage }}</p>
    </div>

    <div v-else>
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="bg-[#FFCB06] text-gray-800 px-4 py-2 rounded-lg border border-[#E6B800] font-medium"
          @click="addProduct"
        >
          Add Product
        </button>
        <button
          type="button"
          class="bg-[#D75641] text-white px-4 py-2 rounded-lg hover:bg-[#C54D39] transition font-medium"
          :disabled="isLoading"
          @click="saveProducts"
        >
          {{ isLoading ? 'Saving...' : 'Save All Changes' }}
        </button>
        <button
          type="button"
          class="bg-white text-[#9C4E3A] px-4 py-2 rounded-lg border border-[#FFE083] font-medium"
          :disabled="isLoading"
          @click="logout"
        >
          Sign out
        </button>
      </div>

      <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <label class="block md:col-span-2">
          <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Search products</span>
          <input
            v-model="searchQuery"
            class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"
            placeholder="Search by title, slug, id, short description"
          />
        </label>

        <label class="block">
          <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Filter by category</span>
          <select v-model="categoryFilter" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white">
            <option value="all">All categories</option>
            <option value="drinkware">Drinkware</option>
            <option value="tableware">Tableware</option>
            <option value="decor">Decor</option>
            <option value="tote-bags">Tote Bags</option>
          </select>
        </label>
      </div>

      <p class="text-sm text-gray-700 mb-3">Showing {{ filteredProducts.length }} of {{ products.length }} products</p>

      <p v-if="successMessage" class="text-green-700 text-sm mb-3">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-600 text-sm mb-3">{{ errorMessage }}</p>

      <div class="space-y-4">
        <article
          v-for="item in filteredProducts"
          :key="`${item.product.id}-${item.index}`"
          class="rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-[#9C4E3A]">Product #{{ item.index + 1 }}</h2>
            <button
              type="button"
              class="text-sm px-3 py-1.5 rounded-lg bg-[#F37F61] text-white hover:bg-[#E56F54] transition"
              @click="removeProduct(item.index)"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label class="block">
              <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">ID</span>
              <input
                v-model="item.product.id"
                class="w-full rounded-lg border px-3 py-2 bg-white"
                :class="hasFieldError(item.index, 'id') ? 'border-red-500' : 'border-[#FFE083]'"
              />
            </label>

            <label class="block">
              <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Slug</span>
              <input
                v-model="item.product.slug"
                class="w-full rounded-lg border px-3 py-2 bg-white"
                :class="hasFieldError(item.index, 'slug') ? 'border-red-500' : 'border-[#FFE083]'"
              />
            </label>

            <label class="block">
              <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Title</span>
              <input
                v-model="item.product.title"
                class="w-full rounded-lg border px-3 py-2 bg-white"
                :class="hasFieldError(item.index, 'title') ? 'border-red-500' : 'border-[#FFE083]'"
              />
            </label>

            <label class="block">
              <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Category</span>
              <select v-model="item.product.category" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white">
                <option value="drinkware">Drinkware</option>
                <option value="tableware">Tableware</option>
                <option value="decor">Decor</option>
                <option value="tote-bags">Tote Bags</option>
              </select>
            </label>

            <label class="block md:col-span-2">
              <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Short Description</span>
              <input v-model="item.product.short" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
            </label>

            <label class="block md:col-span-2">
              <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Description</span>
              <textarea v-model="item.product.description" rows="3" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"></textarea>
            </label>

            <label class="block">
              <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Price</span>
              <input
                v-model.number="item.product.price"
                type="number"
                min="0"
                step="0.01"
                class="w-full rounded-lg border px-3 py-2 bg-white"
                :class="hasFieldError(item.index, 'price') ? 'border-red-500' : 'border-[#FFE083]'"
              />
            </label>

            <label class="block md:col-span-2">
              <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Product Image</span>
              <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
                <select v-model="item.product.image" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white">
                  <option value="">Select image</option>
                  <option v-for="imagePath in availableImages" :key="imagePath" :value="imagePath">
                    {{ imagePath }}
                  </option>
                </select>
                <div class="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    class="w-full text-sm"
                    @change="onImageFileChange(item.index, $event)"
                  />
                  <button
                    type="button"
                    class="px-3 py-2 rounded-lg bg-[#D75641] text-white hover:bg-[#C54D39] transition text-sm font-medium whitespace-nowrap"
                    :disabled="isUploadingImage || !selectedImageFiles[item.index]"
                    @click="uploadProductImage(item.index)"
                  >
                    {{ isUploadingImage && uploadingIndex === item.index ? 'Uploading...' : 'Upload' }}
                  </button>
                </div>
              </div>
              <p v-if="selectedImageFiles[item.index]" class="text-xs text-gray-600 mt-1">
                Selected: {{ selectedImageFiles[item.index]?.name }}
              </p>
              <img
                v-if="item.product.image"
                :src="item.product.image"
                alt="Product preview"
                class="mt-2 h-24 w-24 rounded-lg border border-[#FFE083] object-cover bg-white"
              />
            </label>
          </div>
        </article>
        <p v-if="filteredProducts.length === 0" class="text-sm text-gray-700">No products match your search/filter.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { $fetch } from 'ofetch'

type Product = {
  id: string
  slug: string
  category: string
  title: string
  short: string
  description: string
  price: number
  image: string
}

const passwordInput = ref('')
const cmsPassword = ref('')
const isAuthenticated = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const products = ref<Product[]>([])
const validationErrors = ref<Record<number, string[]>>({})
const searchQuery = ref('')
const categoryFilter = ref('all')
const availableImages = ref<string[]>([])
const selectedImageFiles = ref<Record<number, File | null>>({})
const isUploadingImage = ref(false)
const uploadingIndex = ref<number | null>(null)

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return products.value
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => {
      const matchesCategory = categoryFilter.value === 'all' || product.category === categoryFilter.value

      if (!matchesCategory) {
        return false
      }

      if (!query) {
        return true
      }

      return [product.title, product.slug, product.id, product.short]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
})

const makeHeaders = () => ({
  'x-cms-password': cmsPassword.value
})

const loadProducts = async () => {
  const response = await $fetch<{ products: Product[] }>('/api/cms/products', {
    headers: makeHeaders()
  })
  products.value = response.products || []
  validationErrors.value = {}
}

const loadImages = async () => {
  const response = await $fetch<{ images: string[] }>('/api/cms/images', {
    headers: makeHeaders()
  })
  availableImages.value = response.images || []
}

const validateProducts = (list: Product[]) => {
  const fieldErrors: Record<number, string[]> = {}
  const messages: string[] = []

  list.forEach((product, index) => {
    const rowErrors: string[] = []

    if (!product.id?.trim()) {
      rowErrors.push('id')
    }

    if (!product.slug?.trim()) {
      rowErrors.push('slug')
    }

    if (!product.title?.trim()) {
      rowErrors.push('title')
    }

    const price = Number(product.price)
    if (!Number.isFinite(price) || price < 0) {
      rowErrors.push('price')
    }

    if (rowErrors.length > 0) {
      fieldErrors[index] = rowErrors
      messages.push(`Product #${index + 1}: ${rowErrors.join(', ')}`)
    }
  })

  return { fieldErrors, messages }
}

const hasFieldError = (index: number, fieldName: string) => {
  return validationErrors.value[index]?.includes(fieldName) ?? false
}

const login = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    cmsPassword.value = passwordInput.value.trim()
    await Promise.all([loadProducts(), loadImages()])
    isAuthenticated.value = true
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'Login failed.'
    isAuthenticated.value = false
    cmsPassword.value = ''
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  isAuthenticated.value = false
  cmsPassword.value = ''
  passwordInput.value = ''
  products.value = []
  validationErrors.value = {}
  selectedImageFiles.value = {}
  availableImages.value = []
  errorMessage.value = ''
  successMessage.value = ''
}

const addProduct = () => {
  const uniqueId = Date.now()
  products.value.unshift({
    id: `product-${uniqueId}`,
    slug: `new-product-${uniqueId}`,
    category: 'drinkware',
    title: 'New Product',
    short: 'Short product description',
    description: 'Detailed product description',
    price: 0,
    image: '/images/logo.png'
  })
}

const removeProduct = (index: number) => {
  products.value.splice(index, 1)
  validationErrors.value = {}
  delete selectedImageFiles.value[index]
}

const onImageFileChange = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null
  selectedImageFiles.value[index] = file
}

const uploadProductImage = async (index: number) => {
  const file = selectedImageFiles.value[index]
  if (!file) {
    return
  }

  errorMessage.value = ''
  successMessage.value = ''
  isUploadingImage.value = true
  uploadingIndex.value = index

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch<{ image: string }>('/api/cms/images', {
      method: 'POST',
      headers: makeHeaders(),
      body: formData
    })

    products.value[index].image = response.image
    selectedImageFiles.value[index] = null
    await loadImages()
    successMessage.value = 'Image uploaded and assigned to product.'
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'Image upload failed.'
  } finally {
    isUploadingImage.value = false
    uploadingIndex.value = null
  }
}

const saveProducts = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  const { fieldErrors, messages } = validateProducts(products.value)
  validationErrors.value = fieldErrors

  if (messages.length > 0) {
    errorMessage.value = `Please fix required fields before saving: ${messages.join(' | ')}`
    return
  }

  isLoading.value = true

  try {
    await $fetch('/api/cms/products', {
      method: 'POST',
      headers: makeHeaders(),
      body: { products: products.value }
    })
    successMessage.value = 'Changes saved successfully.'
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'Failed to save changes.'
  } finally {
    isLoading.value = false
  }
}
</script>
