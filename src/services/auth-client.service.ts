import type { Token } from "@/interfaces/token.interface";
import type { ApiResponse, ApiService } from "./api-base";
import type { CreateUserProfile } from "@/interfaces/create-user-profile.interface";

export class AuthClientService {
    constructor(private readonly apiClient: ApiService) {
    }

    public login(username: string, password: string): Promise<ApiResponse<Token>> {
        return this.apiClient.post('/user/login', { username, password })
    }
    public register(username: string, password: string): Promise<ApiResponse<CreateUserProfile>> {
        return this.apiClient.post('/auth/register', { username, password })
    }
    public logout(): Promise<ApiResponse<null>> {
        return this.apiClient.get('/auth/logout')
    }
    public refreshToken(input: Token): Promise<ApiResponse<Token>> {
        return this.apiClient.post('/auth/refresh', input)
    }
    // forgotPassword(email: string) {
    //     return this.apiClient.post('/auth/forgot-password', { email })
    // }
    // resetPassword(token: string, password: string) {
    //     return this.apiClient.post('/auth/reset-password', { token, password })
    // }
    // verifyEmail(token: string) {
    //     return this.apiClient.post('/auth/verify-email', { token })
    // }
    // resendVerificationEmail(email: string) {
    //     return this.apiClient.post('/auth/resend-verification-email', { email })
    // }
}