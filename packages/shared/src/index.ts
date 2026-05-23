import { z } from 'zod'

/**
 * 共通スキーマ・型定義をここに記述します
 * 例: API レスポンス、リクエストボディ、ドメインモデルなど
 */

// 例: ユーザー型スキーマ
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
})

export type User = z.infer<typeof UserSchema>
