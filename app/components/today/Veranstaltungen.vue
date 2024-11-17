<script setup lang="ts">
import { useGetTodayEvents } from "../../composables/useGetEvents";

const { data: events } = useGetTodayEvents(new Date().getDay());
</script>

<template>
  <div class="flex-1 overflow-auto justify-start items-start">
    <div class="font-bold">Veranstaltungen</div>
    <ul class="list-disc pl-5">
      <li v-for="v in events" :key="v.id">{{ v.name }}</li>
    </ul>
  </div>
</template>
