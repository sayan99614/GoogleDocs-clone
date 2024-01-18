<template>
  <div class="md:mx-4">
    <div
      class="w-full bg-[#edf2fa] p-2 md:rounded-full flex flex-wrap md:flex-nowrap gap-4 items-center relative"
    >


     <!-- toolbar for mobile -->
     <div v-if="showMobileToolbarExtra" class="absolute top-10 right-0 flex w-[100%] flex-wrap bg-[#edf2fa] gap-2 items-center md:hidden">
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
          <div class="flex gap-2 items-center">
            <span class="toolbar-icon-container"><PlusIcon class="toolbar-icon" /></span>
            <select
              name="textSize"
              id="textSize"
              class="toolbar-icon-container outline-none border border-black"
            >
              <option :selected="size === 8" v-for="size in textSize" :key="size" value="zoom">
                {{ size }}
              </option>
            </select>
            <span class="toolbar-icon-container"><MinusIcon class="toolbar-icon" /></span>
          </div>
          <span class="toolbar-icon-container"
            ><div class="toolbar-icon font-bold flex items-center justify-center">B</div></span
          >
          <span class="toolbar-icon-container"
            ><div class="toolbar-icon font-bold flex items-center justify-center font-serif">
              I
            </div></span
          >
          <span class="toolbar-icon-container"
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


      <span class="toolbar-icon-container"><ArrowUturnLeftIcon class="toolbar-icon" /></span>
      <span class="toolbar-icon-container"><ArrowUturnRightIcon class="toolbar-icon" /></span>
      <span class="toolbar-icon-container"><PrinterIcon class="toolbar-icon" /></span>
      <select name="zoom" id="zoom" class="toolbar-icon-container outline-none">
        <option v-for="zoom in zoomValues" :key="zoom" value="zoom">{{ zoom }}%</option>
      </select>
      <div class="toolbar-line-gap"></div>

      <span @click="showMobileToolbarExtra=!showMobileToolbarExtra" class="toolbar-icon-container md:hidden"
        ><EllipsisVerticalIcon class="toolbar-icon md:hidden" />
      </span>

      <select
        name="textType"
        id="textType"
        class="md:block hidden toolbar-icon-container outline-none"
      >
        <option
          :selected="_type === 'Normal Text'"
          v-for="(_type, index) in textType"
          :key="index + _type[0]"
          value="zoom"
        >
          {{ _type }}
        </option>
      </select>
      <div class="toolbar-line-gap hide-small"></div>
      <div class="hidden md:flex gap-2 items-center">
        <span class="toolbar-icon-container"><PlusIcon class="toolbar-icon" /></span>
        <select
          name="textSize"
          id="textSize"
          class="toolbar-icon-container outline-none border border-black"
        >
          <option :selected="size === 8" v-for="size in textSize" :key="size" value="zoom">
            {{ size }}
          </option>
        </select>
        <span class="toolbar-icon-container"><MinusIcon class="toolbar-icon" /></span>
      </div>
      <div class="toolbar-line-gap hide-small"></div>
      <div class="hidden md:flex items-center gap-3">
        <span class="toolbar-icon-container"
          ><div class="toolbar-icon font-bold flex items-center justify-center">B</div></span
        >
        <span class="toolbar-icon-container"
          ><div class="toolbar-icon font-bold flex items-center justify-center font-serif">
            I
          </div></span
        >
        <span class="toolbar-icon-container"
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
          <span class="toolbar-icon-container"><LinkIcon class="toolbar-icon" /></span>
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
        <span class="toolbar-icon-container"><LinkIcon class="toolbar-icon" /></span>
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
  EllipsisVerticalIcon
} from '@heroicons/vue/24/outline'

import { Icon } from '@iconify/vue'
import { ref, type Ref } from 'vue'
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
const showAlignemntToolbar: Ref<boolean> = ref(false)
const showMdToolbar: Ref<boolean> = ref(false)
const showMobileToolbarExtra:Ref<boolean>=ref(false)
</script>
<style scoped>
#textSize {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: center;
}
</style>
