<script setup lang="ts">
import Stundenplan from "./Stundenplan.vue";
import Today from "./today/Today.vue";

const showAll = ref<boolean>(true);
const showToday = ref<boolean>(false);
const showStundenplan = ref<boolean>(false);

const toggleToday = () => {
  if (showToday.value) {
    showAll.value = true;
    showToday.value = false;
    showStundenplan.value = false;
  } else {
    showAll.value = false;
    showToday.value = true;
    showStundenplan.value = false;
  }
};

const toggleStundenplan = () => {
  if (showStundenplan.value) {
    showAll.value = true;
    showStundenplan.value = false;
    showToday.value = false;
  } else {
    showAll.value = false;
    showStundenplan.value = true;
    showToday.value = false;
  }
};
</script>

<template>
  <div
    class="w-full flex flex-col md:flex-row gap-3 bg-fiona-special justify-evenly items-center"
  >
    <div
      v-if="showToday || showAll"
      @click="toggleToday"
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
      @click="toggleStundenplan"
      :class="
        showStundenplan
          ? 'w-[20rem] md:w-[70rem] h-[35rem] md:h-[30rem]'
          : 'w-[20rem] md:w-[50rem] h-[30rem] md:h-[27rem]'
      "
    >
      <!-- <Stundenplan :showStundenplan="showStundenplan" /> -->
      <Stundenplan />
    </div>
  </div>
</template>
