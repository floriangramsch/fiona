<template>
  <div
    class="h-full w-full border border-fiona-text bg-fiona-fg rounded shadow p-2 flex flex-col"
  >
    <div class="text-4xl text-center font-vibes p-3">For Today</div>
    <div class="flex flex-1 flex-col text-xl">
      <Veranstaltungen />
      <ToDos />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Veranstaltungen from "./Veranstaltungen.vue";
import ToDos from "./ToDos.vue";
</script>
