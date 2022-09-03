<template>
  <div class="w-full">
    <header class="p-4">
      <h1>挑戰標籤</h1>
    </header>
    <div class="p-4">
      <div class="pb-4">
        <button type="button" class="border px-4 py-1 rounded" @click="createTagForm">新增</button>
      </div>
      <UiTable
        :thTitle="tableTitle"
        :tdData="tagList"
        :hasViewDetail="true"
        @view-item-detail="viewTagDetail"
      />
      <div>
        <div>{{ currentTagId }}</div>
        <UiForm
          :form="currentTagData"
          :is-create-form="isCreateForm"
          @save-form-data="saveTagData"
          @delete-form-data="deleteTag"
        >
          <UiText v-model:value="currentTagData.key" label="key" title="英文代號" />
          <UiText v-model:value="currentTagData.name" label="name" title="名稱" />
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
    }
  ]
  const tagList = ref([])
  const fetchChallengeTagList = async () => {
    try {
      const { data } = await challenge.getChallengeTagList()
      tagList.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  const currentTagId = ref('')
  const currentTagData = ref({})
  const isCreateForm = computed(() => currentTagId.value === 'newChallenge')
  const viewTagDetail = (tag) => {
    currentTagData.value = tag
    currentTagId.value = tag.id
  }
   const createTagForm = () => {
    currentTagId.value = 'newChallenge'
    currentTagData.value = {
      key: '',
      name: '',
      description: ''
    }
  }
  const saveTagData = async () => {
    try {
      console.log('saveTagData', isCreateForm.value)
      if (isCreateForm.value) {
        const { data } = await challenge.addChallengeTag(currentTagData.value)
        currentTagId.value = currentTagId.value
        currentTagData.value = currentTagData.value
      } else {
        await challenge.updateChallengeTag(currentTagId.value, currentTagData.value)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchChallengeTagList()
    }
  }
  const deleteTag = async () => {
    try {
      await challenge.delChallengeTag(currentTagId.value)
    } catch (error) {
      console.debug(error)
    } finally {
      fetchChallengeTagList()
      createTagForm()
    }
  }
  onMounted(() => {
    fetchChallengeTagList()
  }) 
</script>
