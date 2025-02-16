<script setup lang="ts">
import NameInput from 'components/inputs/user/NameInput.vue'
import EmailInput from 'components/inputs/user/EmailInput.vue'
import PasswordInput from 'components/inputs/user/PasswordInput.vue'
import RepeatPasswordInput from 'components/inputs/user/RepeatPasswordInput.vue'
import { required, email, minLength, passwordMatch } from 'src/utils/userValidation';
import { ref } from 'vue'

const name  = ref('');
const emailRef = ref('');
const password = ref('');
const repeatPassword = ref('');

</script>

<template>
  <q-card class="q-pa-md" style="max-width: 400px; width: 100%;">
    <h2 class="text-h6 text-center"> {{$t('auth.signup.title')}} </h2>
    <q-form>
    <NameInput
      v-model="name"
      :rules="[required]"
    />

    <EmailInput
      v-model="emailRef"
      :rules="[required, email]"
    />

    <PasswordInput
      v-model="password"
      :rules="[required, minLength(6)]"
    />

    <RepeatPasswordInput
      v-model="repeatPassword"
      :rules="[required, passwordMatch(password)]"
    />
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
