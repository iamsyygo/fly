import { pascalCase } from 'unplugin-vue-components'
import { esmDir, libDir, pkg, pkgShorthandName } from '@fly/internal-constant'
import type { ComponentResolver } from 'unplugin-vue-components'
export * from 'unplugin-vue-components'

const isModule = process.env.npm_package_type === 'module'
const format = isModule ? esmDir : libDir

export const resolver: ComponentResolver = {
  resolve: (name) => {
    return {
      name: pascalCase(`${pkgShorthandName}-${name}`),
      //   as: `${pkg}/${format}`,
      from: `${pkg}/${format}`,
      sideEffects: [`${pkg}/${format}/style/${name}.scss`],
    }
  },
  type: 'component',
}
