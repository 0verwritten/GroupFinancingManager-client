<template>
  <div class="container form-container absolute center" :class="baseClassNames">
    <h1 :class="titleClassNames">{{ title }}</h1>
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    titleClassNames: {
      type: Array,
      default: () => [],
    },
    baseClassNames: {
      type: Array,
      default: () => [],
    },
  },
})
</script>
