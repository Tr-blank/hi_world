import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  query,
  orderBy
  // limit
  // where,
} from "firebase/firestore"
import { firestoreDB } from "./firebase"

export const queryByCollection = async (collectionName: string) => {
  // @ts-ignore
  const collectionRef = collection(firestoreDB, collectionName)
  const q = query(collectionRef, orderBy("updateDate"));
  const snapshot = await getDocs(q)
  const docs = Array.from(snapshot.docs).map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    }
  })
  return docs
}

export const add = async (collectionName: string, document: Object) => {
  // @ts-ignore
  const collectionRef = collection(firestoreDB, collectionName)
  const docData = { ...document, createDate: Timestamp.fromDate(new Date()) }
  const docRef = await addDoc(collectionRef, docData)
  return docRef
}

export const set = async (collectionName: string, id, document: Object) => {
  const docData = { ...document, updateDate: Timestamp.fromDate(new Date()) }
  await setDoc(doc(collection(firestoreDB, collectionName), id), docData, { merge: true })
}

export const del = async (collectionName: string, id) => {
  const docRef = doc(firestoreDB, collectionName, id)
  return await deleteDoc(docRef)
}
