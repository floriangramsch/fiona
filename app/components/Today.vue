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
          <li v-for="v in getEvents()" :key="v.content">{{ v.content }}</li>
        </ul>
      </div>
      <div class="border flex flex-col border-black relative">
        <div>
          To Dos
          <button class="font-bold ml-2 text-xl" @click="openTodoDialog">
            +
          </button>
        </div>
        <ul class="list-disc pl-5">
          <li
            v-for="todo in todos"
            :key="todo.id"
            class="cursor-pointer"
            @click.stop="todo.done = !todo.done"
          >
            <div class="flex space-x-2">
              <div :class="{ 'line-through': todo.done }">
                {{ todo.todo }}
              </div>
              <button @click.stop="deleteTodo(todo.id)">X</button>
            </div>
          </li>
        </ul>
        <div
          v-if="showNewTodoDialog"
          class="absolute flex justify-center items-center w-full h-full"
        >
          <div
            class="bg-fiona-fg w-3/4 h-3/5 rounded shadow flex justify-center items-center"
          >
            <form class="flex flex-col" @submit.prevent="addTodo">
              <input
                ref="newTodoInput"
                class="text-center rounded bg-fiona-special focus:outline-dotted"
                v-model="newTodo"
              />
              <div class="flex justify-center space-x-2">
                <button type="submit">Eintrag!</button>
                <button @click="closeTodoDialog">x</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps<{
  width: number;
  height: number;
  events: { day: number; hour: number; content: string }[];
}>();

const showNewTodoDialog = ref<boolean>(false);
const newTodo = ref<string>("");
const newTodoInput = ref<HTMLInputElement | null>(null);

const todos = ref<{ id: number; todo: string; done: boolean }[]>([
  { id: 0, todo: "essen", done: false },
  { id: 1, todo: "waschen", done: true },
  { id: 2, todo: "lernen", done: false },
  { id: 3, todo: "trainieren", done: false },
]);

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const addTodo = () => {
  todos.value.push({
    id: todos.value.length,
    todo: newTodo.value,
    done: false,
  });
  closeTodoDialog();
  newTodo.value = "";
};

const openTodoDialog = async () => {
  showNewTodoDialog.value = true;
  await nextTick(); // Wait for the DOM update
  if (newTodoInput.value) {
    newTodoInput.value.focus(); // Focus the input element
  }
};

const closeTodoDialog = () => {
  showNewTodoDialog.value = false;
  newTodo.value = "";
};

const getEvents = () => {
  const today = new Date();
  return props.events.filter((event) => event.day === today.getDay());
};

// Watch for dialog visibility changes to focus the input
watch(
  () => showNewTodoDialog.value,
  (isVisible) => {
    if (isVisible && newTodoInput.value) {
      nextTick(() => {
        newTodoInput.value?.focus();
      });
    }
  }
);
</script>
