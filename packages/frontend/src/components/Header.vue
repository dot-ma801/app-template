<script setup lang="ts">
import { watchEffect } from 'vue'
import { Sun, Moon } from '@lucide/vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleDark()
}

watchEffect(() => {
  document.documentElement.setAttribute(
    'data-theme',
    themeStore.currentTheme
  )
  localStorage.setItem('theme', themeStore.currentTheme)
})
</script>

<template>
  <header>
    <h1>AppName</h1>
    <button class="theme-toggle" @click="toggleTheme">
      <Sun v-if="themeStore.isDark" :size="20" />
      <Moon v-else :size="20" />
    </button>
  </header>
</template>

<style scoped>
header {
  background-color: var(--color-primary);
  padding: var(--space-4);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}
h1 {
  font-size: 1.5rem;
  color: var(--color-on-primary);
  margin: 0;
  pointer-events: none;
}
.theme-toggle {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
