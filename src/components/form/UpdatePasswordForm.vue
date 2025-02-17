<script setup lang="ts">
import PasswordInput from 'components/inputs/user/PasswordInput.vue';
import { minLength, required } from 'src/utils/userValidation';
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import type { UpdatePasswordData } from 'src/types/auth';
import axios from 'axios';
import ErrorDialog from 'components/common/ErrorDialog.vue';
import { useI18n } from 'vue-i18n';
import { Routes } from 'src/enums/Routes';
import { useRouter } from 'vue-router';
import OldPasswordInput from 'components/inputs/user/OldPasswordInput.vue';
import { Notify } from 'quasar';
const password = ref<string>('');
const currentPassword = ref<string>('');
const errorRef = ref<boolean>(false);
const message = ref<string>('');
const router = useRouter();

const { t } = useI18n();
const onSubmit = async (event: Event) => {
  event.preventDefault();
  const authStore = useAuthStore();
  const data = {
    oldPassword: currentPassword.value,
    newPassword: password.value,
  } as UpdatePasswordData;

  try {
    await authStore.updatePassword(data);
    Notify.create({
      type: 'positive',
      message: t('auth.changePassword.success'),
      timeout: 2000,
    });

    void router.push({ name: Routes.HOME });
  } catch (error) {
    errorRef.value = true;
    message.value = t('common.defaultError');

    if (axios.isAxiosError(error)) {
      if (error.status == 422) {
        if (error.response?.data?.message === 'Old password invalid') {
          message.value = t('auth.changePassword.error.invalidCurrentPassword');
        }
      }
    }
  }
};
</script>

<template>
  <q-card class="q-pa-md" style="max-width: 400px; width: 100%">
    <h2 class="text-h6 text-center">{{ $t('auth.changePassword.title') }}</h2>
    <q-form @submit="onSubmit">
      <OldPasswordInput v-model="currentPassword" :rules="[required, minLength(6)]" />

      <PasswordInput
        v-model="password"
        :rules="[required, minLength(6)]"
        label="auth.fields.newPassword"
      />

      <div>
        <q-btn
          type="submit"
          :label="$t('auth.changePassword.submit')"
          color="primary"
          class="full-width"
        ></q-btn>
      </div>
    </q-form>
  </q-card>

  <ErrorDialog v-model:isVisible="errorRef" :message="message" />
</template>

<style scoped></style>
