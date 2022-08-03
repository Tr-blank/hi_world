<template>
  <div class="">
    <form>
      <UiText v-model:value="formData.title" label="title" title="標題" />
      <UiText v-model:value="formData.title" label="title" title="說明" />
      <div>
        <span class="block">是否公開</span>
        <label><input type="radio" value="1" name="isPublic" />是</label>
        <label><input type="radio" value="0" name="isPublic" />否</label>
      </div>
      <div>
        <span class="block">標籤</span>
        <select>
          <option>標籤1</option>
          <option>標籤2</option>
        </select>
      </div>
      <div>
        <span class="block">模式</span>
        <select>
          <option v-for="model in challengeModelList" :value="model.key">
            {{ model.name }}
          </option>
        </select>
      </div>
      <UiText v-model:value="formData.title" label="title" title="備註" />
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
  let formData = ref({})
  const { fetchChallengeModelList, challengeModelList } = useChallengeModel()
  fetchChallengeModelList()
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

