<template>
  <div class="w-full">
    <header class="p-4">
      <h1>倉庫清單</h1>
    </header>
    <div class="p-4">
      <div class="pb-4">
        <button type="button" class="border px-4 py-1 rounded" @click="createForm">新增</button>
      </div>
      <UiTable
        :thTitle="tableTitle"
        :tdData="List"
        :hasViewDetail="true"
        @view-item-detail="viewDetail"
      />
      <div>
        <div>{{ currentId }}</div>
        <UiForm
          :form="currentStorehouseData"
          :is-create-form="isCreateForm"
          @save-form-data="saveStorehouseData"
          @delete-form-data="deleteStorehouse"
        >
          <UiText v-model:value="currentStorehouseData.name" label="name" title="名稱" />
          <div class="pb-2">
            <span class="block">標籤</span>
            <input type="text" v-model="currentStorehouseData.tags" class="block px-4 py-1 border border-gray-500 rounded" />
            <div>{{ tagList.map((tag) => tag.name) }}</div>
          </div>
          <UiText v-model:value="currentStorehouseData.userId" label="userId" title="使用者ID" />
        </UiForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getStorehouseList, addStorehouse, delStorehouse, updateStorehouse, getStorehouseTagList } from '@/api/storehouse'

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
      key: 'name',
      title: '名稱',
      align: 'left'
    },
    {
      key: 'userId',
      title: '使用者',
      align: 'left'
    },
    {
      key: 'tags',
      title: '標籤',
      align: 'left'
    }
  ]
  const List = ref([])
  const fetchList = async () => {
    try {
      const { data } = await getStorehouseList()
      List.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  const currentId = ref('')
  const currentStorehouseData = ref({})
  const isCreateForm = computed(() => currentId.value === 'new')
  const viewDetail = (storehouse) => {
    currentStorehouseData.value = storehouse
    currentId.value = storehouse.id
  }
   const createForm = () => {
    currentId.value = 'new'
    currentStorehouseData.value = {
      name: '',
      key: '',
      tags: '',
      price: ''
    }
  }
  const saveStorehouseData = async () => {
    try {
      if (isCreateForm.value) {
        const { data } = await addStorehouse(currentStorehouseData.value)
        currentId.value = currentId.value
        currentStorehouseData.value = currentStorehouseData.value
      } else {
        await updateStorehouse(currentId.value, currentStorehouseData.value)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchList()
    }
  }
  const deleteStorehouse = async () => {
    try {
      await delStorehouse(currentId.value)
    } catch (error) {
      console.debug(error)
    } finally {
      fetchList()
      createForm()
    }
  }
  const tagList = ref([])
  const fetchTagList = async () => {
    try {
      const { data } = await getStorehouseTagList()
      tagList.value = data
    } catch (error) {
      console.debug(error)
      tagList.value = []
    }
  }
  onMounted(() => {
    fetchTagList()
    fetchList()
  })
</script>
