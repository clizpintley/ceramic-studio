<template>
  <div class="fixed bottom-6 right-6 z-[70]">
    <div
      v-if="isOpen"
      class="w-[340px] sm:w-[380px] max-w-[90vw] bg-white border border-[#F8D6B4] rounded-2xl shadow-xl overflow-hidden"
    >
      <div class="bg-[#F8D6B4] px-4 py-3 flex items-center justify-between">
        <h3 class="font-bold text-[#9C4E3A]">Chat with Tea's Studio</h3>
        <button
          type="button"
          @click="isOpen = false"
          class="link-fx text-[#9C4E3A] text-sm font-semibold"
        >
          Close
        </button>
      </div>

      <div class="p-4 space-y-3 max-h-[300px] overflow-y-auto bg-[#FFF8EE]">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="text-sm"
        >
          <div
            class="inline-block rounded-xl px-3 py-2 max-w-[95%]"
            :class="message.role === 'user' ? 'bg-[#D75641] text-white ml-auto' : 'bg-white text-gray-700 border border-[#F8D6B4]'"
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-[#F8D6B4] space-y-3">
        <input
          v-model="contactEmail"
          type="email"
          placeholder="Your email (required)"
          class="w-full rounded-lg border border-[#F8D6B4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D75641]/30"
        />
        <div class="flex gap-2">
          <input
            v-model="draft"
            type="text"
            placeholder="Type your message..."
            class="flex-1 rounded-lg border border-[#F8D6B4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D75641]/30"
            @keydown.enter.prevent="addMessage"
          />
          <button
            type="button"
            @click="addMessage"
            class="link-fx bg-[#D75641] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C54D39]"
          >
            Add
          </button>
        </div>
        <button
          type="button"
          @click="sendTranscript"
          :disabled="sendDisabled"
          class="link-fx w-full bg-[#9C4E3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ sendButtonLabel }}
        </button>
        <p v-if="statusMessage" class="text-xs" :class="statusIsError ? 'text-red-600' : 'text-[#9C4E3A]'">
          {{ statusMessage }}
        </p>
      </div>
    </div>

    <button
      v-else
      type="button"
      @click="isOpen = true"
      class="link-fx bg-[#D75641] text-white px-5 py-3 rounded-full shadow-lg font-semibold hover:bg-[#C54D39]"
    >
      Chat ✨
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

type ChatMessage = {
  role: 'user' | 'bot'
  text: string
}

const COOLDOWN_SECONDS = 30

const isOpen = ref(false)
const draft = ref('')
const contactEmail = ref('')
const sending = ref(false)
const cooldownSeconds = ref(0)
const statusMessage = ref('')
const statusIsError = ref(false)
const route = useRoute()
let cooldownInterval: ReturnType<typeof setInterval> | null = null

const messages = ref<ChatMessage[]>([
  {
    role: 'bot',
    text: 'Hi! Ask anything about products, custom orders, or shipping. I can send this chat to Tea by email.'
  }
])

const addMessage = () => {
  const text = draft.value.trim()
  if (!text) {
    return
  }

  messages.value.push({ role: 'user', text })
  draft.value = ''
  statusMessage.value = ''
}

const startCooldown = (seconds: number) => {
  cooldownSeconds.value = Math.max(0, seconds)

  if (cooldownInterval) {
    clearInterval(cooldownInterval)
  }

  if (!cooldownSeconds.value) {
    return
  }

  cooldownInterval = setInterval(() => {
    if (cooldownSeconds.value <= 1) {
      cooldownSeconds.value = 0
      if (cooldownInterval) {
        clearInterval(cooldownInterval)
        cooldownInterval = null
      }
      return
    }

    cooldownSeconds.value -= 1
  }, 1000)
}

const sendDisabled = computed(() => sending.value || cooldownSeconds.value > 0)

const sendButtonLabel = computed(() => {
  if (sending.value) {
    return 'Sending...'
  }

  if (cooldownSeconds.value > 0) {
    return `Send again in ${cooldownSeconds.value}s`
  }

  return 'Send Chat to Email'
})

const sendTranscript = async () => {
  const email = contactEmail.value.trim()
  if (!email) {
    statusIsError.value = true
    statusMessage.value = 'Please add your email first.'
    return
  }

  const userMessages = messages.value.filter((message) => message.role === 'user')
  if (!userMessages.length) {
    statusIsError.value = true
    statusMessage.value = 'Add at least one message before sending.'
    return
  }

  if (cooldownSeconds.value > 0) {
    statusIsError.value = true
    statusMessage.value = `Please wait ${cooldownSeconds.value}s before sending again.`
    return
  }

  sending.value = true
  statusMessage.value = ''

  try {
    await $fetch('/api/chatbot-email', {
      method: 'POST',
      body: {
        email,
        page: route.fullPath,
        messages: messages.value.slice(-20)
      }
    })

    statusIsError.value = false
    statusMessage.value = 'Sent! Tea will receive your chat by email.'
    startCooldown(COOLDOWN_SECONDS)
    messages.value.push({
      role: 'bot',
      text: 'Thanks! Your message was sent. Tea will get back to you soon.'
    })
  } catch (error: any) {
    statusIsError.value = true
    const serverMessage = error?.data?.statusMessage || ''
    statusMessage.value = serverMessage || 'Could not send email right now. Please try again later.'

    if (error?.statusCode === 429 && serverMessage) {
      const match = serverMessage.match(/(\d+)s/)
      if (match) {
        startCooldown(Number(match[1]))
      }
    }
  } finally {
    sending.value = false
  }
}

onBeforeUnmount(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval)
    cooldownInterval = null
  }
})
</script>