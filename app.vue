<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import Stundenplan from "./app/components/Stundenplan.vue";
import Today from "./app/components/Today.vue";

const { data, error, isLoading, refetch } = useQuery({
  queryKey: ["randomQuote"],
  queryFn: async () => {
    const response = await fetch("/api/quotes");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  },
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
        class="text-xl border-2 p-1 w-96 h-20 flex justify-center items-center text-center overflow-auto hidescrollbar"
      >
        *{{ data?.quote }}*
      </div>
    </div>
    <div
      class="h-3/4 w-full flex gap-3 bg-fiona-special justify-evenly items-center"
    >
      <div>
        <Today :width="300" :height="500" />
      </div>
      <div class="flex flex-col gap-2">
        <Stundenplan :width="570" :height="360" v-model:hours="hours" />
      </div>
    </div>
  </div>
</template>
<style>
.hidescrollbar::-webkit-scrollbar {
  display: none;
}

.hidescrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
