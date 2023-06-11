import { mount } from '@vue/test-utils'
import TheRoutedButtonVue from '../TheRoutedButton.vue'
import TheButton from '@/components/reusable/TheButton/TheButton.vue'
import { describe, expect, it } from 'vitest'

// Your tests will be written here

describe('TheButtonWrapper', () => {
  it('emits click event when clicked', async () => {
    const wrapper = mount(TheRoutedButtonVue, {
      props: {
        type: 'primary',
        to: { path: '/example' },
      },
    })

    await wrapper.findComponent(TheButton).trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()

    const buttonClass = wrapper.vm.buttonClass;

    expect(buttonClass).toBe('btn-primary');

  })
})
