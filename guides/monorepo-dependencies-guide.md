# Monorepo 正确的依赖管理原则

## 原则

### 1、子包必须声明所有直接依赖

- 所有被直接 import/require 的包都必须在自己的 `package.json` 中声明
- 不能依赖根目录的依赖（除非是开发工具类）
- 确保包的独立性和可移植性

### 2、根目录最多只放开发工具类依赖（开发、构建、测试相关工具）

```json
{
  "devDependencies": {
    "typescript": "^4.9.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "prettier": "^2.8.0"
  }
}
```

### 3、子包的完整依赖声明，所有直接使用的依赖都要声明

```json
{
  "name": "@scope/my-package",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lodash": "^4.17.21"
  },
  "peerDependencies": {
    // 可选的 peer dependencies
  }
}
```

## 依赖检查机制

### 1、使用 dependency-check 工具

```json
{
  "scripts": {
    "check-deps": "dependency-check ./packages/**/package.json"
  }
}
```

### 2、使用 EsLint 检查依赖

```json
{
  "plugins": ["import"],
  "rules": {
    "import/no-extraneous-dependencies": "error"
  }
}
```

## 构建时的依赖处理

### 1、正确配置打包工具

```js
export default {
  external: Object.keys(pkg.dependencies || {}),
  // 确保依赖不被打包，而是作为外部依赖
}
```

### 2、添加依赖检查脚本

```bash
#!/bin/bash
# check-dependencies.sh
for pkg in packages/*/; do
  cd $pkg
  # 检查所有 import 语句是否都在 package.json 中声明
  dependency-check package.json src/**/*.{js,ts,tsx}
  cd ../..
done
```

## CI/CD 流程中的检查

```yaml
name: Check Dependencies
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Check dependencies
        run: |
          pnpm install
          pnpm run check-deps
```
