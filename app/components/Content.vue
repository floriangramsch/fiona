<script setup lang="ts">
import Stundenplan from "./Stundenplan.vue";
import Today from "./Today.vue";

const hours = ref<{ hour: number; time: string }[]>([]);
hours.value.push({
  hour: 1,
  time: "10 Uhr",
});
</script>

<template>
  <div
    class="h-3/4 w-full flex flex-col lg:flex-row gap-3 bg-fiona-special justify-evenly items-center"
  >
    <div>
      <Today :width="300" :height="500" />
    </div>
    <div class="flex flex-col gap-2">
      <Stundenplan :width="570" :height="360" v-model:hours="hours" />
    </div>
  </div>
</template>
