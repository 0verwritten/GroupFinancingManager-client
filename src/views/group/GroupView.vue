<template>
  <header>
    <h1>
      Group Name 
      <span v-if="groupData.members?.length">
        ({{ groupData.members?.length }} members)
      </span>
    </h1>
    <a    class="settings-btn cursor-pointer"
          v-if="groupData?.secret_code"
          @click.prevent="copySecret()"
        >(Copy secret code)
    </a>
    <!-- <a
      href="./group-settings.html"
      class="settings-btn"
      >Settings</a
    > -->
    <a
      href="./group-settings.html"
      class="settings-btn"
      v-if="groupData?.is_owner"
      @click.prevent="deleteGroup()"
      >Видалити</a
    >
  </header>
  <main>
    <section class="chat settings_info_block">
      <h2>Users:</h2>
      <ul class="flex flex-col gap-3">
        <div
          v-for="user in groupData?.members"
          :key="user.id"
        >
          <TheButton
            :type="TheButtonType.Secondary"
            v-if="groupData.members?.length > 1 && groupData?.is_owner"
            @click="handleKickUser(user.id)"
            class="leading-6"
          >
            X
          </TheButton>
          {{ user.first_name }} {{ user.last_name }}
        </div>
        <div v-if="groupData.members && !groupData.members?.length">No users</div>
        <hollow-dots-spinner
          v-if="!groupData.members"
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
import { toast } from 'vue3-toastify';
import AllRightsReserved from '@/components/AllRightsReserved.vue'
import type { GroupClientService } from '@/services/group-client.service'
import type { Group } from '@/interfaces/group-info.interface'
import { HollowDotsSpinner } from 'epic-spinners'
import { useRoute } from 'vue-router'
import { inject, ref } from 'vue'
import TheButton from '@/components/reusable/TheButton/TheButton.vue'
import { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model'
import router from '@/router'
import { authStore } from '@/stores/authorization'

const groupClient = inject<GroupClientService>('groupClient')!
const route = useRoute()
let groupData = ref({members: []} as Group)


groupClient.getGroupInfo(parseInt(route.params.id as string)).then((response) => {
  if (!response.isOk()) {
    router.push({ name: 'account' })
  } else {
    groupData.value = response.data
  }
})

const handleKickUser = (user_id: number) => {
  if(user_id == authStore().getUser['user_id']) {
    toast.error("You cannot delete yourself !");
    return;
  }
  
  groupClient.kickUser(groupData.value.id, [user_id]).then(() => {
    groupData.value.members = groupData.value.members.filter((user) => user.id !== user_id)
    toast.success("Deleted Successful !");

  })
}

const copySecret = () => {
  navigator.clipboard.writeText(groupData.value.secret_code)
  toast.success('Secret code copied to clipboard');
}

const deleteGroup = () => {
  groupClient.deleteGroup(groupData.value.id).then(() => router.push({ name: 'account' }))
}
</script>
