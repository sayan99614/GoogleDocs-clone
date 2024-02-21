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
        @under-line="generateUnderline"
        @align-center="alignCenter"
        @align-left="alignLeft"
        @align-right="alighRight"
        @photo-link="linkPhoto"
        @toggle-show-link="showLink = !showLink"
        @create-task-list="createTaskList"
        @create-bullet-list="createBulletList"
        @create-number-list="createOrderedList"
        @font-size="selectFontSize"
        :is-align-center="editor?.isActive({ textAlign: 'center' })!"
        :is-align-left="editor?.isActive({ textAlign: 'left' })!"
        :is-align-right="editor?.isActive({ textAlign: 'right' })!"
        :isItalic="editor?.isActive('italic')!"
        :isBold="editor?.isActive('bold')!"
        :isUnderLine="editor?.isActive('underline')!"
        :showLink="showLink"
        :is-task-list="editor?.isActive('taskList')!"
        :is-bullet-list="editor?.isActive('bulletList')!"
        :is-number-list="editor?.isActive('orderedList')!"

        v-model:selectTextType="selectedTextType"

      />
      <div class="grid grid-cols-[1fr_1.5fr_1fr]">
        <div
          class="col-start-2 col-end-3 bg-white border-[0.2px] p-4 border-slate-300 mt-5 h-full min-h-[100vh] break-words"
        >
          <editor-content :editor="editor" :class="['editor']" />
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
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Typography from '@tiptap/extension-typography'

import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'


import { onBeforeMount, onMounted, ref, type Ref, watch, onBeforeUnmount } from 'vue'
import { useDocsStore } from '../stores/document'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { FontSize } from '../utils/FontSizeSelection';

const docStore = useDocsStore()
const { document: doc } = storeToRefs(docStore)

const isEditing: Ref<boolean> = ref(true)
const showLink: Ref<boolean> = ref(false)
const isSaving: Ref<boolean> = ref(false)
const selectedTextType: Ref<string> = ref('Normal Text')

const documentTitle = ref(doc.value?.title)

const editor = useEditor({
  content: doc.value?.content,
  extensions: [
    StarterKit,
    Document.configure({

    }),
    Paragraph,
    Text,
    Bold,
    Italic,
    Typography,
    Link.configure({
      openOnClick: false
    }),
    Underline,
    Heading,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'editor-img'
      }
    }),
    TaskList,
    TaskItem.configure({
      nested: true
    }),
    BulletList.configure({
      HTMLAttributes: {
        class: 'list-disc'
      }
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: 'list-decimal'
      }
    }),
    ListItem,
    FontSize
  ]
})



watch(selectedTextType, (newValue: string) => {
  switch (newValue) {
    case 'Title':
      editor.value?.chain().focus().toggleHeading({ level: 4 }).run()
      return
    case 'Subtitle':
      editor.value?.chain().focus().toggleHeading({ level: 5 }).run()
      return
    case 'Heading 1':
      console.log(newValue)
      editor.value!.chain().focus().toggleHeading({ level: 1 }).run()
      return
    case 'Heading 2':
      editor.value?.chain().focus().toggleHeading({ level: 2 }).run()
      return
    case 'Heading 3':
      editor.value?.chain().focus().toggleHeading({ level: 3 }).run()
      return
  }
})

const makeBold = (): void => {
  editor.value?.chain().focus().toggleBold().run()
}

const alighRight = (): void => {
  editor.value?.chain().focus().setTextAlign('right').run()
}

const alignLeft = (): void => {
  editor.value?.chain().focus().setTextAlign('left').run()
}

const alignCenter = (): void => {
  editor.value?.chain().focus().setTextAlign('center').run()
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

const generateUnderline = (): void => {
  editor.value?.chain().focus().toggleUnderline().run()
}

const linkAttach = (link: string) => {
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: link }).run()
  showLink.value = false
}

const linkPhoto = (link: string) => {
  editor.value?.chain().focus().setImage({ src: link }).run();
  
}

const createTaskList = (): void => {
  editor.value?.chain().focus().toggleTaskList().run()
}

const createBulletList = (): void => {
  editor.value?.chain().focus().toggleBulletList().run()
}

const createOrderedList = (): void => {
  editor.value?.chain().focus().toggleOrderedList().run()
}

const selectFontSize=(size:number):void=>{
  editor.value?.chain().focus().setFontSize(`${size}`).run()
  console.log(size) 
}

const route = useRoute()

const docId: string = route.params.id as string

onBeforeMount(async () => {
  if (!doc.value.id) {
    await docStore.selectDocById(docId)
    editor.value?.commands.setContent(doc.value.content)
    documentTitle.value = doc.value.title
  }
})

onMounted(async () => {
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

onBeforeUnmount(()=>{
  editor.value?.destroy();
})

</script>
<style>
.tiptap {
  outline: none;
  max-width: 800px;
}

ul,
ol {
  padding: 0 1rem;
}

ul[data-type='taskList'] {
  list-style: none;
  padding: 0;
}

.list-disc {
  list-style-type: disc;
}

.list-decimal {
  list-style-type: decimal;
}

.editor-img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
