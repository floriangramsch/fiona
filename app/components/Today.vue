<template>
  <div
    :style="{ width: width + 'px', height: height + 'px' }"
    class="h-[40rem] w-96 border border-fiona-text bg-fiona-fg rounded shadow p-2"
  >
    <div>
      <div class="text-xl">For Today</div>
    </div>
    <div class="flex flex-col h-full justify-evenly">
      <div class="border border-black overflow-auto max-h-48">
        <div>Veranstaltungen</div>
        <ul class="list-disc pl-5">
          <li v-for="v in veranstaltungen">{{ v }}</li>
        </ul>
      </div>
      <div class="border border-black">
        <div>To Dos</div>
        <ul class="list-disc pl-5">
          <li v-for="todo in todos">{{ todo }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

const veranstaltungen = ref<string[]>(["seminar 2", "seminar 1", "seminar 3"]);
const todos = ref<string[]>(["essen", "kochen", "waschen", "aufraumen"]);
</script>
