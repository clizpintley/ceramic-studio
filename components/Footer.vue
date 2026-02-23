<template>
  <footer class="bg-yellow-50 border-t border-yellow-200 mt-12">
    <div class="container px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 class="font-bold text-yellow-700 mb-3">Art and About</h3>
          <p class="text-sm text-gray-700">Handmade, hand-painted ceramics created with love and care.</p>
        </div>
        <div>
          <h3 class="font-bold text-yellow-700 mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><nuxt-link to="/" class="text-gray-700 hover:text-yellow-600">Home</nuxt-link></li>
            <li><nuxt-link to="/gallery" class="text-gray-700 hover:text-yellow-600">Gallery</nuxt-link></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-yellow-700 mb-3">Contact</h3>
          <p class="text-sm text-gray-700">Email: <a href="mailto:pupkovateodora@gmail.com" class="text-yellow-600 hover:text-yellow-700 font-medium transition">pupkovateodora@gmail.com</a></p>
          <p class="text-sm text-gray-700 mt-2">
            <a 
              href="https://www.instagram.com/artandaboutpupkova" 
              target="_blank"
              rel="noopener noreferrer"
              class="text-yellow-600 hover:text-yellow-700 font-medium transition"
            >
              Instagram @artandaboutpupkova
            </a>
          </p>
        </div>
      </div>
      <div class="border-t border-yellow-200 pt-6 text-center text-sm text-gray-600">
        © {{ new Date().getFullYear() }} Art and About — Tea Pupkova
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
