<template>
  <q-input
    v-model="modelValue"
    :label="$t('auth.fields.currentPassword')"
    type="password"
    :rules="rules"
    filled
    dense
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ValidationRule } from 'quasar'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  rules: {
    type: Array<ValidationRule>,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
