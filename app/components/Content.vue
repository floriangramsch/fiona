<script setup lang="ts">
import Stundenplan from "./Stundenplan.vue";
import Today from "./today/Today.vue";

const showAll = ref<boolean>(true);
const showToday = ref<boolean>(false);
const todayH = ref<string[]>(["20rem", "25rem"]);
const todayW = ref<string[]>(["20rem", "20rem"]);

const showStundenplan = ref<boolean>(false);
const stundenplanH = ref<string[]>(["25rem", "25rem"]);
const stundenplanW = ref<string[]>(["40rem", "40rem"]);

const toggleToday = () => {
  if (showToday.value) {
    showAll.value = true;
    showToday.value = false;
    showStundenplan.value = false;
    todayH.value = ["20rem", "25rem"];
    todayW.value = ["20rem", "25rem"];
  } else {
    showAll.value = false;
    showToday.value = true;
    showStundenplan.value = false;
    todayH.value = ["20rem", "25rem"];
    todayW.value = ["20rem", "25rem"];
  }
};

const toggleStundenplan = () => {
  if (showStundenplan.value) {
    showAll.value = true;
    showStundenplan.value = false;
    showToday.value = false;
    stundenplanH.value = ["25rem", "25rem"];
    stundenplanW.value = ["40rem", "40rem"];
  } else {
    showAll.value = false;
    showStundenplan.value = true;
    showToday.value = false;
    stundenplanH.value = ["20rem", "30rem"];
    stundenplanW.value = ["40rem", "70rem"];
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
      :class="`h-[${todayH[0]}] md:h-[${todayH[1]}] w-[${todayW[0]}]`"
    >
      <Today />
    </div>
    <div
      v-if="showStundenplan || showAll"
      @click="toggleStundenplan"
      class="flex flex-col gap-2"
      :class="`h-[${stundenplanH[0]}] md:h-[${stundenplanH[1]}] w-[${stundenplanW[0]}] md:w-[${stundenplanW[1]}]`"
    >
      <Stundenplan :showStundenplan="showStundenplan" />
    </div>
  </div>
</template>
