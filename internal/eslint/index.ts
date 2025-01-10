import { defineConfig } from 'eslint-define-config'

export default defineConfig({
  extends: ['plugin:vue/vue3-essential', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
})
