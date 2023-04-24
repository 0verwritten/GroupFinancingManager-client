import { authStore, useAuthStore } from "@/stores/authorization";
import type { NavigationGuardWithThis, RouteLocationNamedRaw } from "vue-router";

export const requireAuthFlag = { requiresAuth: true };

export const IsLoggedInGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
    if (to.meta.requiresAuth && !authStore().isAuthenticated) {
      next( { name: "signIn"} as RouteLocationNamedRaw );
    } else {
      next();
    }
  };