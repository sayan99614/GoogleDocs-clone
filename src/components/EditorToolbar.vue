<template>
  <div class="md:mx-4">
    <div
      class="w-full bg-[#edf2fa] p-2 md:rounded-full flex flex-wrap md:flex-nowrap gap-4 items-center relative"
    >
      <!-- toolbar for mobile -->
      <div
        v-if="showMobileToolbarExtra"
        class="absolute top-10 right-0 flex w-[100%] flex-wrap bg-[#edf2fa] gap-2 items-center md:hidden"
      >
        <select name="textType" id="textType" class="toolbar-icon-container outline-none">
          <option
            :selected="_type === 'Normal Text'"
            v-for="(_type, index) in textType"
            :key="index + _type[0]"
            value="zoom"
          >
            {{ _type }}
          </option>
        </select>

        <!-- TODO: -->
        <div class="flex gap-2 items-center">
          <span @click="incrementFontSize" class="toolbar-icon-container"><PlusIcon class="toolbar-icon" /></span>
          <select
            name="textSize"
            id="textSize"
            class="toolbar-icon-container outline-none border border-black"
            v-model="selectedFontSize"
            @change="emit('fontSize', selectedFontSize)"
          >
            <option
              v-for="size in textSize"
              :selected="size === selectedFontSize"
              :key="size"
              :value="size"
            >
              {{ size }}
            </option>
          </select>
          <span @click="decrementFontSize" class="toolbar-icon-container"><MinusIcon class="toolbar-icon" /></span>
        </div>
        <span :class="['toolbar-icon-container', { active: isBold }]" @click="emit('makeBold')"
          ><div class="toolbar-icon font-bold flex items-center justify-center">B</div></span
        >
        <span @click="emit('makeItallic')" :class="['toolbar-icon-container', { active: isItalic }]"
          ><div class="toolbar-icon font-bold flex items-center justify-center font-serif">
            I
          </div></span
        >

        <span
          @click="emit('underLine')"
          :class="['toolbar-icon-container', { active: isUnderLine }]"
          ><div
            class="toolbar-icon font-bold flex items-center justify-center border-b-2 border-black"
          >
            U
          </div></span
        >

        <span class="toolbar-icon-container"><LinkIcon class="toolbar-icon" /></span>
        <span class="toolbar-icon-container"><PhotoIcon class="toolbar-icon" /></span>
        <div class="toolbar-line-gap"></div>

        <span class="toolbar-icon-container">
          <Icon icon="uim:align-left" :height="20" :width="20" />
        </span>
        <span class="toolbar-icon-container">
          <Icon icon="uim:align-right" :height="20" :width="20" />
        </span>
        <span class="toolbar-icon-container">
          <Icon icon="mdi:format-align-centre" :height="20" :width="20" />
        </span>

        <span class="toolbar-icon-container"
          ><Icon icon="material-symbols:checklist" :height="20" :width="20"
        /></span>
        <span class="toolbar-icon-container"
          ><Icon icon="pixelarticons:bulletlist" :height="20" :width="20"
        /></span>
        <span class="toolbar-icon-container"
          ><Icon icon="clarity:number-list-line" :height="20" :width="20"
        /></span>
      </div>
      <!-- mobile toolbar end -->

      <span @click="emit('undo')" class="toolbar-icon-container"
        ><ArrowUturnLeftIcon class="toolbar-icon"
      /></span>
      <span @click="emit('redo')" class="toolbar-icon-container"
        ><ArrowUturnRightIcon class="toolbar-icon"
      /></span>
      <span class="toolbar-icon-container"><PrinterIcon class="toolbar-icon" /></span>
      <select name="zoom" id="zoom" class="toolbar-icon-container outline-none">
        <option v-for="zoom in zoomValues" :key="zoom" value="zoom">{{ zoom }}%</option>
      </select>
      <div class="toolbar-line-gap"></div>

      <span
        @click="showMobileToolbarExtra = !showMobileToolbarExtra"
        class="toolbar-icon-container md:hidden"
        ><EllipsisVerticalIcon class="toolbar-icon md:hidden" />
      </span>
      <!-- TODO:heading..... -->
      <select
        name="textType"
        id="textType"
        class="md:block hidden toolbar-icon-container outline-none"
        v-model="selectTextType"
      >
        <option
          v-for="(_type, index) in textType"
          :selected="_type === _type[0]"
          :key="index + _type[0]"
          :value="_type"
        >
          {{ _type }}
        </option>
      </select>
      <!-- Font size desktop -->
      <div class="toolbar-line-gap hide-small"></div>
      <div class="flex gap-2 items-center">
          <span @click="incrementFontSize" class="toolbar-icon-container"><PlusIcon class="toolbar-icon" /></span>
          <select
            name="textSize"
            id="textSize"
            class="toolbar-icon-container outline-none border border-black"
            v-model="selectedFontSize"
            @change="emit('fontSize', selectedFontSize)"
          >
            <option
              v-for="size in textSize"
              :selected="size === selectedFontSize"
              :key="size"
              :value="size"
            >
              {{ size }}
            </option>
          </select>
          <span @click="decrementFontSize" class="toolbar-icon-container"><MinusIcon class="toolbar-icon" /></span>
        </div>
      <div class="toolbar-line-gap hide-small"></div>
      <!-- Desktop 🖥  -->
      <div class="hidden md:flex items-center gap-3">
        <span
          @click="emit('makeBold')"
          :class="['toolbar-icon-container', { active: props.isBold }]"
          ><div class="toolbar-icon font-bold flex items-center justify-center">B</div></span
        >
        <span @click="emit('makeItallic')" :class="['toolbar-icon-container', { active: isItalic }]"
          ><div class="toolbar-icon font-bold flex items-center justify-center font-serif">
            I
          </div></span
        >
        <span
          @click="emit('underLine')"
          :class="['toolbar-icon-container', { active: isUnderLine }]"
          ><div
            class="toolbar-icon font-bold flex items-center justify-center border-b-2 border-black"
          >
            U
          </div></span
        >
      </div>
      <div class="toolbar-line-gap hide-small"></div>
      <span class="hidden md:block lg:hidden toolbar-icon-container relative"
        ><EllipsisVerticalIcon @click="showMdToolbar = !showMdToolbar" class="toolbar-icon" />
        <!-- for md size screens -->
        <div
          v-show="showMdToolbar"
          class="absolute flex items-center p-2 gap-4 top-10 right-12 rounded-lg bg-[#edf2fa]"
        >
          <span class="toolbar-icon-container">
            <LinkIcon class="toolbar-icon" />
          </span>
          <span class="toolbar-icon-container"><PhotoIcon class="toolbar-icon" /></span>
          <div class="toolbar-line-gap"></div>

          <span
            @click="showAlignemntToolbar = !showAlignemntToolbar"
            class="toolbar-icon-container relative"
            ><Icon icon="uil:align" :height="20" :width="20" />
            <div
              v-show="showAlignemntToolbar"
              class="absolute p-1 rounded-lg top-10 bg-[#edf2fa] flex gap-4"
            >
              <span class="toolbar-icon-container">
                <Icon icon="uim:align-left" :height="20" :width="20" />
              </span>
              <span class="toolbar-icon-container">
                <Icon icon="uim:align-right" :height="20" :width="20" />
              </span>
              <span class="toolbar-icon-container">
                <Icon icon="mdi:format-align-centre" :height="20" :width="20" />
              </span>
            </div>
          </span>

          <span class="toolbar-icon-container"
            ><Icon icon="material-symbols:checklist" :height="20" :width="20"
          /></span>
          <span class="toolbar-icon-container"
            ><Icon icon="pixelarticons:bulletlist" :height="20" :width="20"
          /></span>
          <span class="toolbar-icon-container"
            ><Icon icon="clarity:number-list-line" :height="20" :width="20"
          /></span>
        </div>
      </span>
      <div class="hidden lg:flex lg:gap-4">
        <span class="toolbar-icon-container relative"
          ><LinkIcon @click="emit('toggleShowLink')" class="toolbar-icon" />
          <LinkForm v-if="showLink" @attach-link="attachLink" />
        </span>
        <span class="toolbar-icon-container relative"
          ><PhotoIcon class="toolbar-icon" @click="showPhotoForm = !showPhotoForm" />
          <!-- TODO -->
          <div
            v-if="showPhotoForm"
            class="absolute top-10 left-0 bg-[#edf2fa] flex flex-col w-[15rem] z-10"
          >
            <div class="p-2 flex items-center gap-4 hover:bg-slate-200 relative">
              <ArrowUpTrayIcon class="h-5 w-5" />
              <p class="block">Upload from directory</p>
              <input @change="handleFileUpload" type="file" class="absolute w-full opacity-0 z-0" />
            </div>
            <div class="p-2 flex items-center gap-4">
              <PaperClipIcon class="h-6 w-6" />
              <input
                type="text"
                class="bg-transparent border-b-[1px] focus:border-slate-400 p-2 border-slate-300 w-full outline-none block transition-all duration-75"
                placeholder="url"
                v-model="photoUrl"
                @keyup="submitPhoto"
              />
            </div>
          </div>
        </span>
        <div class="toolbar-line-gap"></div>
        <!-- Desktop -->
        <span
          @click="showAlignemntToolbar = !showAlignemntToolbar"
          class="toolbar-icon-container relative"
          ><Icon icon="uil:align" :height="20" :width="20" />
          <div
            v-show="showAlignemntToolbar"
            class="absolute p-1 rounded-lg top-10 bg-[#edf2fa] flex gap-4"
          >
            <span
              :class="['toolbar-icon-container', { active: isAlignLeft }]"
              @click="emit('alignLeft')"
            >
              <Icon icon="uim:align-left" :height="20" :width="20" />
            </span>
            <span
              :class="['toolbar-icon-container', { active: isAlignRight }]"
              @click="emit('alignRight')"
            >
              <Icon icon="uim:align-right" :height="20" :width="20" />
            </span>
            <span
              :class="['toolbar-icon-container', { active: isAlignCenter }]"
              @click="emit('alignCenter')"
            >
              <Icon icon="mdi:format-align-centre" :height="20" :width="20" />
            </span>
          </div>
        </span>

        <span
          :class="['toolbar-icon-container', { active: isTaskList }]"
          @click="emit('createTaskList')"
        >
          <Icon icon="material-symbols:checklist" :height="20" :width="20"
        /></span>
        <span
          @click="emit('createBulletList')"
          :class="['toolbar-icon-container', { active: isBulletList }]"
          ><Icon icon="pixelarticons:bulletlist" :height="20" :width="20"
        /></span>
        <span
          class="toolbar-icon-container"
          @click="emit('createNumberList')"
          :class="['toolbar-icon-container', { active: isNumberList }]"
          ><Icon icon="clarity:number-list-line" :height="20" :width="20"
        /></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  PrinterIcon,
  PlusIcon,
  MinusIcon,
  LinkIcon,
  PhotoIcon,
  EllipsisVerticalIcon,
  ArrowUpTrayIcon,
  PaperClipIcon
} from '@heroicons/vue/24/outline'

import { Icon } from '@iconify/vue'
import { ref, type Ref } from 'vue'
import LinkForm from './LinkForm.vue'
import { saveFile } from '@/utils/firebasedb'
import { useUserStore } from '../stores/user'
const zoomValues: Ref<number[]> = ref([50, 75, 100, 125, 150, 200])
const textSize: Ref<number[]> = ref([8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96])
const textType: Ref<string[]> = ref([
  'Normal Text',
  'Title',
  'Subtitle',
  'Heading 1',
  'Heading 2',
  'Heading 3'
])

const selectTextType = defineModel('selectTextType')
const selectedFontSize = ref(18)

const showAlignemntToolbar: Ref<boolean> = ref(false)
const showMdToolbar: Ref<boolean> = ref(false)
const showMobileToolbarExtra: Ref<boolean> = ref(false)
const showPhotoForm: Ref<boolean> = ref(false)
const incrementFontSize=():void=>{
  const index = textSize.value.indexOf(selectedFontSize.value)
  if (index < textSize.value.length - 1) {
    selectedFontSize.value = textSize.value[index + 1]
    emit('fontSize', selectedFontSize.value)
  }

}
const decrementFontSize=():void=>{
  const index = textSize.value.indexOf(selectedFontSize.value)
  if (index > 0) {
    selectedFontSize.value = textSize.value[index - 1]
    emit('fontSize', selectedFontSize.value)
  }
}

const props = defineProps<{
  isBold: boolean
  isItalic: boolean
  // canUndo: boolean
  // canRedo: boolean
  showLink: boolean
  isUnderLine: boolean
  isAlignCenter: boolean
  isAlignLeft: boolean
  isAlignRight: boolean
  isTaskList: boolean
  isBulletList: boolean
  isNumberList: boolean
}>()

const emit = defineEmits<{
  makeBold: []
  undo: []
  redo: []
  heading: [headingType: string]
  makeItallic: []
  underLine: []
  attachLink: [link: string]
  toggleShowLink: []
  alignRight: []
  alignLeft: []
  alignCenter: []
  photoLink: [link: string]
  createTaskList: []
  createBulletList: []
  createNumberList: []
  fontSize: [size: number]
}>()

const attachLink = (link: string) => {
  emit('attachLink', link)
}

const { user } = useUserStore()
const photoUrl: Ref<string> = ref('')

const handleFileUpload = async (payload: Event) => {
  try {
    const file = (payload.target as HTMLInputElement).files![0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      throw new Error('Invalid file type')
    }

    const url = await saveFile(file, user.uId)

    if (url !== '') {
      emit('photoLink', url as string)
      showPhotoForm.value = false
    }
  } catch (error: any) {
    alert(error.message)
  }
}

const submitPhoto = (event: KeyboardEvent) => {
  if (event.key.startsWith('Enter')) {
    if (
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        photoUrl.value
      )
    ) {
      emit('photoLink', photoUrl.value)
      showPhotoForm.value = false
    } else {
      alert('Invalid URL')
    }
  }
}
</script>
<style scoped>
#textSize {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: center;
}
</style>
