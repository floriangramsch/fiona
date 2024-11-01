<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodos,
  useUpdateTodoMutation,
} from "../composables/todoMutations";
import type { TTodo } from "../utils/types";

const showNewTodoDialog = ref<boolean>(false);
const newTodo = ref<string>("");
const newTodoInput = ref<HTMLInputElement | null>(null);

const { data: todos } = useGetTodos();
const addTodoMutation = useAddTodoMutation();
const updateTodoMutation = useUpdateTodoMutation();
const deleteTodoMutation = useDeleteTodoMutation();

const updateTodo = (todo: TTodo) => {
  if (todo) {
    updateTodoMutation.mutate({
      id: todo.id,
      content: todo.content,
      done: !todo.done,
    });
    // cancelEdit();
  }
};

const deleteTodo = (id: number) => {
  deleteTodoMutation.mutate(id);
};

const addTodo = () => {
  addTodoMutation.mutate(newTodo.value);

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
  <div class="border flex flex-col border-black relative">
    <div>
      To Dos
      <button class="font-bold ml-2 text-xl" @click="openTodoDialog">+</button>
    </div>
    <ul class="list-disc pl-5">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="cursor-pointer"
        @click.stop="() => updateTodo(todo)"
      >
        <div class="flex space-x-2">
          <div :class="{ 'line-through': todo.done }">
            {{ todo.content }}
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
</template>
