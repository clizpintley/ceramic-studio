<template>
  <section>
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-yellow-700 mb-6 font-display">Get in Touch</h1>
      <div class="max-w-2xl">
        <p class="text-lg text-gray-700 mb-8">
          Have questions about my ceramics? Want to commission a custom piece? I'd love to hear from you!
        </p>
        
        <div class="bg-yellow-50 p-8 rounded-lg border border-yellow-200 mb-8">
          <h2 class="text-2xl font-bold text-yellow-700 mb-4 font-display">Contact Information</h2>
          
          <div class="mb-6">
            <h3 class="font-bold text-gray-800 mb-2">Email</h3>
            <p class="text-gray-700">
              <a href="mailto:info@ceramicstudio.com" class="text-yellow-600 hover:text-yellow-700 font-medium transition">
                info@ceramicstudio.com
              </a>
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="font-bold text-gray-800 mb-2">Instagram</h3>
            <p class="text-gray-700">
              <a href="https://www.instagram.com/artandaboutpupkova" target="_blank" rel="noopener noreferrer" class="text-yellow-600 hover:text-yellow-700 font-medium transition">
                @artandaboutpupkova
              </a>
            </p>
          </div>
          
          <div>
            <h3 class="font-bold text-gray-800 mb-2">Message</h3>
            <p class="text-gray-700">
              Feel free to reach out with any inquiries about custom orders, collaborations, or just to say hello!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<script setup>
useHead({
  title: 'Contact — Art and About',
  meta: [
    { name: 'description', content: 'Contact Tea Pupkova for commissions, questions, or collaborations. Email and Instagram details.' }
  ]
})
</script>
