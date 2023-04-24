<template>
  <TheButton
    :type="type"
    :isLoading="isLoading"
    :passProps="{ to, replace }"
    :tag="'router-link'"
    @click="handleClick"
  >
    <slot></slot>
  </TheButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheButton from '../TheButton/TheButton.vue'
import type { TheButtonType } from '@/components/reusable/TheButton/TheButtonType.model'
import type { RouteLocationRaw } from 'vue-router'

export default defineComponent({
  props: {
    type: {
      type: String as () => TheButtonType,
      required: true,
    },
    to: {
      type: Object as () => RouteLocationRaw,
      required: true,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClass(): string {
      return `btn-${this.type}`
    },
  },
  methods: {
    handleClick(): void {
      this.$emit('click')
    },
  },
  components: { TheButton },
})
</script>
