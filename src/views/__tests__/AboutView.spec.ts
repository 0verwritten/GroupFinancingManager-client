import { shallowMount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'


describe('AboutView.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'This is an about page'
    const wrapper = shallowMount(AboutView, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
