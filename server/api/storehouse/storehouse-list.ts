import { queryByCollection } from "../../lib/firestore"
import { handleSort } from "../../lib/useData"

export default defineEventHandler (async (event) => {
  try {
    const docs = await queryByCollection('storehouse')
    const data = handleSort(docs, 'desc', 'updateDate')
    return { status: 200, data}
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
