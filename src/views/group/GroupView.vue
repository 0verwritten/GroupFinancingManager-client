<template>
  <header>
    <h1>Group Name (3 members)</h1>
    <!-- <a
      href="./group-settings.html"
      class="settings-btn"
      >Settings</a
    > -->
    <a
      href="./group-settings.html"
      class="settings-btn"
      @click.prevent="deleteGroup()"
      >Видалити</a
    >
  </header>
  <main>
    <section class="chat settings_info_block">
      <h2>Users:</h2>
      <ul class="flex flex-col gap-3">
        <div
          v-for="user in (groupData ?? []).members"
          :key="user.id"
        >
          <TheButton
            :type="TheButtonType.Secondary"
            @click.prevent="handleKickUser(user.id)"
            class="h-fit"
          >
            X
          </TheButton>
          {{ user.first_name }} {{ user.last_name }}
        </div>
        <div v-if="groupData.members && !groupData.members?.length">No users</div>
        <hollow-dots-spinner
          v-if="!groupData.members || true"
          :animation-duration="1000"
          :dot-size="15"
          :dots-num="3"
          color="#fff"
        />
      </ul>
    </section>
    <!-- <section class="chat settings_info_block">
      <h2>Chat</h2>
      <ul>
        <li><strong>John:</strong> Hi everyone!</li>
        <li><strong>Jane:</strong> Hello John!</li>
        <li><strong>Mark:</strong> Hey guys, what's up?</li>
      </ul>
    </section>
    <section class="transactions settings_info_block">
      <h2>Transactions</h2>
      <ul>
        No transactions yet
      </ul>
    </section> -->
  </main>
  <AllRightsReserved />
</template>
<script setup lang="ts">
import AllRightsReserved from '@/components/AllRightsReserved.vue'
import type { GroupClientService } from '@/services/group-client.service'
import type { Group } from '@/interfaces/group-info.interface'
import { HollowDotsSpinner } from 'epic-spinners'
import { useRoute } from 'vue-router'
import { inject, ref, watch } from 'vue'
import TheButton from '@/components/reusable/TheButton/TheButton.vue'
import { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model'
import router from '@/router'

const groupClient = inject<GroupClientService>('groupClient')!
const route = useRoute()
let groupData = ref({} as Group)

watch(groupData, (val) => {
  console.log(val, 'update')
})

groupClient.getGroupInfo(parseInt(route.params.id as string)).then((response) => {
  if (!response.isOk()) {
    console.error(response.error)
  } else {
    groupData.value = response.data
    console.log(groupData)
  }
})

const handleKickUser = async (user_id: number) => {
  groupClient.kickUser(groupData.value.id, [user_id])

  groupData.value.members = groupData.value.members.filter((user) => user.id !== user_id)
}

const deleteGroup = () => {
  groupClient.deleteGroup(groupData.value.id).then(() => router.push({ name: 'account' }))
}
</script>