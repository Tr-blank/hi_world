<template>
  <div class="w-full">
    <header class="p-4">
      <h1>挑戰模式</h1>
    </header>
    <div class="p-4">
      <UiTable :thTitle="tableTitle" :tdData="modelData" />
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getChallengeModelList, addChallengeModel, delChallengeModel, updateChallengeModel } from '@/api/challenge'

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
      const { data } = await getChallengeModelList()
      modelData.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  onMounted(() => {
    fetchChallengeModelList()
  })
</script>
