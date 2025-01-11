import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      // prettier-ignore
      [
        'feat',       // 新功能
        'fix',        // 修复
        'docs',       // 文档
        'style',      // 格式
        'refactor',   // 重构
        'perf',       // 性能
        'test',       // 测试
        'build',      // 构建
        'ci',         // CI/CD
        'chore',      // 其他
        'revert',     // 回滚
        'release',    // 发布
      ],
    ],
    'subject-case': [0], // 主题大小写不做限制
  },
  //   plugins: [
  //     {
  //       rules: {
  //         'type-empty': (parsed, when, value) => {
  //           const negated = when === 'never'
  //           const hasType = parsed.type
  //           return [
  //             negated ? hasType : !hasType,
  //             `提交信息必须以类型开头 (feat/fix/docs等)`,
  //           ]
  //         },
  //         'subject-empty': (parsed, when, value) => {
  //           const negated = when === 'never'
  //           const hasSubject = parsed.subject
  //           return [negated ? hasSubject : !hasSubject, `提交信息不能为空`]
  //         },
  //       },
  //     },
  //   ],
  //   helpUrl:
  //     '提交信息格式参考: https://www.conventionalcommits.org/zh-hans/v1.0.0/',
  //   prompt: {
  //     messages: {
  //       type: '选择你要提交的类型 :',
  //       scope: '选择一个提交范围（可选）:',
  //       subject: '填写简短精炼的变更描述 :\n',
  //       body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
  //       breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
  //       footerPrefixesSelect: '选择关联issue前缀（可选）:',
  //       customFooterPrefix: '输入自定义issue前缀 :',
  //       footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
  //       confirmCommit: '是否提交或修改commit ?',
  //     },
  //     types: [
  //       { value: 'feat', name: 'feat:     ✨ 新增功能', emoji: '✨' },
  //       { value: 'fix', name: 'fix:      🐛 修复缺陷', emoji: '🐛' },
  //       { value: 'docs', name: 'docs:     📝 文档更新', emoji: '📝' },
  //       { value: 'style', name: 'style:    💄 代码格式', emoji: '💄' },
  //       { value: 'refactor', name: 'refactor: ♻️  代码重构', emoji: '♻️' },
  //       { value: 'perf', name: 'perf:     ⚡️ 性能优化', emoji: '⚡️' },
  //       { value: 'test', name: 'test:     ✅ 测试相关', emoji: '✅' },
  //       { value: 'build', name: 'build:    📦️ 构建相关', emoji: '📦️' },
  //       { value: 'ci', name: 'ci:       🎡 持续集成', emoji: '🎡' },
  //       { value: 'chore', name: 'chore:    🔨 其他修改', emoji: '🔨' },
  //       { value: 'revert', name: 'revert:   ⏪️ 回退代码', emoji: '⏪️' },
  //     ],
  //   },
}

export default Configuration
