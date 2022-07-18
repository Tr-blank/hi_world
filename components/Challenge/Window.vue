<template>
  <div class="flex max-w-xl w-full border border-gray-200 bg-white">
    <div class="p-6 w-full">
      <div>挑戰清單</div>
      <ChallengeList
        :challenges="challenges"
        :current-challenge-id="currentChallengeId"
        @click="updateCurrentChallenge"
      />
    </div>
    <div v-show="currentChallengeId" class="p-6 border-l border-gray-200 w-full">
      <div>挑戰內容</div>
      <ChallengeDetail :form="currentChallenge" />
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { getChallengeList } from '@/api/challenge'
  import ChallengeList from '@/components/Challenge/List.vue'
  import ChallengeDetail from '@/components/Challenge/Detail.vue'
  const currentChallengeId = ref(null)
  const currentChallenge = ref({})
  
  const challenges = reactive([])
  const fetchChallengeList = async () => {
    const { data } = await getChallengeList()
    challenges.push(...data)
  }
  onMounted(() => {
    fetchChallengeList()
  }) 

  const updateCurrentChallenge = (challenge) => {
    currentChallengeId.value = challenge.id
    currentChallenge.value = challenge
  }
</script>
