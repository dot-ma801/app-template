import { z } from 'zod'

/**
 * 共通スキーマ・型定義をここに記述します
 * 例: API レスポンス、リクエストボディ、ドメインモデルなど
 */

/**
 * Better Auth ユーザースキーマ
 */
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  image: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type User = z.infer<typeof UserSchema>

/**
 * セッションスキーマ
 */
export const SessionSchema = z.object({
  user: UserSchema,
  session: z.object({
    id: z.string(),
    expiresAt: z.date(),
    token: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }).optional(),
})

export type Session = z.infer<typeof SessionSchema>
