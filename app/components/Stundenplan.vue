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
      (event) => event.weekday === dayEvent && event.time_slot === hourEvent,
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
    class="relative flex h-full w-full flex-col rounded bg-fiona-fg p-1 shadow"
  >
    <!-- Header -->
    <div class="relative mb-4 flex h-[11%] items-center justify-center">
      <input
        v-model="special"
        class="absolute left-1 h-4/5 w-1/4 rounded border-none bg-fiona-bg text-center focus:outline-dotted"
      />
      <div class="mt-2 flex items-center font-vibes text-4xl">Stundenplan</div>
    </div>
    <!-- Time -->
    <div class="flex h-full w-full text-sm md:text-base">
      <div class="m-1 w-1/6 rounded bg-fiona-special">
        <div class="flex h-full flex-col bg-fiona-text">
          <div class="flex justify-center bg-fiona-fg text-fiona-text">
            Zeit
          </div>
          <div
            v-for="hour_index in 6"
            class="m-1 flex h-full cursor-pointer items-center justify-center rounded text-fiona-fg hover:bg-fiona-bg"
          >
            {{ getHour(events?.times[hour_index - 1]) }}
          </div>
        </div>
      </div>
      <!-- Events -->
      <div
        ref="dayRef"
        class="flex w-72 snap-x snap-mandatory overflow-x-scroll scroll-smooth bg-fiona-fg md:grid md:w-full md:grid-cols-5 md:grid-rows-1 md:overflow-auto"
      >
        <div
          v-for="day_index in 5"
          :key="day_index"
          class="flex min-w-full snap-center flex-col md:w-auto"
        >
          <div class="flex justify-center text-fiona-text">
            {{ days[day_index - 1] }}
          </div>
          <div
            v-for="hour in 6"
            :key="hour"
            @click.stop="(e) => openEventDialog(e, findEvent(day_index, hour))"
            class="hidescrollbar m-1 flex h-full cursor-pointer items-center justify-center overflow-auto rounded bg-fiona-special hover:bg-fiona-bg md:items-start md:justify-start"
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
      class="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 shadow"
    >
      <div
        click.stop
        ref="eventDialogRef"
        class="flex flex-col justify-between rounded bg-fiona-fg p-2 text-xl shadow md:h-1/4 md:w-1/4"
      >
        <div class="flex w-full flex-col justify-center gap-2 text-center">
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
          class="mt-2 rounded bg-fiona-bg p-2"
          @click.stop="() => (showEventDialog = false)"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
