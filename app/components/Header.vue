<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import useGetQuote from "../composables/useGetQuote";

const { data, error, isLoading, refetch } = useGetQuote();
</script>

<template>
  <div class="h-1/4 w-full flex flex-col justify-center items-center space-y-2">
    <div class="text-8xl font-vibes pt-2 text-center">Fiona's Planer</div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error..</div>
    <div
      v-else
      class="text-xl border-2 p-1 w-96 h-20 flex justify-center items-center text-center overflow-auto hidescrollbar"
    >
      *{{ data?.quote }}*
    </div>
  </div>
</template>
