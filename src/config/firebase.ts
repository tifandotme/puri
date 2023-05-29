import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";

// IN CASE ACCESS FROM LOCALHOST IS BLOCKED:
// https://stackoverflow.com/questions/43850238/localhost-requests-from-referer-are-blocked

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: "puri-systems",
  authDomain: "puri-systems.firebaseapp.com",
  storageBucket: "puri-systems.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL:
    "https://puri-systems-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const messaging = getMessaging(app);
const functions = getFunctions(app);

if (!import.meta.env.PROD) {
  connectAuthEmulator(auth, "http://localhost:9100", { disableWarnings: true });
  connectDatabaseEmulator(database, "localhost", 9200);
  connectFunctionsEmulator(functions, "localhost", 9300);
}

export { auth, database, messaging };
