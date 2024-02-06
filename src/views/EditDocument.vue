<template>
  <DocEditLayout>
    <template #header>
      <Header
        :isEditing="isEditing"
        v-model:documentTitle="documentTitle"
        :documentTitlePlaceHolder="doc.title"
        :isSaving="isSaving"
      />
    </template>

    <template #main>
      <EditorToolbar
        @makeBold="makeBold"
        @makeItallic="makeItalic"
        @undo="undo"
        @redo="redo"
        @attach-link="linkAttach"
        :isItalic="editor?.isActive('italic')!"
        :isBold="editor?.isActive('bold')!"
        :showLink="showLink"
        @toggle-show-link="showLink = !showLink"
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
import Document from '@tiptap/extension-document'

import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'

import { onMounted, onUpdated, ref, type Ref } from 'vue'
import { useDocsStore } from '../stores/document'
import { storeToRefs } from 'pinia'

const docStore = useDocsStore()
const { document: doc } = storeToRefs(docStore)

const isEditing: Ref<boolean> = ref(true)
const showLink: Ref<boolean> = ref(false)
const isSaving: Ref<boolean> = ref(false)

const documentTitle = ref(doc.value?.title)

const editor = useEditor({
  content: doc.value?.content,
  extensions: [
    StarterKit,
    Document,
    Paragraph,
    Text,
    Bold,
    Italic,
    Link.configure({
      openOnClick: false
    })
  ]
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

const linkAttach = (link: string) => {
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: link }).run()
  showLink.value = false
}

onMounted(() => {
  editor.value?.chain().focus()

  document.addEventListener(
    'keydown',
    function (e) {
      if (e.key === 's' && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
        e.preventDefault()
        isSaving.value = true
        docStore.updateDoc(doc.value?.id!, {
          title: documentTitle.value,
          content: editor.value?.getHTML()!
        })

        setTimeout(() => {
          isSaving.value = false
        }, 1000)

        return
      }
    },
    false
  )
})
</script>
<style>
.tiptap {
  outline: none;
  max-width: 800px;
}
</style>
