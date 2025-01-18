import { readFileSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
// import inspect from 'vite-plugin-inspect'
import Components, { pascalCase } from 'unplugin-vue-components'
import { pkg } from '@fly/internal-constant'
import { componentsPath } from '@fly/internal-utils'
import type { ComponentResolver } from 'unplugin-vue-components'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const resolver: ComponentResolver = {
  resolve: async (name) => {
    if (!name.startsWith(pascalCase(pkg))) return

    const content = await readFileSync(
      resolve(__dirname, 'components.d.ts'),
      'utf-8',
    )

    if (!content.includes(name)) {
      // export interface GlobalComponents {
      const match = content.replace(
        /export interface GlobalComponents \{/,
        `export interface GlobalComponents {
    ${name}: (typeof import('${componentsPath}'))['${name}']`,
      )
      writeFileSync(resolve(__dirname, 'components.d.ts'), match)
    }

    return {
      name,
      // as: `${pkg}/${format}`,
      from: `${pkg}/es`,
      // sideEffects: [`${pkg}/es/style/${name}.scss`],
    }
  },
  type: 'component',
}

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "/styles/custom.scss" as *;`,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^fly(\/(es|lib))?$/,
        replacement: resolve(componentsPath, 'index.ts'),
      },
      // {
      //   find: /^element-plus\/(es|lib)\/(.*)$/,
      //   replacement: `${pkgRoot}/$2`,
      // },
    ],
  },
  server: {
    // port: 3000,
    host: true,
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    vue(),
    jsx(),
    Components.vite({
      include: `${__dirname}/**`,
      resolvers: [resolver],
      dts: false,
    }),
    // inspect(),
  ],

  optimizeDeps: {
    include: ['vue', '@vue/shared'],
  },
  esbuild: {
    target: 'chrome64',
  },
})
