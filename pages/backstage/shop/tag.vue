<template>
  <div class="w-full">
    <header class="p-4">
      <h1>商店標籤清單</h1>
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
          :form="currentShopTagData"
          :is-create-form="isCreateForm"
          @save-form-data="saveShopTagData"
          @delete-form-data="deleteTag"
        >
          <UiText v-model:value="currentShopTagData.key" label="key" title="英文代號" />
          <UiText v-model:value="currentShopTagData.name" label="name" title="名稱" />
          <UiText v-model:value="currentShopTagData.note" label="note" title="備註" />
        </UiForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getShopTagList, addShopTag, delShopTag, updateShopTag } from '@/api/shop'

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
  const fetchShopTagList = async () => {
    try {
      const { data } = await getShopTagList()
      itemTagList.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  const currentId = ref('')
  const currentShopTagData = ref({})
  const isCreateForm = computed(() => currentId.value === 'new')
  const viewDetail = (shop) => {
    currentShopTagData.value = shop
    currentId.value = shop.id
  }
   const createForm = () => {
    currentId.value = 'new'
    currentShopTagData.value = {
      key: '',
      name: '',
      note: ''
    }
  }
  const saveShopTagData = async () => {
    try {
      if (isCreateForm.value) {
        const { data } = await addShopTag(currentShopTagData.value)
        currentId.value = currentId.value
        currentShopTagData.value = currentShopTagData.value
      } else {
        await updateShopTag(currentId.value, currentShopTagData.value)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchShopTagList()
    }
  }
  const deleteTag = async () => {
    try {
      await delShopTag(currentId.value)
    } catch (error) {
      console.debug(error)
    } finally {
      fetchShopTagList()
      createForm()
    }
  }
  onMounted(() => {
    fetchShopTagList()
  })
</script>
