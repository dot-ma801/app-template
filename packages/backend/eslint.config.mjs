import sharedEslintConfig, { sharedTypeScriptEslintConfig } from '../shared/eslint.config.mjs'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'

export default [
  ...sharedEslintConfig,
  ...sharedTypeScriptEslintConfig,
  {
    ...pluginVitest.configs.recommended,
    files: ['test/**/*.{test,spec}.{ts,mts,tsx}', 'src/**/__tests__/**/*.{ts,mts,tsx}'],
  },
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
]
