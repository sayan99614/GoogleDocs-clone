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

const router = useRouter()

function createNewDoc(): void {
  router.push('/docs/abc')
}
</script>
<style scoped>
/* flex justify-start items-center p-4 */
</style>
