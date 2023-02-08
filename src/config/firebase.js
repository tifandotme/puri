import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { initializeApp as initializeFirebaseAdminApp } from "firebase-admin";
import * as admin from "firebase-admin";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import serviceAccountKey from "./puri-systems-serviceaccountkeys.json";

const firebaseConfig = {
  apiKey: "AIzaSyD6eq4vdO_B0ivZN5oa68W97f_hSd0lMuk",
  authDomain: "puri-systems.firebaseapp.com",
  databaseURL:
    "https://puri-systems-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "puri-systems",
  storageBucket: "puri-systems.appspot.com",
  messagingSenderId: "684555146850",
  appId: "1:684555146850:web:158162497d3aff2b73233b",
};



const adminApp = initializeFirebaseAdminApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: firebaseConfig.databaseURL,
});

const app = initializeFirebaseApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

// Do not use emulator in production! delete this line before deploying
import { connectAuthEmulator } from "firebase/auth";
import { connectDatabaseEmulator } from "firebase/database";
connectAuthEmulator(auth, "http://localhost:9099");
connectDatabaseEmulator(database, "localhost", 9000);

export { auth, database, adminApp };
