<template>
    <header>
      <h1>Create group</h1>
    </header>
    <main>
      <section class="flex">
        <form
          class="form-control"
          @submit.prevent="submit()"
        >
          <input
            class="text-input"
            placeholder="Group name"
            type="text"
            v-model="group_name"
            name="name"
            required
          />
          <TheButton
            :pass-props="{ type: 'submit' }"
            :type="TheButtonType.Primary"
            :is-loading="isLoading"
            class="btn-submit"
          >
            Create
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
  
  let group_name = '';
  let isLoading = false;
  
  import router from '@/router';
  const groupClient = inject<GroupClientService>('groupClient')!
  
  const submit = () => {
      isLoading = true;
      groupClient.createGroup(group_name).then((response) => {
          console.log(response)
          isLoading = false;
          router.push({ name: 'group', 'params': { id: response.data.id } })
      })
  
  }
  </script>
  