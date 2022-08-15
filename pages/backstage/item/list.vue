<template>
  <div class="w-full">
    <header class="p-4">
      <h1>挑戰清單</h1>
    </header>
    <div class="p-4">
      <div class="pb-4">
        <button type="button" class="border px-4 py-1 rounded" @click="createForm">新增</button>
      </div>
      <UiTable
        :thTitle="tableTitle"
        :tdData="itemList"
        :hasViewDetail="true"
        @view-item-detail="viewItemDetail"
      />
      <div>
        <div>{{ currentId }}</div>
        <UiForm
          :form="currentItemData"
          :is-create-form="isCreateForm"
          @save-form-data="saveItemData"
          @delete-form-data="deleteItem"
        >
          <UiText v-model:value="currentItemData.key" label="key" title="英文代號" />
          <UiText v-model:value="currentItemData.name" label="name" title="名稱" />
          <div class="pb-2">
            <span class="block">標籤</span>
            <input type="text" v-model="currentItemData.tags" class="block px-4 py-1 border border-gray-500 rounded" />
            <div>{{ tagList.map((tag) => tag.name) }}</div>
          </div>
          <UiText v-model:value="currentItemData.price" label="price" title="價格" />
        </UiForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getItemList, addItem, delItem, updateItem, getItemTagList } from '@/api/item'

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
    },
    {
      key: 'tags',
      title: '標籤',
      align: 'left'
    },
    {
      key: 'price',
      title: '價格',
      align: 'left'
    }
  ]
  const itemList = ref([])
  const fetchList = async () => {
    try {
      const { data } = await getItemList()
      itemList.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  const currentId = ref('')
  const currentItemData = ref({})
  const isCreateForm = computed(() => currentId.value === 'new')
  const viewItemDetail = (challenge) => {
    currentItemData.value = challenge
    currentId.value = challenge.id
  }
   const createForm = () => {
    currentId.value = 'new'
    currentItemData.value = {
      name: '',
      key: '',
      tags: '',
      price: ''
    }
  }
  const saveItemData = async () => {
    try {
      if (isCreateForm.value) {
        console.log('add', currentItemData.value)
        const { data } = await addItem(currentItemData.value)
        currentId.value = currentId.value
        currentItemData.value = currentItemData.value
      } else {
        await updateItem(currentId.value, currentItemData.value)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchList()
    }
  }
  const deleteItem = async () => {
    try {
      await delItem(currentId.value)
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
      const { data } = await getItemTagList()
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
