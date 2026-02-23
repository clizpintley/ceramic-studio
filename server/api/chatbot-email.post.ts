import nodemailer from 'nodemailer'

const COOLDOWN_MS = 30_000
const lastSentByIp = new Map<string, number>()

type ChatMessage = {
  role: 'user' | 'bot'
  text: string
}

type ChatbotEmailBody = {
  email?: string
  page?: string
  messages?: ChatMessage[]
}

export default defineEventHandler(async (event) => {
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()
  const lastSentAt = lastSentByIp.get(clientIp) || 0
  const elapsed = now - lastSentAt

  if (elapsed < COOLDOWN_MS) {
    const waitSeconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000)
    throw createError({
      statusCode: 429,
      statusMessage: `Please wait ${waitSeconds}s before sending another message.`
    })
  }

  const body = await readBody<ChatbotEmailBody>(event)

  const email = body?.email?.trim()
  const page = body?.page || '/'
  const messages = Array.isArray(body?.messages) ? body.messages.slice(-20) : []

  if (!email || !email.includes('@')) {
    throw createError({ statusCode: 400, statusMessage: 'A valid email is required.' })
  }

  const userMessageCount = messages.filter((message) => message.role === 'user').length
  if (!userMessageCount) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide at least one user message.' })
  }

  const config = useRuntimeConfig(event)
  const host = config.chatbotMailHost
  const port = Number(config.chatbotMailPort || 587)
  const user = config.chatbotMailUser
  const pass = config.chatbotMailPass
  const from = config.chatbotMailFrom || user
  const to = config.chatbotMailTo

  if (!host || !user || !pass || !to || !from) {
    const missing = [
      !host ? 'CHATBOT_MAIL_HOST' : '',
      !user ? 'CHATBOT_MAIL_USER' : '',
      !pass ? 'CHATBOT_MAIL_PASS' : '',
      !from ? 'CHATBOT_MAIL_FROM' : '',
      !to ? 'CHATBOT_MAIL_TO' : ''
    ].filter(Boolean)

    throw createError({
      statusCode: 500,
      statusMessage: `Email service is not configured. Missing: ${missing.join(', ')}`
    })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  })

  const transcript = messages
    .map((message) => `${message.role === 'user' ? 'Visitor' : 'Bot'}: ${message.text}`)
    .join('\n\n')

  await transporter.sendMail({
    from,
    to,
    subject: `New chatbot conversation from ${email}`,
    replyTo: email,
    text: `A new chatbot conversation was submitted.\n\nFrom: ${email}\nPage: ${page}\n\nTranscript:\n\n${transcript}`
  })

  lastSentByIp.set(clientIp, now)

  return { ok: true }
})