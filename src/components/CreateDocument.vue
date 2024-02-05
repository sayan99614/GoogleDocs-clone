<template>
  <div class="mt-4">
    <div class="grid grid-cols-[30%_40%_30%] h-[100%] justify-items-start content-center">
      <div class="col-start-2 col-end-3">
        <p class="ml-1">Start a new document</p>
        <div class="flex mt-2 flex-col items-center justify-start w-36 h-40 gap-4">
          <img
            @click="createNewDoc"
            src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
            class="w-full block shadow-sm cursor-pointer"
            alt="create document"
          />
          <p>Blank Document</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDocsStore } from '../stores/document'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const router = useRouter()

const docsStore = useDocsStore()

const { user } = storeToRefs(useUserStore())

async function createNewDoc(): Promise<void> {
  const id = await docsStore.createDocument({
    content: '',
    title: 'Untitled Document',
    uId: user.value?.uId,
    dateModified: formatDate(new Date())
  })

  router.push(`/docs/${id}`)
}

onMounted(() => {
  docsStore.getDocsByUser()
})

function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
  const yyyy = date.getFullYear()

  return `${dd}/${mm}/${yyyy}`
}
</script>
<style scoped>
/* flex justify-start items-center p-4 */
</style>
