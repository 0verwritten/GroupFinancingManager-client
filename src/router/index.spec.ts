import { createRouter, createWebHistory } from 'vue-router';
import { IsLoggedInGuard, requireAuthFlag } from '@/router/auth/IsLoggedInGuard';
import MainLayout from '@/views/MainLayout.vue';
import router from '@/router/index';

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
