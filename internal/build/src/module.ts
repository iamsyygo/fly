import { resolve } from 'path'
import { distPath, packagesPath } from '@spark/internal-utils'
import type { ModuleFormat, OutputOptions } from 'rollup'

export const buildOptions: Partial<Record<ModuleFormat, OutputOptions>> = {
  es: {
    dir: resolve(distPath, 'es'),
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: packagesPath,
    entryFileNames: '[name].js',
    sourcemap: true,
  },
  cjs: {
    dir: resolve(distPath, 'lib'),
    format: 'cjs',
    preserveModules: true,
    preserveModulesRoot: packagesPath,
    exports: 'named',
    entryFileNames: '[name].js',
    sourcemap: true,
  },
}

export const buildOptionsAssembly = Object.entries(buildOptions)
