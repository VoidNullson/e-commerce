// NOTE: Client-side Firebase app initialisation for the Vega multi-tenant commerce platform.
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE,
}

export function getFirebaseApp(): FirebaseApp {
  if (!getApps().length) {
    initializeApp(firebaseConfig)
  }

  return getApps()[0]!
}

export const firebaseClientAuth = () => getAuth(getFirebaseApp())
export const firebaseClientDb = () => getFirestore(getFirebaseApp())
