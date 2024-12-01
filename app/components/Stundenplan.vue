<script setup lang="ts">
import { useGetEvents } from "../composables/useGetEvents";
import type { TEvent } from "../utils/types";

const { data: events } = useGetEvents();

const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
const showEventDialog = ref<boolean>(false);

const eventToShow = ref<TEvent>();
const eventDialogRef = ref<HTMLDivElement | undefined>();

const special = ref<string>("WiSe 24");

const findEvent = (dayEvent: number, hourEvent: number) => {
  if (events.value?.events) {
    return events.value.events.find(
      (event) => event.weekday === dayEvent && event.time_slot === hourEvent
    );
  }
};

const openEventDialog = async (e: MouseEvent, event: TEvent | undefined) => {
  showEventDialog.value = true;
  eventToShow.value = event;
};

const getHour = (time: any) => {
  if (time) {
    return time.split(":")[0] + " Uhr";
  }
};

const getHourMinutes = (time: any) => {
  if (time) {
    return time.split(":")[0] + ":" + time.split(":")[1];
  }
};

const handleDialogClick = (e: MouseEvent) => {
  if (
    eventDialogRef.value &&
    !eventDialogRef.value.contains(e.target as Node)
  ) {
    showEventDialog.value = false;
  }
};

const dayRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (dayRef.value) {
    const today = new Date().getDay();
    const thirdDivIndex = today === 0 || today === 6 ? 0 : today - 1;
    const divWidth = dayRef.value.scrollWidth / dayRef.value.children.length;
    dayRef.value.scrollLeft = thirdDivIndex * divWidth;
  }
});
</script>

<template>
  <div
    class="w-full h-full p-1 bg-fiona-fg flex flex-col rounded shadow relative"
  >
    <!-- Header -->
    <div class="flex justify-center relative h-[11%] mb-4 items-center">
      <input
        v-model="special"
        class="absolute left-1 w-1/4 h-4/5 bg-fiona-bg focus:outline-dotted rounded border-none text-center"
      />
      <div class="flex items-center text-4xl font-vibes mt-2">Stundenplan</div>
    </div>
    <!-- Time -->
    <div class="flex h-full w-full text-sm md:text-base">
      <div class="bg-fiona-special w-1/6 m-1 rounded">
        <div class="flex flex-col h-full bg-fiona-text">
          <div class="flex justify-center bg-fiona-fg text-fiona-text">
            Zeit
          </div>
          <div
            v-for="hour_index in 6"
            class="hover:bg-fiona-bg h-full m-1 flex justify-center items-center rounded cursor-pointer text-fiona-fg"
          >
            {{ getHour(events?.times[hour_index - 1]) }}
          </div>
        </div>
      </div>
      <!-- Events -->
      <div
        ref="dayRef"
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
            @click.stop="(e) => openEventDialog(e, findEvent(day_index, hour))"
            class="bg-fiona-special hover:bg-fiona-bg h-full m-1 rounded flex justify-center items-center md:justify-start md:items-start overflow-auto hidescrollbar cursor-pointer"
          >
            {{ findEvent(day_index, hour)?.name }}
          </div>
        </div>
      </div>
    </div>
    <!-- EventDialog -->
    <div
      v-if="showEventDialog"
      @click.stop="handleDialogClick"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center w-full h-full shadow"
    >
      <div
        click.stop
        ref="eventDialogRef"
        class="bg-fiona-fg md:w-1/4 md:h-1/4 rounded shadow flex flex-col justify-between text-xl p-2"
      >
        <div class="flex flex-col gap-2 w-full text-center justify-center">
          <div>
            {{ eventToShow?.name }}
          </div>
          <div>{{ eventToShow?.location }}</div>
          <div>
            {{ getHourMinutes(eventToShow?.start_time) }}
            -
            {{ getHourMinutes(eventToShow?.end_time) }}
          </div>
        </div>
        <button
          class="bg-fiona-bg p-2 rounded mt-2"
          @click.stop="() => (showEventDialog = false)"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
