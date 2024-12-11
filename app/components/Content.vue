<script setup lang="ts">
import Stundenplan from "./Stundenplan.vue";
import Today from "./today/Today.vue";

import { onMounted } from "vue";

onMounted(async () => {
  const res = await fetch("/site.webmanifest");
  const data = await res.json();
  alert(data.version);
  console.log(data.version);
});

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
