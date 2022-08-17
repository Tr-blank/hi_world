import { useQuery } from 'h3'
import { del } from "../../lib/firestore"

export default defineEventHandler (async (event) => {
  try {
    const { id } = useQuery(event.req)
    await del('shopTag', id)
    return { status: 200 }
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
