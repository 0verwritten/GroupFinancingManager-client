import { defineStore } from 'pinia'
import { type InjectionKey, provide, inject, watch } from 'vue';

import type { Token } from '../interfaces/token.interface';

export const authStore = defineStore({
  id: 'auth',
  state: (): Partial<Token> => ({
    accessToken: localStorage.getItem('token') || undefined,
    refreshToken: localStorage.getItem('refreshToken') || undefined,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getUser: (state) => {
      if (state.accessToken) {
        const tokenParts = state.accessToken.split('.');
        const encodedPayload = tokenParts[1];
        if (!encodedPayload) {
          throw 'invalid token';
        }
        const decodedPayload = atob(encodedPayload);
        return JSON.parse(decodedPayload);
      }
      return null;
    },
  },
  actions: {
    setTokens({ accessToken, refreshToken }: Token) {
      this.$state.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStorage.setItem('token', this.accessToken!);
      localStorage.setItem('refreshToken', this.refreshToken!);
    },
    clearTokens() {
      this.accessToken = undefined;
      this.refreshToken = undefined;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
    watchChanges(handler: (state: Partial<Token>) => void) {
      return watch(this, handler);
    },
  },

});

export const authStoreKey: InjectionKey<typeof authStore> = Symbol();

export const provideAuthStore = () => {
  provide(authStoreKey, authStore);
};

export const useAuthStore = () => {
  const store = inject(authStoreKey);
  if (!store) {
    throw new Error('useAuthStore must be used within a component that has provided AuthStore.');
  }
  return store;
};
