<template>
  <component
    :is="tag"
    v-bind="passProps"
    :class="['btn', buttonClass]"
  >
    <slot v-if="!isLoading"></slot>
    <hollow-dots-spinner
      :animation-duration="1000"
      :dot-size="10"
      :dots-num="3"
      :style="{ margin: '0.25rem auto' }"
      color="#fff"
      v-else
    />
  </component>
</template>

<script lang="ts">
import { type ButtonHTMLAttributes, defineComponent } from 'vue'
import type { TheButtonType } from './TheButtonType.model'
import { HollowDotsSpinner } from 'epic-spinners'

export default defineComponent({
  props: {
    passProps: {
      type: Object as () => ButtonHTMLAttributes | any,
    },
    type: {
      type: String as () => TheButtonType,
      required: true,
    },
    tag: {
      type: String,
      default: 'button',
    },
    isLoading: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    buttonClass(): string {
      return `btn-${this.type}`
    },
  },
  components: { HollowDotsSpinner },
})
</script>
