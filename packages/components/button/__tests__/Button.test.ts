import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { Button } from '..'

describe('Button', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  it('applies correct class based on type prop', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'secondary',
      },
    })
    expect(wrapper.classes()).toContain('spark-button--secondary')
  })
})
