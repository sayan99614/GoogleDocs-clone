<template>
  <DocEditLayout>
    <template #header>
      <Header :isEditing="isEditing" />
    </template>

    <template #main>
      <EditorToolbar
        @makeBold="makeBold"
        @makeItallic="makeItalic"
        @undo="undo"
        @redo="redo"
        :isItalic="editor?.isActive('italic')!"
        :isBold="editor?.isActive('bold')!"
      />
      <div class="grid grid-cols-[1fr_1.5fr_1fr]">
        <div
          class="col-start-2 col-end-3 bg-white border-[0.2px] p-4 border-slate-300 mt-5 h-[100vh] break-words"
        >
          <editor-content :editor="editor" class="editor" />
        </div>
      </div>
    </template>
  </DocEditLayout>
</template>
<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import EditorToolbar from '@/components/EditorToolbar.vue'
import StarterKit from '@tiptap/starter-kit'
import DocEditLayout from '@/layout/DocEditLayout.vue'
import Header from '@/components/Header.vue'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import History from '@tiptap/extension-history'

import { ref } from 'vue'

const isEditing = ref(true)
const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [StarterKit, Bold, Italic, History]
})

const makeBold = (): void => {
  editor.value?.chain().focus().toggleBold().run()
}

const makeItalic = (): void => {
  editor.value?.chain().focus().toggleItalic().run()
}

const undo = (): void => {
  editor.value?.chain().focus().undo().run()
}

const redo = (): void => {
  editor.value?.chain().focus().redo().run()
}
</script>
<style>
.tiptap {
  outline: none;
  max-width: 800px;
}
</style>
