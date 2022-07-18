<template>
  <div class="">
    <ul class="border-b">
      <li
        v-for="challenge in challenges"
        @click="updateCurrentChallenge(challenge)"
        class="border-t py-1 cursor-pointer flex justify-between"
      >
        <div>{{ challenge.title }}</div>
        <div v-show="challenge.id === currentChallengeId">></div>
      </li>
    </ul>
  </div>
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
