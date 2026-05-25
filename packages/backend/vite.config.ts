import { defineConfig } from 'vite'
import { builtinModules } from 'module'
import honoPreset from '@hono/vite-build/node'

export default defineConfig({
  plugins: [
    honoPreset({
      entry: 'src/index.ts',
      output: 'dist/index.js',
    })
  ],
  build: {
    // Node.jsの組み込みモジュール（fs, pathなど）をバンドル対象から外す
    rollupOptions: {
      external: [...builtinModules, ...builtinModules.map(m => `node:${m}`)],
    }
  }
})
