import { resolve } from 'path'

export const rootPath = resolve(__dirname, '../../../')
export const internalPath = resolve(rootPath, 'internal')
export const packagesPath = resolve(rootPath, 'packages')
export const componentsPath = resolve(packagesPath, 'components')
export const distPath = resolve(rootPath, 'dist')
