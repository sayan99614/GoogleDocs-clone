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

            <template v-for="doc in documents" :key="doc.id">
              <Doc :title="doc.title" :date-modified="doc.dateModified!" @click="showDoc(doc.id!)" />
            </template>
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
import { useDocsStore } from '../stores/document'
import { storeToRefs } from 'pinia'
import Doc from '@/components/Doc.vue'
import router from '../router/index';

const  docsStore=useDocsStore()
const { documents } = storeToRefs(docsStore)


const showDoc=(id:string)=>{
  docsStore.selectDocById(id);
  router.push(`/docs/${id}`);
}

</script>
