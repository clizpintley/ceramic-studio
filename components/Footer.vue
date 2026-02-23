<template>
  <footer class="bg-[#F8D6B4] border-t-2 border-[#FFCB06] mt-12">
    <div class="container px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 class="font-bold text-[#9C4E3A] mb-3">Art & About</h3>
          <p class="text-sm text-gray-700">Handmade, hand-painted ceramics created with love and care.</p>
        </div>
        <div>
          <h3 class="font-bold text-[#9C4E3A] mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><nuxt-link to="/gallery" class="link-fx text-gray-700 hover:text-[#9C4E3A]">My Products</nuxt-link></li>
            <li><nuxt-link to="/behind-the-scenes" class="link-fx text-gray-700 hover:text-[#9C4E3A]">Behind the Scenes</nuxt-link></li>
            <li><nuxt-link to="/about" class="link-fx text-gray-700 hover:text-[#9C4E3A]">About Me</nuxt-link></li>
            <li><nuxt-link to="/contact" class="link-fx text-gray-700 hover:text-[#9C4E3A]">Contact</nuxt-link></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-[#9C4E3A] mb-3">Contact</h3>
          <p class="text-sm text-gray-700 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#C4674A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M4 6h16v12H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            <span>Email:</span>
            <a href="mailto:pupkovateodora@gmail.com" class="link-fx text-[#C4674A] hover:text-[#9C4E3A] font-medium transition">pupkovateodora@gmail.com</a>
          </p>
          <p class="text-sm text-gray-700 mt-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#C4674A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M6 8.5h12l-1.2 9H7.2L6 8.5z" />
              <path d="M9 8.5V8a3 3 0 0 1 6 0v.5" />
            </svg>
            <span>Etsy shop:</span>
            <a
              href="https://www.etsy.com/shop/artandabout"
              target="_blank"
              rel="noopener noreferrer"
              class="link-fx text-[#C4674A] hover:text-[#9C4E3A] font-medium transition"
            >
              Art & About
            </a>
          </p>
          <p class="text-sm text-gray-700 mt-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#C4674A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>Instagram:</span>
            <a 
              href="https://www.instagram.com/artandaboutpupkova" 
              target="_blank"
              rel="noopener noreferrer"
              class="link-fx text-[#C4674A] hover:text-[#9C4E3A] font-medium transition"
            >
              @artandaboutpupkova
            </a>
          </p>
        </div>
      </div>
      <div class="border-t border-[#FFE083] pt-6 text-center text-sm text-gray-600">
        © {{ new Date().getFullYear() }} Art & About — Tea Pupkova
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
