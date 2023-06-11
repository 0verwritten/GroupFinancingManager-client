<template>
  <header>
    <h1>Account Page</h1>
  </header>
  <section class="settings_info_block">
    <h2>User Info</h2>
    <div class="w-fit flex flex-col gap-2">
      <p>Name: {{ first_name }} {{ last_name }}</p>
      <p>Email: {{ email }}</p>
    </div>
  </section>
  <section class="settings_info_block">
    <h2>Groups</h2>
    <div
      v-for="group in group_list"
      :key="group.id"
    >
      <TheRoutedButton
        :type="TheButtonType.Link"
        :to="{ name: 'group', params: { id: group.id } }"
        :style="{ padding: '0' }"
      >
        {{ group.name }}
      </TheRoutedButton>
    </div>

    <span v-if="group_list.length === 0">You are not a member of any groups</span>
  </section>
  <AllRightsReserved />
</template>

<script setup lang="ts">
import AllRightsReserved from '@/components/AllRightsReserved.vue'
import type { AccountClientService } from '@/services/account-client.service'
import TheRoutedButton from '@/components/reusable/TheRoutedButton/TheRoutedButton.vue'
import { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model'
import type { GroupShortInfo } from '@/interfaces/group-short-info.interface'
import { inject, nextTick } from 'vue'

let first_name = 'Loading...'
let last_name = 'Loading...'
let email = 'Loading...'
let group_list: GroupShortInfo[] = []

const apiClient = inject<AccountClientService>('accountClient')!
const fetchData = async () => {
  const [profileResponse, groupsResponse] = await Promise.all([
    apiClient.getUserProfile(),
    apiClient.getGroupsList()
  ]);
  {
    const response = profileResponse
    if (!response.isOk()) {
      console.error(response.error)
    } else {
      const data = response.data
      first_name = data.first_name
      last_name = data.last_name
      email = data.email
    }
  }
  {
    const response = groupsResponse
    if (!response.isOk()) {
      console.error(response.error)
    } else {
      const data = response.data
      group_list = data
    }
  }
};

nextTick(async () => {
  return fetchData()
})
</script>
