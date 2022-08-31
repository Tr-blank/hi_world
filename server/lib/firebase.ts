// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB12jpIWQC_XPTBJcywbCT2Cya90vVROok",
  authDomain: "hiword-37181.firebaseapp.com",
  projectId: "hiword-37181",
  storageBucket: "hiword-37181.appspot.com",
  messagingSenderId: "411664337479",
  appId: "1:411664337479:web:fee1965ee693aa8d7c7f62",
  measurementId: "G-CY7P3T8PJE"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export const firestoreDB = getFirestore(firebaseApp)
// const analytics = getAnalytics(firebaseApp)
