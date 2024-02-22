<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header :class="['relative',isLoading?'opacity-50':'opacity-100']">
    <div class="flex items-center gap-3">
      <img
        @click="router.replace('/')"
        class="w-8 h-8 md:w-12 md:h-12 cursor-pointer"
        src="@/assets/docs.png"
        alt="google docs logo"
      />
      <h1 v-if="!isEditing" class="text-2xl hidden md:block">Docs</h1>
      <div v-if="isEditing" class="flex flex-col justify-center gap-1">
        <div class="hidden md:flex justify-between items-center gap-6">
          <input ref="titleRef" type="text" v-model="documentTitle" class="placeholder:text-black" />
          <p v-show="isSaving" class="transition-all duration-75">saving...</p>
        </div>
        <div class="hidden md:flex gap-3 cursor-pointer relative select-none">
          <p @click="showfileOptions = !showfileOptions">File</p>
          <p>Edit</p>
          <p>View</p>
          <p>Insert</p>
          <p>Tools</p>
          <div v-show="showfileOptions" class="absolute bg-white top-9 z-50 w-80 p-2">
            <div class="flex flex-col gap-3">
              <div class="flex gap-2 items-center hover:bg-slate-200 transition-all duration-200" @click="emit('downloadDocument'); showfileOptions=false">
                <Icon icon="material-symbols-light:download-sharp" height="28" width="28" />
                <p>Download</p>
              </div>
              <div @click="openMail" class="flex gap-2 items-center hover:bg-slate-200 transition-all duration-200">
                <Icon
                  icon="material-symbols-light:mark-email-read-outline-sharp"
                  height="28"
                  width="28"
                />
                <p>Email</p>
              </div>
              <div class="flex gap-2 items-center hover:bg-slate-200 transition-all duration-200">
                <Icon icon="material-symbols-light:share-outline" height="28" width="28" />
                <p>Share</p>
              </div>
              <div @click="renameDocument" class="flex gap-2 items-center hover:bg-slate-200 transition-all duration-200">
                <Icon icon="mdi:rename-outline" height="28" width="28" />
                <p>Rename</p>
              </div>
              <div class="border-b border-slate-300"></div>
              <div @click="emit('deleteDocument')" class="flex gap-2 items-center hover:bg-slate-200 transition-all duration-200">
                <Icon icon="material-symbols-light:delete-outline" height="28" width="28" />
                <p>Delete</p>
              </div>
              <div @click="emit('printDocument'); showfileOptions=false" class="flex gap-2 items-center hover:bg-slate-200 transition-all duration-200">
                <Icon icon="material-symbols-light:print" height="28" width="28" />
                <p>Print</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <input
        v-if="!isEditing"
        class="w-[60%] px-8 py-2 shadow rounded-lg border-0 focus:shadow-md outline-none"
        type="text"
        placeholder="Search"
      />
    </div>
    <div class="flex items-end justify-end cursor-pointer">
      <div class="flex items-center gap-4">
        <button
          class="bg-[#c2e7ff] hidden md:flex rounded-full px-6 py-2 items-center gap-1"
          v-if="isEditing"
        >
          <lock-closed-icon class="h-5 w-5" />
          <p>Share</p>
        </button>
        <button class="flex justify-end items-end" @click="toggleShowUserAccountPopUp">
          <img class="w-10 h-10 rounded-full" :src="user.profilePic" :alt="user.username" />
        </button>
      </div>
    </div>
    <div
      v-if="showUserAccountPopUp"
      class="absolute top-0 md:top-16 md:right-2 w-full md:w-96 h-screen md:h-fit bg-[#edf2fa] shadow-lg z-30 p-4 md:rounded-3xl"
    >
      <div class="md:flex md:justify-end">
        <div class="flex md:justify-between justify-end gap-10 items-center relative mb-8 md:mb-0">
          <p class="hidden md:block">{{ user.email }}</p>
          <Icon
            @click="toggleShowUserAccountPopUp"
            icon="bitcoin-icons:cross-outline"
            class="cursor-pointer"
            height="24"
            width="24"
          />
        </div>
      </div>
      <div class="flex justify-center flex-col items-center my-3">
        <img class="w-14 h-14 mb-2 rounded-full" :src="user.profilePic" :alt="user.username" />
        <p class="text-lg mb-3">Hi {{ user.username.split(' ')[0] }} !</p>
        <p class="md:hidden">{{ user.email }}</p>
      </div>

      <div class="flex justify-center">
        <button
          class="bg-white hover:shadow transition-all delay-0 rounded-3xl gap-6 flex items-center px-4 py-2"
          @click="signOut"
        >
          <Icon icon="uit:signout" width="30" height="30" />
          <p class="text-sm md:text-base">Sign out from all accounts</p>
        </button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { LockClosedIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '../stores/user'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '../stores/auth'
import { useDocsStore } from '@/stores/document'
import { storeToRefs } from 'pinia';

const router = useRouter()
const {isLoading} =storeToRefs(useDocsStore())

const { user } = useUserStore()

const { logout } = useAuthStore()

const showUserAccountPopUp: Ref<boolean> = ref(false)
const showfileOptions: Ref<boolean> = ref(false)
const titleRef = ref<HTMLInputElement | null>(null)


const toggleShowUserAccountPopUp = () => {
  showUserAccountPopUp.value = !showUserAccountPopUp.value
}

const openMail=()=>{
  window.open(`mailto:?subject=${documentTitle.value}`)
  showfileOptions.value=false;
}

const renameDocument=()=>{
  titleRef.value?.focus();
  showfileOptions.value = false
}

defineProps({
  isEditing: {
    type: Boolean,
    default: false
  },
  documentTitlePlaceHolder: {
    type: String,
    default: ''
  },
  isSaving: {
    type: Boolean,
    default: false
  }
})


const emit= defineEmits<{
  downloadDocument:[],
  renameDocument:[],
  deleteDocument:[],
  printDocument:[]
}>()

const documentTitle = defineModel('documentTitle')

const signOut = (): void => {
  logout()
  router.replace('/login')
}
</script>
<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: #fff;
  padding: 0px 16px;
}
</style>
