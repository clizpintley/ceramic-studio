<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container flex items-center justify-between py-6 px-4">
      <nuxt-link to="/" class="text-2xl font-bold text-amber-900 hover:text-amber-700 transition">
        Ceramic Studio
      </nuxt-link>
      <nav class="flex items-center space-x-8">
        <nuxt-link 
          to="/gallery" 
          class="text-gray-700 hover:text-amber-700 font-medium transition"
        >
          Gallery
        </nuxt-link>
        <a 
          href="#" 
          class="snipcart-checkout bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition font-medium"
        >
          Cart
        </a>
      </nav>
    </div>
  </header>
</template>
