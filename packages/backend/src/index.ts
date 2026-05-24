import 'dotenv/config'
import { serve } from '@hono/node-server'
import { createApp } from './presentation/controller/create-app.js'
import { createAuth } from './infrastructure/auth/create-auth.js'
import { createDatabase } from './infrastructure/database/client.js'
import { loadBackendConfig } from './infrastructure/config/env.js'

const config = loadBackendConfig(process.env)
const db = createDatabase(config.databaseUrl)
const auth = createAuth({
  db,
  secret: config.betterAuthSecret,
  baseURL: config.betterAuthUrl,
  trustedOrigin: config.frontendOrigin,
  googleClientId: config.googleClientId,
  googleClientSecret: config.googleClientSecret,
})

const app = createApp({
  frontendOrigin: config.frontendOrigin,
  authHandler: (request) => auth.handler(request),
})

serve(
  {
    fetch: app.fetch,
    port: config.port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
