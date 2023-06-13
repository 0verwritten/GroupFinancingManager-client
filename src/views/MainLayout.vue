<template>
  <div class="sidebar-container" v-bind:class="{'open': isSidebarOpen}">
    <div class="sidebar">
      <div class="logo">
        <img
          src="@/assets/imgs/another_one.svg"
          alt="logo"
        />
      </div>
      <ul class="links">
        <li>
          <TheRoutedButton 
            :type="TheButtonType.Link"
            :to="{ name: 'account' }">
            Profile
          </TheRoutedButton>
        </li>
        <!-- <li>
          <TheRoutedButton 
            :type="TheButtonType.Link"
            :to="{ name: 'groupList' }">
            Groups
          </TheRoutedButton>
        </li> -->
        <!--
        <li>
          <TheRoutedButton 
            :type="TheButtonType.Link"
            :to="{ name: 'home' }">
            Graph
          </TheRoutedButton>
        </li> -->
        <li>
          <TheRoutedButton 
            :type="TheButtonType.Link"
            :to="{ name: 'create' }">
            Create Group
          </TheRoutedButton>
        </li>
        <li>
          <TheRoutedButton 
            :type="TheButtonType.Link"
            :to="{ name: 'join' }">
            Join Group
          </TheRoutedButton>
        </li>
        <!-- <li>
          <TheRoutedButton 
            :type="TheButtonType.Link"
            :to="{ name: 'home' }">
            Settings
          </TheRoutedButton>
        </li> -->
        <li>
          <TheButton 
            :type="TheButtonType.Link"
            @click="logout"
            :tag="'span'">
            Log out
          </TheButton>
        </li>
      </ul>
      <button class="toggle-button" @click.prevent="toggleSidebar()">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
  <div class="container">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import TheRoutedButton from '@/components/reusable/TheRoutedButton/TheRoutedButton.vue'
import { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model'
import { useAuthStore } from '@/stores/authorization';
import router from '@/router';
import TheButton from '@/components/reusable/TheButton/TheButton.vue';
import { ref } from 'vue';

const authStore = useAuthStore()!;
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}

const logout = () => {
  authStore().clearTokens();
  router.push({ name: 'home' });
};
</script>