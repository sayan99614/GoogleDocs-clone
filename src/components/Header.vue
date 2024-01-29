<template>
  <header class="relative">
    <div class="flex items-center gap-3">
      <img
        @click="router.replace('/')"
        class="w-8 h-8 md:w-12 md:h-12 cursor-pointer"
        src="@/assets/docs.png"
        alt="google docs logo"
      />
      <h1 v-if="!isEditing" class="text-2xl hidden md:block">Docs</h1>
      <div v-if="isEditing" class="flex flex-col justify-center gap-1">
        <div class="hidden md:block">
          <input type="text" placeholder="Unnamed Doc" class="placeholder:text-black" />
        </div>
        <div class="hidden md:flex gap-3 cursor-pointer">
          <p>File</p>
          <p>Edit</p>
          <p>View</p>
          <p>Insert</p>
          <p>Tools</p>
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
const router = useRouter()

const { user } = useUserStore()

const showUserAccountPopUp: Ref<boolean> = ref(false)

const toggleShowUserAccountPopUp = () => {
  showUserAccountPopUp.value = !showUserAccountPopUp.value
}

defineProps({
  isEditing: {
    type: Boolean,
    default: false
  }
})
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
