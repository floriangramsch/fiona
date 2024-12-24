<script setup lang="ts">
defineProps<{
  type?: string;
}>();

const model = defineModel();
</script>

<template>
  <input
    class="rounded bg-fiona-special p-1 text-center focus:outline-dotted"
    :type="type"
    v-model="model"
  />
</template>
