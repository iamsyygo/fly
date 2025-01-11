import { defineBuildConfig } from 'unbuild'
import { devDependencies } from './package.json'

export default defineBuildConfig({
  entries: ['./eslint/index.ts', './stylelint/index.ts', './index.ts'],
  //   declaration: true,
  externals: Object.keys(devDependencies).concat(['eslint', 'path', 'url']),
  // watch: true,
  rollup: {
    emitCJS: true,
  },
})
