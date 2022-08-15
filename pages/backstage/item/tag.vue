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
        :tdData="itemTagList"
        :hasViewDetail="true"
        @view-item-detail="viewItemDetail"
      />
      <div>
        <div>{{ currentId }}</div>
        <UiForm
          :form="currentItemTagData"
          :is-create-form="isCreateForm"
          @save-form-data="saveItemTagData"
          @delete-form-data="deleteItemTag"
        >
          <UiText v-model:value="currentItemTagData.key" label="key" title="英文代號" />
          <UiText v-model:value="currentItemTagData.name" label="name" title="名稱" />
          <UiText v-model:value="currentItemTagData.note" label="note" title="備註" />
        </UiForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getItemTagList, addItemTag, delItemTag, updateItemTag } from '@/api/item'

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
  const fetchItemTagList = async () => {
    try {
      const { data } = await getItemTagList()
      itemTagList.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  const currentId = ref('')
  const currentItemTagData = ref({})
  const isCreateForm = computed(() => currentId.value === 'new')
  const viewItemDetail = (challenge) => {
    currentItemTagData.value = challenge
    currentId.value = challenge.id
  }
   const createForm = () => {
    currentId.value = 'new'
    currentItemTagData.value = {
      key: '',
      name: '',
      note: ''
    }
  }
  const saveItemTagData = async () => {
    try {
      if (isCreateForm.value) {
        console.log('add', currentItemTagData.value)
        const { data } = await addItemTag(currentItemTagData.value)
        currentId.value = currentId.value
        currentItemTagData.value = currentItemTagData.value
      } else {
        await updateItemTag(currentId.value, currentItemTagData.value)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchItemTagList()
    }
  }
  const deleteItemTag = async () => {
    try {
      await delItemTag(currentId.value)
    } catch (error) {
      console.debug(error)
    } finally {
      fetchItemTagList()
      createForm()
    }
  }
  onMounted(() => {
    fetchItemTagList()
  })
</script>
