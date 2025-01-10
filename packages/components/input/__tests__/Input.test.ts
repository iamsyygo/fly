import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { Input } from '..'

describe('Input', () => {
  it('updates model value on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('hello')

    expect(wrapper.props('modelValue')).toBe('hello')
  })

  it('emits focus event', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    })

    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
  })

  it('emits blur event', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    })

    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        disabled: true,
      },
    })

    const input = wrapper.find('input')
    expect(input.element.disabled).toBe(true)
  })
})
