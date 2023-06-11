<template>
  <DialogContainer title="SignUn">
    <form
      class="form-control"
      @submit.prevent="submit()"
    >
      <input
        class="text-input"
        placeholder="Username"
        type="text"
        v-model="username"
        name="username"
        required
      />

      <input
        class="text-input"
        placeholder="First Name"
        type="text"
        v-model="first_name"
        name="first_name"
        required
      />

      <input
        class="text-input"
        placeholder="Last Name"
        type="text"
        v-model="last_name"
        name="last_name"
        required
      />

      <input
        class="text-input"
        placeholder="Email"
        type="email"
        v-model="email"
        name="email"
        required
      />
      <input
        class="text-input"
        placeholder="Password"
        type="password"
        v-model="password"
        name="password"
        required
      />
      <input
        class="text-input"
        placeholder="Repeat Password"
        type="password"
        v-model="repassword"
        required
      />
      <span class="form-error-message">
        {{ error }}
      </span>
      <TheButton
        :pass-props="{ type: 'submit' }"
        :type="TheButtonType.Primary"
        :is-loading="isLoading"
        class="btn-submit"
      >
        Sign In
      </TheButton>
    </form>
    <p class="form_hint">
      Don't have an account?
      <router-link to="login">Sign In</router-link>
      or
      <router-link to="/">Go back</router-link>
    </p>
  </DialogContainer>
</template>

<script lang="ts">
import DialogContainer from '@/components/reusable/DialogContainer/DialogContainer.vue'
import { defineComponent, inject } from 'vue'
import { useAuthStore } from '@/stores/authorization'
import type { AuthClientService } from '@/services/auth-client.service'
import { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model'
import TheButton from '@/components/reusable/TheButton/TheButton.vue'
import router from '@/router'

type SignUpForm = {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  repassword: string
}

type Services = {
  authClient: AuthClientService
  authStore: ReturnType<typeof useAuthStore>
  TheButtonType: typeof TheButtonType
}

export default defineComponent({
  props: {},
  setup() {
    return {
      username: '111',
      first_name: '111',
      last_name: '111',
      email: '1@111.1',
      password: '111111',
      repassword: '111111',
      authClient: inject<AuthClientService>('authClient')!,
      authStore: useAuthStore(),
      TheButtonType,
    }
  },
  data() {
    return {
      error: '',
      isLoading: false,
    }
  },
  methods: {
    async submit() {
      if (this.password !== this.repassword) {
        this.error = 'Password does not match'
        return
      }

      if (
        this.username === '' &&
        this.first_name === '' &&
        this.last_name === '' &&
        this.email === '' &&
        this.password === ''
      ) {
        return
      }
      this.isLoading = true
      console.log({
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
      });
      const response = await (this.authClient as AuthClientService).register({
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
      })
      this.isLoading = false

      if (!response.isOk()) {
        this.error = response.error?.message || 'Unknown error'
        return
      }
      this.error = ''
      router.push({ path: '/auth/login' })
    },
  },
  components: { DialogContainer, TheButton },
})
</script>
