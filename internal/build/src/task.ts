import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { target } from '@spark/internal-constant'
import { packagesPath, rootPath } from '@spark/internal-utils'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import { glob } from 'fast-glob'
import { resolve } from 'path'
import { Plugin, rollup } from 'rollup'
import del from 'rollup-plugin-delete'
import esbuild from 'rollup-plugin-esbuild'
import { buildOptionsAssembly } from './module'
const plugins: Plugin[] = [
  vue({
    isProduction: true,
  }),
  jsx(),
  nodeResolve({
    extensions: ['.mjs', '.js', '.json', '.ts'],
  }),
  commonjs(),
  esbuild({
    sourceMap: true,
    target,
    loaders: {
      '.vue': 'ts',
    },
  }),
  del({
    targets: resolve(rootPath, 'dist'),
    force: true,
  }),
]

async function buildPackagesHandler() {
  const input = await glob(
    ['**/*.{js,ts,vue}', '!**/style/(index|css).{js,ts,vue}'],
    {
      cwd: packagesPath,
      absolute: true,
      onlyFiles: true,
      ignore: ['**/node_modules/**', '**/dist/**', '**/__tests__/**'],
    }
  )

  const bundle = await rollup({
    input: input,
    plugins,
    external: ['vue'],
    treeshake: { moduleSideEffects: false },
  })

  //   await bundle.write({
  //     dir: resolve(rootPath, 'dist'),
  //     format: 'esm',
  //     exports: undefined,
  //     preserveModules: true,
  //     preserveModulesRoot: packagesPath,
  //     entryFileNames: '[name].js',
  //     sourcemap: true,
  //   })

  await Promise.all(
    buildOptionsAssembly.map(async ([format, options]) => {
      await bundle.write(Object.assign({}, options))
    })
  )
}

export { buildPackagesHandler }
