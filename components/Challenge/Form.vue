<template>
  <div class="">
    <UiForm
      :form="formData"
      :is-create-form="isCreateForm"
      @save-form-data="saveFormData"
      @delete-form-data="deleteChallenge"
    >
      <UiText v-model:value="formData.title" label="title" title="標題" class="pb-2" />
      <UiText v-model:value="formData.description" label="title" title="說明" class="pb-2" />
      <div class="pb-2">
        <span class="block">是否公開</span>
        <label><input type="radio" value="1" name="isPublic" v-model="formData.isPublic" />是</label>
        <label><input type="radio" value="0" name="isPublic" v-model="formData.isPublic" />否</label>
      </div>
      <div class="pb-2">
        <span class="block">標籤</span>
        <input type="text" v-model="formData.tags" class="block px-4 py-1 border border-gray-500 rounded" />
        <div>{{ tagList.map((tag) => tag.name) }}</div>
      </div>
      <div class="pb-2">
        <span class="block">模式</span>
        <select v-model="formData.model" class="block px-4 py-1 border border-gray-500 rounded">
          <option v-for="model in modelList" :value="model.key">
            {{ model.name }}
          </option>
        </select>
      </div>
      <UiText v-model:value="formData.remark" label="title" title="備註(只有創建及管理人可看到)" class="pb-2" />
    </UiForm>

  </div>
</template>
<script setup> 
  import UiForm from '@/components/Ui/Form.vue'
  import UiText from '@/components/Ui/Text.vue'

  const props = defineProps({
    isCreateForm: Boolean,
    form: Object
  })
  const emit = defineEmits(['update:form', 'save-form-data', 'delete-form-data'])
  const { form } = toRefs(props)
  const { fetchModelList, fetchTagList, modelList, tagList } = useChallenge()
  fetchModelList()
  fetchTagList()

  const formData =  computed({
    get: () => form.value,
    set: val => {
      emit('update:form', val)
    }
  })

  const saveFormData = (formData) => {
    console.log('challengeForm',)
    emit('save-form-data', formData)
  }
  const deleteChallenge = (id) => {
    emit('delete-form-data', id)
  }
</script>
<style lang="stylus" scoped>
  button:disabled {
    @apply bg-gray-200 cursor-not-allowed text-gray-500;
  }
</style>

