<template>
  <div
    :style="{ width: width + 'px', height: height + 'px' }"
    class="h-[30rem] w-[40rem] p-1 bg-fiona-fg flex flex-col rounded shadow relative"
  >
    <div class="flex justify-center relative h-[11%] mb-4 items-center">
      <!-- <div class="bg-fiona-bg w-1/4 h-4/5 m-2 rounded absolute left-0"></div> -->
      <input
        v-model="special"
        class="absolute left-1 w-1/4 h-4/5 bg-fiona-bg focus:outline-dotted rounded border-none text-center"
      />
      <div class="flex items-center text-2xl">Stundenplan</div>
    </div>
    <div class="flex h-full w-full">
      <div class="bg-fiona-special w-1/6 m-1 rounded">
        <div class="flex flex-col h-full bg-fiona-text">
          <div class="flex justify-center bg-fiona-fg text-fiona-text">
            Zeit
          </div>
          <div
            v-for="index in 8"
            :key="index"
            @click="openHourDialog(index)"
            class="hover:bg-fiona-bg h-full m-1 flex justify-center items-center rounded"
          >
            {{ findHour(index)?.time }}
          </div>
        </div>
      </div>
      <div class="flex bg-fiona-fg w-full">
        <div
          v-for="day_index in 5"
          :key="day_index"
          class="w-full flex flex-col"
        >
          <div class="flex justify-center text-fiona-text">
            {{ days[day_index - 1] }}
          </div>
          <div
            v-for="hour in 8"
            :key="hour"
            @click="openEventDialog(day_index, hour)"
            class="bg-fiona-special hover:bg-fiona-bg h-full m-1 rounded flex justify-center items-center overflow-auto"
          >
            {{ findEvent(day_index, hour)?.content }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showNewEventDialog"
      class="absolute flex justify-center items-center w-full h-full"
    >
      <div
        class="bg-fiona-fg w-1/2 h-1/4 rounded shadow flex justify-center items-center"
      >
        <form class="flex flex-col" @submit.prevent="addEvent">
          <input name="content" v-model="newEvent.content" />
          <div class="flex justify-center space-x-2">
            <button type="submit">Eintrag!</button>
            <button @click="() => (showNewEventDialog = false)">x</button>
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="showNewHourDialog"
      class="absolute flex justify-center items-center w-full h-full"
    >
      <div
        class="bg-fiona-fg w-1/2 h-1/4 rounded shadow flex justify-center items-center"
      >
        <form class="flex flex-col" @submit.prevent="addHour">
          <input name="content" v-model="newHour.time" />
          <div class="flex justify-center space-x-2">
            <button type="submit">Eintrag!</button>
            <button @click="() => (showNewHourDialog = false)">x</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  
});

const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
const showNewEventDialog = ref<boolean>(false);
const newEvent = ref<{
  day: number;
  hour: number;
  content: string;
}>({ hour: 0, day: 0, content: "" });

const showNewHourDialog = ref<boolean>(false);
const newHour = ref<{ hour: number; time: string }>({ hour: 0, time: "" });
const special = ref<string>("WiSe 24");

const events = ref<{ day: number; hour: number; content: string }[]>([]);
events.value.push({
  day: 1,
  hour: 1,
  content: "etwas tun",
});

const hours = ref<{ hour: number; time: string }[]>([]);
hours.value.push({
  hour: 1,
  time: "10 Uhr",
});

const findEvent = (dayEvent: number, hourEvent: number) => {
  return events.value.find(
    ({ day, hour }) => day === dayEvent && hour === hourEvent
  );
};

const findHour = (hourToFind: number) => {
  return hours.value.find(({ hour }) => hourToFind === hour);
};

const openEventDialog = (day: number, hour: number) => {
  showNewEventDialog.value = true;
  newEvent.value.day = day;
  newEvent.value.hour = hour;
};

const openHourDialog = (hour: number) => {
  showNewHourDialog.value = true;
  newHour.value.hour = hour;
};

const addEvent = () => {
  const existingEventIndex = events.value.findIndex(
    (event) =>
      event.day === newEvent.value.day && event.hour === newEvent.value.hour
  );

  if (existingEventIndex !== -1) {
    events.value.splice(existingEventIndex, 1, newEvent.value);
  } else {
    events.value.push(newEvent.value);
  }

  newEvent.value = { hour: 0, day: 0, content: "" };
  showNewEventDialog.value = false;
};

const addHour = () => {
  const existingHourIndex = hours.value.findIndex(
    (event) => event.hour === newHour.value.hour
  );

  if (existingHourIndex !== -1) {
    hours.value.splice(existingHourIndex, 1, newHour.value);
  } else {
    hours.value.push(newHour.value);
  }

  newHour.value = { hour: 0, time: "" };
  showNewHourDialog.value = false;
};
</script>
