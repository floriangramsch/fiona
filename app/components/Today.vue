<template>
  <div
    class="h-full w-full border border-fiona-text bg-fiona-fg rounded shadow p-2 flex flex-col"
  >
    <div class="text-4xl font-vibes p-3">For Today</div>
    <div class="flex flex-1 flex-col text-xl">
      <div class="flex-1 overflow-auto justify-start items-start">
        <div class="font-bold">Veranstaltungen</div>
        <ul class="list-disc pl-5">
          <li v-for="v in events" :key="v.id">{{ v.name }}</li>
        </ul>
      </div>
      <ToDos />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGetTodayEvents } from "../composables/useGetEvents";
import ToDos from "./ToDos.vue";

defineProps<{
  width: number;
  height: number;
}>();

const { data: events } = useGetTodayEvents(new Date().getDay());
</script>
