import { defineStore } from 'pinia'
import { type User } from './types/userType'
import { computed, ref, type Ref } from 'vue'

export const useUserStore = defineStore(
  'users',
  () => {
    const user: Ref<User> = ref({
      username: '',
      email: '',
      profilePic: '',
      uId: ''
    })

    const setUser = (_user: User) => {
      user.value = _user
    }

    const getUser = computed(() => user.value)

    return { user, setUser, getUser }
  },
  {
    persist: true
  }
)
