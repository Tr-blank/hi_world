import { getChallengeModelList, getChallengeTagList } from '@/api/challenge'

export default function () {
  const modelList = ref([])
  const tagList = ref([])
  const fetchModelList = async () => {
    try {
      const { data } = await getChallengeModelList()
      modelList.value = data
    } catch (error) {
      console.debug(error)
      modelList.value = []
    }
  }
  const fetchTagList = async () => {
    try {
      const { data } = await getChallengeTagList()
      tagList.value = data
    } catch (error) {
      console.debug(error)
      tagList.value = []
    }
  }
  return {
    fetchModelList,
    fetchTagList,
    modelList,
    tagList
  }
}
