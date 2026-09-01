import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'


export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    // Vendored from the my-snippets component registry (see README) and this
    // file's own icon+gradient/component pairing: components intentionally
    // share a file with constants/variants/hooks, which trips
    // react-refresh's "component-only file" rule harmlessly, and the
    // primitives use the ref/effect patterns the newer react-hooks rules
    // flag by design (latest-value refs, imperative presence/animation
    // sync) rather than by mistake.
    files: [
      'src/components/ui/**/*.{ts,tsx}',
      'src/components/theme-provider.tsx',
      'src/lib/primitives/**/*.ts',
      'src/lib/cuisine-art.tsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    // The registry's own convention for an intentionally-unused prop kept
    // only to match a wrapped API's shape (e.g. recharts-shaped chart
    // sub-components) is a leading underscore.
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]);
