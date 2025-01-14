import { defineBuildConfig } from 'unbuild'
import { devDependencies } from './package.json'

export default defineBuildConfig({
  entries: ['./src/eslint/index.ts', './src/stylelint/index.ts', './src/index.ts'],
  externals: Object.keys(devDependencies).concat(['eslint', 'path', 'url']),
  rollup: {
    emitCJS: true,
  },
})
