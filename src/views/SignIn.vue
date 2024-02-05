<template>
  <div class="h-[100vh] flex justify-center items-center">
    <div class="flex flex-col items-center justify-center">
      <img src="@/assets/docs.png" class="w-[40%] h-[40%]" alt="docs logo" />
      <button
        @click="signinPopup()"
        class="mt-3 flex items-center gap-4 text-white shadow-sm px-3 py-2 border-none rounded-sm bg-google-blue"
      >
        <div class="bg-white p-2 rounded-sm">
          <Icon icon="devicon:google" height="24" width="24" />
        </div>

        Sign in with Google
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { signInWithPopup } from 'firebase/auth'
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { GoogleAuthProvider } from 'firebase/auth'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { createUser } from '../utils/firebasedb'
const authProvider = new GoogleAuthProvider()

const { setUser } = useUserStore()
const { setIsLoggedIn, setAccessToken } = useAuthStore()
const router = useRouter()

const auth = useFirebaseAuth()!
const error = ref(null)

function signinPopup() {
  error.value = null
  signInWithPopup(auth, authProvider)
    .then((result) => {
      if (result.user) {
        setUser({
          email: result.user.email || '',
          profilePic: result.user.photoURL || '',
          username: result.user.displayName || '',
          uId: result.user.uid
        })
      }

      createUser({
        email: result.user.email || '',
        profilePic: result.user.photoURL || '',
        username: result.user.displayName || '',
        uId: result.user.uid
      })

      setIsLoggedIn(true)
      setAccessToken(result.user.refreshToken)
      router.replace('/')
    })
    .catch((reason) => {
      console.error('Failed sign', reason)
      setIsLoggedIn(false)
    })
}
</script>
<style scoped></style>
