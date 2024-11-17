<script setup lang="ts">
import Stundenplan from "./Stundenplan.vue";
import Today from "./today/Today.vue";
</script>

<template>
  <div
    class="w-full flex flex-col md:flex-row gap-3 bg-fiona-special justify-evenly items-center"
  >
    <div class="h-[20rem] md:h-[25rem] w-[20rem]">
      <Today />
    </div>
    <div class="flex flex-col gap-2 h-[25rem] md:w-[40rem]">
      <Stundenplan />
    </div>
  </div>
</template>
