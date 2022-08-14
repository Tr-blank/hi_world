<template>
  <div class="">
    <ChallengeForm
      v-model:form="formData"
      :is-create-form="isCreateForm"
      @save-form-data="saveFormData"
      @delete-form-data="deleteChallenge"
    />
  </div>
</template>
<script setup> 
  import ChallengeForm from '@/components/Challenge/Form.vue'
  const props = defineProps({
    isCreateForm: Boolean,
    form: Object
  })
  const emit = defineEmits(['save-challenge', 'delete-challenge'])
  const { form } = toRefs(props)
  const { fetchModelList, fetchTagList, modelList, tagList } = useChallenge()
  fetchModelList()
  fetchTagList()

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

