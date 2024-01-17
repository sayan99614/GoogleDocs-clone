<template>
    <header>
        <slot name="header"></slot>
    </header>
    <main>
        <slot name="main">
            <EditorToolbar/>
        </slot>
    </main>
</template>
<script setup lang="ts">
import EditorToolbar from '@/components/EditorToolbar.vue';
</script>
<style scoped>
</style>