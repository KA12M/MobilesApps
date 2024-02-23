<script setup>
import { defineProps } from "vue";

const { title } = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="my-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
    >
      {{ title }}
    </h5>
  </div>
</template>
