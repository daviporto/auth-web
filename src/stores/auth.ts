import { acceptHMRUpdate, defineStore } from 'pinia'
import { signup, signIn } from 'src/api/userApi'
import type { SignInData, SignupData, User } from 'src/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {},
  actions: {
    async signup(data: SignupData) {
      this.user = await signup(data)
    },

    async signIn(data: SignInData) {
      this.user = await signIn(data)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
