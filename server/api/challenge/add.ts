import { useBody } from 'h3'
import { add } from "../../lib/firestore"

export default defineEventHandler (async (event) => {
  try {
    const body = await useBody(event.req)
    const docs = await add('challenge', body)
    return { status: 200, data: { id: docs._key.path.segments[1] } }
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
