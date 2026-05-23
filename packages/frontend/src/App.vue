<script setup lang="ts">
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'
</script>

<template>
  <div class="app-container">
    <AppHeader class="header" />
    <div class="content">
      <router-view />
    </div>
    <AppFooter class="footer" />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--color-primary);
  color: #fff;
  padding: var(--spacing-base);
}

.content {
  flex: 1;
  padding: var(--spacing-base);
}

.footer {
  bottom: 0;
  width: 100%;
  background-color: var(--color-primary);
  color: #fff;
  text-align: center;
  padding: calc(var(--spacing-base) / 2);
}
</style>
