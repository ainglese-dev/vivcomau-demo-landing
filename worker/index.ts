import { handleContact } from './contact'
import { handleAdmin } from './admin'

export interface Env {
  ASSETS: Fetcher
  DB: D1Database
  TURNSTILE_SECRET_KEY?: string
  TELEGRAM_BOT_TOKEN?: string
  TELEGRAM_CHAT_ID?: string
  EMAIL?: SendEmail
  NOTIFY_EMAILS?: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/admin')) {
      return handleAdmin(request, env)
    }

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { Allow: 'POST' },
        })
      }
      return handleContact(request, env)
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
