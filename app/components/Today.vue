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
          <li v-for="v in getEvents()" :key="v.content">{{ v.content }}</li>
        </ul>
      </div>
      <ToDos />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ToDos from "./ToDos.vue";

const props = defineProps<{
  width: number;
  height: number;
  events: { day: number; hour: number; content: string }[];
}>();

const getEvents = () => {
  const today = new Date();
  return props.events.filter((event) => event.day === today.getDay());
};
</script>
