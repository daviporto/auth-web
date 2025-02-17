import { acceptHMRUpdate, defineStore } from 'pinia'
import { signup, signIn } from 'src/api/userApi'
import type { SignInData, SignupData, User } from 'src/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this?.user?.token
    },
  },
  actions: {
    async signup(data: SignupData) {
      this.user = await signup(data)
    },

    async signIn(data: SignInData) {
      this.user = await signIn(data)
    },
    logout():void {
      this.user = null;
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
