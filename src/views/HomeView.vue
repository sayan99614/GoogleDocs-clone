<template>
  <MainLayout>
    <template #main>
      <div class="grid grid-rows-[4fr_12fr] gap-y-28">
        <CreateDocument />
        <div class="bg-white grid grid-cols-1 md:grid-cols-[30%_40%_30%] h-[100%]">
          <div class="md:col-start-2 md:col-end-3 pt-4">
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <FolderIcon class="w-6 h-6" />
                <p>My Documents</p>
              </div>
              <p>Date Created</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #header>
      <Header />
    </template>
  </MainLayout>
</template>
<script setup lang="ts">
import MainLayout from '@/layout/MainLayout.vue'
import Header from '@/components/Header.vue'
import CreateDocument from '@/components/CreateDocument.vue'
import { FolderIcon } from '@heroicons/vue/24/solid'
</script>
