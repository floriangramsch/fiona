<script setup lang="ts">
import { useGetTodayEvents } from "../../composables/useGetEvents";

const { data: events } = useGetTodayEvents(new Date().getDay());
</script>

<template>
  <div class="flex-1 items-start justify-start overflow-auto">
    <div class="sticky top-0 bg-fiona-fg font-bold">Veranstaltungen</div>
    <ul class="list-disc pl-5">
      <li v-for="v in events" :key="v.id">{{ v.name }}</li>
    </ul>
  </div>
</template>

<style>
.flex-1 {
  scrollbar-width: thin;
  scrollbar-color: #d5bdaf #f7e1d7;
}

.flex-1::-webkit-scrollbar {
  width: 8px;
}

.flex-1::-webkit-scrollbar-track {
  background: #f7e1d7;
}

.flex-1::-webkit-scrollbar-thumb {
  background-color: #d5bdaf;
  border-radius: 10px;
  border: 2px solid #f7e1d7;
}
</style>
