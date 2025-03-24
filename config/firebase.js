import admin from "firebase-admin";
import { readFile } from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

// ✅ Load Firebase Credentials
async function initializeFirebase() {
    const serviceAccount = JSON.parse(
        await readFile(new URL(process.env.FIREBASE_CREDENTIALS, import.meta.url))
    );

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    return admin.firestore();
}

const db = await initializeFirebase();
export { db };
