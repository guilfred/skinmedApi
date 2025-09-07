import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, stores } from '@adonisjs/session'

export default defineConfig({
  age: '1h',
  enabled: true,
  cookieName: 'adonis-session',
  clearWithBrowser: true,

  cookie: {
    path: '/',
    httpOnly: true,
    secure: app.inProduction,
    sameSite: 'lax',
  },
  store: (env.get('SESSION_DRIVER') as 'cookie' | 'memory') || 'memory',
  stores: {
    cookie: stores.cookie(),
  },
})
