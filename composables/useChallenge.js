import { challenge } from '@/composables/useApi'

export default function () {
  const modelList = ref([])
  const tagList = ref([])
  const fetchModelList = async () => {
    try {
      const { data } = await challenge.getChallengeModelList()
      modelList.value = data
    } catch (error) {
      console.debug(error)
      modelList.value = []
    }
  }
  const fetchTagList = async () => {
    try {
      const { data } = await challenge.getChallengeTagList()
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
