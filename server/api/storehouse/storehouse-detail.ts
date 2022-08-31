import { useQuery } from 'h3'
import { queryByCollection } from "../../lib/firestore"
import { handleSort } from "../../lib/useData"

export default defineEventHandler (async (event) => {
  try {
    const { userId } = useQuery(event.req)
    if (!userId) throw new Error('no params userId')
    let filter = { key: 'userId', value: userId }
    const docs = await queryByCollection('storehouse', filter)
    const data = handleSort(docs, 'desc', 'updateDate')
    if (data.length === 0) throw new Error("userId undefined")
    data.forEach(storeHouse => {
      storeHouse['tagKeys'] = storeHouse.tags.map(tag => tag.key)
    })
    return { status: 200, data}
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
