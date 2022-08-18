<template>
  <div class="w-full">
    <header class="p-4">
      <h1>倉庫標籤清單</h1>
    </header>
    <div class="p-4">
      <div class="pb-4">
        <button type="button" class="border px-4 py-1 rounded" @click="createForm">新增</button>
      </div>
      <UiTable
        :thTitle="tableTitle"
        :tdData="itemTagList"
        :hasViewDetail="true"
        @view-item-detail="viewDetail"
      />
      <div>
        <div>{{ currentId }}</div>
        <UiForm
          :form="currentStorehouseTagData"
          :is-create-form="isCreateForm"
          @save-form-data="saveStorehouseTagData"
          @delete-form-data="deleteTag"
        >
          <UiText v-model:value="currentStorehouseTagData.key" label="key" title="英文代號" />
          <UiText v-model:value="currentStorehouseTagData.name" label="name" title="名稱" />
          <UiText v-model:value="currentStorehouseTagData.note" label="note" title="備註" />
        </UiForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getStorehouseTagList, addStorehouseTag, delStorehouseTag, updateStorehouseTag } from '@/api/storehouse'

  definePageMeta({
    layout: "backstage",
  })

  const tableTitle = [
    {
      key: 'id',
      title: '編號',
      align: 'left'
    },
    {
      key: 'key',
      title: '關鍵字',
      align: 'left'
    },
    {
      key: 'name',
      title: '名稱',
      align: 'left'
    }
  ]
  const itemTagList = ref([])
  const fetchStorehouseTagList = async () => {
    try {
      const { data } = await getStorehouseTagList()
      itemTagList.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  const currentId = ref('')
  const currentStorehouseTagData = ref({})
  const isCreateForm = computed(() => currentId.value === 'new')
  const viewDetail = (storehouse) => {
    currentStorehouseTagData.value = storehouse
    currentId.value = storehouse.id
  }
   const createForm = () => {
    currentId.value = 'new'
    currentStorehouseTagData.value = {
      key: '',
      name: '',
      note: ''
    }
  }
  const saveStorehouseTagData = async () => {
    try {
      if (isCreateForm.value) {
        const { data } = await addStorehouseTag(currentStorehouseTagData.value)
        currentId.value = currentId.value
        currentStorehouseTagData.value = currentStorehouseTagData.value
      } else {
        await updateStorehouseTag(currentId.value, currentStorehouseTagData.value)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchStorehouseTagList()
    }
  }
  const deleteTag = async () => {
    try {
      await delStorehouseTag(currentId.value)
    } catch (error) {
      console.debug(error)
    } finally {
      fetchStorehouseTagList()
      createForm()
    }
  }
  onMounted(() => {
    fetchStorehouseTagList()
  })
</script>
