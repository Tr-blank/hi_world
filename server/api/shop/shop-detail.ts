import { useQuery } from 'h3'
import { queryByCollection } from "../../lib/firestore"
import { handleSort } from "../../lib/useData"

export default defineEventHandler (async (event) => {
  try {
    const { key } = useQuery(event.req)
    if (!key) throw new Error('no params key')
    let filter = { key: 'key', value: key }
    const docs = await queryByCollection('shop', filter)
    const data = handleSort(docs, 'desc', 'updateDate')
    if (data.length === 0) throw new Error("key undefined")
    return { status: 200, data}
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
