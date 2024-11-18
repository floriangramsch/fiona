<script setup lang="ts">
import useGetQuote from "../composables/useGetQuote";

const { data, error, isLoading } = useGetQuote();
</script>

<template>
  <div
    class="w-full flex flex-col justify-center items-center space-y-2 bg-fiona-bg py-5 md:py-10"
  >
    <div class="text-7xl md:text-8xl font-vibes pt-2 text-center">
      Fiona's Planer
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error..</div>
    <div
      v-else
      class="text-xl border-2 w-96 h-20 flex justify-center items-start text-center overflow-auto hidescrollbar"
    >
      *{{ data?.quote }}*
    </div>
  </div>
</template>
