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
              <div @click="switchDocsOrder" class="flex gap-1 cursor-pointer">
               <ChevronUpDownIcon class="w-6 h-6" /> 
              <p>Date Created</p>
            </div>
            </div>
            <Loader class="mt-[10rem]" v-if="isLoading"/>
            <template v-if="!isLoading">
              <Doc  v-for="doc in documents" :key="doc.id" :title="doc.title" :date-modified="doc.dateModified!" @click="showDoc(doc.id!)" />
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
import { FolderIcon,ChevronUpDownIcon } from '@heroicons/vue/24/solid'
import { useDocsStore } from '../stores/document'
import { storeToRefs } from 'pinia'
import Doc from '@/components/Doc.vue'
import router from '../router/index';
import Loader from '@/components/Loader.vue'
import { onMounted, ref, type Ref } from 'vue';

const  docsStore=useDocsStore()
const { documents,isLoading } = storeToRefs(docsStore)

const docsOrder:Ref<'asc'|'desc'>=ref('asc');


onMounted(() => {
  document.title= 'Google Docs Clone'
  docsStore.getDocsByUser(docsOrder.value)
})


const switchDocsOrder=()=>{
  docsOrder.value=docsOrder.value==='asc'?'desc':'asc';
  docsStore.getDocsByUser(docsOrder.value)
}


const showDoc=async(id:string)=>{
  await docsStore.selectDocById(id);
  router.push(`/docs/${id}`);
}

</script>
