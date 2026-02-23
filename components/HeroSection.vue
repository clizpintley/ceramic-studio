<template>
  <div class="relative mb-16 py-16 rounded-3xl px-8 overflow-hidden">
    <img
      src="/images/tea2.jpeg"
      alt="Tea Pupkova hero background"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-[#F8D6B4]/75"></div>
    <div class="relative z-10 text-center">
      <h1 class="text-5xl md:text-6xl font-extrabold text-[#9C4E3A] mb-4 font-display">Hello, I'm Tea Pupkova</h1>
      <p class="text-xl text-gray-700 mb-8">I create hand-painted ceramics that turn everyday moments into art.</p>
      <p class="text-gray-600 max-w-2xl mx-auto mb-8">From mugs and teapots to bowls and custom pieces, I shape functional pottery and illustrate each surface by hand—often inspired by stories, characters, and warm home rituals. Every piece is made to be used, loved, and to add personality to daily life.</p>
      <nuxt-link 
        to="/gallery"
        class="inline-block bg-[#D75641] text-white px-8 py-3 rounded-lg hover:bg-[#C54D39] transition font-semibold"
      >
        Explore My Work
      </nuxt-link>
    </div>
  </div>
</template>
