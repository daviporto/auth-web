<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:isVisible']);

const isVisible = ref<boolean>(props.isVisible);

watch(() => props.isVisible, (value) => {
  isVisible.value = value;
});


watch(isVisible, (newValue) => {
  emit('update:isVisible', newValue);
});

</script>

<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section>
        <div class="text-h6 ">{{ $t('common.error') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div>{{ message }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('common.ok')" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
