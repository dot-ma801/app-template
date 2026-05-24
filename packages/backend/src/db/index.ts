import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema.js'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// PostgreSQL クライアント
const client = postgres(databaseUrl)

// Drizzle ORM インスタンス
export const db = drizzle(client, { schema })

export type Database = typeof db
