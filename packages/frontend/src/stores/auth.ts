import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@app-template/shared'
import { authClient } from '@/lib/auth.js'

/**
 * 認証ストア
 * ユーザーのセッション状態を管理
 */

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // セッション状態を同期
  const isAuthenticated = computed(() => !!user.value)

  const currentUser = computed(() => user.value)

  const initSession = async () => {
    loading.value = true
    try {
      const response = await authClient.getSession()
      // Better Auth のレスポンス構造: { data: { user, session } } または { error }
      if (response && typeof response === 'object') {
        const sessionData = 'data' in response ? response.data : response
        user.value = (sessionData && 'user' in sessionData) ? sessionData.user : null
      }
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load session'
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await authClient.signOut()
      user.value = null
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to logout'
    }
  }

  const clearSession = () => {
    user.value = null
    error.value = null
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    currentUser,
    initSession,
    logout,
    clearSession,
  }
})
