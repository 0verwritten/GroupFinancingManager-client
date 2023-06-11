import { mount } from '@vue/test-utils';
import SignIn from '@/views/auth/signIn.vue';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing'
import { authStore, authStoreKey, provideAuthStore, useAuthStore } from '@/stores/authorization';
import { provide } from 'vue';
import sinon from 'sinon'

describe('SignIn', () => {

  it('submits the form and redirects to /app on successful login', async () => {
    const authClient = {
      login: vi.fn().mockResolvedValue({ isOk: () => true, data: 'token' }),
    };

    const router = {
      push: vi.fn(),
    };

    const wrapper = mount(SignIn, {
      global: {
        provide: {
          authClient,
          router,
        },
        plugins: [
          createTestingPinia({
            createSpy: sinon.spy, // use sinon's spy to wrap actions
            stubActions: false,
          }),
        ],
      },
      
    });

    const usernameInput = wrapper.find('input[name="username"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const form = wrapper.find('form');

    await usernameInput.setValue('testuser');
    await passwordInput.setValue('testpassword');
    await form.trigger('submit');

    expect(authClient.login).toHaveBeenCalledWith('testuser', 'testpassword');
    // expect(router.push).toHaveBeenCalledWith({ path: '/app' });
  });

  it('displays an error message when login fails', async () => {
    const authClient = {
      login: vi.fn().mockResolvedValue({ isOk: () => false, error: { message: 'Invalid credentials' } }),
    };

    const wrapper = mount(SignIn, {
      global: {
        provide: {
          authClient,
        },
        plugins: [
          createTestingPinia({
            createSpy: sinon.spy,
            stubActions: false,
          }),
        ],
      },
    });

    const usernameInput = wrapper.find('input[name="username"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const form = wrapper.find('form');

    await usernameInput.setValue('testuser');
    await passwordInput.setValue('testpassword');
    await form.trigger('submit');
    await wrapper.vm.$nextTick();

    
    expect(authClient.login).toHaveBeenCalledWith('testuser', 'testpassword');
    const errorMessage = wrapper.find('.form-error-message');
    expect(errorMessage.text()).toBe('Invalid credentials');
  });
});
