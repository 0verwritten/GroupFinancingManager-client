<script setup lang="ts">
const date = new Date()
</script>

<template>
  <footer class="footer">
    <p class="footer__paragraph">
      &copy; {{ date.getFullYear() }} Budget Management App. All rights can be reserved.
    </p>
  </footer>
</template>

<style lang="scss">
@import '../assets/styles/_footer.scss';
</style>
