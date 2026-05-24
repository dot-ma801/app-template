import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from './auth.js'

const app = new Hono()

const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(
  '*',
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
)

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
