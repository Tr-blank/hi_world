<template>
  <div class="">
    <form>
      <UiText v-model:value="formData.title" label="title" title="標題" />
      <div class="pt-4">
        <button type="button" class="border px-4 py-1 rounded mr-4" :disabled="isOriginalFormData" @click="saveFormData">儲存</button>
        <button type="button" class="border px-4 py-1 rounded" :disabled="isCreateForm" @click="deleteChallenge">刪除</button>
      </div>
    </form>
  </div>
</template>
<script setup> 
  import { ref, computed, watch } from 'vue' 
  import UiText from '@/components/Ui/Text.vue'
  const props = defineProps({
    isCreateForm: Boolean,
    form: Object
  })
  const emit = defineEmits(['save-challenge', 'delete-challenge'])
  const { form } = toRefs(props)
  let formData = ref({})
  const isOriginalFormData = computed(() => JSON.stringify(formData.value) === JSON.stringify(form.value))
  const saveFormData = () => {
    emit('save-challenge', formData.value)
  }
  const deleteChallenge = () => {
    emit('delete-challenge', form.value.id)
  }
  watch(form, (form) => {
    formData.value = JSON.parse(JSON.stringify(form))
  })
</script>
<style lang="stylus" scoped>
  button:disabled {
    @apply bg-gray-200 cursor-not-allowed text-gray-500;
  }
</style>

