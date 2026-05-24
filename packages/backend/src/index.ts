import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { auth } from './auth.js'

const app = new Hono()

// Health check
app.get('/', (c) => {
  return c.json({ status: 'ok', message: 'Backend is running' })
})

// Better Auth routes
app.on(['POST', 'GET'], '/api/auth/**', (c) => {
  return auth.handler(c.req.raw)
})

const port = parseInt(process.env.PORT || '3000', 10)

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
