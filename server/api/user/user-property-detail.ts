import { useQuery } from 'h3'
import { queryByCollection } from "../../lib/firestore"
import { handleSort } from "../../lib/useData"

export default defineEventHandler (async (event) => {
  try {
    const { account } = useQuery(event.req)
    if (!account) throw new Error('no params account')
    let filter = {}
    filter = { key: 'account', value: account }
    const docs = await queryByCollection('userProperty', filter)
    const data = handleSort(docs, 'desc', 'updateDate')
    if (data.length === 0) throw new Error("account undefined")
    return { status: 200, data}
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
