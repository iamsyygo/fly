import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { existsSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import { glob } from 'fast-glob'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { Plugin, rollup } from 'rollup'
import del from 'rollup-plugin-delete'
import esbuild from 'rollup-plugin-esbuild'
import { packagesPath, rootPath } from '@spark/internal-utils'
import { target } from '@spark/internal-constant'
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

const getPackageDataPath = (path: string) => {
  return resolve(path, 'package.json')
}

async function buildPackagesHandler() {
  const externals = new Set<string>()

  // 获取 packagesPath 下的第一个目录路径
  const firstPackageSubDir = await glob('**', {
    cwd: packagesPath,
    absolute: true,
    onlyFiles: false,
    deep: 1,
    ignore: ['**/node_modules/**', '**/dist/**', '**/__tests__/**'],
  })

  firstPackageSubDir.forEach(async (path) => {
    const packageDataPath = getPackageDataPath(path)
    // If file not exists, skip
    if (!existsSync(packageDataPath)) return
    const packageData = await readFile(packageDataPath, 'utf-8')
    const { devDependencies = {}, dependencies = {} } = JSON.parse(packageData)
    Object.keys(devDependencies)
      .concat(Object.keys(dependencies))
      .forEach((key) => {
        externals.add(key)
      })
  })

  const input = await glob(
    ['**/*.{js,ts,vue}', '!**/style/(index|css).{js,ts,vue}'],
    {
      cwd: packagesPath,
      absolute: true,
      onlyFiles: true,
      ignore: ['**/node_modules/**', '**/dist/**', '**/__tests__/**'],
    },
  )

  const bundle = await rollup({
    input,
    plugins,
    external: Array.from(externals),
    treeshake: { moduleSideEffects: false },
  })

  await Promise.all(
    buildOptionsAssembly.map(async ([_format, options]) => {
      await bundle.write(Object.assign({}, options))
    }),
  )
}

export { buildPackagesHandler }
