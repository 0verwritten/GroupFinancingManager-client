import { createApp, provide } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

import App from './App.vue'
import router from './router'
import { authStore, authStoreKey, provideAuthStore } from './stores/authorization'
import { AuthClientService } from '@/services/auth-client.service';
import { AccountClientService } from './services/account-client.service';
import { ApiService } from './services/api-base';
import { configRouter } from './router/config';
import { GroupClientService } from './services/group-client.service';


const app = createApp(App)

app.use(createPinia())

const apiService = new ApiService(
    import.meta.env.VITE_API_URL || 'http://localhost:9090',
    authStore
);

app.provide(authStoreKey, authStore);
app.provide('authClient', new AuthClientService(apiService));
app.provide('accountClient', new AccountClientService(apiService));
app.provide('groupClient', new GroupClientService(apiService));

configRouter(router);

app.use(router)

app.mount('#app')
