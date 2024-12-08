<template>
  <div
    class="flex h-full w-full flex-col rounded border border-fiona-text bg-fiona-fg p-2 shadow"
  >
    <div class="p-3 text-center font-vibes text-4xl">For Today</div>
    <div class="flex flex-1 flex-col overflow-auto text-xl">
      <!-- <Veranstaltungen /> -->
      <TodoWeek :focused="focused" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TodoWeek from "../Tody/TodoWeek.vue";

defineProps<{
  focused: boolean;
}>();
</script>
