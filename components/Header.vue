<template>
  <header class="bg-[#FFCB06] shadow-sm sticky top-0 z-50 border-b border-[#E6B800]">
    <div class="container px-4 py-3 md:py-5">
      <div class="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6">
        <nuxt-link to="/" class="link-fx flex items-center space-x-3 hover:opacity-80 transition">
        <img src="/images/logo.png" alt="Art and About logo" class="h-14 w-14 md:h-20 md:w-20 object-contain" />
        <span class="text-2xl font-bold text-gray-800 whitespace-nowrap">
          <span class="hidden xl:inline"></span>
        </span>
      </nuxt-link>
      <nav class="w-full md:w-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[15px] md:text-base">
        <nuxt-link 
          to="/gallery" 
          class="link-fx text-gray-800 hover:text-[#9C4E3A] font-medium transition"
        >
          My Products
        </nuxt-link>
        <nuxt-link 
          to="/behind-the-scenes" 
          class="link-fx text-gray-800 hover:text-[#9C4E3A] font-medium transition"
        >
          Behind the Scenes
        </nuxt-link>
        <nuxt-link 
          to="/about" 
          class="link-fx text-gray-800 hover:text-[#9C4E3A] font-medium transition"
        >
          About Me
        </nuxt-link>
        <nuxt-link 
          to="/contact" 
          class="link-fx text-gray-800 hover:text-[#9C4E3A] font-medium transition"
        >
          Contact
        </nuxt-link>
        <div class="flex items-center gap-2 md:gap-3">
          <a
            href="https://www.etsy.com/shop/artandabout"
            target="_blank"
            rel="noopener noreferrer"
            class="link-fx inline-flex items-center gap-1.5 bg-[#F37F61] text-white px-3 md:px-4 py-2 rounded-lg hover:bg-[#E56F54] transition text-sm md:text-base font-medium"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M6 8.5h12l-1.2 9H7.2L6 8.5z" />
              <path d="M9 8.5V8a3 3 0 0 1 6 0v.5" />
            </svg>
            <span class="hidden sm:inline">Shop on Etsy</span>
            <span class="sm:hidden">Etsy</span>
          </a>
          <a 
            href="#" 
            class="link-fx snipcart-checkout inline-flex items-center gap-1.5 bg-[#F37F61] text-white px-3 md:px-4 py-2 rounded-lg hover:bg-[#E56F54] transition text-sm md:text-base font-medium"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="9" cy="19" r="1.5" />
              <circle cx="17" cy="19" r="1.5" />
              <path d="M3 5h2l1.2 9h11.3l1.3-7H6.5" />
            </svg>
            Cart
          </a>
        </div>
      </nav>
      </div>
    </div>
  </header>
</template>
