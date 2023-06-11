<template>
    <header>
      <h1>Make transaction</h1>
    </header>
    <main>
      <section class="flex">
        <form
          class="form-control"
          @submit.prevent="submit()"
        >
          <input
            class="text-input"
            placeholder="Amount amount"
            type="number"
            v-model="amount"
            name="name"
            required
          />
          <input
            class="text-input"
            placeholder="Description"
            type="text"
            v-model="description"
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
  import { useRoute } from 'vue-router'
  import TheButton from '@/components/reusable/TheButton/TheButton.vue'
  import { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model'
  import router from '@/router';
  
  let amount = 0;
  let description = '';
  let isLoading = false;
  
  const route = useRoute()
  const groupClient = inject<GroupClientService>('groupClient')!

  const submit = () => {
      isLoading = true;
      groupClient.makePurchase(parseInt(route.params.id as string), amount, description).then((response) => {
          console.log(response)
          isLoading = false;
          router.push({ name: 'group', 'params': { id: route.params.id } })
      })
  
  }
  </script>
  