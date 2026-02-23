<template>
  <section class="max-w-6xl mx-auto">
    <div class="mb-6">
      <h1 class="text-3xl md:text-4xl font-bold text-[#9C4E3A] font-display">Site CMS</h1>
      <p class="text-gray-700 mt-2">Manage products and section content from one place.</p>
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
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in cmsTabs"
            :key="tab.value"
            type="button"
            class="px-4 py-2 rounded-lg border font-medium transition"
            :class="activeTab === tab.value ? 'bg-[#FFCB06] border-[#E6B800] text-gray-800' : 'bg-white border-[#FFE083] text-[#9C4E3A]'"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
        <button
          type="button"
          class="bg-white text-[#9C4E3A] px-4 py-2 rounded-lg border border-[#FFE083] font-medium"
          :disabled="isLoading || isContentSaving"
          @click="logout"
        >
          Sign out
        </button>
      </div>

      <p v-if="successMessage" class="text-green-700 text-sm mb-3">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-600 text-sm mb-3">{{ errorMessage }}</p>

      <div v-if="activeTab === 'products'" class="rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-5 md:p-6">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-2xl font-bold text-[#9C4E3A] font-display">Products</h2>
          <div class="flex flex-wrap items-center gap-3">
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
              {{ isLoading ? 'Saving...' : 'Save Products' }}
            </button>
          </div>
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
              <option v-for="category in categoryOptions" :key="`filter-${category}`" :value="category">
                {{ formatCategoryLabel(category) }}
              </option>
            </select>
          </label>
        </div>

        <p class="text-sm text-gray-700 mb-3">Showing {{ filteredProducts.length }} of {{ products.length }} products</p>

        <div class="space-y-4">
          <article
            v-for="item in filteredProducts"
            :key="`${item.product.id}-${item.index}`"
            class="rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-4"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-[#9C4E3A]">
                Product #{{ item.index + 1 }}
                <span
                  v-if="item.product.featured"
                  class="ml-2 inline-flex items-center rounded-full border border-[#FFCB06] bg-[#FFF1B3] px-2 py-0.5 text-xs font-semibold text-[#9C4E3A]"
                >
                  Featured
                </span>
              </h2>
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
                <input
                  v-model="item.product.category"
                  list="cms-category-options"
                  class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"
                  placeholder="e.g. drinkware"
                />
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

              <label class="block">
                <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Availability</span>
                <select v-model="item.product.availability" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white">
                  <option v-for="availability in availabilityOptions" :key="`${item.product.id}-${availability}`" :value="availability">
                    {{ formatAvailabilityLabel(availability) }}
                  </option>
                </select>
              </label>

              <label class="block md:col-span-2">
                <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Homepage visibility</span>
                <label class="inline-flex items-center gap-2 text-gray-700">
                  <input v-model="item.product.featured" type="checkbox" class="h-4 w-4 rounded border-[#FFE083] text-[#D75641]" />
                  Pin as featured (shows first in hero and at top of gallery)
                </label>
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

      <div v-else-if="activeTab === 'categories'" class="rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-5 md:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 class="text-2xl font-bold text-[#9C4E3A] font-display">Product Categories</h2>
          <button
            type="button"
            class="bg-[#D75641] text-white px-4 py-2 rounded-lg hover:bg-[#C54D39] transition font-medium"
            :disabled="isCategoriesSaving"
            @click="saveCategories"
          >
            {{ isCategoriesSaving ? 'Saving...' : 'Save Categories' }}
          </button>
        </div>

        <div class="mb-4 flex flex-wrap items-center gap-2">
          <input
            v-model="newCategoryName"
            class="w-full md:w-80 rounded-lg border border-[#FFE083] px-3 py-2 bg-white"
            placeholder="new-category"
            @keyup.enter="addCategory"
          />
          <button
            type="button"
            class="bg-[#FFCB06] text-gray-800 px-4 py-2 rounded-lg border border-[#E6B800] font-medium"
            @click="addCategory"
          >
            Add Category
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="category in categories"
            :key="`managed-${category}`"
            class="rounded-lg border border-[#FFE083] bg-white p-3"
          >
            <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 items-center">
              <input
                :value="category"
                class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"
                @change="renameCategory(category, ($event.target as HTMLInputElement).value)"
              />
              <span class="text-sm text-gray-600">{{ getCategoryUsageCount(category) }} products</span>
              <button
                type="button"
                class="text-sm px-3 py-2 rounded-lg bg-[#F37F61] text-white hover:bg-[#E56F54] transition"
                :disabled="getCategoryUsageCount(category) > 0"
                :class="getCategoryUsageCount(category) > 0 ? 'opacity-60 cursor-not-allowed' : ''"
                @click="deleteCategory(category)"
              >
                {{ getCategoryUsageCount(category) > 0 ? 'In use' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-600 mt-4">
          Tip: categories in use by products cannot be deleted until those products are reassigned.
        </p>
      </div>

      <div v-else-if="activeTab === 'about'" class="rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-5 md:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 class="text-2xl font-bold text-[#9C4E3A] font-display">About Me</h2>
          <button
            type="button"
            class="bg-[#D75641] text-white px-4 py-2 rounded-lg hover:bg-[#C54D39] transition font-medium"
            :disabled="isContentSaving"
            @click="saveSiteContent"
          >
            {{ isContentSaving ? 'Saving...' : 'Save About' }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Heading</span>
            <input v-model="siteContent.about.heading" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Paragraphs (one per line)</span>
            <textarea
              :value="siteContent.about.paragraphs.join('\n')"
              rows="8"
              class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"
              @input="updateAboutParagraphs($event)"
            ></textarea>
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Image</span>
            <select v-model="siteContent.about.image" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white">
              <option value="">Select image</option>
              <option v-for="imagePath in availableImages" :key="`about-${imagePath}`" :value="imagePath">{{ imagePath }}</option>
            </select>
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Upload image</span>
            <div class="flex items-center gap-2">
              <input type="file" accept="image/*" class="w-full text-sm" @change="onContentImageFileChange('about', $event)" />
              <button
                type="button"
                class="px-3 py-2 rounded-lg bg-[#D75641] text-white hover:bg-[#C54D39] transition text-sm font-medium whitespace-nowrap"
                :disabled="isUploadingImage || !selectedContentImageFiles.about"
                @click="uploadContentImage('about')"
              >
                {{ isUploadingImage && uploadingContentField === 'about' ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Image Alt</span>
            <input v-model="siteContent.about.imageAlt" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>
        </div>
      </div>

      <div v-else-if="activeTab === 'behind'" class="rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-5 md:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 class="text-2xl font-bold text-[#9C4E3A] font-display">Behind the Scenes</h2>
          <button
            type="button"
            class="bg-[#D75641] text-white px-4 py-2 rounded-lg hover:bg-[#C54D39] transition font-medium"
            :disabled="isContentSaving"
            @click="saveSiteContent"
          >
            {{ isContentSaving ? 'Saving...' : 'Save Behind the Scenes' }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Heading</span>
            <input v-model="siteContent.behindTheScenes.heading" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Subtitle</span>
            <input v-model="siteContent.behindTheScenes.subtitle" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Intro text</span>
            <textarea v-model="siteContent.behindTheScenes.intro" rows="4" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"></textarea>
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Cards (format: Title | Text, one per line)</span>
            <textarea
              :value="behindCardsText"
              rows="6"
              class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"
              @input="updateBehindCards($event)"
            ></textarea>
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Footer text</span>
            <textarea v-model="siteContent.behindTheScenes.footerText" rows="3" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"></textarea>
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Instagram URL</span>
            <input v-model="siteContent.behindTheScenes.instagramUrl" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Instagram Button Label</span>
            <input v-model="siteContent.behindTheScenes.instagramLabel" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>
        </div>
      </div>

      <div v-else-if="activeTab === 'testimonials'" class="rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-5 md:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 class="text-2xl font-bold text-[#9C4E3A] font-display">Testimonials</h2>
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="bg-[#FFCB06] text-gray-800 px-4 py-2 rounded-lg border border-[#E6B800] font-medium"
              @click="addTestimonial"
            >
              Add Review
            </button>
            <button
              type="button"
              class="bg-[#D75641] text-white px-4 py-2 rounded-lg hover:bg-[#C54D39] transition font-medium"
              :disabled="isContentSaving"
              @click="saveSiteContent"
            >
              {{ isContentSaving ? 'Saving...' : 'Save Testimonials' }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Heading</span>
            <input v-model="siteContent.testimonials.heading" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Intro</span>
            <textarea v-model="siteContent.testimonials.intro" rows="3" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"></textarea>
          </label>
        </div>

        <div class="space-y-3">
          <div
            v-for="(review, index) in siteContent.testimonials.items"
            :key="`testimonial-${index}`"
            class="rounded-lg border border-[#FFE083] bg-white p-3"
          >
            <div class="flex items-center justify-between gap-3 mb-3">
              <h3 class="text-sm font-semibold text-[#9C4E3A]">Review #{{ index + 1 }}</h3>
              <button
                type="button"
                class="text-sm px-3 py-1.5 rounded-lg bg-[#F37F61] text-white hover:bg-[#E56F54] transition"
                @click="removeTestimonial(index)"
              >
                Remove
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <label class="block">
                <span class="block text-xs text-[#9C4E3A] mb-1 font-medium">Name</span>
                <input v-model="review.name" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
              </label>
              <label class="block">
                <span class="block text-xs text-[#9C4E3A] mb-1 font-medium">Rating</span>
                <select v-model.number="review.rating" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white">
                  <option :value="5">5 stars</option>
                  <option :value="4">4 stars</option>
                  <option :value="3">3 stars</option>
                  <option :value="2">2 stars</option>
                  <option :value="1">1 star</option>
                </select>
              </label>
              <label class="block md:col-span-2">
                <span class="block text-xs text-[#9C4E3A] mb-1 font-medium">Review text</span>
                <textarea v-model="review.text" rows="3" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"></textarea>
              </label>
              <label class="inline-flex items-center gap-2 text-sm text-gray-700 md:col-span-2">
                <input v-model="review.approved" type="checkbox" class="h-4 w-4 rounded border-[#FFE083] text-[#D75641]" />
                Approved (visible on homepage)
              </label>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'instagram'" class="rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-5 md:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 class="text-2xl font-bold text-[#9C4E3A] font-display">Instagram / Latest Posts</h2>
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="bg-[#FFCB06] text-gray-800 px-4 py-2 rounded-lg border border-[#E6B800] font-medium"
              @click="addInstagramPost"
            >
              Add Post
            </button>
            <button
              type="button"
              class="bg-[#D75641] text-white px-4 py-2 rounded-lg hover:bg-[#C54D39] transition font-medium"
              :disabled="isContentSaving"
              @click="saveSiteContent"
            >
              {{ isContentSaving ? 'Saving...' : 'Save Instagram' }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Heading</span>
            <input v-model="siteContent.instagram.heading" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Intro</span>
            <textarea v-model="siteContent.instagram.intro" rows="3" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"></textarea>
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Instagram Profile URL</span>
            <input v-model="siteContent.instagram.profileUrl" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>
        </div>

        <div class="space-y-3">
          <div
            v-for="(post, index) in siteContent.instagram.posts"
            :key="`insta-post-${index}`"
            class="rounded-lg border border-[#FFE083] bg-white p-3"
          >
            <div class="flex items-center justify-between gap-3 mb-3">
              <h3 class="text-sm font-semibold text-[#9C4E3A]">Post #{{ index + 1 }}</h3>
              <button
                type="button"
                class="text-sm px-3 py-1.5 rounded-lg bg-[#F37F61] text-white hover:bg-[#E56F54] transition"
                @click="removeInstagramPost(index)"
              >
                Remove
              </button>
            </div>
            <div class="grid grid-cols-1 gap-2">
              <label class="block">
                <span class="block text-xs text-[#9C4E3A] mb-1 font-medium">Post URL</span>
                <input v-model="post.url" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" placeholder="https://www.instagram.com/p/.../" />
              </label>
              <label class="block">
                <span class="block text-xs text-[#9C4E3A] mb-1 font-medium">Caption (optional)</span>
                <input v-model="post.caption" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
              </label>
              <label class="inline-flex items-center gap-2 text-sm text-gray-700">
                <input v-model="post.enabled" type="checkbox" class="h-4 w-4 rounded border-[#FFE083] text-[#D75641]" />
                Enabled (visible on homepage)
              </label>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'contact'" class="rounded-2xl border border-[#FFE083] bg-[#FFF8DC] p-5 md:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 class="text-2xl font-bold text-[#9C4E3A] font-display">Contact</h2>
          <button
            type="button"
            class="bg-[#D75641] text-white px-4 py-2 rounded-lg hover:bg-[#C54D39] transition font-medium"
            :disabled="isContentSaving"
            @click="saveSiteContent"
          >
            {{ isContentSaving ? 'Saving...' : 'Save Contact' }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Heading</span>
            <input v-model="siteContent.contact.heading" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Intro text</span>
            <textarea v-model="siteContent.contact.intro" rows="3" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white"></textarea>
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Email label</span>
            <input v-model="siteContent.contact.emailLabel" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Email address</span>
            <input v-model="siteContent.contact.emailAddress" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Instagram label</span>
            <input v-model="siteContent.contact.instagramLabel" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Instagram handle</span>
            <input v-model="siteContent.contact.instagramHandle" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Instagram URL</span>
            <input v-model="siteContent.contact.instagramUrl" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Image</span>
            <select v-model="siteContent.contact.image" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white">
              <option value="">Select image</option>
              <option v-for="imagePath in availableImages" :key="`contact-${imagePath}`" :value="imagePath">{{ imagePath }}</option>
            </select>
          </label>

          <label class="block">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Upload image</span>
            <div class="flex items-center gap-2">
              <input type="file" accept="image/*" class="w-full text-sm" @change="onContentImageFileChange('contact', $event)" />
              <button
                type="button"
                class="px-3 py-2 rounded-lg bg-[#D75641] text-white hover:bg-[#C54D39] transition text-sm font-medium whitespace-nowrap"
                :disabled="isUploadingImage || !selectedContentImageFiles.contact"
                @click="uploadContentImage('contact')"
              >
                {{ isUploadingImage && uploadingContentField === 'contact' ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
          </label>

          <label class="block md:col-span-2">
            <span class="block text-sm text-[#9C4E3A] mb-1 font-medium">Image Alt</span>
            <input v-model="siteContent.contact.imageAlt" class="w-full rounded-lg border border-[#FFE083] px-3 py-2 bg-white" />
          </label>
        </div>
      </div>
    </div>

    <datalist id="cms-category-options">
      <option v-for="category in categoryOptions" :key="`cat-${category}`" :value="category" />
    </datalist>
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
  featured: boolean
  availability: 'in-stock' | 'made-to-order' | 'sold' | 'limited-edition'
}

type SiteContent = {
  about: {
    heading: string
    paragraphs: string[]
    image: string
    imageAlt: string
  }
  behindTheScenes: {
    heading: string
    subtitle: string
    intro: string
    cards: Array<{
      title: string
      text: string
    }>
    footerText: string
    instagramUrl: string
    instagramLabel: string
  }
  contact: {
    heading: string
    intro: string
    emailLabel: string
    emailAddress: string
    instagramLabel: string
    instagramHandle: string
    instagramUrl: string
    image: string
    imageAlt: string
  }
  testimonials: {
    heading: string
    intro: string
    items: Array<{
      name: string
      rating: number
      text: string
      approved: boolean
    }>
  }
  instagram: {
    heading: string
    intro: string
    profileUrl: string
    posts: Array<{
      url: string
      caption: string
      enabled: boolean
    }>
  }
}

const defaultSiteContent = (): SiteContent => ({
  about: {
    heading: "I'm Tea Pupkova",
    paragraphs: [],
    image: '/images/tea.png',
    imageAlt: 'Tea Pupkova in the studio'
  },
  behindTheScenes: {
    heading: 'Behind the Scenes',
    subtitle: '',
    intro: '',
    cards: [],
    footerText: '',
    instagramUrl: 'https://www.instagram.com/artandaboutpupkova',
    instagramLabel: 'Follow @artandaboutpupkova'
  },
  contact: {
    heading: "Let's Connect",
    intro: '',
    emailLabel: 'Email:',
    emailAddress: '',
    instagramLabel: 'Instagram:',
    instagramHandle: '@artandaboutpupkova',
    instagramUrl: 'https://www.instagram.com/artandaboutpupkova',
    image: '/images/tea3.jpeg',
    imageAlt: 'Tea Pupkova contact portrait'
  },
  testimonials: {
    heading: 'Kind Words',
    intro: 'What collectors and customers are saying.',
    items: []
  },
  instagram: {
    heading: 'Latest from Instagram',
    intro: 'Recent studio updates and finished pieces.',
    profileUrl: 'https://www.instagram.com/artandaboutpupkova',
    posts: []
  }
})

const passwordInput = ref('')
const cmsPassword = ref('')
const isAuthenticated = ref(false)
const activeTab = ref<'products' | 'categories' | 'about' | 'behind' | 'testimonials' | 'instagram' | 'contact'>('products')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const products = ref<Product[]>([])
const validationErrors = ref<Record<number, string[]>>({})
const searchQuery = ref('')
const categoryFilter = ref('all')
const availableImages = ref<string[]>([])
const selectedImageFiles = ref<Record<number, File | null>>({})
const selectedContentImageFiles = ref<{ about: File | null; contact: File | null }>({ about: null, contact: null })
const isUploadingImage = ref(false)
const uploadingIndex = ref<number | null>(null)
const uploadingContentField = ref<'about' | 'contact' | null>(null)
const siteContent = ref<SiteContent>(defaultSiteContent())
const isContentSaving = ref(false)
const categories = ref<string[]>([])
const newCategoryName = ref('')
const isCategoriesSaving = ref(false)

const cmsTabs = [
  { label: 'Products', value: 'products' as const },
  { label: 'Categories', value: 'categories' as const },
  { label: 'About Me', value: 'about' as const },
  { label: 'Behind the Scenes', value: 'behind' as const },
  { label: 'Testimonials', value: 'testimonials' as const },
  { label: 'Instagram', value: 'instagram' as const },
  { label: 'Contact', value: 'contact' as const }
]

const availabilityOptions: Array<Product['availability']> = ['in-stock', 'made-to-order', 'sold', 'limited-edition']

const formatAvailabilityLabel = (availability: Product['availability']) => {
  return availability
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const categoryOptions = computed(() => {
  return Array.from(new Set([
    ...categories.value,
    ...products.value
      .map((product) => String(product.category || '').trim())
      .filter(Boolean)
  ])).sort((a, b) => a.localeCompare(b))
})

const formatCategoryLabel = (category: string) => {
  return category
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

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

      return [
        product.title,
        product.slug,
        product.id,
        product.short,
        product.availability,
        product.featured ? 'featured' : ''
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
})

const behindCardsText = computed(() => {
  return siteContent.value.behindTheScenes.cards
    .map((card) => `${card.title} | ${card.text}`)
    .join('\n')
})

const makeHeaders = () => ({
  'x-cms-password': cmsPassword.value
})

const loadProducts = async () => {
  const response = await $fetch<{ products: Product[] }>('/api/cms/products', {
    headers: makeHeaders()
  })
  products.value = (response.products || []).map((product) => ({
    ...product,
    featured: Boolean(product.featured),
    availability: availabilityOptions.includes(product.availability) ? product.availability : 'in-stock'
  }))
  validationErrors.value = {}
}

const loadImages = async () => {
  const response = await $fetch<{ images: string[] }>('/api/cms/images', {
    headers: makeHeaders()
  })
  availableImages.value = response.images || []
}

const loadSiteContent = async () => {
  const response = await $fetch<{ content: SiteContent }>('/api/cms/site-content', {
    headers: makeHeaders()
  })
  siteContent.value = response.content || defaultSiteContent()
}

const loadCategories = async () => {
  const response = await $fetch<{ categories: string[] }>('/api/cms/categories', {
    headers: makeHeaders()
  })
  categories.value = response.categories || []
}

const saveCategories = async () => {
  isCategoriesSaving.value = true
  try {
    await $fetch('/api/cms/categories', {
      method: 'POST',
      headers: makeHeaders(),
      body: { categories: categories.value }
    })
    successMessage.value = 'Categories saved successfully.'
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'Failed to save categories.'
  } finally {
    isCategoriesSaving.value = false
  }
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
    await Promise.all([loadProducts(), loadImages(), loadSiteContent(), loadCategories()])
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
  selectedContentImageFiles.value = { about: null, contact: null }
  availableImages.value = []
  categories.value = []
  newCategoryName.value = ''
  siteContent.value = defaultSiteContent()
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
    image: '/images/logo.png',
    featured: false,
    availability: 'in-stock'
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
  uploadingContentField.value = null

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

const onContentImageFileChange = (field: 'about' | 'contact', event: Event) => {
  const target = event.target as HTMLInputElement
  selectedContentImageFiles.value[field] = target.files?.[0] || null
}

const uploadContentImage = async (field: 'about' | 'contact') => {
  const file = selectedContentImageFiles.value[field]
  if (!file) {
    return
  }

  errorMessage.value = ''
  successMessage.value = ''
  isUploadingImage.value = true
  uploadingIndex.value = null
  uploadingContentField.value = field

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch<{ image: string }>('/api/cms/images', {
      method: 'POST',
      headers: makeHeaders(),
      body: formData
    })

    if (field === 'about') {
      siteContent.value.about.image = response.image
    } else {
      siteContent.value.contact.image = response.image
    }

    selectedContentImageFiles.value[field] = null
    await loadImages()
    successMessage.value = 'Section image uploaded successfully.'
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'Image upload failed.'
  } finally {
    isUploadingImage.value = false
    uploadingContentField.value = null
  }
}

const updateAboutParagraphs = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  siteContent.value.about.paragraphs = target.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

const updateBehindCards = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  siteContent.value.behindTheScenes.cards = target.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [titlePart, ...textParts] = line.split('|')
      return {
        title: (titlePart || '').trim(),
        text: textParts.join('|').trim()
      }
    })
}

const saveSiteContent = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isContentSaving.value = true

  try {
    await $fetch('/api/cms/site-content', {
      method: 'POST',
      headers: makeHeaders(),
      body: { content: siteContent.value }
    })
    successMessage.value = 'Section content saved successfully.'
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'Failed to save section content.'
  } finally {
    isContentSaving.value = false
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

const addCategory = () => {
  const candidate = newCategoryName.value.trim().toLowerCase()
  if (!candidate) {
    return
  }

  if (!categories.value.includes(candidate)) {
    categories.value.push(candidate)
    categories.value.sort((a, b) => a.localeCompare(b))
  }

  newCategoryName.value = ''
}

const renameCategory = (oldValue: string, newValue: string) => {
  const normalized = newValue.trim().toLowerCase()
  if (!normalized || normalized === oldValue) {
    return
  }

  if (categories.value.includes(normalized)) {
    errorMessage.value = `Category \"${normalized}\" already exists.`
    return
  }

  categories.value = categories.value.map((category) => (category === oldValue ? normalized : category))
  products.value = products.value.map((product) => ({
    ...product,
    category: product.category === oldValue ? normalized : product.category
  }))
}

const deleteCategory = (categoryToDelete: string) => {
  const usedByProducts = products.value.some((product) => product.category === categoryToDelete)

  if (usedByProducts) {
    errorMessage.value = `Cannot delete \"${categoryToDelete}\" while products still use it. Reassign those products first.`
    return
  }

  categories.value = categories.value.filter((category) => category !== categoryToDelete)
}

const getCategoryUsageCount = (category: string) => {
  return products.value.filter((product) => product.category === category).length
}

const addTestimonial = () => {
  siteContent.value.testimonials.items.unshift({
    name: 'Customer Name',
    rating: 5,
    text: 'Share a short customer review here.',
    approved: true
  })
}

const removeTestimonial = (index: number) => {
  siteContent.value.testimonials.items.splice(index, 1)
}

const addInstagramPost = () => {
  siteContent.value.instagram.posts.unshift({
    url: 'https://www.instagram.com/p/POST_ID/',
    caption: '',
    enabled: true
  })
}

const removeInstagramPost = (index: number) => {
  siteContent.value.instagram.posts.splice(index, 1)
}
</script>
