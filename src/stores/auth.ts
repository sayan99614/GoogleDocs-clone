import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useUserStore } from './user'
import { type User } from './types/userType';

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

    const { setUser } = useUserStore()

    const logout = (): void => {
      isLoggedIn.value = false
      accessToken.value = ''
      setUser({} as User);
    }

    return { isLoggedIn, setIsLoggedIn, accessToken, setAccessToken, logout }
  },
  {
    persist: true
  }
)
