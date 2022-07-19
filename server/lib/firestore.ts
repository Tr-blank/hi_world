import {
  collection,
  getDocs,
  // getDoc,
  addDoc,
  deleteDoc,
  doc,
  // query,
  // where,
  setDoc,
  // collectionGroup,
  // Timestamp,
} from "firebase/firestore"
import { firestoreDB } from "./firebase"

export const queryByCollection = async (collectionName: string) => {
  // @ts-ignore
  const colRef = collection(firestoreDB, collectionName)
  const snapshot = await getDocs(colRef)
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
  const colRef = collection(firestoreDB, collectionName)
  const docRef = await addDoc(colRef, document)
  return docRef
}

export const del = async (collectionName: string, id) => {
  const docRef = doc(firestoreDB, collectionName, id)
  return await deleteDoc(docRef)
}

// export const update = async (col: string, document: Object) => {

//   .collection('fruit').doc('apple').set({})
  

//   await setDoc(doc(collection(firestoreDB, col)), document, { merge: true });
//   };

export const set = async (col: string, document: Object) => {
await setDoc(doc(collection(firestoreDB, col)), document, { merge: true })
}
