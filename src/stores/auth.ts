import { acceptHMRUpdate, defineStore } from 'pinia'
import { signup } from 'src/api/userApi'
import type { SignupData, User } from 'src/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {},
  actions: {
    async signup(data: SignupData) {
      this.user = await signup(data)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
