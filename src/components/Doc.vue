<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center justify-between my-6 hover:shadow-md px-2 py-2 cursor-pointer">
    <div class="flex items-center gap-2">
      <img src="@/assets/document.png" alt="document" class="w-8 h-8" />
      <p>{{ title }}</p>
    </div>
    <p>{{ dateModified }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  dateModified: string
}>()
</script>
<style scoped></style>
