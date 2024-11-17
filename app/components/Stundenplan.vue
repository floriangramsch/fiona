<script setup lang="ts">
import { useGetEvents } from "../composables/useGetEvents";
import type { TEvent } from "../utils/types";

const { data: events } = useGetEvents();

const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
const showEventDialog = ref<boolean>(false);

const eventToShow = ref<TEvent>();

const special = ref<string>("WiSe 24");

const findEvent = (dayEvent: number, hourEvent: number) => {
  if (events.value?.events) {
    return events.value.events.find(
      (event) => event.weekday === dayEvent && event.time_slot === hourEvent
    );
  }
};

const openEventDialog = async (event: TEvent | undefined) => {
  showEventDialog.value = true;
  eventToShow.value = event;
};

const test = (a: any) => {
  if (a) {
    return a.split(":")[0] + " Uhr";
  }
  console.log(a);
};
</script>

<template>
  <div
    class="w-full h-full p-1 bg-fiona-fg flex flex-col rounded shadow relative"
  >
    <div class="flex justify-center relative h-[11%] mb-4 items-center">
      <input
        v-model="special"
        class="absolute left-1 w-1/4 h-4/5 bg-fiona-bg focus:outline-dotted rounded border-none text-center"
      />
      <div class="flex items-center text-4xl font-vibes mt-2">Stundenplan</div>
    </div>
    <div class="flex h-full w-full text-sm md:text-base">
      <div class="bg-fiona-special w-1/6 m-1 rounded">
        <div class="flex flex-col h-full bg-fiona-text">
          <div class="flex justify-center bg-fiona-fg text-fiona-text">
            Zeit
          </div>
          <div
            v-for="hour_index in 6"
            class="hover:bg-fiona-bg h-full m-1 flex justify-center items-center rounded"
          >
            {{ test(events?.times[hour_index - 1]) }}
          </div>
        </div>
      </div>
      <div
        class="bg-fiona-fg w-72 md:w-full flex md:grid md:grid-rows-1 md:grid-cols-5 overflow-x-scroll snap-x snap-mandatory scroll-smooth md:overflow-auto"
      >
        <div
          v-for="day_index in 5"
          :key="day_index"
          class="flex flex-col snap-center min-w-full md:w-auto"
        >
          <div class="flex justify-center text-fiona-text">
            {{ days[day_index - 1] }}
          </div>
          <div
            v-for="hour in 6"
            :key="hour"
            @click="openEventDialog(findEvent(day_index, hour))"
            class="bg-fiona-special hover:bg-fiona-bg h-full m-1 rounded flex justify-center items-center overflow-auto hidescrollbar"
          >
            {{ findEvent(day_index, hour)?.name }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showEventDialog"
      class="absolute flex justify-center items-center w-full h-full"
    >
      <div class="bg-fiona-fg w-1/2 h-1/2 rounded shadow flex flex-col p-2">
        <div class="flex w-full text-center">
          {{ eventToShow?.name }}
        </div>
        <button
          class="bg-fiona-bg p-2 rounded mt-2"
          @click="() => (showEventDialog = false)"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
