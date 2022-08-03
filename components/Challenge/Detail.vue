<template>
  <div class="">
    <form>
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
      <div class="pt-4">
        <button type="button" class="border px-4 py-1 rounded mr-4" :disabled="isOriginalFormData" @click="saveFormData">儲存</button>
        <button type="button" class="border px-4 py-1 rounded" :disabled="isCreateForm" @click="deleteChallenge">刪除</button>
      </div>
    </form>
  </div>
</template>
<script setup> 
  import UiText from '@/components/Ui/Text.vue'

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

