<template>
  <div
    :style="{ width: width + 'px', height: height + 'px' }"
    class="h-[40rem] w-96 border border-fiona-text bg-fiona-fg rounded shadow p-2"
  >
    <div>
      <div class="text-xl">For Today</div>
    </div>
    <div class="flex flex-col h-full justify-evenly">
      <div class="border border-black overflow-auto max-h-48">
        <div>Veranstaltungen</div>
        <ul class="list-disc pl-5">
          <li v-for="v in events" :key="v.id">{{ v.name }}</li>
        </ul>
      </div>
      <ToDos />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGetTodayEvents } from "../composables/eventMutations";
import ToDos from "./ToDos.vue";

defineProps<{
  width: number;
  height: number;
}>();

const { data: events } = useGetTodayEvents(new Date().getDay());
</script>
