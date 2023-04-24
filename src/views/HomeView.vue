<script setup lang="ts">
import AllRightsReserved from '@/components/AllRightsReserved.vue'
import TheRoutedButton from '@/components/reusable/TheRoutedButton/TheRoutedButton.vue'
import { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model'
</script>

<template>
  <section class="coming_soon">
    <h2 class="coming_soon__title">Best group Managing application!</h2>
    <p class="coming_soon__descriprion">
      Our application is the perfect tool for groups of all sizes, from families and friend groups
      to roommates and co-workers. With features designed to simplify and streamline group finances,
      you'll wonder how you ever managed without it.
    </p>
    <div class="coming_soon__action-block">
      <TheRoutedButton
        :type="TheButtonType.Primary"
        :to="{ name: 'signIn' }"
      >
        Login
      </TheRoutedButton>
      <TheRoutedButton
        :type="TheButtonType.Secondary"
        :to="{ name: 'signUp' }"
      >
        Register
      </TheRoutedButton>
    </div>
  </section>
  <AllRightsReserved />
</template>

<style></style>
