<template>
  <div class="flex max-w-xl w-full border border-gray-200 bg-white">
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
      <div @click="createChallengeForm" class="border-b py-1 cursor-pointer flex justify-between">
        <span>新增</span>
        <div v-show="currentChallengeId === 'newChallenge'">></div>
      </div>
    </div>
    <div v-show="currentChallengeId" class="p-6 border-l border-gray-200 w-full">
      <div>挑戰內容</div>
      <ChallengeDetail :form="currentChallenge" @save-form-data="saveChallengeData" />
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { getChallengeList, addChallenge } from '@/api/challenge'
  import ChallengeList from '@/components/Challenge/List.vue'
  import ChallengeDetail from '@/components/Challenge/Detail.vue'
  const currentChallengeId = ref(null)
  const currentChallenge = ref({})
  const challenges = ref([])
  
  const createChallengeForm = () => {
    currentChallengeId.value = 'newChallenge'
    currentChallenge.value = {
      title: '',
      type: ''
    }
  }
  const saveChallengeData = async (data) => {
    try {
      if (currentChallengeId.value === 'newChallenge') {
        await addChallenge(data)
      } else {
        console.log('update Challenge', data)
      }
    } catch (error) {
      console.debug(error)
    } finally {
      fetchChallengeList()
    }
  }
  const fetchChallengeList = async () => {
    try {
      const { data } = await getChallengeList()
      challenges.value = data
    } catch (error) {
      console.debug(error)
    }
  }
  onMounted(() => {
    fetchChallengeList()
  }) 

  const updateCurrentChallenge = (challenge) => {
    currentChallengeId.value = challenge.id
    currentChallenge.value = challenge
  }
</script>
