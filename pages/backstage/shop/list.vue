<template>
  <div class="w-full">
    <header class="p-4">
      <h1>商店清單</h1>
    </header>
    <div class="p-4">
      <div class="pb-4">
        <button type="button" class="border px-4 py-1 rounded" @click="createForm">新增</button>
      </div>
      <UiTable
        :thTitle="tableTitle"
        :tdData="shopList"
        :hasViewDetail="true"
        @view-item-detail="viewDetail"
      />
      <div>
        <div>{{ currentId }}</div>
        <UiForm
          :form="currentShopData"
          :is-create-form="isCreateForm"
          @save-form-data="saveShopData"
          @delete-form-data="deleteShop"
        >
          <UiText v-model:value="currentShopData.key" label="key" title="英文代號" />
          <UiText v-model:value="currentShopData.name" label="name" title="名稱" />
          <div class="pb-2">
            <span class="block">標籤</span>
            <input type="text" v-model="currentShopData.tags" class="block px-4 py-1 border border-gray-500 rounded" />
            <div>{{ tagList.map((tag) => tag.name) }}</div>
          </div>
          <UiText v-model:value="currentShopData.price" label="price" title="價格" />
        </UiForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getShopList, addShop, delShop, updateShop, getShopTagList } from '@/api/shop'

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
      key: 'user',
      title: '使用者',
      align: 'left'
    }
  ]
  const shopList = ref([])
  const fetchList = async () => {
    try {
      const { data } = await getShopList()
      shopList.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  const currentId = ref('')
  const currentShopData = ref({})
  const isCreateForm = computed(() => currentId.value === 'new')
  const viewDetail = (shop) => {
    currentShopData.value = shop
    currentId.value = shop.id
  }
   const createForm = () => {
    currentId.value = 'new'
    currentShopData.value = {
      name: '',
      key: '',
      tags: '',
      price: ''
    }
  }
  const saveShopData = async () => {
    try {
      if (isCreateForm.value) {
        console.log('add', currentShopData.value)
        const { data } = await addShop(currentShopData.value)
        currentId.value = currentId.value
        currentShopData.value = currentShopData.value
      } else {
        await updateShop(currentId.value, currentShopData.value)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchList()
    }
  }
  const deleteShop = async () => {
    try {
      await delShop(currentId.value)
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
      const { data } = await getShopTagList()
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
