<script setup lang="ts">
import Stundenplan from "./app/components/Stundenplan.vue";
import Today from "./app/components/Today.vue";

const quote = ref<string>(
  "*We cannot solve problems with the kind of thinking we employed when we came up with them.*"
);

const events = ref<{ day: number; hour: number; content: string }[]>([]);
events.value.push({
  day: 4,
  hour: 1,
  content: "Seminar 1",
});
events.value.push({
  day: 4,
  hour: 2,
  content: "Seminar 2",
});
events.value.push({
  day: 4,
  hour: 3,
  content: "Seminar 3",
});

const hours = ref<{ hour: number; time: string }[]>([]);
hours.value.push({
  hour: 1,
  time: "10 Uhr",
});
</script>

<template>
  <div
    class="h-screen w-screen bg-fiona-bg text-blue-950 flex flex-col justify-center items-center space-y-2"
  >
    <div
      class="h-1/4 w-full flex flex-col justify-center items-center space-y-2"
    >
      <div class="text-8xl font-vibes pt-2">Fiona's Planer</div>
      <div
        class="text-xl border-2 p-1 w-96 h-20 flex justify-center items-center"
      >
        {{ quote }}
      </div>
    </div>
    <div
      class="h-3/4 w-full flex gap-3 bg-fiona-special justify-evenly items-center"
    >
      <div>
        <Today :width="300" :height="500" :events="events" />
      </div>
      <div class="flex flex-col gap-2">
        <Stundenplan
          :width="570"
          :height="360"
          v-model:events="events"
          v-model:hours="hours"
        />
        <!-- <Stundenplan :width="570" :height="260" /> -->
      </div>
    </div>
  </div>
</template>
