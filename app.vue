<script setup lang="ts">
import Header from "./app/components/Header.vue";
import Content from "./app/components/Content.vue";
</script>

<template>
  <div
    class="flex flex-col h-screen w-screen bg-fiona-special text-fiona-text font- space-y-4 font-quicksand"
  >
    <Header />

    <Content />
  </div>
</template>

<style>
.hidescrollbar::-webkit-scrollbar {
  display: none;
}

.hidescrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
