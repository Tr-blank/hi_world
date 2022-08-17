import { useQuery, useBody } from 'h3'
import { set } from "../../lib/firestore"

export default defineEventHandler (async (event) => {
  try {
    const { id } = useQuery(event.req)
    const body = await useBody(event.req)
    await set('shopTag', id, body)
    return { status: 200 }
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
