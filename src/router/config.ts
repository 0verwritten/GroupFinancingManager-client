import { IsLoggedInGuard } from "./auth/IsLoggedInGuard"

export const configRouter = (router: any) => {
    router.beforeEach(IsLoggedInGuard);
}