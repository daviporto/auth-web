<script setup lang="ts">
import EmailInput from 'components/inputs/user/EmailInput.vue'
import PasswordInput from 'components/inputs/user/PasswordInput.vue'
import { email, minLength, required } from 'src/utils/userValidation'
import { ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import type { SignInData } from 'src/types/auth'
import axios from 'axios'
import ErrorDialog from 'components/common/ErrorDialog.vue'
import { useI18n } from 'vue-i18n'
import { Routes } from 'src/enums/Routes'

const emailRef = ref<string>('')
const password = ref<string>('')
const errorRef = ref<boolean>(false)
const message = ref<string>('')

const { t } = useI18n()
const onSubmit = async (event: Event) => {
  event.preventDefault()
  const authStore = useAuthStore()

  const data = {
    email: emailRef.value,
    password: password.value,
  } as SignInData

  try {
    await authStore.signIn(data)
  } catch (error) {
    errorRef.value = true
    message.value = t('common.defaultError')

    if (axios.isAxiosError(error)) {
      if (error.status == 400) {
        if (error.response?.data?.message === `Invalid credentials`) {
          message.value = t('auth.signIn.error.invalidCredentials')
        }
      }
    }
  }
}
</script>

<template>
  <q-card class="q-pa-md" style="max-width: 400px; width: 100%">
    <h2 class="text-h6 text-center">{{ $t('auth.signIn.title') }}</h2>
    <q-form @submit="onSubmit">
      <EmailInput v-model="emailRef" :rules="[required, email]" />

      <PasswordInput v-model="password" :rules="[required, minLength(6)]" />

      <div>
        <q-btn
          type="submit"
          :label="$t('auth.signIn.submit')"
          color="primary"
          class="full-width"
        ></q-btn>
      </div>
    </q-form>

    <q-btn
      class="q-pt-md"
      flat
      dense
      no-caps
      color="primary"
      :label="$t('auth.signIn.noAccount')"
      @click="$router.push({ name: Routes.SIGNUP })"
    ></q-btn>
  </q-card>

  <ErrorDialog v-model:isVisible="errorRef" :message="message" />
</template>

<style scoped></style>
