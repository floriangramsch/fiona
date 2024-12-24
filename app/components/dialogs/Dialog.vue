<script setup lang="ts">
const isOpen = ref<boolean>(false);

const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);

const dialogRef = ref<HTMLDivElement | null>();

const handleOverlayClick = (e: MouseEvent) => {
  if (dialogRef.value && !dialogRef.value.contains(e.target as Node)) {
    close();
  }
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <div
    v-if="isOpen"
    @click="handleOverlayClick"
    class="fixed left-0 top-0 z-50 m-auto flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
  >
    <div
      @click.stop
      class="flex h-3/4 w-3/4 items-center justify-center rounded bg-fiona-bg shadow"
      ref="dialogRef"
    >
      <slot />
    </div>
  </div>
</template>
