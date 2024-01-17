<template>
  <header class="">
    <div class="flex items-center gap-3">
      <img
        @click="router.replace('/')"
        class="w-12 cursor-pointer"
        src="@/assets/docs.png"
        alt="google docs logo"
      />
      <h1 v-if="!isEditing" class="text-2xl hidden md:block">Docs</h1>
      <div v-if="isEditing" class="flex flex-col justify-center gap-1">
        <div>
          <input type="text" placeholder="Unnamed Doc" class="placeholder:text-black" />
        </div>
        <div class="flex gap-3 cursor-pointer">
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
      <div class="flex gap-3">
        <button class="bg-[#c2e7ff] rounded-full px-6 py-2 flex items-center gap-1">
            <lock-closed-icon class="h-5 w-5"/>
            <p>Share</p>
        </button>
        <button class="text-blue-500">Sign In</button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {LockClosedIcon} from '@heroicons/vue/24/outline'
const isLoggedIn = ref(false)
const router = useRouter()

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
