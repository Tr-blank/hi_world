import { useQuery } from 'h3'
import { queryByCollection } from "../../lib/firestore";

export default defineEventHandler (async (event) => {
  try {
    const query = useQuery(event.req)
    const docs = await queryByCollection('challenge');
    return { status: 200, data: docs}
  } catch (error) {
    return { status: 400, message: error.message, error }
  }
})
  

