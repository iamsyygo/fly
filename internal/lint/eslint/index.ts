/* eslint-disable */
// @ts-nocheck
import { FlatCompat } from '@eslint/eslintrc'
import eslintJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintPluginEslintComments from 'eslint-plugin-eslint-comments'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import eslintPluginMarkdown from 'eslint-plugin-markdown'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

import globals from 'globals'
import jsoncParser from 'jsonc-eslint-parser'
import vueParser from 'vue-eslint-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const ignores = [
  '**/dist/**',
  '**/node_modules/**',
  'pnpm-lock.yaml',
  'CHANGELOG.md',
  'eslint.config.js',
  '!.*',
]
export default [
  {
    // 全局配置
    ignores,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },

  // 通用配置
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'],
    ignores,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      'eslint-comments': eslintPluginEslintComments,
      vue: eslintPluginVue,
      markdown: eslintPluginMarkdown,
      jsonc: eslintPluginJsonc,
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx'] },
      },
    },
    rules: {
      // js/ts
      camelcase: ['error', { properties: 'never' }],
      'no-debugger': 'warn',
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
      'no-return-await': 'error',
      'no-var': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'prefer-const': [
        'warn',
        { destructuring: 'all', ignoreReadBeforeAssign: true },
      ],
      'prefer-arrow-callback': [
        'error',
        { allowNamedFunctions: false, allowUnboundThis: true },
      ],
      'object-shorthand': [
        'error',
        'always',
        { ignoreConstructors: false, avoidQuotes: true },
      ],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',

      // best-practice
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'no-alert': 'warn',
      'no-case-declarations': 'error',
      'no-multi-str': 'error',
      'no-with': 'error',
      'no-void': 'error',

      'sort-imports': [
        'warn',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],

      // ts
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': false }],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // 忽略以_开头的参数
          varsIgnorePattern: '^_', // 忽略以_开头的变量
          destructuredArrayIgnorePattern: '^_', // 忽略解构中以_开头的变量
        },
      ],

      // prettier
      'prettier/prettier': 'error',

      // import
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'vue', group: 'external', position: 'before' },
            { pattern: '@vue/**', group: 'external', position: 'before' },
            { pattern: '@spark/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['type'],
        },
      ],
      'no-restricted-imports': [
      'error',
      {
        paths: [
          { name: 'lodash', message: 'Use lodash-unified instead.' },
          { name: 'lodash-es', message: 'Use lodash-unified instead.' },
        ],
        patterns: [
          {
            group: ['lodash/*', 'lodash-es/*'],
            message: 'Use lodash-unified instead.',
          },
        ],
      },
    ],

      // eslint-comments
      'eslint-comments/disable-enable-pair': [
        'error',
        { allowWholeFile: true },
      ],

      // code line
      'max-lines': ['error', 200],
      'max-lines-per-function': ['error', 100],
      'max-params': ['error', 4],
      'max-depth': ['error', 5],
      'max-nested-callbacks': ['error', 5],
      'max-statements': ['error', 10],
    },
  },
  // Object.assign({}, eslintJs.configs.recommended, {
  //   ignores,
  // }),
  // ...compat
  //   .extends('plugin:@typescript-eslint/recommended')
  //   //@ts-expect-error EsLint 9 配置
  //   .map((config) => Object.assign({}, config, { ignores })),
  // Object.assign({}, eslintPluginImport.configs.recommended, {
  //   ignores,
  // }),
  // eslintPluginVue.configs['vue3-recommended'],

  // Object.assign({}, tseslint.configs.recommended, {
  //   ignores,
  // }),

  

  ...eslintPluginVue.configs['flat/essential'].map((config) =>
    Object.assign({}, config, { ignores }),
  ),
  // ...compat.extends('plugin:vue/vue3-recommended'),

  // Vue 文件配置
  {
    files: ['**/*.vue'],
    ignores,
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      vue: eslintPluginVue,
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
    },
    rules: {
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],

      // 'vue/require-v-for-key': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/prefer-import-from-vue': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'no-undef': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { disallowTypeAnnotations: false },
      ],
    },
  },

  // JSON 文件配置
  {
    files: ['*.json', '*.json5', '*.jsonc'],
    ignores,
    languageOptions: {
      parser: jsoncParser,
    },
  },

  // package.json 特殊配置
  {
    files: ['package.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      jsonc: eslintPluginJsonc,
    },
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '^$',
          order: [
            'name',
            'version',
            'private',
            'packageManager',
            'description',
            'type',
            'keywords',
            'homepage',
            'bugs',
            'license',
            'author',
            'contributors',
            'funding',
            'files',
            'main',
            'module',
            'exports',
            'unpkg',
            'jsdelivr',
            'browser',
            'bin',
            'man',
            'directories',
            'repository',
            'publishConfig',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'optionalDependencies',
            'dependencies',
            'devDependencies',
            'engines',
            'config',
            'overrides',
            'pnpm',
            'husky',
            'lint-staged',
            'eslintConfig',
          ],
        },
        {
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
          order: { type: 'asc' },
        },
      ],
    },
  },

  // 测试文件配置
  {
    files: ['**/__tests__/**'],
    ignores,
    rules: {
      'no-console': 'off',
      'vue/one-component-per-file': 'off',
    },
  },

  // .d.ts 文件配置
  {
    files: ['*.d.ts'],
    ignores,
    rules: {
      'import/no-duplicates': 'off',
    },
  },
]
