import { resolve } from 'path'

export const rootPath = resolve(__dirname, '../../../')
export const internalPath = resolve(rootPath, 'internal')
export const packagesPath = resolve(rootPath, 'packages')
export const componentsPath = resolve(packagesPath, 'components')
export const pluginsPath = resolve(packagesPath, 'plugins')
export const utilsPath = resolve(packagesPath, 'utils')
export const stylesPath = resolve(packagesPath, 'styles')
export const packagesDistPath = resolve(packagesPath, 'dist')
