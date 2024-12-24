<script setup lang="ts">
import useGetQuote from "../composables/useGetQuote";
import ExamList from "./exams/ExamList.vue";

const { data, error, isLoading } = useGetQuote();
</script>

<template>
  <div
    class="flex w-full items-center justify-center space-y-2 bg-fiona-bg py-5 md:py-10"
  >
    <!-- <i
      v-for="n in 10"
      :key="n"
      class="absolute fa-regular fa-star text-8xl"
      :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }"
    /> -->

    <div class="flex flex-col items-center">
      <div class="pt-2 text-center font-vibes text-7xl md:text-8xl">
        Fiona's Planer
      </div>

      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">Error..</div>
      <div
        v-else
        class="hidescrollbar flex h-20 w-96 items-start justify-center overflow-auto border-2 text-center text-xl"
      >
        *{{ data?.quote }}*
      </div>
    </div>

    <div class="sm:absolute hidden sm:inline sm:right-40">
      <ExamList />
    </div>
  </div>
</template>
