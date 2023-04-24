import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

import type { authStore } from '@/stores/authorization';

export class ApiResponse<T> {
  constructor(private _data: AxiosResponse<T, Error> | AxiosError) {}

  public get status(): number {
    return this.isOk() ? (this._data as AxiosResponse<T, Error>).status! : (this._data as AxiosError).response?.status!;
  }

  public isOk(): boolean {
    return !(this._data instanceof AxiosError);
  }

  public get error(): Error {
    return (this._data as AxiosError).response?.data as Error;
  }

  public get data(): T {
    if (!this.isOk()) {
      throw new Error('Response is not ok');
    }

    return (this._data as AxiosResponse).data;
  }
}

export class ApiService {
  private apiClient: AxiosInstance;

  constructor(
    private readonly baseUrl: string,
    private readonly authenticationStore: typeof authStore,
  ) {
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
    });
    this.authenticationStore().watchChanges(({ accessToken }) => this.setToken(accessToken!));
    if (this.authenticationStore().accessToken){
      this.setToken(this.authenticationStore().accessToken!);
    }
  }

  private setToken(token: string) {
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  async handleResponse<R>(request: () => Promise<AxiosResponse<R, Error>>): Promise<ApiResponse<R>> {
    try {
      return new ApiResponse<R>((await request()));
    } catch (error) {
      return new ApiResponse<R>(error as AxiosError);
    }
  }

  get<T, R>(resource: string, params?: T): Promise<ApiResponse<R>> {
    return this.handleResponse(() => this.apiClient.get(resource, { params }));
  }
  
  post<T, R>(resource: string, data: T): Promise<ApiResponse<R>> {
    return this.handleResponse(() => this.apiClient.post(resource, data));
  }

  put<T, R>(resource: string, data: T): Promise<ApiResponse<R>> {
    return this.handleResponse(() => this.apiClient.put(resource, data));
  }

  delete<T, R>(resource: string, params?: T): Promise<ApiResponse<R>> {
    return this.handleResponse(() => this.apiClient.delete(resource, { params }));
  }
    
}