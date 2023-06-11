<template>
  <DialogContainer title="SignIn">
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
        placeholder="Password"
        type="password"
        v-model="password"
        name="password"
        required
      />
      <span class="form-error-message">
        {{ error }}
      </span>
      <TheButton
        :pass-props="{type: 'submit'}"
        :type="TheButtonType.Primary"
        :is-loading="isLoading"
        class="btn-submit"
      >
        Sign In
      </TheButton>
    </form>
    <p class="form_hint">
      Don't have an account?
      <a href="signup.html">Sign Up</a>
      or
      <a href="./index.html">Go back</a>
    </p>
  </DialogContainer>
</template>

<script lang="ts">
import DialogContainer from '@/components/reusable/DialogContainer/DialogContainer.vue'
import { defineComponent, inject } from 'vue'
import { useAuthStore } from '@/stores/authorization';
import type { AuthClientService } from '@/services/auth-client.service';
import { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model';
import TheButton from '@/components/reusable/TheButton/TheButton.vue';
import router from '@/router';

export default defineComponent({
  props: {},
  setup() {
    return {
      username: '',
      password: '',
      authClient: inject<AuthClientService>('authClient')!,
      authStore: useAuthStore(),
      TheButtonType
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
      if (this.username === '' || this.password === '') {
        return
      }
      this.isLoading = true;
      const response = await this.authClient.login(this.username, this.password);
      this.isLoading = false;

      if (!response.isOk()) {
        this.error = response.error?.message || 'Unknown error';
        return;        
      }
      this.error = '';
      // this.authStore!().setTokens(response.data);
      router.push({ path: '/app' });
    },
  },
  components: { DialogContainer, TheButton },
})
</script>
