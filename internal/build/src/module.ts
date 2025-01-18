import { resolve } from 'path'
import { packagesDistPath, packagesPath } from '@fly/internal-utils'
import { esmDir, libDir } from '@fly/internal-constant'
import type { ModuleFormat, OutputOptions } from 'rollup'

export const buildOptions: Partial<Record<ModuleFormat, OutputOptions>> = {
  es: {
    dir: resolve(packagesDistPath, esmDir),
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: packagesPath,
    entryFileNames: '[name].js',
    sourcemap: true,
  },
  cjs: {
    dir: resolve(packagesDistPath, libDir),
    format: 'cjs',
    preserveModules: true,
    preserveModulesRoot: packagesPath,
    exports: 'named',
    entryFileNames: '[name].js',
    sourcemap: true,
  },
}

export const buildOptionsAssembly = Object.entries(buildOptions)
