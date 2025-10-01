import {
	getApps,
	initializeApp,
	applicationDefault,
	cert,
	App,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import fs from "node:fs";
import path from "node:path";

const projectId = process.env.FIREBASE_PROJECT_ID;

function resolveCred() {
	const p = process.env.GOOGLE_APPLICATION_CREDENTIALS;
	if (p) {
		const abs = path.isAbsolute(p) ? p : path.join(process.cwd(), p);
		if (fs.existsSync(abs)) {
			process.env.GOOGLE_APPLICATION_CREDENTIALS = abs; // ensure absolute path for ADC
			return applicationDefault();
		} else {
			console.warn(
				"[firebase.admin] Service account path not found:",
				abs
			);
		}
	}
	// In GCP, ADC is provided automatically; locally we still try ADC
	return applicationDefault();
}

let app: App;
if (!getApps().length) {
	app = initializeApp({
		credential: resolveCred(),
		projectId, // keep explicit for local dev
	});
} else {
	app = getApps()[0]!;
}

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
