<template>
  <div class="w-full">
    <header class="p-4">
      <h1>挑戰標籤</h1>
    </header>
    <div class="p-4">
      <UiTable :thTitle="tableTitle" :tdData="tagList" />
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getChallengeTagList, addChallengeTag, delChallengeTag, updateChallengeTag } from '@/api/challenge'

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
      const { data } = await getChallengeTagList()
      tagList.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  onMounted(() => {
    fetchChallengeTagList()
  }) 
</script>
