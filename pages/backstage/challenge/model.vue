<template>
  <div class="w-full">
    <header class="p-4">
      <h1>挑戰模式</h1>
    </header>
    <div class="p-4">
      <div class="pb-4">
        <button type="button" class="border px-4 py-1 rounded" @click="createModelForm">新增</button>
      </div>
      <UiTable
        :thTitle="tableTitle"
        :tdData="modelData"
        :hasViewDetail="true"
        @view-item-detail="viewModelDetail"
      />
      <div>
        <div>{{ currentModelId }}</div>
        <UiForm
          :form="currentModelData"
          :is-create-form="isCreateForm"
          @save-form-data="saveModelData"
          @delete-form-data="deleteModel"
        >
          <UiText v-model:value="currentModelData.key" label="key" title="英文代號" />
          <UiText v-model:value="currentModelData.name" label="name" title="名稱" />
          <UiText v-model:value="currentModelData.description" label="description" title="說明" />
        </UiForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import UiForm from '@/components/Ui/Form.vue'
  import UiText from '@/components/Ui/Text.vue'
  import { challenge } from '@/composables/useApi'

  definePageMeta({
    layout: "backstage",
  })
  const tableTitle = [
    {
      key: 'key',
      title: '英文代號',
      align: 'left'
    },
    {
      key: 'name',
      title: '名稱',
      align: 'left'
    },
    {
      key: 'description',
      title: '說明',
      align: 'left'
    }
  ]
  const modelData = ref([])
  const fetchChallengeModelList = async () => {
    try {
      const { data } = await challenge.getChallengeModelList()
      modelData.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  const currentModelId = ref('')
  const currentModelData = ref({})
  const isCreateForm = computed(() => currentModelId.value === 'newChallenge')
  const viewModelDetail = (model) => {
    currentModelData.value = model
    currentModelId.value = model.id
  }
  const createModelForm = () => {
    currentModelId.value = 'newChallenge'
    currentModelData.value = {
      key: '',
      name: '',
      description: ''
    }
  }
  const saveModelData = async () => {
    try {
      if (isCreateForm.value) {
        const { data } = await challenge.addChallengeModel(currentModelData.value)
        currentModelId.value = currentModelId.value
        currentModelData.value = currentModelData.value
      } else {
        await challenge.updateChallengeModel(currentModelId.value, currentModelData.value)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchChallengeModelList()
    }
  }
  const deleteModel = async () => {
    try {
      await challenge.delChallengeModel(currentModelId.value)
    } catch (error) {
      console.debug(error)
    } finally {
      fetchChallengeModelList()
      createModelForm()
    }
  }
  onMounted(() => {
    fetchChallengeModelList()
  })
</script>
