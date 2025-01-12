import { mount as _mount } from '@vue/test-utils'
import type { MountingOptions } from '@vue/test-utils'
import type { Component } from 'vue'

export const mount = <T extends Component>(
  component: T,
  options?: MountingOptions<any>,
) => {
  // @ts-ignore
  return _mount(component, {
    ...options,
    // 可以在这里添加全局配置
  })
}

export * from '@vue/test-utils'
