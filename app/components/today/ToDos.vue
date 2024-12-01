<script setup lang="ts">
import { useAddWeek } from "~/app/composables/useWeek";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodos,
  useUpdateTodoMutation,
} from "../../composables/todoMutations";
import type { TTodo } from "../../utils/types";

const props = defineProps<{
  todos?: TTodo[];
  monday?: Date;
}>();

const showNewTodoDialog = ref<boolean>(false);
const newTodo = ref<string>("");
const newTodoInput = ref<HTMLInputElement | null>(null);

// const { data: todos } = useGetTodos();
const addTodoMutation = useAddTodoMutation();
const updateTodoMutation = useUpdateTodoMutation();
const deleteTodoMutation = useDeleteTodoMutation();
const addWeekMutation = useAddWeek();

const updateTodo = (todo: TTodo) => {
  if (todo) {
    updateTodoMutation.mutate({
      id: todo.id,
      content: todo.content,
      done: !todo.done,
      week_id: todo.week_id,
    });
    // cancelEdit();
  }
};

const deleteTodo = (id: number) => {
  deleteTodoMutation.mutate(id);
};

const addTodo = (e: Event) => {
  if (props.todos && props.todos[0]) {
    addTodoMutation.mutate({
      content: newTodo.value,
      week_id: props.todos[0].week_id,
    });
  } else {
    if (props.monday) {
      addWeekMutation.mutate({ date: props.monday, content: newTodo.value });
    }
  }

  closeTodoDialog(e);
  newTodo.value = "";
};

const openTodoDialog = async () => {
  showNewTodoDialog.value = true;
  await nextTick(); // Wait for the DOM update
  if (newTodoInput.value) {
    newTodoInput.value.focus(); // Focus the input element
  }
};

const closeTodoDialog = (e: MouseEvent | Event) => {
  e.stopPropagation();
  showNewTodoDialog.value = false;
  newTodo.value = "";
};

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

<template>
  <div class="flex-1 flex-col overflow-auto text-fiona-text">
    <!-- <div class="font-bold sticky top-0 bg-fiona-fg">
      To Dos
      <button class="ml-2 text-xl" @click.stop="openTodoDialog">+</button>
    </div> -->
    <ul class="list-outside">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="cursor-pointer"
        @click.stop="updateTodo(todo)"
      >
        <div class="flex items-center gap-2">
          <i class="fa-regular fa-star" />
          {{ todo.content }}
          <i v-if="todo.done" class="fa-regular fa-check-square" />
          <i v-else class="fa-regular fa-square" />
          <!-- <button @click.stop="deleteTodo(todo.id)">X</button> -->
        </div>
      </li>
      <button
        class="text-xs mt-2 p-2 rounded shadow bg-fiona-special"
        @click.stop="openTodoDialog"
      >
        New Todo
      </button>
    </ul>
    <!-- Dialog -->
    <div
      v-if="showNewTodoDialog"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center w-screen h-screen"
    >
      <div
        @click.stop
        class="bg-fiona-fg w-3/4 h-1/5 md:w-2/4 md:h-2/5 rounded shadow flex justify-center items-center relative"
      >
        <form class="flex flex-col" @submit.prevent="addTodo">
          <input
            ref="newTodoInput"
            class="text-center rounded md:h-12 md:w-64 bg-fiona-special focus:outline-dotted"
            v-model="newTodo"
          />
          <div class="flex justify-center space-x-2">
            <button
              type="submit"
              class="p-2 rounded shadow bg-fiona-special mt-3"
            >
              Mach schon!
            </button>
            <button class="absolute top-0 left-0" @click.stop="closeTodoDialog">
              <i class="fa-solid fa-close text-4xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.test {
  list-style-type: stars;
}
</style>
