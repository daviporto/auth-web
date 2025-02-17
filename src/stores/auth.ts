import { acceptHMRUpdate, defineStore } from 'pinia';
import { signIn, signup, updatePassword } from 'src/api/userApi';
import type { SignInData, SignupData, UpdatePasswordData, User } from 'src/types/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this?.user?.token;
    },
  },
  actions: {
    async signup(data: SignupData): Promise<void> {
      this.user = await signup(data);
    },
    async updatePassword(data: UpdatePasswordData): Promise<void> {
      if (!this.user) {
        return;
      }
      await updatePassword(data, this.user.id);
    },
    async signIn(data: SignInData): Promise<void> {
      this.user = await signIn(data);
    },
    logout(): void {
      this.user = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
