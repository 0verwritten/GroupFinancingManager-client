import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AboutView from '@/views/AboutView.vue';

describe('AboutView', () => {
  it('renders the correct message', () => {
    const wrapper = shallowMount(AboutView);
    const heading = wrapper.find('h1');

    expect(heading.text()).toBe('This is an about page');
  });
});
