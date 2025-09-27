// NOTE: Firebase Admin SDK singleton for server-side usage (Next.js App Router & Cloud Functions).
import { readFileSync } from 'node:fs'
import { getApps, initializeApp, cert, type AppOptions } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

function buildAdminConfig(): AppOptions {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS

  if (!credentials) {
    return { projectId }
  }

  try {
    const json = credentials.trim().startsWith('{')
      ? JSON.parse(credentials)
      : JSON.parse(readFileSync(credentials, 'utf8'))

    return {
      credential: cert(json),
      projectId: json.project_id ?? projectId,
    }
  } catch (error) {
    console.warn('Failed to parse GOOGLE_APPLICATION_CREDENTIALS; falling back to default credentials', error)
    return { projectId }
  }
}

const adminApp = getApps()[0] ?? initializeApp(buildAdminConfig())

export const adminAuth = getAuth(adminApp)
export const adminDb = getFirestore(adminApp)
