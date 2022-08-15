import { useBody } from 'h3'
import { add, set } from "../../lib/firestore"

export default defineEventHandler (async (event) => {
  try {
    const body = await useBody(event.req)
    const docs = await add('item', body)
    const id = docs._key.path.segments[1]
    await set('item',id , { id })
    return { status: 200, data: { id } }
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
