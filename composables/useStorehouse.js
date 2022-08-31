import { getStorehouseByUserId } from '@/api/storehouse'

export default function () {
  const storehouse = ref({})
  const fetchUserStorehouse = async (userId) => {
    try {
      const { data } = await getStorehouseByUserId(userId)
      storehouse.value = data[0]

    } catch (error) {
      console.debug(error)
    }
  }
  return {
    fetchUserStorehouse,
    storehouse
  }
}
