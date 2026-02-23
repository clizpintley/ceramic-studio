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

    <div id="snipcart" data-api-key="YOUR_SNIPCART_API_KEY" hidden></div>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ChatbotEmailWidget from '~/components/ChatbotEmailWidget.vue'
const config = useRuntimeConfig()
</script>

<script lang="ts">
// Bind Snipcart API key to the snipcart container after mount (for SSR safety)
import { onMounted } from 'vue'
export default {
  setup() {
    const config = useRuntimeConfig()
    onMounted(() => {
      const el = document.getElementById('snipcart')
      if (el && config.public.snipcartApiKey) {
        el.setAttribute('data-api-key', config.public.snipcartApiKey)
      }
    })
  }
}
</script>
