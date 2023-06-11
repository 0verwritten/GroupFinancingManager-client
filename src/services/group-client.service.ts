import type { Token } from "@/interfaces/token.interface";
import type { ApiResponse, ApiService } from "./api-base";
import type { Group } from "@/interfaces/group-info.interface";
import type { GroupSensitiveInfo } from "@/interfaces/group-sensitive.interface";

export class GroupClientService {
    constructor(private readonly apiClient: ApiService) {
    }

    public getGroupInfo(groupId: number): Promise<ApiResponse<Group>> {
        return this.apiClient.get(`/group/${groupId}`);
    }

    public joinGroup(secret_key: string): Promise<ApiResponse<number>> {
        return this.apiClient.post(`/group/join`, {secret_key});
    }
    
    public updateGroup(groupId: number, groupName: string): Promise<ApiResponse<Token>> {
        return this.apiClient.put(`/group/${groupId}`, { name: groupName });
    }

    public leaveGroup(groupId: number): Promise<ApiResponse<Token>> {
        return this.apiClient.get(`/group/${groupId}/leave`);
    }

    public createGroup(groupName: string): Promise<ApiResponse<GroupSensitiveInfo>> {
        return this.apiClient.post(`/group`, { name: groupName });
    }

    public deleteGroup(groupId: number): Promise<ApiResponse<Token>> {
        return this.apiClient.delete(`/group/${groupId}`);
    }

    public kickUser(groupId: number, userIdList: number[]): Promise<ApiResponse<Token>> {
        return this.apiClient.delete(`/group/${groupId}/kick`, { users: userIdList });
    }

    public makePurchase(groupId: number, cost: number, name: string): Promise<ApiResponse<any>> {
        return this.apiClient.post(`/group/${groupId}/purchase`, { cost, name });
    }

    public deletePurchase(groupId: number, purchaseId: number): Promise<ApiResponse<Token>> {
        return this.apiClient.delete(`/group/${groupId}/purchase/${purchaseId}`);
    }

    // public makePayment(groupId: number, amount: number, description: string): Promise<ApiResponse<Token>> {
    //     return this.apiClient.post(`/group/${groupId}/payment`, { amount, description });
    // }
}
