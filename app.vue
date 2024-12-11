<script setup lang="ts">
import Header from "./app/components/Header.vue";
import Content from "./app/components/Content.vue";
</script>

<template>
  <div
    class="font-Baskerville-Normal flex h-screen w-screen flex-col space-y-4 bg-fiona-special text-fiona-text"
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
