<template>
  <ul>
    <li
      v-for="challenge in challenges"
      @click="updateCurrentChallenge(challenge)"
      class="border-t py-1 cursor-pointer flex"
    >
      <div v-show="challenge.id === currentChallengeId" class="pr-2">{{ '<' }}</div>
      <div>{{ challenge.title }}</div>
    </li>
  </ul>
</template>
<script setup>
  import { reactive, onMounted } from 'vue'
  // import { getChallengeList } from '@/api/challenge'
  const props = defineProps({
    challenges: Array,
    currentChallengeId: String
  })
  const emit = defineEmits(['click'])
  const updateCurrentChallenge = (challenge) => {
    emit('click', challenge)
  }
  // const challenges = reactive([])
  // const fetchChallengeList = async () => {
  //   const { data } = await getChallengeList()
  //   challenges.push(...data)
  // }
  // onMounted(() => {
  //   fetchChallengeList()
  // }) 
</script>
