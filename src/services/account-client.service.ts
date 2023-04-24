import type { Token } from "@/interfaces/token.interface";
import type { ApiResponse, ApiService } from "./api-base";
import type { UserProfile } from "@/interfaces/user-profile.interface";
import type { GroupShortInfo } from "@/interfaces/group-short-info.interface";

export class AccountClientService {
    constructor(private readonly apiClient: ApiService) {
    }

    getUserProfile(): Promise<ApiResponse<UserProfile>> {
        return this.apiClient.get('/user');
    }

    getGroupsList(): Promise<ApiResponse<GroupShortInfo[]>> {
        return this.apiClient.get('/group/list');
    }
}