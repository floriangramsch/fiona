<script setup lang="ts">
import { useGetWeek } from "~/app/composables/useWeek";
import ToDos from "../today/ToDos.vue";

const getCurrentMonday = () => {
  const monday = new Date();
  const dayOfWeek = monday.getDay();
  const daysToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  monday.setDate(monday.getDate() - daysToLastMonday);
  return monday;
};

const date = ref<Date>(getCurrentMonday());

const getNextMonday = () => {
  const nextMonday = new Date(date.value);
  nextMonday.setDate(nextMonday.getDate() + 7);
  date.value = nextMonday;
};

const getLastMonday = () => {
  const lastMonday = new Date(date.value);
  lastMonday.setDate(lastMonday.getDate() - 7);
  date.value = lastMonday;
};

const { data: todos, isLoading } = useGetWeek(computed(() => date.value));

const showWeekDate = () => {
  const from = date.value.getDate() + "." + (date.value.getMonth() + 1);
  let tmp = new Date(date.value);
  tmp.setDate(tmp.getDate() + 6);
  const to = tmp.getDate() + "." + (tmp.getMonth() + 1);
  return from + "-" + to;
};
</script>

<template>
  <div class="bg-fiona-fg w-full">
    <div class="flex justify-between p-1 text-2xl">
      <div>To-Dos</div>
      <div class="font-extralight">{{ showWeekDate() }}</div>
      <div class="flex items-center gap-2">
        <i
          @click.stop="getLastMonday"
          class="fa-solid fa-angle-left text-base p-1"
        />
        <i
          @click.stop="getNextMonday"
          class="fa-solid fa-angle-right text-base p-1"
        />
      </div>
    </div>
    <div class="p-2">
      <div class="flex justify-center gap-2" v-if="isLoading">
        <i class="fa-solid fa-cat fa-spin" />
        Loading...
      </div>
      <ToDos v-else :todos="todos" :monday="date" />
    </div>
  </div>
</template>
