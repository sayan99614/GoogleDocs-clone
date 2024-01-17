<template>
  <DocEditLayout>
    <template #header>
        <Header :isEditing="isEditing"/>
    </template>

    <template #main> </template>
  </DocEditLayout>
</template>
<script setup lang="ts">
import DocEditLayout from '@/layout/DocEditLayout.vue'
import Header from '@/components/Header.vue';
import { ref } from 'vue';

const isEditing= ref(true)

</script>
<style scoped></style>
