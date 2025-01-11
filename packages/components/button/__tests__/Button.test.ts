import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from '../src/Button.vue'

describe('Button.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Test Button',
      },
    })

    expect(wrapper.text()).toBe('Test Button')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)

    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
