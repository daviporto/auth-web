<script setup lang="ts">
import NameInput from 'components/inputs/user/NameInput.vue'
import EmailInput from 'components/inputs/user/EmailInput.vue'
import PasswordInput from 'components/inputs/user/PasswordInput.vue'
import RepeatPasswordInput from 'components/inputs/user/RepeatPasswordInput.vue'
import { email, minLength, passwordMatch, required } from 'src/utils/userValidation'
import { ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import type { SignupData } from 'src/types/auth'

const name = ref<string>('')
const emailRef = ref<string>('')
const password = ref<string>('')
const repeatPassword = ref<string>('')

const onSubmit = async (event: Event) => {
  event.preventDefault();
  const authStore = useAuthStore()

  const data = {
    email: emailRef.value,
    name: name.value,
    password: password.value,
  } as SignupData

  try{
    await authStore.signup(data)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <q-card class="q-pa-md" style="max-width: 400px; width: 100%">
    <h2 class="text-h6 text-center">{{ $t('auth.signup.title') }}</h2>
    <q-form @submit="onSubmit">
      <NameInput v-model="name" :rules="[required]" />

      <EmailInput v-model="emailRef" :rules="[required, email]" />

      <PasswordInput v-model="password" :rules="[required, minLength(6)]" />

      <RepeatPasswordInput v-model="repeatPassword" :rules="[required, passwordMatch(password)]" />
      <div>
        <q-btn
          type="submit"
          :label="$t('auth.signup.submit')"
          color="primary"
          class="full-width"
        ></q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<style scoped></style>
