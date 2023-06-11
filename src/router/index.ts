import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { IsLoggedInGuard, requireAuthFlag } from './auth/IsLoggedInGuard';
import MainLayout from '@/views/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/app',
      name: 'home',
      component: MainLayout,
      meta: { ...requireAuthFlag },
      children: [
        {
          path: '',
          redirect: { name: 'account' },
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('@/views/account/AccountView.vue'),
        },
        {
          name: 'group',
          path: 'group/:id',
          component: () => import('@/views/group/GroupView.vue'),
        },
        {
          name: 'join',
          path: 'join',
          component: () => import('@/views/group/JoinGroupView.vue'),
        },
        {
          name: 'create',
          path: 'create',
          component: () => import('@/views/group/CreateGroupView.vue'),
        }
      ],
    },
    {
      path: '/auth',
      name: 'authorization',
      children: [
        {
          path: '',
          redirect: { name: 'home' },
        },
        {
          path: 'register',
          name: 'signUp',
          component: () => import('../views/auth/signUp.vue'),
        },
        {
          path: 'login',
          name: 'signIn',
          component: () => import('../views/auth/signIn.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'infoHome',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        ...requireAuthFlag,
      }
    },
  ],
})

router.beforeEach(IsLoggedInGuard);

export default router
