import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoggedIn: Ref<boolean> = ref(false)
    const accessToken: Ref<string> = ref('')

    const setIsLoggedIn = (status: boolean) => {
      isLoggedIn.value = status
    }

    const setAccessToken = (token: string) => {
      accessToken.value = token
    }
    return { isLoggedIn, setIsLoggedIn, accessToken, setAccessToken }
  },
  {
    persist: true
  }
)
