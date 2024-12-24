<script setup lang="ts">
import ExamList from "./exams/ExamList.vue";
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
    class="flex w-full flex-col items-center justify-evenly gap-3 bg-fiona-special p-2 md:flex-row"
  >
    <div v-if="showAll" class="sm:hidden">
      <ExamList />
    </div>
    
    <div
      v-if="showToday || showAll"
      @click="toggle('today')"
      :class="
        showToday
          ? 'h-[35rem] w-[20rem] md:h-[30rem] md:w-[70rem]'
          : 'h-[30rem] w-[20rem] md:h-[29rem] md:w-[20rem]'
      "
    >
      <Today :focused="showToday" />
    </div>

    <div
      v-if="showStundenplan || showAll"
      @click="toggle('stundenplan')"
      :class="
        showStundenplan
          ? 'h-[35rem] w-[24rem] md:h-[30rem] md:w-[70rem]'
          : 'h-[30rem] w-[24rem] md:h-[27rem] md:w-[50rem]'
      "
    >
      <Stundenplan />
    </div>
  </div>
</template>
