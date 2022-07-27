<template>
  <div class="w-full">
    <header class="p-4">
      <h1>挑戰清單</h1>
    </header>
    <div class="p-4">
      <UiTable :thTitle="tableTitle" :tdData="challengeList" />
    </div>
  </div>
</template>

<script setup>
  import UiTable from '@/components/Ui/Table.vue'
  import { getChallengeList, addChallenge, delChallenge, updateChallenge } from '@/api/challenge'

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
      key: 'title',
      title: '標題',
      align: 'left'
    }
  ]
  const challengeList = ref([])
  const fetchChallengeList = async () => {
    try {
      const { data } = await getChallengeList()
      challengeList.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  onMounted(() => {
    fetchChallengeList()
  })
</script>
