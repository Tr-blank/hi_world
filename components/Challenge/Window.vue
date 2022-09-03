<template>
  <div class="flex w-full border border-gray-200 bg-white">
    <div v-show="currentChallengeId" class="p-6 border-r border-gray-200 w-full">
      <div class="flex justify-between">
        <span>挑戰內容</span>
        <span class="cursor-pointer inline-block pl-4" @click="closeChallengeDetail">X</span>
      </div>
      <ChallengeDetail
        :is-create-form="isCreateChallenge"
        :form="currentChallenge"
        @save-challenge="saveChallengeData"
        @delete-challenge="deleteChallenge"
      />
    </div>
    <div class="p-6 w-full">
      <div class="flex justify-between pb-1 items-center">
        <span>挑戰清單</span>
      </div>
      <ChallengeList
        :challenges="challenges"
        :current-challenge-id="currentChallengeId"
        @click="updateCurrentChallenge"
        class="border-b"
      />
      <div @click="createChallengeForm" class="border-b py-1 cursor-pointer flex">
        <div v-show="currentChallengeId === 'newChallenge'" class="pr-2">{{ '<' }}</div>
        <span>新增</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { challenge } from '@/composables/useApi'
  import ChallengeList from '@/components/Challenge/List.vue'
  import ChallengeDetail from '@/components/Challenge/Detail.vue'
  const currentChallengeId = ref(null)
  const currentChallenge = ref({})
  const challenges = ref([])
  const isCreateChallenge = computed(() => currentChallengeId.value === 'newChallenge')
  const createChallengeForm = () => {
    currentChallengeId.value = 'newChallenge'
    currentChallenge.value = {
      title: '',
      description: '',
      isPublic: '0',
      tags: '非官方',
      model: '',
      remark: ''
    }
  }
  const saveChallengeData = async (data) => {
    try {
      if (isCreateChallenge.value) {
        const { data: { id } } = await challenge.addChallenge(data)
        currentChallengeId.value = id
      } else {
        await challenge.updateChallenge(currentChallengeId.value, data)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchChallengeList()
    }
  }
  const deleteChallenge = async (id) => {
    try {
      await challenge.delChallenge(id)
    } catch (error) {
      console.debug(error)
    } finally {
      fetchChallengeList()
      closeChallengeDetail()
    }
  }
  const closeChallengeDetail = () => {
    currentChallengeId.value = ''
    currentChallenge.value = {}
  }
  const fetchChallengeList = async () => {
    try {
      const { data } = await challenge.getChallengeList()
      challenges.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  onMounted(async () => {
    await fetchChallengeList()
    if(challenges.value) {
      currentChallengeId.value = challenges.value[0].id
      currentChallenge.value = challenges.value[0]
    }
  }) 

  const updateCurrentChallenge = (challenge) => {
    currentChallengeId.value = challenge.id
    currentChallenge.value = challenge
  }
</script>
