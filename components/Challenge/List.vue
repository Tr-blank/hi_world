<template>
    <div class="max-w-xl w-full border border-gray-200 bg-white px-6 py-10 rounded">
        <div>挑戰清單</div>
        <div>{{ challenge }}</div>
    </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import { getChallengeList } from '@/api/challenge'

const challenge = reactive([])
async function fetchChallengeList() {
    const { data } = await getChallengeList()
    challenge.push(...data)
}

onMounted(() => {
    fetchChallengeList()
}) 

</script>