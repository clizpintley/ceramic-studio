<template>
  <div class="min-h-screen flex flex-col bg-[#FFF8EE] font-serif">
    <Header />
    <main class="flex-grow">
      <div class="container px-4 lg:px-8 py-12">
        <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
      </div>
    </main>
    <Footer />
    <ChatbotEmailWidget />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ChatbotEmailWidget from '~/components/ChatbotEmailWidget.vue'
</script>
