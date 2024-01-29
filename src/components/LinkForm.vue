<template>
  <div class="absolute top-10 left-0 rounded-lg py-2 px-4 bg-[#edf2fa] flex gap-2 z-10">
    <input
      placeholder="copied link"
      class="bg-transparent rounded-lg px-1 outline-none border-[1px] border-slate-300"
      type="text"
      name="link"
      v-model="link"
    />
    <button
      class="bg-transparent rounded-lg hover:shadow-sm py-1 border-[1px] border-slate-300 px-4"
      @click="attachLink"
    >
      link
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref, defineEmits } from 'vue'
const link: Ref<string> = ref('')
const emit = defineEmits<{
  attachLink: [link: string]
}>()

const attachLink = (): void => {
  const urlRegex = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  )

  if (urlRegex.test(link.value)) {
    emit('attachLink', link.value)
  } else {
    alert('not a valid url !')
  }
}
</script>
<style scoped></style>
