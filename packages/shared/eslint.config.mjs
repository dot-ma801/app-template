import { globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import skipFormatting from 'eslint-config-prettier/flat'

export default [
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,tsx}'],
  },
  ...tseslint.configs.recommended,
  skipFormatting,
]
