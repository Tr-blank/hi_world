import { getChallengeModelList } from '@/api/challenge'

export default function () {
  const challengeModelList = ref([])
  const fetchChallengeModelList = async () => {
    try {
      const { data } = await getChallengeModelList()
      challengeModelList.value = data
    } catch (error) {
      console.debug(error)
      challengeModelList.value = []
    }
  }
  return {
    fetchChallengeModelList,
    challengeModelList
  }
}
