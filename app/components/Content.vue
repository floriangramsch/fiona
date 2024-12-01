<script setup lang="ts">
import Stundenplan from "./Stundenplan.vue";
import Today from "./today/Today.vue";

const showAll = ref<boolean>(true);
const showToday = ref<boolean>(false);
const showStundenplan = ref<boolean>(false);

const toggle = (name: string) => {
  if (name === "today") {
    showToday.value = !showToday.value;
    showStundenplan.value = false;
  } else if (name === "stundenplan") {
    showStundenplan.value = !showStundenplan.value;
    showToday.value = false;
  }
  showAll.value = !showToday.value && !showStundenplan.value;
};
</script>

<template>
  <div
    class="w-full flex flex-col md:flex-row gap-3 bg-fiona-special justify-evenly items-center p-2"
  >
    <div
      v-if="showToday || showAll"
      @click="toggle('today')"
      :class="
        showToday
          ? 'w-[20rem] md:w-[70rem] h-[35rem] md:h-[30rem]'
          : 'w-[20rem] md:w-[20rem] h-[30rem] md:h-[29rem]'
      "
    >
      <Today />
    </div>
    <div
      v-if="showStundenplan || showAll"
      @click="toggle('stundenplan')"
      :class="
        showStundenplan
          ? 'w-[24rem] md:w-[70rem] h-[35rem] md:h-[30rem]'
          : 'w-[24rem] md:w-[50rem] h-[30rem] md:h-[27rem]'
      "
    >
      <Stundenplan />
    </div>
  </div>
</template>
