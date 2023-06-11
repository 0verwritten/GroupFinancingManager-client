import { createRouter, createWebHistory } from 'vue-router';

import { IsLoggedInGuard, requireAuthFlag } from '@/router/auth/IsLoggedInGuard';
import MainLayout from '@/views/MainLayout.vue';
import HomeView from '../views/HomeView.vue'
import App from '@/App.vue';
import sinon from 'sinon'
import router from '@/router/index';

import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutViewVue from '@/views/AboutView.vue';
import { createTestingPinia } from '@pinia/testing';
import signInVue from '@/views/auth/signIn.vue';
import { provideAuthStore, useAuthStore } from '@/stores/authorization';

beforeEach(() => {
  provideAuthStore();
})

describe('Router', () => {
  it('navigates to home view when accessing /', async () => {
    const app = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await router.push('/');
    await router.isReady();

    expect(app.findComponent(HomeView).exists()).toBe(true);
  });

  it('navigates to about view when accessing /about unauthorized', async () => {
    const app = mount(App, {
      global: {
        plugins: [router],
      },
      plugins: [
        createTestingPinia({
          createSpy: sinon.spy, // use sinon's spy to wrap actions
          stubActions: false,
        }),
      ],      
    });

    await router.push('/about');
    await router.isReady();

    expect(app.findComponent(signInVue).exists()).toBe(true);
  });


  it('navigates to about view when accessing /about', async () => {
    const app = mount(App, {
      global: {
        plugins: [router],
      },
      plugins: [
        createTestingPinia({
          createSpy: sinon.spy, // use sinon's spy to wrap actions
          stubActions: false,
        }),
      ],      
    });
    const store = useAuthStore();
    console.log(store)
    // store().setTokens({ accessToken: 'test', refreshToken: 'test' });

    await router.push('/about');
    await router.isReady();

    console.log(app.html());

    expect(app.findComponent(AboutViewVue).exists()).toBe(true);
  });

  // More test cases...
});


describe('Vue Router Configuration', () => {
  it('should have the correct route for home', () => {
    expect(router.hasRoute('home')).toBe(true);
    const homeRoute = router.getRoutes().find((route) => route.name === 'home');
    expect(homeRoute.path).toEqual('/app');
    expect(homeRoute.name).toEqual('home');
    console.log(homeRoute.components);
    // expect(homeRoute!.components!.home).toEqual(MainLayout);
    expect(homeRoute.meta).toStrictEqual({ ...requireAuthFlag });
  });

  it('should have the correct route for account', () => {
    expect(router.hasRoute('account')).toBe(true);
    // const accountRoute = router.getRoutes('account');
    // expect(accountRoute.path).toEqual('/app/account');
    // expect(accountRoute.name).toEqual('account');
    // expect(accountRoute.component).toBe.a('function'); // Assuming import('@/views/account/AccountView') returns a function
  });

  it('should have the correct route for group', () => {
    expect(router.hasRoute('group')).toBe(true);
    // const groupRoute = router.getRoutes('group', { id: '123' });
    // expect(groupRoute.path).toEqual('/app/group/123');
    // expect(groupRoute.name).toEqual('group');
    // expect(groupRoute.component).toBe.a('function'); // Assuming import('@/views/group/GroupView') returns a function
  });

  // Add more tests for other routes as needed
});
