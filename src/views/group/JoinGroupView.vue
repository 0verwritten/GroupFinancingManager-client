<template>
  <header>
    <h1>Join group</h1>
  </header>
  <main>
    <section class="flex">
      <form
        class="form-control"
        @submit.prevent="submit()"
      >
        <input
          class="text-input"
          placeholder="Secret code"
          type="password"
          v-model="secret_code"
          name="password"
          required
        />
        <TheButton
          :pass-props="{ type: 'submit' }"
          :type="TheButtonType.Primary"
          :is-loading="isLoading"
          class="btn-submit"
        >
          Join
        </TheButton>
      </form>
    </section>
  </main>
  <AllRightsReserved />
</template>

<script setup lang="ts">
import AllRightsReserved from '@/components/AllRightsReserved.vue'
import type { GroupClientService } from '@/services/group-client.service'
import { inject } from 'vue'
import TheButton from '@/components/reusable/TheButton/TheButton.vue'
import { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model'

let secret_code = '';
let isLoading = false;

import router from '@/router';
const groupClient = inject<GroupClientService>('groupClient')!

const submit = () => {
    isLoading = true;
    groupClient.joinGroup(secret_code).then((response) => {
        isLoading = false;
        if(response.status == 200) {
          router.push({ name: 'group', params: { id: response.data } })
        }
    })

}
</script>
