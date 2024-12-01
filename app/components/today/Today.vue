<template>
  <div
    class="h-full w-full border border-fiona-text bg-fiona-fg rounded shadow p-2 flex flex-col"
  >
    <div class="text-4xl text-center font-vibes p-3">For Today</div>
    <div class="flex flex-1 flex-col text-xl overflow-auto">
      <!-- <Veranstaltungen /> -->
      <TodoWeek />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TodoWeek from "../Tody/TodoWeek.vue";
</script>
