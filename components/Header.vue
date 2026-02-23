<template>
  <header class="bg-yellow-400 shadow-sm sticky top-0 z-50">
    <div class="container flex items-center justify-between py-6 px-4">
    <nuxt-link to="/" class="flex items-center space-x-3 hover:opacity-80 transition">
        <img src="/images/logo.png" alt="Art and About logo" class="h-10 w-10 object-contain" />
        <span class="text-2xl font-bold text-gray-800">Art and About - Tea Pupkova</span>
      </nuxt-link>
      <nav class="flex items-center space-x-8">
        <nuxt-link 
          to="/gallery" 
          class="text-gray-800 hover:text-gray-600 font-medium transition"
        >
          My Products
        </nuxt-link>
        <nuxt-link 
          to="/behind-the-scenes" 
          class="text-gray-800 hover:text-gray-600 font-medium transition"
        >
          Behind the Scenes
        </nuxt-link>
        <nuxt-link 
          to="/about" 
          class="text-gray-800 hover:text-gray-600 font-medium transition"
        >
          About Me
        </nuxt-link>
        <nuxt-link 
          to="/contact" 
          class="text-gray-800 hover:text-gray-600 font-medium transition"
        >
          Contact
        </nuxt-link>
        <a 
          href="#" 
          class="snipcart-checkout bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition font-medium"
        >
          Cart
        </a>
      </nav>
    </div>
  </header>
</template>
